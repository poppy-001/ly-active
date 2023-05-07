<template>
  <div>
    <div class="container" ref="loginBg" :class="{ filter: isMsgVisibility }">
      <div class="logo"></div>
      <div class="loginMode">

        <input type="text" class="stu_num" placeholder="学号或用户名" v-model="username" />
        <input type="password" class="password" placeholder="密码" v-model="password" />
        <div class="btn">
          <button class="login" @click="login()">立即登录</button>
          <button class="register" @click="isVisibility = !isVisibility">
            注册
          </button>
        </div>

        <router-link to="/index" class="visit">我是游客，随便看看</router-link>
        <el-button type="text" class="visit" @click="isMsgVisibility = !isMsgVisibility">忘记密码</el-button>
      </div>
    </div>

    <transition name="slideDown">
      <register @close="close" :isVisibility="isVisibility"></register>
    </transition>

    <transition name="slideDown">
      <msg-box :isVisibility="isMsgVisibility" @closeMsgBox="closeMsgBox" class="msg">
        <el-steps space="30%" align-center :active="active" finish-status="success">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3"></el-step>
        </el-steps>
        <div v-if="active == 0" class="pannel pannel-01">
          <el-row>
            <el-col :span="6"><label for="mobile">手机号：</label></el-col>
            <el-col :span="18"><el-input type="text" placeholder="请输入绑定的手机号码" id="mobile"
                v-model="mobile"></el-input></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><label for="code">验证码：</label></el-col>
            <el-col :span="12"><el-input type="text" placeholder="请输入验证码" id="code" v-model="code"></el-input></el-col>
            <el-col :span="6" class="code-btn"><el-button ref="sentCode" class="sentCode"
                @click="sentCode">点击发送</el-button></el-col>
          </el-row>
        </div>
        <div v-if="active == 1" class="pannel pannel-02">
          <el-row>
            <el-col :span="6"><label for="newPassword">新密码：</label></el-col>
            <el-col :span="18"><el-input type="password" placeholder="请输入新的密码" id="newPassword" @blur="confirmPwd"
                v-model="newPassword"></el-input></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><label for="comfNewPassword">确认密码：</label></el-col>
            <el-col :span="18"><el-input type="password" placeholder="请输入再次输入密码" id="comfNewPassword"
                ref="comfNewPassword" v-model="comfNewPassword" @blur="confirmPwd"></el-input></el-col>
          </el-row>
        </div>
        <div v-if="active == 2" class="pannel pannel-03">
          <el-row>
            修改成功，请去登录吧！
          </el-row>
        </div>
        <el-button v-if="active == 2" style="margin-top: 12px;" @click="closeResetMsg" class="next"
          type="warning">完成</el-button>
        <el-button v-else style="margin-top: 12px;" @click="next" class="next" type="warning">下一步</el-button>

      </msg-box>
    </transition>
  </div>
</template>

<script>
// 后台返回token  前端拿到token  在请求头携带 发给后端
//  token 存本地存储里 请求头从本地里拿
import { getLoginApi, resetpwdApi } from "@/service/login";
import { sendCodeApi, compareCodeApi } from "@/service/code";
import msgBox from '@/components/msgBox/msgBox.vue';
import Register from "@/views/login/cpn/register.vue";
export default {
  name: "LoginView",
  components: {
    Register, msgBox
  },
  data() {
    return {
      username: "admin",
      password: "123456",
      isVisibility: false,
      isMsgVisibility: false,
      active: 0,
      flag: true,
      mobile: "",
      code: "",
      newPassword: "",
      comfNewPassword: "",
      nextFlag: false
    };
  },
  mounted() {
    window.addEventListener("keydown", (e) => {
      if (this.$route.path == "/login") {
        if (e.key === "Enter") {
          this.login()
        }
      }
    })
  },
  methods: {
    async login() {
      let userInfo = {
        username: this.username,
        password: this.password,
      };

      try {
        await getLoginApi(userInfo)
          .then((res) => {
            console.log("res--", res);
            if (res.status == 200) {
              this.$message.success(res.message);
              localStorage.setItem("TOKEN", res.token);
              this.$router.push("/index");
            } else {
              this.$message.error(res.message);
            }
          }, (err) => {
            console.log("err--", err);
            // this.$message.error(err);
          })
      } catch (err) {
        this.$message.error(err);
      }
    },
    close(val) {
      this.isVisibility = val;
    },
    openMsgBox() {
      this.isMsgVisibility = true
    },
    closeMsgBox() {
      this.isMsgVisibility = false;
    },
    async next() {
      if (this.active == 0) {
        if (this.mobile == "") {
          this.$message.error("请输入手机号")
          return
        } else {
          const req = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
          if (!req.test(this.mobile)) {
            this.$message.error("请输入正确的手机号")
            return
          }
          // 比对验证码
          await compareCodeApi(
            {
              mobile: this.mobile,
              code: this.code
            }
          ).then((res) => {
            if (res.status === 200) {
              this.active++;
            } else {
              this.$message.error("验证码错误")
              return
            }
          })

        }

      } else if (this.active == 1) {
        this.confirmPwd()
        let req = /^[\w.]{6,20}$/
        if (this.nextFlag) {
          if (!req.test(this.newPassword)) {
            this.$message.error(
              `密码长度为6-20位`
            )
          } else {
            await resetpwdApi(false,
              {
                mobile: this.mobile,
                newPwd: this.newPassword
              }
            ).then((res) => {
              if (res.status === 201) {
                this.$message.success("密码修改成功")
                this.active++
                this.nextFlag = false
              } else {
                console.log(res);
                this.$message.error(res.message)
              }
            })
          }
        }
      } else {
        return
      }
    },
    closeResetMsg() {
      this.isMsgVisibility = false;
      this.active = 0
      this.mobile = ""
      this.newPassword = ""
      this.code = ""
      this.comfNewPassword = ""
    },
    async sentCode() {
      if (this.flag) {
        this.flag = false

        // 发送验证码
        const req = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if (req.test(this.mobile)) {
          console.log("ok");

          let cnt = 5
          this.$refs.sentCode.$el.innerHTML = cnt
          let time = setInterval(() => {
            if (cnt == 1) {
              this.flag = true
              this.$refs.sentCode.$el.innerHTML = "点击发送"
              clearInterval(time)
            } else {
              cnt--;
              this.$refs.sentCode.$el.innerHTML = cnt
            }
          }, 1000);

          await sendCodeApi({ mobile: this.mobile }).then((res) => {
            if (res.status === 200) {
              this.$message.success("验证码已发送")
            } else {

              this.$message.error(res.message)
            }
          })

        } else {
          this.flag = true
          this.$message.error("请输入正确的手机号")
          console.log("nook");
        }
      }

    },
    confirmPwd() {
      this.$nextTick(() => {
        if (this.comfNewPassword != "") {
          if (this.comfNewPassword !== this.newPassword) {
            this.nextFlag = false
            this.$refs.comfNewPassword.$el.childNodes[1].style.borderColor = "red"
            this.$refs.comfNewPassword.$el.childNodes[1].style.borderWidth = "2px"
          } else {
            this.$refs.comfNewPassword.$el.childNodes[1].style.borderColor = ""
            this.$refs.comfNewPassword.$el.childNodes[1].style.borderWidth = ""
            this.nextFlag = true
          }
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 100vh;
  background: url(@/assets/img/login/login-bg-final.jpg) no-repeat;

  background-size: 100% 100%;
}

.logo {
  height: 5.2vw;
  background: url(@/assets/img/login/login-logo.png) no-repeat right 1.8vw;
  background-size: 3.4vw;
  margin-right: 1.8vw;
  text-align: center;
}

.loginMode {
  position: absolute;
  bottom: 7%;
  right: 9%;

  width: 17.45vw;

  text-align: center;

  input {
    box-sizing: border-box;
    display: block;
    width: 17.45vw;
    height: 4.43vw;
    border: 6px solid #1d006a;
    padding: 13px;
    margin: 1.2vw auto;

    font-size: 22px;
    color: #070707;

    background-color: transparent;
    box-shadow: 4px 4px 2px 0px rgba(182, 151, 156, 0.13);
    border-radius: 10px;

    &::placeholder {
      color: #070707;
      font-size: 21px;
      opacity: 0.8;
    }
  }

  .btn {
    display: flex;
    justify-content: space-between;
    padding: .3vw 1.2vw 0;
  }

  .login,
  .register {
    display: block;
    width: 8vw;
    height: 2.8vw;
    border: none;
    padding: 0;
    margin-top: 0.6vw;

    font-size: 17px;
    color: #070707;
    background-color: #ffcb05;
    border-radius: 10px;
    box-shadow: 4px 4px 2px 0px rgba(182, 151, 156, 0.13);
    cursor: pointer;
  }

  .register {
    width: 70px;
  }

  .visit {
    display: block;
    margin-top: 1.2vw;
    margin: 1.2vw auto 0;
    font-size: 1.1vw;
    text-decoration: underline #070707;
    color: #070707;

    &:last-child {
      margin-top: 0;
    }
  }
}



.msg {
  padding: 3vw;

  .el-steps {
    justify-content: center;
  }

  .pannel {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
  }

  .pannel-01 {
    .el-row {
      margin-block: 2vw;

      .el-col {
        line-height: 40px;
      }

      .code-btn {
        display: flex;
        justify-content: flex-end;

        .sentCode {
          width: 8.5vw;
          height: 40px;
          padding: 0;
        }
      }

    }
  }

  .pannel-02 {
    .el-row {
      margin-block: 2vw;

      .el-col {
        line-height: 40px;
      }
    }
  }

  .pannel-03 {
    .el-row {
      text-align: center;
    }
  }

  .next {
    position: absolute;
    bottom: 3vw;
    right: 7vw;
  }
}
</style>
