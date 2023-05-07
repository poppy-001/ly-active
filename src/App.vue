<template>
  <div id="app">
    <headerMode v-if="$route.path !== '/login'" :headerBgcolor="headerBgcolor"></headerMode>

    <transition :name="transitionName">
      <!-- <keep-alive :include="['indexView', 'LoginView']"> -->
      <router-view :class="{ filter: isVisibility }" :key="$route.fullPath" />
      <!-- </keep-alive> -->
    </transition>

    <transition :name="$store.state.transitionName">
      <loading></loading>
    </transition>
  </div>
</template>
<script>
import headerMode from "@/components/header/headerMode.vue";
import loading from "./components/loading/loading-router.vue";
export default {

  components: { loading, headerMode },
  data() {
    return {
      transitionName: "",
      isVisibility: false,
      headerBgcolor: ""
    }
  },
  mounted() {
    this.$bus.$on("mask", this.openmask)
    this.$bus.$on("judgeHeaderColor", this.judgeHeaderColor)
    window.addEventListener("scroll", this.judgeHeaderColor)
  },
  methods: {
    openmask(val) {
      this.isVisibility = val
    },
    judgeHeaderColor() {
      // console.log(123);
      if (this.$route.path === "/index") {
        if (window.scrollY > 65) {
          console.log(111);
          this.headerBgcolor = "#d0eadf"
        } else {
          console.log(222);

          this.headerBgcolor = "transparent"
        }
      } else if (this.$route.path === "/activities") {
        this.headerBgcolor = "#ffefcb"
      } else {
        this.headerBgcolor = "transparent"
      }
    }
  },

};
</script>
<style lang="scss"></style>