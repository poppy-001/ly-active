<template>
  <div v-if="isVisib" class="msgBox" ref="Msg">
    <div class="close" @click="close">X</div>
    <slot>
      <div v-if="activeInfo" class="msg-content">
        <div class="msg-l">
          <div class="msg-l-img">
            <img :src="activeInfo.activity_img" alt="活动图片">
          </div>
        </div>
        <div class="msg-r">
          <div class="msg-r-title">{{ activeInfo.activity_title }}</div>
          <div class="msg-r-type" v-if="activeInfo.activity_type || activeInfo.activity_type == 0">
            <el-tag type="warning" v-if="activeInfo.activity_type === 0">个人</el-tag>
            <el-tag type="warning" v-if="activeInfo.activity_type === 1">学院</el-tag>
            <el-tag type="warning" v-if="activeInfo.activity_type === 2">社团</el-tag>
            <el-tag type="warning" v-if="activeInfo.activity_type === 3">校园</el-tag>
            <el-tag type="warning" v-if="activeInfo.feature">{{ activeInfo.feature }}</el-tag>
          </div>
          <div class="msg-r-desc">
            <div>{{ activeInfo.activity_desc }}</div>
          </div>
          <div class="msg-r-bottom">
            <div class="msg-r-address">地点：{{ activeAddress }} {{ activeInfo.activity_detailAddress }}</div>
            <div class="msg-r-time">时间：{{ activeInfo.activity_starttime }}</div>
            <div class="msg-r-signUp">报名(咨询)方式：
              <el-tag v-if="signUp" type="success" size="small">{{ signUp }}</el-tag>
              <el-tag class="signUpDetail" size="small" v-if="signUpDetail" type="success" @click="copySignUp">{{
                signUpDetail }}</el-tag>
            </div>
          </div>
          <div class="msg-r-btn">
            <i v-if="username === activeInfo.activity_publisher_username && $route.path === '/person/myActive'"
              class="iconfont icon-bianji" @click="updateActiveAction(activeInfo._id)">
            </i>
            <i v-if="username === activeInfo.activity_publisher_username || username === 'admin'"
              class="iconfont icon-shanchu" @click="delActiveAction(activeInfo._id)">
            </i>
            <el-button v-if="!isCollect" class="collectBtn" type="warning" size="small"
              @click="collectActi(activeInfo._id)">收藏</el-button>
            <el-button v-else class="collectBtn" type="success" size="small"
              @click="collectActi(activeInfo._id)">已收藏</el-button>

          </div>
        </div>
      </div>


    </slot>
  </div>
</template>

<script>
import { collectActive, delActive } from "@/service/actives"
import { getUserInfo } from "@/service/user";

export default {
  name: "msgBox",
  props: ["isVisibility", "activeInfo"],
  data() {
    return {
      isVisib: "",
      activeAddress: "",
      isCollect: false,
      signUp: "",
      signUpDetail: "",
      username: "",
    };
  },
  mounted() {
    this.$bus.$on("openA", this.open)
    this.isVisib = JSON.parse(JSON.stringify(this.isVisibility));
  },
  watch: {
    isVisibility() {
      this.isVisib = this.isVisibility;
    },
    activeInfo: {
      immediate: true,
      async handler() {
        if (this.isVisib) {

          if (localStorage.getItem("TOKEN")) {
            await getUserInfo().then((res) => {
              if (res.status === 200) {
                this.username = res.data.username
              }
            }, (err) => {
              this.$message.error(err)
            })
          }

          this.activeAddress = this.activeInfo.activity_address.join("-")
          if (this.activeInfo.collect_userList.indexOf(this.username) !== -1) {
            this.isCollect = true
          } else {
            this.isCollect = false
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
        }
      }

    },


  },
  methods: {
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
    updateActiveAction() {
      this.close()
      this.$bus.$emit("updateActiveAction", this.activeInfo)
    },
    close() {
      this.isVisib = false;
      this.$emit("closeMsgBox", false);
    },
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
            this.close()
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
  },
};
</script>

<style lang="scss" scoped>
.msgBox {
  box-sizing: border-box;
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 57.6vw;
  min-width: 43vw;
  height: 36.8vw;
  background: url(@/assets/img/msgbox/组4.png) no-repeat;
  background-size: 100% 100%;

  transform: translate(-50%, -50%);

  .close {
    z-index: 999;
    position: absolute;
    right: 3.9vw;
    top: 2.8vw;
    width: 2.5vw;
    height: 2.5vw;

    text-align: center;
    line-height: 2.5vw;
    font-size: 3.9vw;
    color: #fff;
    transform: rotate(-10deg);
    cursor: pointer;
  }



  .msg-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4vw;

    .msg-l {
      position: relative;
      width: 25%;
      height: 20vw;

      &-img {
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;


        img {
          box-sizing: border-box;
          position: absolute;
          bottom: 0;
          width: 100%;
          min-height: 40%;
          border: 10px solid #fbdf9d;

        }
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


      &-bottom {
        position: absolute;
        bottom: 4vw;
        font-size: 1.1vw;
      }
    }

    .msg-r {
      width: 70%;
      height: 85%;

      &-title {
        margin-bottom: 1vw;
        font-size: 2vw;
        text-align: center;
      }

      &-desc {
        box-sizing: border-box;
        height: 14vw;
        margin-bottom: 1vw;
        padding: 1vw;
        background-color: rgba($color: #fef6e4, $alpha: .5);
        border-radius: 10px;

        div {
          height: 12vw;
          font-size: 1vw;
          text-indent: 2em;
          line-height: 1.5;
          overflow: auto;
        }
      }

      &-type {
        text-align: right;
        margin-bottom: 1vw;
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


      &-bottom {
        position: absolute;
        bottom: 4vw;
        font-size: 1.1vw;
      }

      &-btn {
        position: absolute;
        bottom: 4vw;
        right: 7vw;

        .collectBtn {
          width: 6vw;
          font-size: 1.1vw;
        }

        i {
          margin-right: 10px;
          font-size: 1.3vw;
          color: #666;
          vertical-align: middle;
          cursor: pointer;

          &.icon-bianji {
            margin-right: 2px;
            font-size: 2vw;
          }
        }
      }
    }




  }
}
</style>
