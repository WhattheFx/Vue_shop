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
            <el-rol>
                <el-button type="primary">
                    添加分类
                </el-button>
            </el-rol>
        </el-row>
        
        <!-- 表格 -->
        <tree-table :data='catelist' :columns='columns' :selection-type="false" :expand-type="false" :show-index="true" index-text="#" border :show-row-hover="false">
        </tree-table>

        <!-- 分页区域 -->

    </el-card>
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
                pagesize: 5
            },
            total: 0,
            // 为table指定列的定义
            columns: [
                {label:'分类名称',prop:'cat_name'},
            ],
            // 商品分类的数据列表，默认为空
            catelist: []
        }
    },
    created() {
        this.getCateList()
    },
    methods: {
        // 获取商品分类数据
       async getCateList() {
          const {data: res} = await this.$http.get('categories',{params: this.queryInfo})

          if(res.meta.status !== 200) {
              return this.$message.error('获取商品列表数据失败');

          }
        //   console.log(res.data);
        this.$message.success('获取商品列表数据成功');
        // 把数据列表，赋值给catelist
        this.catelist = res.data.result
        //为总数据条数
        this.total = res.data.total

        }
    }

};
</script>
<style lang="less" scoped>
</style>