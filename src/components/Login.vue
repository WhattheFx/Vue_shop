<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avater_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <!-- ref是引用 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <!-- v-model是双向绑定 -->
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import {getToken} from '../api/login'
export default {
  data() {
    return {
      //这是登录表单的数据绑定对象
      loginForm:{
        username:'admin',
        password:'123456'
      },
      //这是表单的验证规则
      loginFormRules:{
        //验证用户名是否合法
        username: [
          //required是必填项，message是提示，trigger是失去焦点时候触发
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        //验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 6到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //点击重置按钮，重置登录表单
    //注意这个this就指向当前组件的实例对象
    resetLoginForm() {
    // 点击重置打印，它身上有一个属性叫$refs,$refs是一个数据对象，里面有一个属性很特殊，叫loginFormRef，和el-form取的ref名字是一致的
      // console.log(this)
      //this.$refs.loginFormRef就是表单的实例对象
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      //验证表单输入合不合法，登录前的预校验
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid);
        // !valid是打印的值为false,直接return不发请求
        if(!valid) return;
        //以下是验证成功后发请求。
        //因为某一个含返回 的值是一个promise，可以用await和async来简化promise的操作，await只能用在被async修饰的方法中,修饰成异步函数,所以要
        // 找到await紧挨着的方法加async，用
        //他们修饰后就可以打印的值就是一个具体的响应对象。
       /* const result= this.$http.post("login",this.loginForm);
       console.log(result) */
       const { data:res }=await this.$http.post("login",this.loginForm);
       if(res.meta.status !==200) return this.$message.error("登录失败！");
       this.$message.success("登录成功！")
       //打印请求的结果
       console.log(res);
      // 将token保存到sessionStorage中,如果是登录状态就可以在application找到存储的token
      window.sessionStorage.setItem("token",res.data.token);
      console.log(this);
      this.$router.push('./home')
      
      })
    }
  }
};
</script>

<style lang="less" scoped>
// scoped是设置样式生效区域，如果不加就全局生效
.login_container {
  background-color: #2b4b6b;
  background-image:url('../assets/4.jpg');
  background-size: 100%;
//   background-repeat:no-repeat;
  height: 100%;
}
// 设置盒子大小和居中
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avater_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    // 边框线加阴影
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    // 移动自己的百分之五十,前面是向左，后面是向上
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #eee;
    }
  }
}

.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    //消除表单超出的问题，默认是recont
    box-sizing: border-box;
}

.btns {
    //设置为弹性盒模型，设置为尾部对齐
    display: flex;
    justify-content: flex-end;
}
</style>