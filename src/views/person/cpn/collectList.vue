<template>
  <div class="child-contianer">
    <div class="card" :class="{ filter: isVisibility }">
      <div class="card-title">活动收藏</div>
      <div class="card-content">
        <div class="card-content-l">
          <img src="@/assets/img/person/资源45@2x.png" alt="">
        </div>
        <ul class="card-content-r">
          <div class="tip" v-if="collectActiveList.length === 0">暂未收藏活动</div>
          <collectActivityList v-else :collectActiveList="collectActiveList"></collectActivityList>
        </ul>
      </div>
      <div class="btn">
        <el-button type="warning" @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
    <transition name="slideDown">
      <msg-box :isVisibility="isVisibility" @closeMsgBox="closeMsgBox" :activeInfo="activeInfo">

      </msg-box>
    </transition>
  </div>
</template>

<script>
import msgBox from '@/components/msgBox/msgBox';

import { getcollectActiveList } from "@/service/actives";
import collectActivityList from "./collectActivityList.vue";
export default {
  name: "collectList",
  components: { collectActivityList, msgBox },
  async mounted() {
    this.$bus.$on("openMsgBox", this.openMsgBox);
    this.$bus.$on("updateData", this.getCollectActiveListDate)

    this.getCollectActiveListDate()
  },
  data() {
    return {
      collectActiveList: [],
      isVisibility: false,
      activeInfo: "",
    };
  },

  methods: {
    async getCollectActiveListDate() {
      await getcollectActiveList()
        .then((res) => {
          if (res.status === 405 || res.status === 404) {
            this.$message.error(res.message);
            localStorage.removeItem("TOKEN");
            this.$store.dispatch("checkToken");
            setTimeout(() => {
              this.$router.push("/login");
            }, 3000);
          } else {
            this.collectActiveList = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openMsgBox(active) {
      this.isVisibility = true
      this.activeInfo = active
      console.log(this.isVisibility);
    },
    closeMsgBox() {
      this.isVisibility = false;
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
  background-color: #fddc73;

  border-radius: 12vw 12vw 0 0;


  &-title {
    position: absolute;
    top: 2vw;
    left: 50%;
    transform: translate(-50%);
    width: 13vw;
    height: 3vw;
    background-color: #fdedb8;


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
    top: 7vw;
    left: 50%;
    transform: translate(-50%);

    &-r {
      width: 60vw;
      height: 70vh;
      overflow: auto;
    }

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
</style>
<style>
.el-tag {
  margin-right: 5px;
}
</style>