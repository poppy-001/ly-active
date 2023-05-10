<template>
  <div v-if="activeInfo" class="activeInfo">
    <div class="info-top">
      <img class="active-img" :src="activeInfo.activity_img" alt="">
      <div class="info-top-type" v-if="activeInfo.activity_type || activeInfo.activity_type == 0">
        <el-tag type="success" v-if="activeInfo.activity_type === 0">个人</el-tag>
        <el-tag type="success" v-if="activeInfo.activity_type === 1">学院</el-tag>
        <el-tag type="success" v-if="activeInfo.activity_type === 2">社团</el-tag>
        <el-tag type="success" v-if="activeInfo.activity_type === 3">校园</el-tag>
        <el-tag type="success" v-if="activeInfo.feature">{{ activeInfo.feature }}</el-tag>
      </div>
    </div>
    <div class="info-center">
      <h3 class="info-center-title">{{ activeInfo.activity_title }}</h3>
      <div class="info-center-desc">
        <div>
          {{ activeInfo.activity_desc }}
        </div>
      </div>
    </div>
    <div class="info-bottom">
      <div class="info-bottom-l">
        <div class="info-bottom-l-address">地点：{{ activeAddress }} {{ activeInfo.activity_detailAddress }}</div>
        <div class="info-bottom-l-time">时间：{{ activeInfo.activity_starttime }}</div>
        <div class="info-bottom-l-signUp">报名(咨询)方式：
          <el-tag v-if="signUp" type="success" size="small">{{ signUp }}</el-tag>
          <el-tag class="signUpDetail" size="small" v-if="signUpDetail" type="success" @click="copySignUp">{{
            signUpDetail }}</el-tag>
        </div>
      </div>
      <div class="info-bottom-r">

        <button v-if="!isCollect" class="collectBtn" type="warning" size="small"
          @click="collectActi(activeInfo._id)">收藏</button>
        <button v-else class="collectBtn ok" type="success" size="small" @click="collectActi(activeInfo._id)">已收藏</button>
        <i v-if="username === activeInfo.activity_publisher_username || username === 'admin'"
          class="iconfont icon-shanchu" @click="delActiveAction(activeInfo._id)">
        </i>
      </div>
    </div>
  </div>
</template>

<script>
import { collectActive, delActive } from "@/service/actives"
import { getUserInfo } from "@/service/user";
export default {
  name: "avtiveDetail",
  props: {
    activeInfo: {
      type: Object
    },
    innerDrawer: {
      type: Boolean
    }
  },
  data() {
    return {
      activeAddress: "",
      isCollect: false,
      signUp: "",
      signUpDetail: "",
      username: ""
    }
  },
  watch: {
    activeInfo: {
      immediate: true,
      async handler() {
        if (localStorage.getItem("TOKEN")) {
          await getUserInfo().then((res) => {
            if (res.status === 200) {
              this.username = res.data.username
              console.log("res.data", res.data);
            }
          }, (err) => {
            this.$message.error(err)
          })
          this.activeAddress = this.activeInfo.activity_address.join("-")
          if (this.activeInfo.collect_userList.indexOf(this.username) !== -1) {
            this.isCollect = true
          } else {
            this.isCollect = false
          }
        }

        if (this.activeInfo.signUp.indexOf(":") !== -1) {
          this.signUp = this.activeInfo.signUp.split(":")[0]
          this.signUpDetail = this.activeInfo.signUp.split(":")[1]
        } else if (this.activeInfo.signUp.indexOf("：") !== -1) {
          this.signUp = this.activeInfo.signUp.split("：")[0]
          this.signUpDetail = this.activeInfo.signUp.split("：")[1]
        } else {
          this.signUp = ""
          this.signUpDetail = this.activeInfo.signUp
        }


        console.log(this.signUp);
        console.log(this.signUpDetail);
      }
    },

  },
  methods: {
    async collectActi(id) {
      let flag = !this.isCollect
      await collectActive(flag, { activeid: id }).then((res) => {
        if (res.status === 200) {
          this.$message.success(res.message)
          this.isCollect = !this.isCollect
          this.$bus.$emit("updateData")
        } else {
          this.$message.error(res.message)
        }
      })
    },
    delActiveAction(id) {
      this.$confirm('是否要删除这个活动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await delActive({ activeid: id }).then((res) => {
          if (res.status === 201) {
            this.$message.success(res.message)
            this.$bus.$emit("updateData")
            this.$bus.$emit("closeinner")
            if (this.isVisib) {
              this.isVisib = false
            }
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    copySignUp() {
      navigator.clipboard.writeText(this.signUpDetail)
        .then(() => {
          this.$message.success("已复制到剪切板");
        })
        .catch((error) => {
          this.$message.error("复制失败", error);
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.activeInfo {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;

  .info-top {
    position: relative;
    width: 100%;
    max-height: 30%;
    min-height: 25%;
    text-align: center;

    img {
      box-sizing: border-box;
      max-width: 100%;
      height: 80%;
      margin-bottom: 10px;
      border-radius: 10px;
      border: 8px solid #fff;
    }

    &-type {
      position: absolute;
      bottom: 0;
      right: 0;
      text-align: right;
    }
  }


  .info-center {
    height: 40%;

    &-title {
      height: 2.08vw;
      margin-block: 10px;
      border: dashed 1px #1d2088;

      text-align: center;
      line-height: 2.08vw;

      font-weight: 400;
      font-family: KaiTi;
      font-size: 1.5vw;
      background-color: #b3d465;
    }

    &-desc {
      box-sizing: border-box;
      height: calc(100% - 2.08vw - 10px);
      padding: 1vw;
      margin-bottom: 10px;
      border: dashed 1px #1d2088;
      background-color: #b3d465;


      div {
        height: calc(100%);
        font-size: 1vw;
        text-indent: 2em;
        line-height: 1.5;
        overflow: auto;
      }
    }
  }


  .info-bottom {
    display: flex;
    width: 100%;
    height: 20%;

    &-l {
      height: 100%;
      width: 90%;
      margin-top: 10px;

      >div {
        box-sizing: border-box;
        height: 2vw;
        margin-block: 12px;

        padding-left: 1vw;
        line-height: 2vw;
        font-size: .9vw;
        border: dashed 1px #1d2088;
        background-color: #b3d465;
      }

      &-address {
        margin-bottom: .5vw;
      }

      &-time {
        margin-bottom: .5vw;
      }

      &-signUp {
        display: flex;
        align-items: center;

        .signUpDetail {
          cursor: pointer;
        }
      }


    }

    &-r {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 10%;
      height: calc(6vw + 40px);
      margin-top: 10px;


      .collectBtn {
        margin-top: 10px;
        display: flex;
        width: 70%;
        border: none;
        padding: 10px 0;
        color: #fff;
        font-size: 1.1vw;
        border-radius: 23px;
        background-color: #0075a9;
        cursor: pointer;

        &:hover {
          background-color: #0d90c9;
        }

        &.ok {
          background-color: #6bb440;

          &:hover {
            background-color: #7fd14f;
          }
        }
      }

      i {
        width: 70%;
        height: 2vw;
        background-color: #0075a9;
        text-align: center;
        line-height: 2vw;
        font-size: 80%;
        color: #fff;
        border-radius: 50%;
        cursor: pointer;

        &:hover {
          background-color: #0d90c9;
        }
      }

    }
  }
}
</style>

<style>
.activeInfo .el-tag:first-child {
  margin-right: 10px;
}
</style>