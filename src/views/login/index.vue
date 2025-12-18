<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-text="返回" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input
            v-model="mobile"
            class="inp"
            maxlength="11"
            placeholder="请输入手机号码"
            type="text"
          />
        </div>
        <div class="form-item">
          <input
            v-model="PicCode"
            class="inp"
            maxlength="5"
            placeholder="请输入图形验证码"
            type="text"
          />
          <img :src="PicUrl" @click="getPicCode" alt="" />
        </div>
        <div class="form-item">
          <input v-model="MesCode" class="inp" placeholder="请输入短信验证码" type="text" />
          <button @click="getMessageCode">
            {{ second === totalSecond ? '获取验证码' : second + '秒后重新获取' }}
          </button>
        </div>
      </div>

      <div class="login-btn" @click="volidLogin">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicData, getMesCode, getLogin } from '@/api/login.js';

export default {
  name: 'LoginIndex',
  data() {
    return {
      PicKey: '', // 请求传递的图形验证码唯一标识
      PicUrl: '', // 存储请求渲染的图片地址
      PicCode: '', // 用户输入的图形验证码
      MesCode: '', // 用户输入的短信验证码
      mobile: '', // 用户输入的手机号
      second: 5, // 当前倒计时
      totalSecond: 5, // 总倒计时秒数
      timer: null, // 定时器
    };
  },
  async created() {
    this.getPicCode();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    // 获取图片验证码
    async getPicCode() {
      const res = await getPicData();
      const {
        data: { base64, key },
      } = res;
      this.PicUrl = base64;
      this.PicKey = key;
    },
    // 判断输入手机号和验证码是否正确
    modify() {
      if (!/^1[3-9]\d{2}$/.test(this.mobile)) {
        this.$toast('手机号不正确~');
        return false;
      }

      if (!/^\w{4}$/.test(this.PicCode)) {
        this.$toast('pic验证码不正确~');
        return false;
      }
      return true;
    },

    // 获取短信验证码
    async getMessageCode() {
      if (!this.modify()) {
        return;
      }
      if (!this.timer && this.second === this.totalSecond) {
        // 调用接口发送短信
        await getMesCode(this.PicCode, this.PicKey, this.mobile);
        // console.log(res);

        this.timer = setInterval(() => {
          this.second--;

          // 如果倒计时结束
          if (this.second < 1) {
            clearInterval(this.timer);
            this.timer = null; // 重置定时器
            this.second = this.totalSecond;
          }
        }, 1000);
      }
    },

    // 验证登录
    async volidLogin() {
      if (!this.modify()) {
        return false;
      }

      if (!/^\d{6}$/.test(this.MesCode)) {
        this.$toast('请输入正确验证码');
        return false;
      }

      const res = await getLogin(this.MesCode, this.mobile);
      // console.log(res);
      this.$store.commit('user/SetUserInfo', res.data);
      this.$toast.success('登录成功');
      // this.$router.push('/')

      // 如果登录前用户已经进行了某些操作，那么这时地址栏会有回跳参数
      // 如果没有，正常跳转到首页
      const url = this.$route.query.backUrl || '/';
      this.$router.replace(url);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
