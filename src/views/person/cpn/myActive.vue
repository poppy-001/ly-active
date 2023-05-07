<template>
  <div class="child-contianer">
    <div class="card" :class="{ filter: isVisibility || isUpdaVisibility }">
      <div class="card-title">我的发布</div>
      <div class="card-content">
        <div class="tip" v-if="myActiveList.length === 0">暂未发布活动</div>
        <myActivesList v-else :myActiveList="myActiveList" class="myActiveList"></myActivesList>
      </div>
      <div class="btn">
        <el-button type="success" @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
    <transition name="slideDown">
      <msg-box :isVisibility="isVisibility" @closeMsgBox="closeMsgBox" :activeInfo="activeInfo">
      </msg-box>
    </transition>

    <transition name="slideDown">
      <msg-box :isVisibility="isUpdaVisibility" @closeMsgBox="closeUMsgBox" class="my-msg" ref="myMsg" :rules="rules"
        :class="{ fit: flag }">
        <div class="my-msg-title">我的发布</div>
        <div class="my-msg-content">
          <el-form :model="editActiveInfo" ref="editActiveForm" label-width="7.2vw" class="editActiveForm"
            label-suffix="：">
            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label="活动名称" prop="activity_title">
                  <el-input v-model="editActiveInfo.activity_title" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开始时间" prop="activity_starttime">
                  <el-input v-model="editActiveInfo.activity_starttime"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label="活动地址" prop="activity_address">
                  <el-cascader v-model="editActiveInfo.activity_address" :options="addressOptions" filterable clearable>
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="详细地址" prop="activity_detailAddress">
                  <el-input v-model="editActiveInfo.activity_detailAddress" clearable placeholder="明理2-105"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label="活动范围" prop="activity_type">
                  <el-select v-model="editActiveInfo.activity_type" placeholder="更好地推荐给感兴趣的同学">
                    <el-option v-for="(type, index) in typeOptions" :key="index" :label="type.label"
                      :value="type.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="活动类型" prop="feature">
                  <el-select v-model="editActiveInfo.feature" placeholder="更好地推荐给感兴趣的同学">
                    <el-option v-for="feature in featureOptions" :key="feature.value" :label="feature.label"
                      :value="feature.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="活动宣传" prop="activity_desc">
              <el-input v-model="editActiveInfo.activity_desc" placeholder="快来参加吧" type="text"></el-input>
            </el-form-item>
            <el-form-item label="报名方式" prop="signUp">
              <el-input v-model="editActiveInfo.signUp" placeholder="联系方式 格式：qq:xxxxxxx" type="text"></el-input>
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
  </div>
</template>

<script>
import msgBox from '@/components/msgBox/msgBox';

// import { getMyActiveList } from "@/service/actives";
import { getMyActiveList, updateActiveApi } from "@/service/actives";
import myActivesList from "./myActivesList.vue";
export default {
  name: "myActive",
  components: { myActivesList, msgBox },
  async mounted() {
    this.$bus.$on("updateData", this.getMyActiveListDate)
    this.$bus.$on("openMsgBox", this.openMsgBox);
    this.$bus.$on("updateActiveAction", this.openUpdateMsgBox);
    this.getMyActiveListDate()
  },
  data() {
    return {
      myActiveList: [],
      isVisibility: false,
      isUpdaVisibility: false,
      activeInfo: "",
      activeAddress: "",
      editActiveInfo: {},
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
      imageUrl: '',
      flag: false,//样式
      file: "",
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
      originInfo: ""
    };
  },
  watch: {
    activeInfo() {
      this.activeAddress = this.activeInfo.activity_address.join("-")
    }

  },
  methods: {
    async getMyActiveListDate() {
      await getMyActiveList()
        .then((res) => {
          if (res.status === 405 || res.status === 404) {
            this.$message.error(res.message);
            localStorage.removeItem("TOKEN");
            this.$store.dispatch("checkToken");
            setTimeout(() => {
              this.$router.push("/login");
            }, 3000);
          } else {
            this.myActiveList = res.data;
            console.log("this.myActiveList----------", this.myActiveList);
            this.$forceUpdate()
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openMsgBox(active) {
      this.isVisibility = true
      this.activeInfo = active
    },
    closeMsgBox() {
      this.isVisibility = false;
    },
    openUpdateMsgBox(activeInfo) {
      this.isUpdaVisibility = true
      this.originInfo = JSON.parse(JSON.stringify(activeInfo))
      this.editActiveInfo = JSON.parse(JSON.stringify(activeInfo))
      this.imageUrl = activeInfo.activity_img
    },
    closeUMsgBox() {
      this.isUpdaVisibility = false
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
      this.editActiveInfo.activity_img = file
      console.log(this.editActiveInfo.activity_img)
      if (fileList.length > 0) {
        console.log(this.$refs.myMsg);
        this.$refs.editActiveForm.clearValidate("activity_img") // 去掉file验证
      }

    },

    resetForm() {
      this.closeUMsgBox()
    },
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
    onSubmit() {
      if (this.equals(this.originInfo, this.editActiveInfo)) {
        this.isUpdaVisibility = false
        return
      }
      this.$refs.editActiveForm.validate(async (valid) => {
        if (valid) {
          var form = new FormData()
          console.log("this.file", this.file);
          if (this.file !== "") {
            const fileName = encodeURIComponent(this.file.name)
            form.append("file", this.file, fileName)
          }
          form.append("active", JSON.stringify(this.editActiveInfo))
          console.log("-----------");
          console.log(form);

          const res = await updateActiveApi(this.editActiveInfo._id, form)
          console.log(res);
          if (res.status === 201) {
            this.$message.success('更新活动成功');
            this.getMyActiveListDate()
            this.resetForm()
            this.file = ""
            this.$bus.$emit("updateActive")
          } else {
            this.$message.error(res.message);
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    uploadImg(param) {
      this.file = param.file
    },
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
  background-color: #0cdac6;

  border-radius: 12vw 12vw 0 0;


  &-title {
    position: absolute;
    top: 2vw;
    left: 50%;
    transform: translate(-50%);
    width: 13vw;
    height: 3vw;
    background-color: #84ece3;


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
    bottom: 3.8vw;
    left: 50%;
    transform: translate(-50%);

    // width: 75vw;
    // height: 70vh;
    // overflow: auto;

    .tip {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.5vw;
    }

  }

  .btn {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4vw;
    background-color: #fff;

    .el-button {
      position: absolute;
      top: 50%;
      right: 3vw;
      transform: translate(0, -50%);
      width: 5vw;
      height: 3vw;
      padding: 0;
    }

  }
}


.my-msg {

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
</style>
<style>
.el-tag {
  margin-right: 5px;
}

.my-msg .el-form-item__label {
  background-color: #fff;
  border-radius: 3vw;
  box-shadow: 0px 3px 4px 1px rgba(77, 67, 69, 0.54);
  font-size: .96vw;

  height: 2.6vw;
  line-height: 2.6vw;
  padding-right: 0;
  text-align: center;
}

.my-msg .el-input__inner {
  box-sizing: border-box;
  margin-left: 1vw;
  background-color: #fff;
  border-radius: 3vw;
  font-size: .96vw;
  height: 2.6vw;
  line-height: 2.6vw;
}

.my-msg .el-cascader {
  line-height: 2.6vw;
}

.my-msg .el-input__icon {
  line-height: 2.6vw;
}

.my-msg .el-form-item__content {
  line-height: 2.6vw;
}

.my-msg .el-form-item__content::before {
  content: "";
  z-index: -9;
  position: absolute;
  top: .9vw;
  height: 1vw;
  width: 2vw;
  background-color: #1d2088;
}

.my-msg .el-row {
  display: flex;
  justify-content: space-between;

}

.my-msg .el-form-item {
  flex: 1;
  margin-bottom: 1.43vw;
  height: 2.6vw;
}

.my-msg .el-col {
  display: flex;
  align-items: center;
}
</style>
