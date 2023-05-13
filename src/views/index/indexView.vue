<template>
  <div class="index">
    <div class="contianer" @mousemove="hoverBuild" ref="contianer">
      <el-tooltip class="item" effect="dark" content="校外、东区、线上活动" placement="top">
        <div class="build other" @click="showBuildActive('校外、东区、线上活动')"></div>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="校外、东区、线上活动" placement="top">
        <div class="build other other2" @click="showBuildActive('校外、东区、线上活动')"></div>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="校外、东区、线上活动" placement="top">
        <div class="build other other3" @click="showBuildActive('校外、东区、线上活动')"></div>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="校外、东区、线上活动" placement="top-start">
        <div class="build other other4" @click="showBuildActive('校外、东区、线上活动')"></div>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="校外、东区、线上活动" placement="top-end">
        <div class="build other other5" @click="showBuildActive('校外、东区、线上活动')"></div>
      </el-tooltip>
      <img class="bg" src="@/assets/img/index/index-bg.jpg" ref="bg">
      <el-tooltip class="item" effect="dark" content="图书馆" placement="top">
        <img class="build tushuguan" src="@/assets/img/index/图片2/图书馆.png" @click="showBuildActive('图书馆')" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="创艺园" placement="top">
        <img class="build chuanyiyuan" src="@/assets/img/index/图片2/创艺园.png" @click="showBuildActive('创艺园')" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="教工之家" placement="top">
        <img class="build jiaogong" src="@/assets/img/index/图片2/教工之家.png" @click="showBuildActive('教工之家')" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="艺术会堂" placement="top">
        <img class="build yishuhuit" src="@/assets/img/index/图片2/艺术会堂.png" @click="showBuildActive('艺术会堂')" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="宿舍" placement="top">
        <img class="build sushe" src="@/assets/img/index/图片2/宿舍.png" @click="showBuildActive('宿舍')" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="新操场" placement="top">
        <img class="build newcaochang" src="@/assets/img/index/图片2/新操场.png" @click="showBuildActive('新操场')" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="旧操场" placement="top">
        <img class="build oldcaochang" src="@/assets/img/index/图片2/旧操场.png" @click="showBuildActive('旧操场')" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="明理楼" placement="top">
        <img class="build mingli" src="@/assets/img/index/图片2/明理1-7.png" @click="showBuildActive('明理楼')" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="明理89" placement="top">
        <img class="build mingli89" src="@/assets/img/index/图片2/明理89.png" @click="showBuildActive('明理89')" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="体育馆" placement="top">
        <img class="build tiyuguan" src="@/assets/img/index/图片2/体育馆.png" @click="showBuildActive('体育馆')" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="篮球场" placement="top">
        <img class="build basketball" src="@/assets/img/index/图片2/篮球场.png" @click="showBuildActive('篮球场')" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="综合楼" placement="top">
        <img class="build zonghel" src="@/assets/img/index/图片2/综合楼.png" @click="showBuildActive('综合楼')" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="游泳馆" placement="top">
        <img class="build youyongguan" src="@/assets/img/index/图片2/游泳馆.png" @click="showBuildActive('游泳馆')" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="羽毛球馆" placement="top">
        <img class="build yumaoqiu" src="@/assets/img/index/图片2/羽毛球馆.png" @click="showBuildActive('羽毛球馆')" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="食堂" placement="top">
        <img class="build shitang" src="@/assets/img/index/图片2/食堂.png" @click="showBuildActive('食堂')" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="精工楼" placement="top">
        <img class="build jinggong" src="@/assets/img/index/图片2/精工.png" @click="showBuildActive('精工楼')" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="逸夫楼" placement="top">
        <img class="build yiful" src="@/assets/img/index/图片2/逸夫楼.png" @click="showBuildActive('逸夫楼')" />
      </el-tooltip>

      <div class="animation animation1">
        <img class="car1" src="@/assets/img/index/起始.png" />
      </div>

      <div class="animation animation2">
        <img class="car2" src="@/assets/img/index/终点.png" />
      </div>

      <div class="animation animation3">
        <img class="car3" src="@/assets/img/index/car3.png" />
      </div>

    </div>
    <el-drawer :visible.sync="drawer" close-on-press-escape size="40%" custom-class="active-list" :title="clickBuild"
      @close="close">
      <div class="list">
        <div v-if="buildActiveList.length != 0">
          <buildActiveList :buildActiveList="buildActiveList" :build="clickBuild" :key="buildActiveList.length">
          </buildActiveList>
        </div>
        <div v-else class="middle">
          <div><img src="@/assets/img/index/empty.png" alt=""></div>
          暂无活动，看看别处吧~
        </div>
      </div>
      <el-drawer :append-to-body="true" :visible.sync="innerDrawer" custom-class="activedetail" :with-header="false"
        size="30%">
        <active-detail :activeInfo="activeInfo" :innerDrawer="innerDrawer" @close="closeInner"></active-detail>
      </el-drawer>
    </el-drawer>
  </div>
</template>

<script>
import { getUserInfo } from "@/service/user";
import { getActiveListApi } from '@/service/actives';
import { mapState } from 'vuex';
import buildActiveList from './cpn/buildActiveList';
import ActiveDetail from './cpn/activeDetail.vue';
export default {
  name: "indexView",
  components: { buildActiveList, ActiveDetail },
  data() {
    return {
      build: "",
      time: "",
      clickBuild: "",
      buildActiveList: [],

      drawer: false,
      innerDrawer: false,
      activeInfo: {},
    }
  },
  async mounted() {
    this.$bus.$emit("judgeHeaderColor")
    this.$bus.$on("opendetail", this.opendetail);
    this.$bus.$on("updateData", this.getActiveList)
    this.$bus.$on("closeinner", this.closeInner)
    this.$bus.$on("changebg", this.changebg)
    this.getActiveList()
    await getUserInfo().then((res) => {
      if (res.status === 200) {
        this.username = res.data.username
      }
    }, (err) => {
      this.$message.error(err)
    })
    this.lazyLoad()
    window.addEventListener("scroll", this.lazyLoad)
  },
  computed: {
    ...mapState(["activeList"]),
  },
  watch: {
    clickBuild() {
      this.getActiveList()
    },
    activeList() {
      this.buildActiveList = []
      this.computBuldList(this.clickBuild)
    }
  },
  methods: {
    changebg(imgsrc) {
      this.$refs.bg.src = imgsrc
      let builds = document.querySelectorAll(".build")
      if (imgsrc.indexOf("dark") !== -1) {
        for (let i = 0; i < builds.length; i++) {
          builds[i].style.opacity = "0"
        }
      } else {
        for (let i = 0; i < builds.length; i++) {
          builds[i].style.opacity = "1"
        }
      }
    },
    lazyLoad() {
      const images = document.querySelectorAll('.animation');

      const windowHeight = window.innerHeight;

      images.forEach((image, index) => {
        const imagePosition = image.getBoundingClientRect().top;
        if (imagePosition - windowHeight <= 0) {
          let str = `animation-car${index + 1}`
          image.classList.add(str)
        }
      });
    },
    async getActiveList() {
      await getActiveListApi().then((res) => {
        if (res.status === 200) {
          this.$store.state.activeList = res.data
        }
      })
    },
    hoverBuild(e) {
      clearTimeout(this.time)
      this.time = setTimeout(() => {
        if (this.build !== "" && this.build !== e.target) {
          this.build.style.transform = "scale(1)";
        }
        if (e.target.className.indexOf("build") !== -1) {
          this.build = e.target
          e.target.style.transform = "scale(1.1)";
        }
      }, 0);

    },
    computBuldList(build) {
      if (build == "校外、东区、线上活动") {
        this.activeList.forEach(active => {
          let len = active.activity_address.length
          if (active.activity_address[len - 1] === "校外" || active.activity_address[len - 1] === "东区" || active.activity_address[len - 1] === "线上活动") {
            this.buildActiveList.push(active)
          }
        });
      } else {
        this.activeList.forEach(active => {
          let len = active.activity_address.length
          if (active.activity_address[len - 1] === build) {
            this.buildActiveList.push(active)
          }
        });
      }

    },
    async showBuildActive(build) {
      this.drawer = true
      this.clickBuild = build
      this.computBuldList(build)
    },
    close() {
      this.buildActiveList = []
    },
    opendetail(active) {
      this.innerDrawer = true
      this.activeInfo = active
    },
    closeInner() {
      this.innerDrawer = false
    }
  }
};
</script>

<style lang="scss" scoped>
.contianer {
  position: relative;
  height: 100%;
  background: url(@/assets/img/index/index-bg.jpg) no-repeat;
  background-size: 100%;

  .bg {
    width: 100vw;
    min-height: 100vh;
  }

  .build {
    position: absolute;
    transition: all .4s;
    cursor: pointer;
  }

  .tushuguan {
    left: 39.2708vw;
    top: 24.8958vw;
    width: 22.3958vw;
  }

  .chuanyiyuan {
    left: 4.6875vw;
    top: 6.3541vw;
    width: 20.0521vw;
  }

  .jiaogong {
    left: 18.28125vw;
    top: 72.3958vw;
    width: 22.7083vw;
  }

  .youyongguan {
    left: 20.8854vw;
    top: 46.5625vw;
    width: 23.75vw;
  }

  .yishuhuit {
    left: 0.625vw;
    top: 85.15625vw;
    width: 25.3646vw;
  }

  .tiyuguan {
    left: 54.9479vw;
    top: 50.989vw;
    width: 18.3333vw;
  }

  .sushe {
    left: 57.96875vw;
    top: 3.4896vw;
    width: 25.4166vw;
  }

  .newcaochang {
    left: 78.1771vw;
    top: 65.1042vw;
    width: 20.5729vw;
  }

  .oldcaochang {
    left: 67.8646vw;
    top: 45.625vw;
    width: 20.6842vw;
  }

  .mingli {
    left: 14.375vw;
    top: 11.9792vw;
    width: 25.5729vw;
  }

  .mingli89 {
    left: 39.0625vw;
    top: 5.78125vw;
    width: 13.0729vw;
  }

  .basketball {
    right: 0;
    top: 12.1354vw;
    width: 22.9166vw;
  }

  .jinggong {
    left: 58.4375vw;
    top: 87.3958vw;
    width: 33.0729vw;
  }

  .zonghel {
    left: 7.7604vw;
    top: 31.1458vw;
    width: 20.2604vw;
  }

  .yumaoqiu {
    left: 82.34375vw;
    top: 38.0208vw;
    width: 13.4375vw;
  }

  .yiful {
    left: 53.3854vw;
    top: 80.78125vw;
    width: 18.4896vw;
  }

  .shitang {
    left: 24.21875vw;
    top: 96.7708vw;
    width: 26.0417vw;
  }

  .other {
    position: absolute;
    top: 5vw;
    left: 0;
    width: 0;
    height: 0;
    border: 6.5vw solid transparent;
    cursor: pointer;

    &:hover {
      border-top-color: rgba($color: #8fb675, $alpha: .3);
      border-left-color: rgba($color: #8fb675, $alpha: .3);
      border-radius: 20%;
    }
  }

  .other2 {
    top: 6vw;
    left: 15vw;
    border-width: 17vw;
    border-top-width: 10vw;

    &:hover {
      border-color: transparent;
      border-top-color: rgba($color: #8fb675, $alpha: .3);
      border-radius: 10%;
    }
  }

  .other3 {
    top: 6vw;
    left: 78vw;
    border-width: 11vw;
    border-top-width: 6vw;
    border-bottom-width: 6vw;


    &:hover {
      border-color: transparent;
      border-top-color: rgba($color: #8fb675, $alpha: .3);
      border-right-color: rgba($color: #8fb675, $alpha: .3);
      border-radius: 5%;
    }
  }

  .other4 {
    top: 104.5vw;
    border-width: 9.5vw;
    border-left-width: 16vw;
    border-right-width: 16vw;

    &:hover {
      border-color: transparent;
      border-left-color: rgba($color: #8fb675, $alpha: .3);
      border-bottom-color: rgba($color: #8fb675, $alpha: .3);
      border-radius: 3%;
    }
  }

  .other5 {
    top: 106vw;
    left: 66.2vw;
    border-width: 9vw;
    border-left-width: 16vw;
    border-right-width: 16vw;

    &:hover {
      border-color: transparent;
      border-right-color: rgba($color: #8fb675, $alpha: .3);
      border-bottom-color: rgba($color: #8fb675, $alpha: .3);
      border-radius: 3%;
    }
  }

}


.list {
  width: 100%;
  height: calc(100% - 7vw);
  overflow-y: auto;
}

.middle {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.animation1 {
  position: absolute;
  left: 41.4062vw;
  top: 67.2396vw;
  width: 3.75vw;
  height: 3.75vw;

  &.animation-car1 {
    animation: cargo1 3s forwards infinite linear;
  }
}

.car1 {
  width: 100%;
  height: 100%;
  transition: all 1s;
  transform: rotate(-30deg);
}

@keyframes cargo1 {
  0% {
    opacity: 0;
    transform: rotate(30deg) translate(0px);
  }

  20% {
    opacity: .9;
  }


  80% {
    opacity: .9;
  }

  100% {
    opacity: 0.1;
    transform: rotate(30deg) translate(170px);
  }
}


.animation2 {
  position: absolute;
  left: 71vw;
  top: 39.0625vw;
  width: 4.0105vw;
  height: 3.8542vw;

  &.animation-car2 {
    animation: cargo2 4s forwards infinite linear;
  }
}

.car2 {
  width: 100%;
  height: 100%;
  transition: all 1s;
  transform: rotate(30deg);
}

@keyframes cargo2 {
  0% {
    opacity: 0;
    transform: rotate(-30deg) translate(0px);
  }

  20% {
    opacity: .9;
  }

  80% {
    opacity: .9;
  }

  100% {
    opacity: 0.1;
    transform: rotate(-30deg) translate(-300px);
  }
}

.animation3 {
  position: absolute;
  left: 52vw;
  top: 82vw;
  width: 4.0105vw;
  height: 3.8542vw;

  &.animation-car3 {
    animation: cargo3 4s forwards infinite linear;
  }
}

.car3 {
  width: 100%;
  height: 100%;
  transition: all 1s;
  transform: rotate(30deg);
}

@keyframes cargo3 {
  0% {
    opacity: 0;
    transform: rotate(-30deg) translate(0px);
  }

  20% {
    opacity: .9;
  }

  80% {
    opacity: .9;
  }

  100% {
    opacity: 0.1;
    transform: rotate(-30deg) translate(-270px);
  }
}
</style>
<style lang="scss">
.active-list {
  height: 100%;
  padding: 0 2.5vw;
  border: none;
  background-color: #fcffb8;
  border-radius: 2vw 0 0 2vw;
  opacity: 1;
  box-shadow: -2px 0px 5px 1px rgba(77, 67, 69, 0.2);



  .el-drawer__body {
    padding: 0 20px;
  }

  .el-drawer__header {
    position: relative;
    color: #000000;
    font-size: 24px;

    span {
      display: block;
      width: 13vw;
      height: 4vw 1.5vw;
      background-color: #fdedb8;

      text-align: center;
      line-height: 3vw;
      font-size: 1.5vw;
      font-family: KaiTi;

      box-shadow: 0px 6px 3px 2px rgba(77, 67, 69, 0.31);
      border-radius: 5px;
    }

    .el-icon-close {
      position: absolute;
      right: 30px;
      top: 50%;
    }

  }

}

.activedetail {
  position: absolute;
  top: 30px !important;
  height: 90% !important;
  padding: 2vw;
  background-color: #fcffb8;
  box-shadow: 0px 0px 1px 5px rgba(77, 67, 69, 0.56);
  border-radius: 133px 0 0 133px;
  border: dashed 2px #000000;
  opacity: 0.8;
}
</style>