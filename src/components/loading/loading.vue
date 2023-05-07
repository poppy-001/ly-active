<template>
  <div class="loading" v-if="$store.state.loading">
    <div class="bg">
      <img src="@/assets/img/full-screen-loading.gif" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: "loadingMode",
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
  background-color: rgba(0, 0, 0, 0.5);

  .bg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 104px;
    height: 104px;
    background: url("@/assets/img/full-screen-loading.gif") 0 0 / 100% 100%;

    img {
      width: 70px;
      height: 70px;
      margin-bottom: 8px;
    }
  }
}
</style>
