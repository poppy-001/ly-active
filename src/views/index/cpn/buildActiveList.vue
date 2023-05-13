<template>
  <div class="buildList" v-if="buildActiveList">
    <div class="card">
      <div class="card-content">
        <ul class="activityList" v-if="buildActiveList">
          <li v-for="active in buildActiveList" :key="active._id" class="acti-item"
            @click="clickActiItem($event, active)">
            <div class="item-left">
              <img :src="active.activity_img" alt="活动图片" />
            </div>
            <div class="item-center">
              <h3>{{ active.activity_title }}</h3>
              <p>
                [宣传]
                {{ active.activity_desc }}
              </p>
            </div>
            <div class="item-right" @click="collectActiveAction($event, active._id)"><i class="iconfont"
                :class="active.collect_userList.indexOf(username) !== -1 ? 'icon-shoucang' : 'icon-noCollect'"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import { collectActive } from '@/service/actives';
import { getUserInfo } from "@/service/user";
export default {
  name: "buildActiveList",
  props: {
    buildActiveList: {
      type: Array
    },
    build: {
      type: String
    }
  },
  async mounted() {
    console.log("我是list", this.buildActiveList);
    await getUserInfo().then((res) => {
      if (res.status === 200) {
        this.username = res.data.username
      }
    }, (err) => {
      this.$message.error(err)
    })
  },
  data() {
    return {
      username: "",
      isCollect: false,
    }
  },
  methods: {
    clickActiItem(e, active) {
      e.stopPropagation();
      this.activeDetail = active
      this.$bus.$emit("opendetail", active)
      console.log(2222);
    },
    async collectActiveAction(e, id) {
      e.stopPropagation()
      let flag;
      if (e.target.className.indexOf("icon-shoucang") !== -1) {
        flag = false
      } else {
        flag = true
      }

      try {
        await collectActive(flag, { activeid: id }).then((res) => {
          if (res.status === 200) {
            this.$message.success(res.message)
            this.$bus.$emit("updateData")

          } else {
            this.$message.error(res.message)
          }
        })
      } catch (error) {
        console.log(error);
        this.$message.error(error)
      }
    }
  },
  watch: {
    buildActiveList: {
      immediate: true, // 立即执行一次
      handler(newVal) {
        // 监听buildActiveList属性的变化
        console.log('buildActiveList changed:', newVal);
        // 在这里更新子组件的内容或执行其他操作
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.buildList {
  height: 100%;
}

.card {
  display: flex;
  justify-content: center;
  position: relative;
  height: 100%;


  &-content {
    width: 100%;
    height: calc(100% - 7vw);
    overflow-y: auto;
    padding-top: 10px;



    ul {
      width: 100%;
    }

    .acti-item {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 6.5vw;
      max-height: 8vw;
      width: 100%;
      padding: 18px 25px;
      margin-bottom: 25px;
      background-color: #b3d465;
      box-shadow: 0 2px 10px rgba($color: #000000, $alpha: 0.1);
      border-radius: 10px;
      cursor: pointer;
      transition: all .4s;


      &:hover {
        transform: translateY(-5px);
      }

      .item-left img {
        max-width: 5vw;
        max-height: 7vw;
      }

      .item-center {
        flex: auto;
        margin: 0 30px 0 25px;
        font-family: kaiti;

        h3 {
          margin-bottom: 0.78vw;

          font-weight: 400;
          font-size: 1.25vw;
        }

        p {
          line-height: 1.7vw;
          font-size: 0.95vw;
          color: #666;

          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }

      .item-right {

        width: 2vw;
        height: 2vw;
        text-align: center;
        line-height: 2vw;

        .iconfont {
          font-size: 22px;
          color: #173ca6;
          cursor: pointer;
        }
      }
    }
  }
}
</style>