<template>
  <div class="activityList-contianer">
    <div class="swiper mySwiper">
      <div class="swiper-wrapper activityList" v-if="myActiveList" ref="activityList">
        <div class="swiper-slide " v-for="(active, index) in  myActiveList " :key="active._id">
          <div class="info">
            <div class="top-img">
              <img v-if="(index + 1) % 4 === 1" src="@/assets/img/person/myactive/动图4.gif" alt="">
              <img v-if="(index + 1) % 4 === 2" src="@/assets/img/person/myactive/动图3.gif" alt="">
              <img v-if="(index + 1) % 4 === 3" src="@/assets/img/person/myactive/资源45@2x.png" alt="">
              <img v-if="(index + 1) % 4 === 0" src="@/assets/img/person/myactive/资源47@2x.png" alt="">
            </div>
            <div class="acti-item" @click="clickActiItem(active)">
              <div class="item-top">
                <img :src="active.activity_img" alt="活动图片" />
              </div>
              <div class="item-center">
                <h3>{{ active.activity_title }}</h3>
                <p>
                  {{ active.activity_starttime }}
                </p>
              </div>
              <div class="item-bottom">
                <div>
                  <i class="iconfont"
                    :class="active.collect_userList.indexOf(username) !== -1 ? 'icon-shoucang' : 'icon-noCollect'"
                    @click="collectActiveAction($event, active._id)">
                  </i>{{ active.collect_userList.length }}
                </div>
                <i class="iconfont icon-shanchu" @click="delActiveAction($event, active._id)">
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-scrollbar"></div>
    </div>
  </div>
</template>

<script>
import { collectActive, delActive } from '@/service/actives';
import { getUserInfo } from "@/service/user";
import Swiper from "@/assets/js/swiper-bundle.min"
export default {
  name: "myActivesList",
  props: {
    myActiveList: {
      type: Array
    }
  },
  watch: {
    myActiveList() {
      this.initSwiper()
    }
  },
  async mounted() {
    await getUserInfo().then((res) => {
      if (res.status === 200) {
        this.username = res.data.username
      }
    }, (err) => {
      this.$message.error(err)
    })

    this.initSwiper()
  },
  data() {
    return {
      username: "",
      pic: [
        "@/assets/img/person/myactive/资源20@2x.png",
        "@/assets/img/person/myactive/资源2@2x.png",
        "@/assets/img/person/myactive/资源45@2x.png",
        "@/assets/img/person/myactive/资源47@2x.png"
      ]
    }
  },
  methods: {
    clickActiItem(active) {
      this.$bus.$emit("openMsgBox", active);
    },
    async collectActiveAction(e, id) {
      e.stopPropagation()
      console.log(id)
      let flag;
      if (e.target.className.indexOf("icon-shoucang") !== -1) {
        flag = false
      } else {
        flag = true
      }

      await collectActive(flag, { activeid: id }).then((res) => {
        if (res.status === 200) {
          this.$message.success(res.message)
          this.$bus.$emit("updateData")
        } else {
          this.$message.error(res.message)
        }
      })
    },
    delActiveAction(e, id) {
      e.stopPropagation()
      this.$confirm('是否要删除这个活动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await delActive({ activeid: id }).then((res) => {
          if (res.status === 201) {
            this.$message.success(res.message)
            this.$bus.$emit("updateData")
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
    initSwiper() {
      new Swiper(".mySwiper", {
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: true,
        },
        slidesPerView: 4,
        spaceBetween: 20,
      });
    }
  },
};
</script>

<style lang="scss" scoped>
html,
body {
  position: relative;
  height: 100%;
}

.swiper {
  height: 100%;
}

.activityList-contianer {
  z-index: 999;
  position: relative;
  width: 75vw;
  height: 68vh;
}

.activityList {
  position: absolute;
  bottom: 0;
  width: 75vw;
  height: 68vh;
}

.swiper-slide {
  position: relative;
  text-align: center;

  .info {
    position: absolute;
    bottom: 0;
  }
}

.top-img {
  height: 15vh;
  width: 15vw;

  >img {
    height: 100%;
  }
}

.acti-item {

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  // height: 53vh;
  min-height: 25vh;
  width: 15vw;
  padding: 25px 25px 10px;
  margin-right: 2.25vw;
  text-align: center;
  font-size: 18px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba($color: #000000, $alpha: 0.1);
  border-radius: 10px 10px 0 0;
  cursor: pointer;


  .item-top {
    max-height: 31vh;
  }

  .item-top img {
    width: 100%;
    max-height: 31vh;
  }

  .item-center {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #0bdac6;
    margin: 10px 0 0 0;
    padding: 5px 1.3vw;
    font-family: kaiti;
    border-radius: 30px;
    box-shadow: 3px 3px 5px 1px rgba(77, 67, 69, 0.3);

    h3 {
      font-weight: 400;
      font-size: 1.2vw;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    p {
      line-height: 1.7vw;
      font-size: 0.95vw;
    }
  }

  .item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 5px;
    color: #666;

    .iconfont {
      width: 2vw;
      height: 2vw;
      text-align: center;
      line-height: 2vw;
      margin-right: 3px;
      font-size: 22px;
      color: #173ca6;
      cursor: pointer;
    }

    .icon-shanchu {
      font-size: 20px;
      color: #666;
    }
  }
}
</style>
