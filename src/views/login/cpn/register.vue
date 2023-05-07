<template>
  <div class="register" v-if="isVisib">
    <div class="close" @click="close">X</div>
    <div class="content">
      <h2 class="title">注册</h2>

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="学号:" prop="stu_num">
          <el-input v-model="ruleForm.stu_num"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入6-20字符密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="comfirmPaw">
          <el-input v-model="comfirmPaw" placeholder="再次输入密码" type="password"></el-input>
        </el-form-item>
      </el-form>

      <button class="registerBtn" @click="register()">立即注册</button>
      <button class="registerBtn" @click="resetForm()">重置</button>
    </div>
  </div>
</template>

<script>
import { getRegisterApi } from "@/service/login";
export default {
  name: "registerMode",
  props: ["isVisibility"],

  data() {
    var validatePass2 = (rule, value, callback) => {
      if (this.comfirmPaw === "") {
        callback(new Error("请再次输入密码"));
      } else if (this.comfirmPaw !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isVisib: "",
      comfirmPaw: "",
      ruleForm: {
        username: "",
        stu_num: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名:", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到10个字符", trigger: "blur" },
        ],
        stu_num: [
          { required: true, message: "请输入学号", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "长度在 6 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
        comfirmPaw: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.isVisib = this.isVisibility;
  },
  methods: {
    register() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          if (this.comfirmPaw === this.ruleForm.password) {
            await getRegisterApi(this.ruleForm).then((res) => {
              console.log(res);
              if (res.status === 201) {
                this.$message.success("注册成功，快去登录吧");
                setTimeout(() => {
                  this.close();
                }, 2000);
              } else {
                this.$message.error(res.message);
              }
            });
          } else {
            this.$message.error("两次密码输入不一致");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    close() {
      this.isVisib = false;
      this.$emit("close", false);
      this.resetForm();
    },
    resetForm() {
      this.$refs["ruleForm"].resetFields();
      this.comfirmPaw = "";
    },
  },
  watch: {
    isVisibility() {
      this.isVisib = this.isVisibility;
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  z-index: 999;
  box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 33vw;
  height: 41vw;
  background: url(@/assets/img/register/2.png) no-repeat;
  background-size: 100%;
  // width: 30vw;
  // padding: 2vw 0;
  // border: 8px solid #f7c146;
  // background-color: #fff;

  transform: translate(-50%, -50%);
  border-radius: 15px;
  transition: all 3s;

  .close {
    position: absolute;
    // top: 3vw;
    top: 0;
    right: 0;
    width: 1.8vw;
    height: 1.8vw;
    text-align: center;
    line-height: 1.8vw;
    font-weight: 700;
    background-color: #fff;
    // background-color: #f9d98c;
    // color: #fff;

    border-radius: 50%;
    cursor: pointer;
  }
}

.content {
  position: absolute;
  left: 11vw;
  bottom: 5.2vw;
  width: 15vw;
  text-align: center;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
}

.title {
  margin-bottom: 2vw;
  text-align: center;
  font-size: 1.7vw;
  font-weight: 400;
  font-family: KaiTi;
}

.registerBtn {
  width: 5vw;
  height: 2.5vw;
  border: none;
  margin-right: 1vw;

  font-size: 0.95vw;
  background-color: #6ab04d;
  border-radius: 10px;
  cursor: pointer;
}
</style>
<style>
/* //注册表单 */
.register .el-input__inner {
  width: 10vw !important;
  outline: 0 !important;
  border: none !important;
  font-size: 0.9vw !important;
  background-color: transparent !important;
}

.register .el-input__inner::placeholder {
  font-size: 0.85vw !important;
}

.register .el-form-item__label {
  width: 5vw !important;
  padding-right: 0.625vw !important;
  font-size: 0.9vw !important;
  text-align: left !important;
}

.register .el-form-item {
  border-bottom: 1px solid #333 !important;
  margin-bottom: 1.145vw !important;
}

.register .el-form-item.is-error {
  border-color: #f56c6c !important;
}

.register .el-form-item__content {
  margin-left: 5vw !important;
}
</style>