<template>
  <div>
    <div class="header" ref="header" :class="{ gary: isVisibility }">
      <div class="header-left">
        <div class="header-logo">
          <img src="@/assets/img/header/logo.png" alt="" />
          <p>厦门理工学院</p>
        </div>
        <div class="header-title">校园活动管理系统</div>
      </div>

      <div class="header-right header-nav">
        <ul @click="clickNav">
          <li :class="{ 'nav-active': currentPath == '/index' }"><router-link to="/index">首页</router-link></li>
          <li :class="{ 'nav-active': currentPath == '/activities' }"><router-link to="/activities">活动列表</router-link>
          </li>
          <li :class="{ 'nav-active': currentPath == '/person' }">
            <el-dropdown @command="gogogo" :hide-on-click="false" ref="dropdown">
              <span class="el-dropdown-link">
                <img v-if="user_pic" :src="user_pic" alt="" class="user_pic">
                <img v-else src="@/assets/img/person/person.png" alt="" class="user_pic">
                {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">个人中心</el-dropdown-item>
                <el-dropdown-item command="b">修改密码</el-dropdown-item>
                <el-dropdown-item command="c">夜间模式
                  <el-switch v-model="darkMode" active-color="#13ce66" inactive-color="gray">
                  </el-switch>

                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li v-if="!isLogin">
            <router-link to="/login" class="login">登录</router-link>
          </li>
          <li v-if="isLogin" class="loginOut" @click="loginOut()">
            <a>退出登录</a>
          </li>
          <li class="createActive" @click="createActive">
            <a>+</a>
          </li>
        </ul>
      </div>
    </div>
    <transition name="slideDown">
      <msg-box :isVisibility="isVisibility" @closeMsgBox="closeMsgBox" class="header-msg" ref="headerMsg"
        :class="{ fit: flag }">
        <div class="header-msg-title">我的发布</div>
        <div class="header-msg-content">
          <el-form :model="createActiveForm" :rules="rules" ref="createActiveForm" label-width="7.2vw"
            class="createActiveForm" label-suffix="：">
            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label="活动名称" prop="activity_title">
                  <el-input v-model="createActiveForm.activity_title" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开始时间" prop="activity_starttime">
                  <el-input v-model="createActiveForm.activity_starttime"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label="活动地址" prop="activity_address">
                  <el-cascader v-model="createActiveForm.activity_address" :options="addressOptions" filterable clearable>
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="详细地址" prop="activity_detailAddress">
                  <el-input v-model="createActiveForm.activity_detailAddress" clearable placeholder="明理2-105"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label="活动范围" prop="activity_type">
                  <el-select v-model="createActiveForm.activity_type" placeholder="更好地推荐给感兴趣的同学">
                    <el-option v-for="( type, index ) in  typeOptions " :key="index" :label="type.label"
                      :value="type.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="活动类型" prop="feature">
                  <el-select v-model="createActiveForm.feature" placeholder="更好地推荐给感兴趣的同学">
                    <el-option v-for=" feature  in  featureOptions " :key="feature.value" :label="feature.label"
                      :value="feature.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="活动宣传" prop="activity_desc">
              <el-input v-model="createActiveForm.activity_desc" placeholder="快来参加吧" type="text"></el-input>
            </el-form-item>
            <el-form-item label="报名方式" prop="signUp">
              <el-input v-model="createActiveForm.signUp" placeholder="联系方式 格式：qq:xxxxxxx" type="text"></el-input>
            </el-form-item>
            <el-form-item label="活动图片" prop="activity_img" class="active-img">
              <el-upload class="active-uploader" action="" :before-upload="beforeActiveUpload" :show-file-list="false"
                :http-request="uploadImg" accept="image/png,image/jpg,image/jpeg" :on-change="imgChange">
                <img v-if="imageUrl" :src="imageUrl" class="active-pic">
                <i v-else class="el-icon-plus active-uploader-icon"></i>
              </el-upload>
            </el-form-item>

          </el-form>

          <div class="formbtn">
            <img src="@/assets/img/header/资源1@2x.png" alt="" class="bg-logo">
            <el-button type="warning" @click="onSubmit" size="small" plain>发布</el-button>
            <el-button size="small" @click="resetForm">取消</el-button>
          </div>
        </div>
      </msg-box>
    </transition>

    <transition name="slideDown">
      <msg-box :isVisibility="isMsgVisibility" @closeMsgBox="closeMMsgBox" class="msg">
        <el-steps space="30%" align-center :active="active" finish-status="success">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
        </el-steps>
        <div v-if="active == 0" class="pannel pannel-02">
          <el-row>
            <el-col :span="6"><label for="oldPassword">旧密码：</label></el-col>
            <el-col :span="18"><el-input type="password" placeholder="请输入旧的密码" id="oldPassword"
                v-model="oldPassword"></el-input></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><label for="newPassword">新密码：</label></el-col>
            <el-col :span="18"><el-input type="password" placeholder="请输入新的密码" id="newPassword" v-model="newPassword"
                @blur="confirmPwd()"></el-input></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><label for="comfNewPassword">确认密码：</label></el-col>
            <el-col :span="18"><el-input type="password" placeholder="请输入再次输入密码" id="comfNewPassword"
                ref="comfNewPassword" v-model="comfNewPassword" @blur="confirmPwd"></el-input></el-col>
          </el-row>
        </div>
        <div v-if="active == 1" class="pannel pannel-03">
          <el-row>
            修改成功，请重新登录！
          </el-row>
        </div>
        <el-button v-if="active == 1" style="margin-top: 12px;" @click="closeResetMsg" class="next"
          type="warning">完成</el-button>
        <el-button v-else style="margin-top: 12px;" @click="next" class="next" type="warning">下一步</el-button>

      </msg-box>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import msgBox from '../msgBox/msgBox.vue';
import { createActiveApi } from '@/service/actives';
import { getUserInfo } from "@/service/user";
import { resetpwdApi } from "@/service/login";

export default {
  components: { msgBox },
  name: "headerMode",
  props: ["headerBgcolor"],
  data() {
    return {
      isVisibility: false,

      isMsgVisibility: false,
      oldPassword: "",
      comfNewPassword: "",
      newPassword: "",
      nextFlag: true,
      active: 0,


      currentPath: "",
      username: "",
      user_pic: "",
      createActiveForm: {
        activity_title: "",
        activity_starttime: "",
        activity_address: [],
        activity_detailAddress: "",
        activity_type: "",
        feature: "",
        activity_desc: "",
        activity_img: "",
        signUp: ""
      },
      addressOptions: [
        {
          value: '教室',
          label: '教室',
          children: [{
            value: '明理楼',
            label: '明理楼',
          },
          {
            value: '明理89',
            label: '明理89',
          },
          {
            value: '精工楼',
            label: '精工楼',
          },
          {
            value: '逸夫楼',
            label: '逸夫楼',
          },
          {
            value: '创艺园',
            label: '创艺园',
          }
          ]
        },
        {
          value: '室外运动场',
          label: '室外运动场',
          children: [{
            value: '新操场',
            label: '新操场',
          },
          {
            value: '旧操场',
            label: '旧操场',
          },
          {
            value: '篮球场',
            label: '篮球场',
          }]
        },
        {
          value: '室内运动场',
          label: '室内运动场',
          children: [{
            value: '体育馆',
            label: '体育馆',
          },
          {
            value: '游泳馆',
            label: '游泳馆',
          },
          {
            value: '羽毛球馆',
            label: '羽毛球馆',
          }]
        },
        {
          value: '宿舍楼',
          label: '宿舍楼',
        },
        {
          value: '食堂',
          label: '食堂',
        },
        {
          value: '图书馆',
          label: '图书馆',
        },
        {
          value: '综合楼',
          label: '综合楼',
        },
        {
          value: '艺术会堂',
          label: '艺术会堂',
        },
        {
          value: '教工之家',
          label: '教工之家',
        },
        {
          value: '线上活动',
          label: '线上活动',
        },
        {
          value: '其他',
          label: '其他',
          children: [
            {
              value: '东区',
              label: '东区',
            },
            {
              value: '校外',
              label: '校外',
            }
          ]
        },
      ],
      typeOptions: [
        { label: "学院", value: 1 },
        { label: "社团", value: 2 },
        { label: "校园", value: 3 },
        { label: "个人", value: 0 },
      ],
      featureOptions: [
        { label: "学习", value: "学习" },
        { label: "社交", value: "社交" },
        { label: "赛事", value: "赛事" },
        { label: "社团纳新", value: "社团纳新" },
        { label: "文艺", value: "文艺" },
        { label: "慈善", value: "慈善" },
        { label: "运动", value: "运动" },
        { label: "创业就业", value: "就业" },
        { label: "志愿服务", value: "志愿服务" },
        { label: "其他", value: "其他" },
      ],
      rules: {
        activity_title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        activity_starttime: [
          { required: true, message: "请输入活动时间", trigger: "blur" },
        ],
        activity_address: [
          { required: true, message: "请输入活动地址", trigger: "change" },
        ],
        activity_img: [
          { required: true, message: "请上传活动图片", trigger: "change" },
        ],
        activity_desc: [
          { required: true, message: "请输入活动宣传语:", trigger: "blur" },
        ],
        activity_detailAddress: [
          { required: false, trigger: "blur" },
        ],
        activity_type: [
          { required: false, trigger: "change" },
        ],
        feature: [
          { required: false, trigger: "change" },
        ],
        signUp: [
          { required: true, message: "请输入报名联系方式:", trigger: "blur" }
        ]
      },
      imageUrl: '',
      flag: false,//样式
      file: "",

      darkMode: false,
    }
  },
  mounted() {
    this.$bus.$on("updateHead", this.getUser)
    this.$store.dispatch("checkToken");
    setTimeout(() => {
      this.currentPath = this.$route.path;
      console.log("this.currentPath", this.currentPath);
    }, 150);
    window.addEventListener("resize", () => {
      if (window.innerWidth) {
        this.flag = true
      } else {
        this.flag = false
      }
    })


    window.addEventListener("keydown", (e) => {
      if (this.$route.path !== "/login") {
        if (this.isVisibility) {
          if (e.key === "Enter") {
            this.onSubmit()
          }
        }

      }
    })


    this.getUser()
  },
  watch: {
    headerBgcolor() {
      this.$refs.header.style.backgroundColor = this.headerBgcolor
    },
    '$route': {
      handler: function (to) {
        this.$nextTick(() => {
          if (to.path === "/index") {
            this.$refs.header.style.transition = "all .5s"
          } else if (to.path === "/activities") {
            this.$refs.header.style.transition = "none"
          } else {
            this.$refs.header.style.transition = "none"
          }
          setTimeout(() => {
            this.currentPath = this.$route.path;
            console.log("this.currentPath", this.currentPath);
          }, 150);
        })
      },
      immediate: true // 如果要在初始化时也触发回调，需要添加 immediate: true
    },
    darkMode() {
      if (this.darkMode) {
        this.$refs.header.classList.add("dark")

        this.$bus.$emit("changebg", '/assets/img/index/dark-bg.jpg')
      } else {
        this.$refs.header.classList.remove("dark")
        this.$bus.$emit("changebg", '/assets/img/index/index-bg.jpg')
      }
    }
  },
  methods: {
    async getUser() {
      if (localStorage.getItem("TOKEN")) {
        await getUserInfo().then((res) => {
          if (res.status === 200) {
            this.username = res.data.username
            this.user_pic = res.data.user_pic
            console.log("res.data", res.data);
          }
        }, (err) => {
          this.$message.error(err)
        })
      } else {
        this.username = "游客"
      }
    },
    changePwd() {
      this.$message('click on item ');
    },
    gogogo(com) {
      if (com == "a") {
        this.$refs.dropdown.hide();

        this.$router.push("/person")
      } else if (com == "b") {
        this.$refs.dropdown.hide();

        this.openMsgBox()
      } else if (com == 'c') {
        return
      }
    },
    loginOut() {
      this.$confirm("是否要退出登录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          localStorage.removeItem("TOKEN");
          this.$message({
            type: "success",
            message: "退出登录成功",
          });
          this.$store.dispatch("checkToken");
          let req = /^\/person/
          this.username = "游客"
          this.user_pic = ""
          if (req.test(this.$route.path)) {
            setTimeout(() => {
              this.$router.push("/login")
            }, 3000);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
    closeMsgBox(val) {
      this.isVisibility = val;
      this.$bus.$emit("mask", false)
    },
    createActive() {
      this.isVisibility = true
      this.$bus.$emit("mask", true)
    },
    clickNav(e) {
      setTimeout(() => {
        if (e.target.tagName == "A") {
          this.currentPath = this.$route.path;
        }
      }, 20);
    },
    beforeActiveUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      if (!isJPG) {
        this.handleFileError(new Error('只能上传jpg或png格式的图片哦'), file, []);
        return false;
      }

      return isJPG;
    },

    imgChange(file, fileList) {

      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(file)
      this.createActiveForm.activity_img = file
      console.log(this.createActiveForm.activity_img)
      if (fileList.length > 0) {
        this.$refs.createActiveForm.clearValidate("activity_img") // 去掉file验证
      }
    },

    resetForm() {
      this.$refs.createActiveForm.resetFields()
      this.imageUrl = ""
      this.closeMsgBox()
    },
    onSubmit() {
      this.$refs.createActiveForm.validate(async (valid) => {
        if (valid) {
          var form = new FormData()
          const fileName = encodeURIComponent(this.file.name)
          form.append("file", this.file, fileName)
          form.append("active", JSON.stringify(this.createActiveForm))
          const res = await createActiveApi(form)
          if (res.status === 201) {
            this.$message.success('发布活动成功');
            this.$bus.$emit("updateData")

            this.file = ""
            this.$bus.$emit("updateActive")
          }
          this.resetForm()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    uploadImg(param) {
      this.file = param.file
    },

    openMsgBox() {
      this.isMsgVisibility = true
      console.log(this.isMsgVisibility);
      this.$bus.$emit("mask", true)
    },
    closeMMsgBox() {
      this.isMsgVisibility = false;
      this.$bus.$emit("mask", false)

    },
    async next() {
      if (this.active == 0) {
        this.confirmPwd()

        let req = /^[\w.]{6,20}$/
        if (this.nextFlag) {
          if (!req.test(this.newPassword) || !req.test(this.oldPassword)) {
            this.$message.error(
              `密码长度为6-20位`
            )
          } else {

            await resetpwdApi(true,
              {
                username: this.username,
                newPwd: this.newPassword,
                oldPwd: this.oldPassword
              }
            ).then((res) => {
              if (res.status === 201) {
                this.$message.success("密码修改成功")
                localStorage.removeItem("TOKEN");
                this.$store.dispatch("checkToken");
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
      this.newPassword = ""
      this.oldPassword = ""
      this.comfNewPassword = ""
      this.username = "游客"
      this.user_pic = ""
      setTimeout(() => {
        this.$router.push("/login")
      }, 1000);
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
  computed: {
    ...mapState(["isLogin"]),
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  // height: 67px;
  height: 4.5vw;

  box-shadow: 0 2px 2px 1px rgba($color: #000000, $alpha: .1);
  z-index: 999;
  border-radius: 0 0 45px 45px;
  transition: all .5s;

  &-left {
    display: flex;
    align-items: center;
  }

  &-logo {
    display: flex;
    align-items: center;

    img {
      width: 2.6vw;
      height: 2.6vw;
      margin: 0 20px;

    }

    p {
      font-size: 18px;
      color: #771515;
    }
  }

  &-title {
    border-left: 1px solid #333;
    margin-left: 20px;
    padding-left: 20px;
    font-size: 18px;
    color: #333;
  }

  &-nav ul {
    display: flex;
    align-items: center;

    li {
      box-sizing: border-box;
      display: block;
      // height: 66px;
      height: 4.5vw;
      padding: 0 1.5vw;
      // line-height: 66px;
      line-height: 4.5vw;
      text-align: center;

      font-size: 1.24vw;
      color: #010101;
      cursor: pointer;

      &:nth-child(3) {
        padding: 0 .5vw;
      }

      .el-dropdown {
        display: inline-block;
        height: 4.5vw;
        line-height: 4.5vw;
      }

      .user_pic {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 5px;
        border: 2px solid #fff;
        vertical-align: middle;
      }

    }
  }
}

.header-nav ul li.createActive {
  width: 60px;
  // height: 67px;
  height: 4.5vw;
  background-color: #26b46b;
  padding: 0;

  a {
    color: #fff;
    font-size: 1.5vw;
  }
}

.nav-active {
  border-bottom: 3px solid #26b46b;
}


// 发布活动弹框
.header-msg {

  &-title {
    position: absolute;
    top: 3vw;
    left: 50%;
    transform: translate(-50%);
    height: 2.5vw;
    width: 10vw;
    background-color: #fef6e4;

    text-align: center;
    line-height: 2.5vw;

    font-size: 1.5vw;
    font-family: KaiTi;

    box-shadow: 0px 5px 6px 2px rgba(77, 67, 69, 0.2);
    border-radius: 3px;
  }

  &-content {
    box-sizing: border-box;
    position: absolute;
    top: 8vw;
    padding: 0 4vw;
    height: calc(100% - 10vw);

    .formbtn {
      position: absolute;
      bottom: 0px;
      right: 6.5vw;

    }

    .bg-logo {
      position: absolute;
      height: 6.4vw;
      bottom: 2.6vw;
      right: -3.26vw;
    }

    .active-pic {
      max-height: 6.4vw;
    }
  }

}


.el-steps {
  margin-top: 3vw;
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

.dark {
  background-color: #121161 !important;

  .header-title,
  .header-logo p,
  .header-nav li a,
  .header-nav .el-dropdown,
  .header-nav .el-dropdown-item {
    color: #fff;
  }

  .createActive {
    background-color: #2a9152 !important;
  }
}
</style>
<style lang="scss">
.header .el-icon-arrow-down {
  line-height: 4.5vw !important;
}

.el-dropdown-link {

  font-size: 1.2vw;
}




.header-msg .el-form-item__label {
  background-color: #fff;
  border-radius: 3vw;
  box-shadow: 0px 3px 4px 1px rgba(77, 67, 69, 0.54);
  font-size: .96vw;

  height: 2.6vw;
  line-height: 2.6vw;
  padding-right: 0;
  text-align: center;
}

.header-msg .el-input__inner {
  box-sizing: border-box;
  margin-left: 1vw;
  background-color: #fff;
  border-radius: 3vw;
  font-size: .96vw;
  height: 2.6vw;
  line-height: 2.6vw;
}

.header-msg .el-cascader {
  line-height: 2.6vw;
}

.header-msg .el-input__icon {
  line-height: 2.6vw;
}

.header-msg .el-form-item__content {
  line-height: 2.6vw;
}

.header-msg .el-form-item__content::before {
  content: "";
  z-index: -9;
  position: absolute;
  top: .9vw;
  height: 1vw;
  width: 2vw;
  background-color: #1d2088;
}

.header-msg .el-row {
  display: flex;
  justify-content: space-between;

}

.header-msg .el-form-item {
  flex: 1;
  margin-bottom: 1.43vw;
  height: 2.6vw;
}

.header-msg .el-col {
  display: flex;
  align-items: center;
}
</style>
<style >
.active-uploader .el-upload {
  margin-left: 2vw;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #fff;
}

.active-img [class*=" el-icon-"],
[class^=el-icon-] {
  line-height: 6.4vw !important;
}

.active-uploader .el-upload:hover {
  border-color: #409EFF;
}

.active-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 6.4vw;
  height: 6.4vw;
  line-height: 6.4vw;
  text-align: center;
}

.el-upload--text {
  width: 6.4vw;
  height: 6.4vw;
}
</style>