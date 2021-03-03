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
    </el-card>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
</style>