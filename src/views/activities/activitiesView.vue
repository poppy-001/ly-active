<template>
  <div class="pannel">
    <div class="contianer" :class="{ filter: isVisibility }">
      <div class="top">
        <div class="swiper mySwiper3">
          <div class="swiper-wrapper" v-if="comdActiveList && comdActiveList.length > 0">
            <div class="swiper-slide" v-for="(active, index) in comdActiveList" :key="index" @click="showDetail(active)">
              <img :src="active.activity_img" alt="活动图片">
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="logo"></div>

      </div>
      <div class="bottom">
        <el-tabs tab-position="top" stretch>
          <el-tab-pane label="范围">
            <type-item v-for="(item, index) in range" :key="index" :typelist="item.data" :type="item.title"
              :itemColor="item.color" class="typeItem" />
          </el-tab-pane>
          <el-tab-pane label="类型">
            <type-item v-for="(item, index) in type" :key="index" :typelist="item.data" :type="item.title"
              :itemColor="item.color" class="typeItem" />
          </el-tab-pane>
        </el-tabs>

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

import { getActiveListApi, getcommandActiveList } from "@/service/actives"
import typeItem from "./cpn/typeItem.vue";
import Swiper from "@/assets/js/swiper-bundle.min"
export default {
  components: { typeItem, msgBox },
  name: "activitiesView",
  mounted() {
    this.getActiveListInfo()
    this.$bus.$on("updateActive", this.getActiveListInfo)
    this.$bus.$on("updateData", this.getActiveListInfo)
    this.$bus.$on("typeItemMask", this.openMsgBox)
    this.$bus.$on("showDetail", this.openMsgBox)
  },
  data() {
    return {
      mySwiper: null,
      activesList: {},
      range: [
        { title: "校园", color: "#79d8ea", value: 3 },
        { title: "学院", color: "#f8d871", value: 1 },
        { title: "社团", color: "#0bdac6", value: 2 },
        { title: "个人", color: "#79d8ea", value: 0 },

      ],
      type: [
        { title: "学习", color: "#79d8ea" },
        { title: "社交", color: "#f8d871" },
        { title: "赛事", color: "#0bdac6" },
        { title: "社团纳新", color: "#79d8ea" },
        { title: "文艺", color: "#f8d871" },
        { title: "慈善", color: "#0bdac6" },
        { title: "运动", color: "#79d8ea" },
        { title: "创业就业", color: "#f8d871" },
        { title: "志愿服务", color: "#0bdac6" },
        { title: "其他", color: "#79d8ea" },
      ],
      isVisibility: false,
      activeInfo: {},
      comdActiveList: []
    }
  },
  methods: {
    async getActiveListInfo() {
      try {
        await getcommandActiveList().then((res) => {
          if (res.status === 200) {
            this.comdActiveList = res.data
            console.log(res.data);
            //error
            this.mySwiper.update()

          } else {
            console.log(res);
            this.$message.error(res.message)
          }
        })
      } catch (error) {
        console.log("error---", error);
        this.$message.error(error)
      }

      try {
        for (let i = 0; i < this.range.length; i++) {
          const res = await getActiveListApi({ type: this.range[i].value })
          if (res.status === 200) {
            this.range[i].data = res.data
          } else {
            console.log(res.message);
            this.$message.error(res.message)
          }

        }

        for (let i = 0; i < this.type.length; i++) {
          const res = await getActiveListApi({ feature: this.type[i].title })
          if (res.status === 200) {
            this.type[i].data = res.data
          } else {
            console.log(res.message);
            this.$message.error(res.message)
          }

        }
        this.$forceUpdate()




      } catch (error) {
        this.$message.error(error)
      }



    },
    openMsgBox(active) {
      this.isVisibility = true
      this.activeInfo = active
    },
    closeMsgBox() {
      this.isVisibility = false;
    },
    showDetail(active) {
      this.isVisibility = true
      this.activeInfo = active
    }
  },
  watch: {
    comdActiveList: {
      immediate: true, // 立即触发一次
      handler() {
        this.$nextTick(() => {
          this.mySwiper = new Swiper(".mySwiper3", {
            grabCursor: true,
            effect: "creative",
            // effect: "fade",
            loop: true,
            creativeEffect: {
              prev: {
                shadow: true,
                translate: ["-100%", 0, -1],
              },
              next: {
                translate: ["100%", 0, 0],
              },
            },
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
          });
        });
      },
    },
  },
};
</script>
<style lang="scss" scoped>
html,
body {
  position: relative;
  height: 100%;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  img {
    // width: 100%;
    height: 100%;
  }
}

.contianer {
  box-sizing: border-box;
  // padding: 78px 0 20px;
  padding: 5vw 0 0;
  background-color: #ffefcb;
}

.top {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 30px;
  margin-bottom: 20px;

  .logo {
    width: 75%;
    // height: 16vw;
    box-shadow: 3px 2.5px 2px 1px rgba(77, 67, 69, 0.31);
    background: url(@/assets/img/actives/bg.gif) no-repeat center bottom;
    background-size: 80%;
    background-color: #fef6e4;
    border-radius: 10px;

  }



  .swiper {
    box-sizing: border-box;
    width: 21%;
    max-height: 18vw;
    min-height: 14.5vw;
    background-color: #fef6e4;
    border: 10px solid #fef6e4;
    box-shadow: 2px 2px 2px 1px rgba(77, 67, 69, 0.31);
    border-radius: 10px;

    img {
      height: 100%;
    }
  }
}

.bottom {
  box-sizing: border-box;
  min-height: 81vh;
  width: 100%;
  background-color: #fef6e4;
  padding: 1vw 4vw 3vw;

  .typeItem {
    flex: 1;
    height: 28vw;
    min-width: calc((100% - 30vw) / 2);
    max-width: calc((100% - 30vw) / 2);
    margin: 0 9vw 5vw 0;

    &:nth-child(2n) {
      margin-right: 0;
    }

    &:nth-last-child(-n+2) {
      margin-bottom: 0;
    }


  }
}

.el-tabs {
  width: 100%;
}

.el-tab-pane {
  display: flex;
  flex-flow: wrap;
  justify-content: center;

  &::after {
    // 使用伪类元素占据单位，不影响页面
    content: "";
    height: 0;
    width: 32%;
    margin-right: 0;
  }
}
</style>
<style>
.el-tabs__header {
  width: 30%;
  margin: 0 auto 3vw
}

.el-tag {
  margin-right: 5px;
}
</style>