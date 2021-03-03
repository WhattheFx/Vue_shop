<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 ，el-row是行，el-row是列-->
    <el-card>
      <!-- <el-row>
            <el-rol>
                <el-button type="primary">
                    添加分类
                </el-button>
            </el-rol>
        </el-row> -->
      <!-- 警告区域 -->
      <el-alert
        title="注意：只允许为第三方分类设置相关参数"
        type="warning"
        :closable="false"
        show-icon
      >
      </el-alert>
      <!-- 选择商品分类区域-->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 选择商品分类的级联选择框 -->
          <el-cascader
            v-model="seletedCateKeys"
            :options="catelist"
            :props="cateProps"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- tab页面区域 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 添加动态参数的面板 -->
        <el-tab-pane label="动态参数" name="many">
          <!-- 添加参数按钮 -->
            <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加参数</el-button>
        </el-tab-pane>
        <!-- 添加静态属性的面板 -->
        <el-tab-pane label="静态属性" name="only">
          <!-- 添加属性按钮 -->
          <el-button type="primary" :disabled="isBtnDisabled" size="mini">添加属性</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      catelist: [],
      //级联选择框的配置对象
      cateProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      //级联选择框双向绑定到的数组
      seletedCateKeys: [],
      //被激活的页签的名称
      activeName:'many'
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    //获取所有的商品分类列表
    async getCateList() {
      const { data: res } = await this.$http.get("categories");
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品分类失败");
      }
      this.catelist = res.data;
      console.log(this.catelist);
    },
    //级联选择框中项变化，会触发这个函数
   async handleChange() {
      // 证明选中的不是三级分类
      // console.log(this.seletedCateKeys)
      if (this.seletedCateKeys.length !== 3) {
        this.seletedCateKeys = [];
        return
      }
      // 证明选中的是三级分类
      console.log(this.seletedCateKeys);
      //根据所选的分类的Id，和当前所处的面板，获取对应的参数
      // 注意请求地址的符号`
     const {data: res} = await this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel: this.activeName}})
     if(res.meta.status !== 200) {
        return this.$message.error('获取参数列表数据失败')
    }
    console.log(res.data)
    },
   
    handleTabClick() {
      console.log(this.activeName)
    }
  },
  // 通过计算属性返回一个布尔值
  computed: {
    // 如果按钮需要被禁用，则返回true，否则返回false
    isBtnDisabled() {
      if(this.seletedCateKeys.length !== 3) {
        return true
      }
      return false
    },
    //当前选中的三级分类的哦id
    cateId() {
      if(this.seletedCateKeys.length === 3) {
        return this.seletedCateKeys[2]
      }
      return null
  }
}
}
</script>
<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
</style>