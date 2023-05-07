<template>
  <div class="card">
    <div class="card-title">个人信息</div>
    <div class="card-content">
      <div class="avater" v-if="!isEdit">
        <img src="@/assets/img/person/person.png" class="avater-img">
      </div>
      <div class="info" ref="info" :class="{ fullWid: isEdit }">
        <div class="detailInfo">

          <el-form v-if="isEdit" :model="userInfoForm" :rules="rules" ref="userInfoForm" label-width="7.2vw"
            class="userInfoForm" label-suffix="：">
            <el-row class="editInfo ">
              <el-col class="editInfo-l" :span="6" ref="editInfo_l">
                <el-form-item prop="avater" class="active-img">
                  <div @mouseenter="triggerHover(true)" @mouseleave="triggerHover(false)">
                    <el-upload class="active-uploader" action="" :before-upload="beforeActiveUpload"
                      :show-file-list="false" :http-request="uploadImg" accept="image/png,image/jpg,image/jpeg"
                      :on-change="imgChange">
                      <div v-if="isHover && imageUrl !== ''" class="mask">+</div>
                      <img v-if="imageUrl" :src="imageUrl" class="active-pic">
                      <i v-else class="el-icon-plus active-uploader-icon"></i>
                    </el-upload>
                  </div>
                </el-form-item>
              </el-col>
              <el-col class="editInfo-r" :span="17">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="昵称" prop="username">
                      <el-input v-model="userInfoForm.username" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="学号" prop="stu_num">
                      <el-input v-model="userInfoForm.stu_num" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="性别" prop="gender">
                      <el-select v-model="userInfoForm.gender" clearable>
                        <el-option label="保密" :value="0"></el-option>
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="手机" prop="mobile">
                      <el-button v-model="userInfoForm.mobile" type="text" class="info-mobile" @click="bindMobile">{{
                        userInfo.mobile ? pwdMobile : "暂未绑定，去绑定"
                      }}</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item label="年级" prop="grade">
                  <el-radio-group v-model="userInfoForm.grade" clearable>
                    <el-radio label="大一" value></el-radio>
                    <el-radio label="大二"></el-radio>
                    <el-radio label="大三"></el-radio>
                    <el-radio label="大四"></el-radio>
                    <el-radio label="研究生"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="学院" prop="college">
                      <el-select v-model="userInfoForm.college" filterable clearable>
                        <el-option v-for="(college, index) in collegeOptions" :key="index" :label="college.label"
                          :value="college.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="专业" prop="major">
                      <el-input v-model="userInfoForm.major" clearable>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="年龄" prop="age">
                      <el-input v-model="userInfoForm.age" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="城市" prop="city">
                      <el-input v-model="userInfoForm.city" clearable>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
          <div v-else class="showInfo" ref="showInfo">
            <div class="user-img">
              <img :src="userInfo.user_pic" alt="用户头像">
            </div>
            <div class="showInfo-bottom">
              <el-row v-if="userInfo.username">
                <el-col :span="6">昵称：</el-col>
                <el-col :span="16" class="detail">{{ userInfo.username }}</el-col>
              </el-row>
              <el-row v-if="userInfo.stu_num">
                <el-col :span="6">学号：</el-col>
                <el-col :span="16" class="detail">{{ userInfo.stu_num }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6">性别：</el-col>
                <el-col :span="16" class="detail" v-if="userInfo.gender === 0">保密</el-col>
                <el-col :span="15" class="detail" v-if="userInfo.gender === 1">男</el-col>
                <el-col :span="15" class="detail" v-if="userInfo.gender === 2">女</el-col>
              </el-row>
              <el-row>
                <el-col :span="6">手机号：</el-col>
                <el-col :span="16" class="detail">{{ userInfo.mobile ? pwdMobile : "暂未绑定，去绑定" }}</el-col>
              </el-row>
              <el-row v-if="userInfo.age">
                <el-col :span="6">年龄：</el-col>
                <el-col :span="16" class="detail">{{ userInfo.age }}</el-col>
              </el-row>
              <el-row v-if="userInfo.grade">
                <el-col :span="6">年级：</el-col>
                <el-col :span="16" class="detail">{{ userInfo.grade }}</el-col>
              </el-row>
              <el-row v-if="userInfo.college">
                <el-col :span="6">学院：</el-col>
                <el-col :span="16" class="detail">{{ userInfo.college }}</el-col>
              </el-row>
              <el-row v-if="userInfo.major">
                <el-col :span="6">专业：</el-col>
                <el-col :span="16" class="detail">{{ userInfo.major }}</el-col>
              </el-row>
              <el-row v-if="userInfo.city">
                <el-col :span="6">城市：</el-col>
                <el-col :span="16" class="detail">{{ userInfo.city }}</el-col>
              </el-row>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn">
      <div>
        <el-button v-if="!isEdit" type="primary" @click="editInfo">编辑</el-button>
        <el-button v-else type="primary" @click="updateInfo">保存</el-button>
        <el-button type="primary" @click="$router.go(-1)">返回</el-button>
      </div>
    </div>

    <transition name="slideDown">
      <msg-box :isVisibility="isVisibility" @closeMsgBox="closeMsgBox" class="msg">
        <div v-if="!userInfo.mobile">
          <el-steps space="30%" align-center :active="active" finish-status="success">
            <el-step title="绑定新手机号"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
          <div v-if="active == 0" class="pannel pannel-02">
            <el-row>
              <el-col :span="6"><label for="mobile">新手机号：</label></el-col>
              <el-col :span="18"><el-input type="text" placeholder="请输入要绑定的手机号码" id="mobile"
                  v-model="newMobile"></el-input></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><label for="code">验证码：</label></el-col>
              <el-col :span="12"><el-input type="text" placeholder="请输入验证码" id="code"
                  v-model="newCode"></el-input></el-col>
              <el-col :span="6" class="code-btn"><el-button ref="sentCode" class="sentCode"
                  @click="sentCode(newMobile)">点击发送</el-button></el-col>
            </el-row>
          </div>
          <div v-if="active == 1" class="pannel pannel-03">
            <el-row>
              修改成功，请去登录吧！
            </el-row>
          </div>
          <el-button v-if="active == 1" style="margin-top: 12px;" @click="closeMsgBox(true)" class="next"
            type="warning">完成</el-button>
          <el-button v-else style="margin-top: 12px;" @click="next" class="next" type="warning">下一步</el-button>
        </div>
        <div v-else>
          <el-steps space="30%" align-center :active="active" finish-status="success">
            <el-step title="现手机号验证"></el-step>
            <el-step title="绑定新手机号"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
          <div v-if="active == 0" class="pannel pannel-01">
            <el-row>
              <el-col :span="6"><label for="mobile">手机号：</label></el-col>
              <el-col :span="18"><el-input type="text" placeholder="请输入绑定的手机号码" id="mobile"
                  :value="pwdMobile"></el-input></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><label for="code">验证码：</label></el-col>
              <el-col :span="12"><el-input type="text" placeholder="请输入验证码" id="code" v-model="code"></el-input></el-col>
              <el-col :span="6" class="code-btn"><el-button ref="sentCode" class="sentCode"
                  @click="sentCode(mobile)">点击发送</el-button></el-col>
            </el-row>
          </div>
          <div v-if="active == 1" class="pannel pannel-02">
            <el-row>
              <el-col :span="6"><label for="mobile">新手机号：</label></el-col>
              <el-col :span="18"><el-input type="text" placeholder="请输入要绑定的手机号码" id="mobile"
                  v-model="newMobile"></el-input></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><label for="code">验证码：</label></el-col>
              <el-col :span="12"><el-input type="text" placeholder="请输入验证码" id="code"
                  v-model="newCode"></el-input></el-col>
              <el-col :span="6" class="code-btn"><el-button ref="sentCode" class="sentCode"
                  @click="sentCode(newMobile)">点击发送</el-button></el-col>
            </el-row>
          </div>
          <div v-if="active == 2" class="pannel pannel-03">
            <el-row>
              修改成功，请去登录吧！
            </el-row>
          </div>
          <el-button v-if="active == 2" style="margin-top: 12px;" @click="closeMsgBox" class="next"
            type="warning">完成</el-button>
          <el-button v-else style="margin-top: 12px;" @click="next" class="next" type="warning">下一步</el-button>
        </div>
      </msg-box>
    </transition>
  </div>
</template>

<script>
import { sendCodeApi, compareCodeApi } from "@/service/code";
import { getUserInfo, updataUserInfo, bindMobileApi } from "@/service/user";
import msgBox from '@/components/msgBox/msgBox.vue';
export default {
  name: "personInfo",
  components: { msgBox },
  mounted() {
    this.getUserDate()
  },
  data() {
    return {
      userInfo: "",
      userInfoForm: {},
      rules: {
        username: [
          { required: false, trigger: "blur" },
        ],
        stu_num: [
          { required: false, trigger: "blur" },
        ],
        gender: [
          { required: false, trigger: "change" },
        ],
        avater: [
          { required: false, trigger: "change" },
        ],
        grade: [
          { required: false, trigger: "blur" },
        ],
        age: [
          { required: false, trigger: "blur" },
        ],
        city: [
          { required: false, trigger: "change" },
        ],
        college: [
          { required: false, trigger: "change" },
        ],
        major: [
          { required: false, trigger: "change" },
        ],
        mobile: [
          { required: false, trigger: "change" },
        ]
      },
      isEdit: false,
      collegeOptions: [
        { lable: "设计艺术学院", value: "设计艺术学院" },
        { lable: "机械与汽车工程学院", value: "机械与汽车工程学院" },
        { lable: "材料科学与工程学院", value: "材料科学与工程学院" },
        { lable: "电气工程与自动化学院", value: "电气工程与自动化学院" },
        { lable: "光电与通信工程学院", value: "光电与通信工程学院" },
        { lable: "计算机与信息工程学院", value: "计算机与信息工程学院" },
        { lable: "土木工程与建筑学院", value: "土木工程与建筑学院" },
        { lable: "环境科学与工程学院", value: "环境科学与工程学院" },
        { lable: "软件工程学院", value: "软件工程学院" },
        { lable: "文化产业与旅游学院", value: "文化产业与旅游学院" },
        { lable: "影视与传播学院", value: "影视与传播学院" },
        { lable: "数学与统计学院", value: "数学与统计学院" },
        { lable: "外国语学院", value: "外国语学院" },
        { lable: "马克思主义学院", value: "马克思主义学院" },
        { lable: "体育部", value: "体育部" },
        { lable: "继续教育学院", value: "继续教育学院" },
        { lable: "国际教育学院", value: "国际教育学院" },
        { lable: "经济与管理学院", value: "经济与管理学院" },
      ],
      imageUrl: "",
      isHover: false,
      originHeight: "",
      originUserInfo: "",
      //msg
      isVisibility: false,  //msg
      active: 0,  //第几步
      mobile: "",  //现手机号
      flag: true,  //防抖
      code: "",  //验证码
      newMobile: "", //新手机号
      newCode: "", //新手机号验证码
      hasMObile: false,
      file: ""
    };
  },
  methods: {
    //获取用户信息
    async getUserDate() {
      await getUserInfo()
        .then((res) => {
          if (res.status === 405 || res.status === 404) {
            this.$message.error(res.message);
            localStorage.removeItem("TOKEN");
            this.$store.dispatch("checkToken");
            setTimeout(() => {
              this.$router.push("/login");
            }, 3000);
          } else {
            this.userInfo = res.data;
            this.userInfoForm = res.data
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error(err.message)
        });
    },
    // 编辑用户信息
    editInfo() {
      this.originUserInfo = JSON.parse(JSON.stringify(this.userInfo))
      this.isEdit = true
    },
    // 判断两个对象是否相等
    equals(x, y) {
      var f1 = x instanceof Object;
      var f2 = y instanceof Object;
      if (!f1 || !f2) {
        return x === y
      }
      if (Object.keys(x).length !== Object.keys(y).length) {
        return false
      }
      for (var p in x) {
        var a = x[p] instanceof Object;
        var b = y[p] instanceof Object;
        if (a && b) {
          this.equals(x[p], y[p])
        } else if (x[p] != y[p]) {
          return false;
        }
      }
      return true;
    },
    // 更新用户信息
    async updateInfo() {
      if (this.equals(this.originUserInfo, this.userInfoForm)) {
        this.isEdit = false
        return
      }
      var form = new FormData()
      if (this.file) {
        const fileName = encodeURIComponent(this.file.name)
        form.append("file", this.file, fileName)
      }
      form.append("userInfo", JSON.stringify(this.userInfoForm))
      console.log(form);

      await updataUserInfo(form).then((res) => {
        if (res.status === 201) {

          if (this.userInfoForm.username !== this.originUserInfo.username || this.userInfoForm.stu_num !== this.originUserInfo.stu_num) {
            //退出登录
            localStorage.removeItem("TOKEN")
            this.$message.success(`更新用户信息成功，\n请使用新的用户名或学号重新登录`)
            this.$store.dispatch("checkToken")
            let req = /^\/person/
            if (req.test(this.$route.path)) {
              setTimeout(() => {
                this.$router.push("/login")
              }, 3000);
            }

          } else {
            this.$message.success("更新用户信息成功")
            this.getUserDate()
            this.file = ""
            this.$bus.$emit("updateHead")
            setTimeout(() => {
              this.isEdit = false
            }, 500);
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    triggerHover(flag) {
      this.isHover = flag
    },
    beforeActiveUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      if (!isJPG) {
        this.handleFileError(new Error('只能上传jpg或png格式的图片哦'), file, []);
        return false;
      }

      return isJPG;
    },
    imgChange(file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(file)
      this.userInfoForm.user_pic = file
      console.log(this.userInfoForm.user_pic)
    },
    uploadImg(param) {
      this.file = param.file
    },
    closeMsgBox(flag) {
      if (flag) {
        this.hasMObile = false
        this.getUserDate()
      }
      this.isVisibility = false;
      this.active = 0
      this.newCode = ""
      this.newMobile = ""
    },
    // 绑定手机号
    bindMobile() {
      if (this.userInfo.mobile) {
        this.$confirm(`
        当前绑定的手机号码为
        ${this.pwdMobile}
        `, '更换绑定的手机号?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isVisibility = true
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消换绑手机号'
          });
        });
      } else {
        this.isVisibility = true
      }

    },
    // 下一步
    async next() {
      if (this.hasMObile) {
        if (this.active == 0) {
          console.log("this.code", this.code);
          if (this.code == "") return this.$message.error("请输入验证码")
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
        } else if (this.active == 1) {
          console.log(123);
          if (this.newMobile == "") {
            console.log(23);
            this.$message.error("请输入手机号")
            return
          } else {
            console.log(456);
            const req = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
            if (!req.test(this.newMobile)) {
              this.$message.error("请输入正确的手机号")
              return
            }

            await compareCodeApi(
              {
                mobile: this.newMobile,
                code: this.newCode
              }
            ).then(async (res) => {
              if (res.status === 200) {
                //绑定手机号
                await bindMobileApi({ mobile: this.newMobile }).then((res) => {
                  if (res.status === 201) {
                    this.$message.success(res.message)
                    this.active++;
                  } else {
                    this.$message.error(res.message)
                  }
                })

              } else {
                this.$message.error("验证码错误")
                return
              }
            })
          }
        } else {
          return
        }
      } else {
        if (this.active == 0) {
          if (this.newMobile == "") {
            this.$message.error("请输入手机号")
            return
          } else {
            const req = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
            if (!req.test(this.newMobile)) {
              this.$message.error("请输入正确的手机号")
              return
            }

            await compareCodeApi(
              {
                mobile: this.newMobile,
                code: this.newCode
              }
            ).then(async (res) => {
              if (res.status === 200) {
                //绑定手机号
                await bindMobileApi({ mobile: this.newMobile }).then((res) => {
                  if (res.status === 201) {
                    this.$message.success(res.message)
                    this.active++;
                  } else {
                    this.$message.error(res.message)
                  }
                })

              } else {
                this.$message.error("验证码错误")
                return
              }
            })
          }
        }

        if (this.active == 1) return
      }
    },
    // 发送验证码
    async sentCode(mobile) {
      if (this.flag) {
        this.flag = false

        // 发送验证码
        const req = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if (req.test(mobile)) {
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

          await sendCodeApi({ mobile: mobile }).then((res) => {
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

    }
  },
  watch: {
    isEdit: {
      immediate: true,
      handler() {
        this.$nextTick(() => {

          if (this.isEdit) {
            const userInfoForm = this.$refs.userInfoForm.$el; // 获取子元素
            const info = this.$refs.info; // 获取父元素
            this.originHeight = info.offsetHeight
            const editInfo_l = this.$refs.editInfo_l.$el
            let height = userInfoForm.offsetHeight + 50
            info.style.height = `${height}px`; // 将子元素高度赋值给父元素
            editInfo_l.style.height = `${height - 50}px`
          } else {
            setTimeout(() => {
              const showInfo = this.$refs.showInfo; // 获取子元素
              console.dir(showInfo);
              console.log("showInfo.offsetHeight", showInfo.offsetHeight);
              this.originHeight = showInfo.offsetHeight + 50
              this.$refs.info.style.height = `${this.originHeight}px`;
            }, 50);

          }
        })
      }
    },
    userInfo: {
      handler() {
        this.mobile = this.userInfo.mobile
        console.log(this.mobile != "" && this.mobile != undefined);
        if (this.mobile != "" && this.mobile != undefined) {
          console.log(123);
          this.hasMObile = true
        }
        if (this.userInfo.user_pic) {
          this.imageUrl = this.userInfo.user_pic
        }
      }
    }
  },
  computed: {
    pwdMobile() {
      return this.mobile.toString().slice(0, 3) + '****'
        + this.mobile.toString().slice(-4)
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  z-index: 999;
  position: absolute;
  // top: 66px;
  top: 4.5vw;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #79d8ea;


  border-radius: 12vw 12vw 0 0;


  &-title {
    position: absolute;
    top: 2vw;
    left: 50%;
    transform: translate(-50%);
    width: 13vw;
    height: 3vw;
    background-color: #bbebf4;


    text-align: center;
    line-height: 3vw;
    font-size: 1.5vw;
    font-family: KaiTi;

    box-shadow: 0px 6px 3px 2px rgba(77, 67, 69, 0.31);
    border-radius: 5px;

  }

  &-content {
    display: flex;
    position: absolute;
    top: 5vw;
    width: 100%;
    height: calc(100% - 9vw);

    .avater {
      z-index: 99;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 50%;
      left: 10vw;
      transform: translate(0, -50%);
      width: 22vw;
      height: 22vw;
      margin-right: 50px;

      background-color: #79d8ea;
      box-shadow: 0px 7px 4px 1px rgba(77, 67, 69, 0.33);
      border-radius: 30px;


      &-img {
        width: 60%;
      }
    }

    .info {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      width: 80%;
      min-height: 18.5vw;
      padding: 2vw;
      background-color: #bbebf4;
      box-shadow: 0px 6px 3px 2px rgba(77, 67, 69, 0.31);

      .detailInfo {
        position: absolute;
        top: 50%;
        left: 35vw;
        transform: translate(0, -50%);
        width: calc(100% - 37vw);

        .userInfoForm {
          width: 100%;
          position: relative;



        }

        .showInfo {
          .user-img {
            width: 6.5vw;
            height: 6.5vw;
            margin: 0 auto;
            margin-bottom: 1vw;

            text-align: center;
            line-height: 6.5vw;
            border: 5px solid #fff;
            border-radius: 50%;
            box-shadow: 1px 5px 5px 1px rgba(77, 67, 69, 0.31);

            img {
              display: block;
              width: 6.5vw;
              height: 6.5vw;
              border-radius: 50%;
            }

          }

          .showInfo-bottom {
            display: flex;
            flex-wrap: wrap;
          }

          .el-row {
            width: 50%;
            display: flex;
            align-items: center;
            margin-bottom: 1vw;

            &:nth-last-child(-n+2) {
              margin-bottom: 0;
            }
          }

          .detail {
            padding: 5px 15px;
            background-color: #79d8ea;
            border-radius: 15px;
          }


        }
      }




    }

    .fullWid {
      box-sizing: border-box;
      height: 24vw;
      width: 80%;
      padding: 2vw;

      .detailInfo {
        width: 100%;
        left: 0;

        .editInfo {
          &-l {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
              width: 6.4vw;
              height: 6.4vw;
            }

            .mask {
              position: absolute;
              width: 6.4vw;
              height: 6.4vw;
              text-align: center;
              line-height: 6.4vw;
              font-size: 30px;
              color: #fff;
              background-color: rgba(0, 0, 0);
              opacity: .5;
            }


          }

          &-r {
            .el-row:last-child .el-form-item {
              margin-bottom: 0;
            }

            .info-mobile {
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
      }
    }
  }



  .btn {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4vw;
    background-color: #fff;

    div {
      position: absolute;
      top: 50%;
      right: 3vw;
      transform: translate(0, -50%);
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
<style>
.editInfo .el-select {
  width: 100%;
}

.editInfo .el-upload--text {
  width: 6.4vw;
  height: 6.4vw;
}
</style>