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
          <el-button type="primary" @click="showAddCateDialog"> 添加分类 </el-button>
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
          <i class="el-icon-success" v-if='scope.row.cat_deleted ===false' style="color:lightgreen"></i>
          <i class="el-icon-error" v-else style="color:red"></i>
      </template>
       <!-- 排序模板 -->
      <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.cat_level ===1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
      </template>
     <!-- 排序模板 -->
      <template slot="opt" slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
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
      :total="total">
    </el-pagination>
    </el-card>
    <!-- 添加分类的对话框 -->
<el-dialog
  title="添加分类"
  :visible.sync="addCatedialogVisible "
  width="50%">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addCatedialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCatedialogVisible  = false">确 定</el-button>
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
        }
      ],
      // 商品分类的数据列表，默认为空
      catelist: [],
      //控制添加分类的对话框的分类与隐藏
    addCatedialogVisible:false
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
        this.queryInfo.pagesize = newSize
        //重新刷新数据
        this.getCateList()
    },
    handleCurrentChange(newPage) {
        this.queryInfo.pagenum = newPage
        //重新刷新数据
        this.getCateList()
    },
    //点击按钮，展示添加分类的对话框
    showAddCateDialog(){
        this.addCatedialogVisible =true
    }
  },
};
</script>
<style lang="less" scoped>
.treeTable{
    margin: 15px;
}
</style>