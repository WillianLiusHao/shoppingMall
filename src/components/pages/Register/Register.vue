<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack()"/>
    <div class="register-container">
      <van-field 
        v-model="username" 
        required 
        clearable 
        label="用户名" 
        placeholder="请输入用户名"
        :error-message="usernameErrMsg"
      />
      <van-field
        v-model="password"
        type="password"
        clearable
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrMsg"
      />
      <div class="register-btn">
        <van-button type="info" size="large" @click="userRegister()" :loading='isLoading'>立即注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from '@/serviceApi.config.js'
import { Toast } from 'vant';

export default {
  data() {
    return {
      username: "",
      password: "",
      isLoading: false, // 默认情况下不loading
      usernameErrMsg: '', // 用户名验证错误提示信息
      passwordErrMsg: ''  // 密码验证错误提示信息
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    userRegister(){
      this.checkForm() && this.axiosRequest() // 前面为真才执行后边的方法
    },
    axiosRequest() {
      this.isLoading = true;
      axios({
        url: url.registerUser,
        method: 'post',
        data:{
          userName: this.username,
          password: this.password
        }
      })
      .then(res => {
        if(res.data.code == 200){
          Toast.success('注册成功')
          this.$router.push('/')
        }else{
          console.log(res.data.message)
          Toast('注册失败')
          this.isLoading = false;
        }
      })
      .catch(e => {
        console.log(e);
        Toast('注册失败');
        this.isLoading = false;
      })
    },
    // 表单前台验证
    checkForm() {
      let isPass = true;
      if(this.username.length < 5){
        isPass = false;
        this.usernameErrMsg = "用户名必须大于5位~";
        if(!this.username){
          isPass = false;
          this.usernameErrMsg = "亲，请填写用户名哦~";
        }
      }else{
        this.usernameErrMsg = ""
      }
      
      if(this.password.length < 6){
        isPass = false;
        this.passwordErrMsg = "密码必须大于6位";
        if(!this.password){
          isPass = false;
          this.passwordErrMsg = "亲，请填写密码哦~"
        }
      }else{
        this.passwordErrMsg = ""
      }
      return isPass;
    }
  }
};
</script>

<style scoped>
.register-container {
  padding: 0.2rem 0.2rem 0.4rem;
  overflow: hidden;
}
</style>