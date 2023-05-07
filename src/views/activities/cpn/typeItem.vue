<template>
  <div class="typeItem" v-if="activelist && activelist.length > 0" :style="{ backgroundColor: itemColor }">
    <div class="typeItem-title">{{ type }}</div>
    <ul class="typeItem-list">
      <li v-for="active in activelist" :key="active._id" class="active" @click="showDetail(active)">
        <div class="active-title">{{ active.activity_title }}</div>
        <div class="active-time">
          <div class="starttime" ref="starttimes">{{ active.activity_starttime }} </div>
        </div>
      </li>
    </ul>


  </div>
</template>

<script>
export default {
  props: ["typelist", "type", "itemColor"],
  data() {
    return {
      activelist: [],
    }
  },
  watch: {
    typelist: {
      immediate: true,
      handler(val) {
        this.activelist = val
      }
    }
  },
  updated() {
    if (this.activelist && this.activelist.length > 0) {
      const req = /^2023./;
      this.$refs.starttimes.forEach((el) => {
        const starttime = el.innerHTML;
        el.innerHTML = starttime.replace(req, "");
      });

    }
  },
  methods: {
    showDetail(active) {
      this.$bus.$emit("showDetail", active)
      this.$bus.$emit("typeItemMask", active)
    },

  }
}
</script>


<style lang="scss" scoped>
.typeItem {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 1vw 2vw;
  border-radius: 13%;
  box-shadow: 2px 2px 8px 0px rgba(77, 67, 69, 0.33);
  text-align: center;
  overflow: hidden;

  &-title {
    display: inline-block;
    padding: .8vw 4.1vw;
    margin-bottom: 1vw;
    background-color: #ffefcb;
    border-radius: 25px;
  }

  &-list {
    height: 80%;
    overflow: auto;
  }
}

.active {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .7vw 1vw;
  margin-bottom: 1vw;
  background-color: rgba($color: #e5e5e5, $alpha: 0.7);
  font-size: 1.1vw;
  font-family: KaiTi;

  border-radius: 10px;
  cursor: pointer;

  &-title {
    text-align: left;
    max-width: 48%;
    margin-left: 10px;
  }

  &-time {
    max-width: 47%;
    text-align: right;
  }

  &::before {
    content: "";
    position: absolute;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background-color: #ffefcb;
  }
}
</style>