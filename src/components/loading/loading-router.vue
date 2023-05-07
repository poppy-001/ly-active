<template>
  <div class="loading" v-if="$store.state.changePage" ref="loading">
    <div class="bg">
      <img src="@/assets/img/full-screen-loading.gif" alt="" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: "loadingMode",
  computed: {
    ...mapState(["changePage"])
  },
  watch: {
    changePage() {
      console.log(123);
      if (this.changePage) {
        this.$nextTick(() => {
          this.$refs.loading.style.top = window.scrollY + "px"
          setTimeout(() => {
            this.$refs.loading.style.top = "0px"
          }, 1500);
        })
      }
    }
  }
};
</script>
<style lang="less" scoped>
.loading {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;


  display: flex;
  justify-content: center;
  align-items: center;
  background-color: skyblue;



  .bg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 104px;
    height: 104px;
    background: url("@/assets/img/full-screen-loading.gif") 0 0 / 100% 100%;

    transition: all 1.5s;

    img {
      width: 70px;
      height: 70px;
      margin-bottom: 8px;
    }
  }
}
</style>
