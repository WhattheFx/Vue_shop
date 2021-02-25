<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单区域 -->
        <!-- unique-opened是指每次只能展开一个，两种写法：1.unique-opened,2.:unique-opened="true",不加引号，只代表字符串 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409Bff" unique-opened router>
          <!-- 一级菜单 -->
          <!-- index相同，所以你点一个，所有的都展开了 ,所以要加动态数据绑定，但item只接受字符串，但item.id是一个数值，所以要转字符串-->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key='item.id'>
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主题 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      //左侧菜单数据
      menulist: [],
      iconsObj: {
        125:'iconfont icon-user',
        103:'iconfont icon-tijikongjian',
        101:'iconfont icon-shangpin',
        102:'iconfont icon-danju',
        145:'iconfont icon-baobiao'
      }
    };
  },
  created() {
    this.getMenuList()
  },
  methods: {
    logout() {
      console.log("点击了按钮");
      //清空token
      window.sessionStorage.clear();
      //跳转到登录页
      this.$router.push("/login");
    },
    //获取所有的菜单
    async getMenuList() {
      const{data:res} = await this.$http.get('menus')
      if(res.meta.status !==200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
    }
  },
};
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  //代表没有边框线
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
  background-image:url('../assets/welcome.jpg');
  background-size: 100%;
}
.iconfont {
  margin-left: 10px;
}
</style>