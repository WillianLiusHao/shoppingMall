<template>
  <section class="loginContainer">
  <van-nav-bar  left-text="返回" left-arrow @click-left="goBack()"/>
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">校趣商城</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=!loginWay">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=!loginWay">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button
                :disabled="!truePhone"
                class="get_verification"
                type="button"
                :class="{pass: truePhone}"
                @click="getCode()"
              >{{ tipTime ? `已发送${tipTime}s` : '获取验证码' }}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="username">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-model="password" v-if="showPwd">
                <input type="password" maxlength="8" placeholder="密码" v-model="password" v-else>
                <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd= !showPwd">
                  <div class="switch_circle" :class="{right: showPwd}"></div>
                  <span class="switch_text">{{ showPwd ? 'abc' : '...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码">
                <img class="get_verification" src="./images/captcha.svg" alt="captcha">
              </section>
            </section>
          </div>
          <van-button type="info" class="login_submit" size="large" @click="userLogin()" :loading='isLoading'>登录</van-button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import url from '@/serviceApi.config.js'
import { Toast } from 'vant';

export default {
  data() {
    return {
      username: "", 
      password: '', 
      showPwd: false, // 密码是否可见
      loginWay: true, // true是默认的登录方式：短信登录
      phone: "", // 手机号
      tipTime: 0, // 倒计时
      isLoading: false, // 默认情况下不loading
    };
  },
  computed: {
    truePhone() {
      return /^1\d{10}$/.test(this.phone);
    }
  },
  methods: {
    getCode() {
			// 如果正在计时
      if (this.tipTime > 0) {
        return;
      } else {
        // 1、倒计时
        this.tipTime = 60;
        const timer = setInterval(() => {
          this.tipTime--;
          // 停止计时
          if (this.tipTime <= 0) {
            clearInterval(timer);
          }
        }, 1000);

        // 2、发送验证码
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    userLogin(){
      this.checkForm() && this.axiosRequest() // 前面为真才执行后边的方法
    },
    axiosRequest() {
      this.isLoading = true;
      axios({
        url: url.loginUser,
        method: 'post',
        data:{
          userName: this.username,
          password: this.password
        }
      })
      .then(res => {
        this.isLoading = false;
        if(res.data.code == 200){
          console.log(res)
          if(res.data.message == true){
            new Promise((resolve, reject) => {
              localStorage.userInfo = { userName: this.username};
              setTimeout(()=> {resolve()}, 500);
            })
            .then(()=> {
              this.$router.push('/mine')
              Toast.success("登录成功")
            })
            .catch(e => {
              console.log(e)
              Toast.fail('登录状态保存失败')
            })
          }else if(res.data.message == false){
            Toast.fail("密码错误")
          }else{
            Toast(res.data.message) // 用户名不存在
          }
        }else{
          console.log(res.data.message)
          Toast('登录失败')
        }
      })
      .catch(e => {
        this.isLoading = false;
        console.log(e);
        Toast('登录失败');
      })
    },
    // 表单前台验证
    checkForm() {
      let isPass = true;
      if(this.username.length < 5){
        isPass = false;
        Toast("用户名必须大于5位~");
        return
        if(!this.username){
          isPass = false;
          Toast("亲，请填写用户名哦~");
          return
        }
      }else{
        console.log('用户名通过验证')
      }
      
      if(this.password.length < 6){
        isPass = false;
        Toast("密码必须大于6位");
        return
        if(!this.password){
          isPass = false;
          Toast("亲，请填写密码哦~");
          return
        }
      }else{
        console.log('密码通过验证')
      }
      return isPass;
    },
  },
  created() {
    if(localStorage.userInfo){
      Toast.success('你已经登录了')
      this.$router.push('/mine');
    }
  }
};
</script>

<style lang="scss" scoped>
.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;
  .loginInner {
    padding-top: 0.6rem;
    width: 80%;
    margin: 0 auto;
    .login_header {
      .login_logo {
        font-size: 0.8rem;
        font-weight: bold;
        color: #1989fa;
        text-align: center;
        margin-bottom: 0.6rem;
      }
      .login_header_title {
        text-align: center;
        height: 1rem;
        a {
          display: inline-block;
          vertical-align: middle;
          color: #333;
          font-size: 0.32rem;
          padding-bottom: 0.04rem;
          &:first-child {
            margin-right: 0.4rem;
          }
          &.on {
            color: #1989fa;
            font-weight: 700;
            border-bottom: 2px solid #1989fa;
          }
        }
      }
    }
    .login_content {
      form {
        >div {
          display: none;
          &.on {
            display: block;
          }
          input {
            width: 100%;
            height: 100%;
            padding-left: 0.1rem;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 0.32rem Arial;
            &:focus {
              border: 1px solid #1989fa;
            }
          }
          .login_message {
            position: relative;
            margin-top: 0.16rem;
            height: 1rem;
            font-size: 0.4rem;
            background: #fff;
            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 0.32rem;
              background: transparent;
              &.pass {
                color: #1989fa;
              }
            }
          }
          .login_verification {
            position: relative;
            margin-top: 0.16rem;
            height: 1rem;
            font-size: 0.4rem;
            background: #fff;
            .switch_button {
                font-size: 0.32rem;
                border: 1px solid #ddd;
                border-radius: .2rem;
                -webkit-transition: background-color 0.3s, border-color 0.3s;
                transition: background-color 0.3s, border-color 0.3s;
                padding: 0 0.06rem;
                width: 0.8rem;
                height: 0.36rem;
                line-height: 0.26rem;
                color: #fff;
                position: absolute;
                top: 50%;
                right: 0.1rem;
                -webkit-transform: translateY(-50%);
                transform: translateY(-50%);
              &.off {
                background: #fff;
                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }
              &.on {
                background: #1989fa;
              }
              .switch_circle {
                position: absolute;
                top: -1px;
                left: -1px;
                width: 0.36rem;
                height: 0.36rem;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;
                &.right{
                  transform: translateX(.58rem);
                }
              }
            }
          }
          .login_hint {
            margin: 0.2rem 0 0.8rem;
            color: #999;
            font-size: 0.28rem;
            line-height: 0.4rem;
            a {
              color: #1989fa;
            }
          }
        }
        .login_submit {
          display: block;
          width: 100%;
          height: 1rem;
          margin-top: 0.3rem;
          border-radius: 4px;
          background: #1989fa;
          color: #fff;
          text-align: center;
          font-size: 0.42rem;
          line-height: 0.42rem;
          border: 0;
        }
      }
      .about_us {
        display: block;
        font-size: 0.34rem;
        margin-top: 0.3rem;
        text-align: center;
        color: #999;
      }
    }
  }
}
</style>
				
			
		
      
      
      
        
