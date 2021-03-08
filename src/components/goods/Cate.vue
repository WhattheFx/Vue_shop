<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 ，el-row是行，el-row是列-->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog">
            添加分类
          </el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <tree-table
        class="treeTable"
        :data="catelist"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        :show-index="true"
        index-text="#"
        border
        :show-row-hover="false"
      >
        <!-- 是否有效模板 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: lightgreen"
          ></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <!-- 排序模板 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag
            size="mini"
            type="success"
            v-else-if="scope.row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
        <!-- 排序模板 -->
        <template slot="opt" slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"
            >编辑</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
        </template>
      </tree-table>
      <!-- 分页区域 ，page-sizes每页显示几条，page-size当前页显示几条，layout当前的分页区域可以由哪些部分组成，直接默认，total是总数据条数-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCatedialogVisible"
      width="50%"
      @close="addCateDialogClosed"
    >
         <!-- 添加分类表单 -->
    <el-form
      :model="addCateForm"
      :rules="addCateFormRules"
      ref="addCateFormRef"
      label-width="100px"
    >
      <el-form-item label="分类名称:" prop="cat_name">
        <el-input v-model="addCateForm.cat_name"></el-input>
      </el-form-item>
      <el-form-item label="父级分类:">
        <!-- options用来指定数据源 -->
        <!-- props用来指定配置对象 -->
          <el-cascader
    expand-trigger="hover"
    v-model="selectedKeys"
    :options="parentCateList"
    :props="cascaderProps"
    @change="parentCateChanged"
    clearable
    change-on-select>
      </el-cascader>
      </el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCatedialogVisible = false">取 消</el-button>
        <el-button type="primary" 
          @click="addCate">确 定</el-button
        >
      </span>
    </el-dialog>

  </div>
</template>
<script>
export default {
  data() {
    return {
      // 参数,查询条件
      queryInfo: {
        type: 3,
        // 第一页
        pagenum: 1,
        // 每页显示多少条
        pagesize: 5,
      },
      total: 0,
      // 为table指定列的定义
      columns: [
        { label: "分类名称", prop: "cat_name" },
        {
          label: "是否有效",
          //表示，当前列定义为模板列
          type: "template",
          //表示当前这一列使用的模板名称
          template: "isok",
        },
        {
          label: "排序",
          //表示，当前列定义为模板列
          type: "template",
          //表示当前这一列使用的模板名称
          template: "order",
        },
        {
          label: "操作",
          //表示，当前列定义为模板列
          type: "template",
          //表示当前这一列使用的模板名称
          template: "opt",
        },
      ],
      // 商品分类的数据列表，默认为空
      catelist: [],
      //控制添加分类的对话框的分类与隐藏
      addCatedialogVisible: false,
      //添加分类的表单数据对象
      addCateForm: {
        //将要添加分类的名称
        cat_name:'',
        cat_pid:0,
        //分类的等级，默认添加的是一级分类
        cat_level:0
      },
      //添加分类表单的验证规则对象
      addCateFormRules: {
        cat_name:[
            { required: true, message: '请输用分类名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
      },
      //父级分类的列表
      parentCateList:[],
      //指定来联级选择器的配置对象
      cascaderProps:{
        // 你选中的那个值
        value: 'cat_id',
        // 你看到的那个值
        label: 'cat_name',
        //指定父子嵌套的属性
        children:'children'
      },
      //选中的父级分类的数组
      selectedKeys:[]
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    // 获取商品分类数据
    async getCateList() {
      const { data: res } = await this.$http.get("categories", {
        params: this.queryInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品列表数据失败");
      }
      //   console.log(res.data);
      this.$message.success("获取商品列表数据成功");
      // 把数据列表，赋值给catelist
      this.catelist = res.data.result;
      //为总数据条数
      this.total = res.data.total;
    },
    //监听pagesize的改变,触发了这个函数即可以拿到最新的pagesize
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      //重新刷新数据
      this.getCateList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      //重新刷新数据
      this.getCateList();
    },
    //点击按钮，展示添加分类的对话框
    showAddCateDialog() {
      //先获取父级分类数据列表
      this.getParentCateList()
      //再展示对话框
      this.addCatedialogVisible = true;
    },
    // 获取父级分类的数据列表
  async  getParentCateList() {
    const {data:res} = await this.$http.get('categories',{params:{type:2}})
    if (res.meta.status !== 200) {
      return this.$message.error('获取父级类数据失败')

    }
    console.log(res.data)
    this.parentCateList= res.data
    },
    parentCateChanged() {
      console.log(this.selectedKeys)
      //如果selectedKeysd的数组的length大于0，证明选中了父级分类，反之没有选中任何父级分类
      if(this.selectedKeys.length> 0) {
        // 父级分类的id
        this.addCateForm.cat_pid =this.selectedKeys[this.selectedKeys.length-1]
        //为当前分类的等级赋值
        this.addCateForm.cat_level = this.selectedKeys.length
        //相当于更新data数据
        return
      }else {
        //父级分类Id
        this.addCateForm.cat_pid =0
        this.addCateForm.cat_level =0
      }
      
    },
addCate() {
      console.log(this.addCateForm)
        this.$refs.addCateFormRef.validate(async  valid=>{
      // console.log(valid)
      // 如果为false,则直接return
    if (!valid) return
      //成功则发起修改用户信息的数据请求，提交数据
     const {data:res} = await this.$http.post('categories',this.addCateForm)
     if(res.meta.status !== 201) {
       return this.$message.error('添加分类失败！')
     }
      //提示修改成功
     this.$message.success('添加分类成功')
     //刷新数据列表
     this.getCateList()
     //关闭对话框
     this.addCatedialogVisible= false
    })
    },
    //监听对话框的关闭事件，重置表单数据
    addCateDialogClosed() {
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_level =0
      this.addCateForm.cat_pid =0
    }
    

  },
};
</script>
<style lang="less" scoped>
.treeTable {
  margin: 15px;
}
.el-cascader {
  width:100%;
}
</style>