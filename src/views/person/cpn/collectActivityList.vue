<template>
  <div>
    <ul class="activityList" v-if="collectActiveList" >
      <li v-for="active in collectActiveList" :key="active._id" class="acti-item" @click="clickActiItem($event, active)">
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
</template>

<script>
import { collectActive } from '@/service/actives';
import { getUserInfo } from "@/service/user";

export default {
  name: "activeList",
  props: {
    collectActiveList: {
      type: Array
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
  },
  data() {
    return {
      isCollect: false,
      username: ""
    }
  },
  methods: {
   
    clickActiItem(e, active) {
      e.preventDefault();

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
          setTimeout(() => {
            this.$bus.$emit("updateData")
          }, 1000);

        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.activityList{
  z-index: 999;
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
  background-color: #fdedb8;
  box-shadow: 0 2px 10px rgba($color: #000000, $alpha: 0.1);
  border-radius: 10px;
  cursor: pointer;


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
</style>
