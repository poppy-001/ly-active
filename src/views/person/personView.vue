<template>
  <div class="contianer" ref="contianer">
    <div class="top">
      <div class="logo"></div>
    </div>
    <div class="bottom">
      <div class="option person" ref="option" @click="gotoPage($event, 'person')">
        <div class="mask"></div>
        <div class="option-pic"><img src="" alt=""></div>
        <div class="option-title">个人信息</div>
      </div>
      <div class="option collectList" ref="option" @click="gotoPage($event, 'collectList')">
        <div class="mask"></div>
        <div class="option-pic"><img src="" alt=""></div>
        <div class="option-title">活动收藏</div>
      </div>
      <div class="option myActive" ref="option" @click="gotoPage($event, 'myActive')">
        <div class="mask"></div>
        <div class="option-pic"><img src="" alt=""></div>
        <div class="option-title">我的发布</div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: "personView",
  data() {
    return {
      currentIdx: 0,
      isVisibility: false,
    };
  },
  mounted() {
    if (!localStorage.getItem("TOKEN")) {
      setTimeout(() => {
        this.$router.push("/login");
      }, 500);
    }
  },
  watch: {
    isVisibility() {
      console.log(this.isVisibility);
    },
  },
  methods: {
    clickTab(e) {
      if (e.target.tagName == "LI") {
        this.currentIdx = e.target.dataset.index;
      }
    },
    closeMsgBox(val) {
      this.isVisibility = val;
    },
    openMsgBox(val) {
      this.isVisibility = val;
    },
    gotoPage(e, page) {
      if (this.$route.path !== "/person") {
        return
      }
      console.log(page);
      e.stopPropagation()
      if (page == "person") {
        let person = e.target.parentElement.children[0];
        let outHeight = window.innerHeight - window.innerWidth * 0.045;
        let maskHeight = person.clientHeight;//196
        let cnt = outHeight / maskHeight
        cnt = this.downFixed(cnt, 1)
        console.log("cnt", cnt);
        let personTop = person.getBoundingClientRect().top - window.innerWidth * 0.045;//426
        let personBottom = window.innerHeight - maskHeight - person.getBoundingClientRect().top - window.innerWidth * 0.05;//189
        let totalH = maskHeight * (cnt - 1)//669
        let a = this.downFixed(personTop / totalH, 1) * (cnt - 1)//2.16
        let b = this.downFixed(personBottom / totalH, 1) * (cnt - 1)//1.23
        let y = this.downFixed(b / a, 2) * 100
        console.log("y", y);

        console.log("personTop", personTop, "personBottom", personBottom);
        console.log("maskHeight", maskHeight);
        person.style.opacity = 1
        person.style.transform = `scale(5,${cnt})`
        // person.style.transform="scale(5,3.42)"
        person.style.transformOrigin = `15% 76.6%`
        // person.style.transformOrigin=`15% 60.8%`


      } else if (page == "collectList") {

        let collectList = e.target.parentElement.children[0];
        let outHeight = window.innerHeight - window.innerWidth * 0.045;
        let maskHeight = collectList.clientHeight;//196
        let cnt = outHeight / maskHeight
        cnt = this.downFixed(cnt, 1)
        collectList.style.opacity = 1
        collectList.style.transform = `scale(5,${cnt})`
        collectList.style.transformOrigin = "50% 76.6%"
      } else {

        let myActive = e.target.parentElement.children[0];
        let outHeight = window.innerHeight - window.innerWidth * 0.045;
        let maskHeight = myActive.clientHeight;//196
        let cnt = outHeight / maskHeight
        cnt = this.downFixed(cnt, 1)
        myActive.style.opacity = 1
        myActive.style.transform = `scale(5,${cnt})`
        myActive.style.transformOrigin = "85% 76.6%"
      }



      setTimeout(() => {
        this.$router.push({ name: page })
      }, 1200);
    },
    downFixed(num, fix) {
      // num为原数字，fix是保留的小数位数
      let result = '0'
      if (Number(num) && fix > 0) { // 简单的做个判断
        fix = +fix || 2
        num = num + ''
        if (/e/.test(num)) { // 如果是包含e字符的数字直接返回
          result = num
        } else if (!/\./.test(num)) { // 如果没有小数点
          result = num + `.${Array(fix + 1).join('0')}`
        } else { // 如果有小数点
          num = num + `${Array(fix + 1).join('0')}`
          let reg = new RegExp(`-?\\d*.\\d{0,${fix}}`)
          result = reg.exec(num)[0]
        }
      }
      return result
    }
  },
};
</script>

<style lang="scss" scoped>
.contianer {
  box-sizing: border-box;
  height: 100vh;
  padding: 5vw 0 20px;
  // padding: 78px 0 20px;
  background-color: #ffefcb;
}

.top {
  box-sizing: border-box;
  width: 100%;
  padding: 0 30px;
  margin-bottom: 20px;

  .logo {
    width: 100%;
    height: 16vw;
    box-shadow: 2px 2px 2px 1px rgba(77, 67, 69, 0.31);
    background: url(@/assets/img/person/活动图片.png) no-repeat center bottom;
    background-size: 59%;
    background-color: #fef6e4;
    border-radius: 10px;
  }
}

.bottom {
  box-sizing: border-box;
  display: flex;
  flex-flow: wrap;
  justify-content: space-evenly;
  align-items: center;

  width: 100%;
  height: calc(100% - 16vw);
  background-color: #fef6e4;
  padding: 3vw 4vw;

  .option {
    position: relative;
    width: 20vw;
    height: 20vw;
    box-shadow: 1px 6px 5px 1px rgba(77, 67, 69, 0.3);
    border-radius: 2vw 2vw 0 0;
    cursor: pointer;

    &-title {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 5vw;
      background-color: #fff;
      text-align: center;
      line-height: 5vw;
      font-family: KaiTi;
      font-size: 2vw;
    }

    &-pic {
      height: calc(100% - 5vw);
      border-radius: 2vw 2vw 0 0;
    }

    &:nth-child(1) .option-pic {
      background: url(@/assets/img/person/person.png) no-repeat center center;
      background-size: 55%;
      background-color: #79d8ea;

    }

    &:nth-child(2) .option-pic {
      background: url(@/assets/img/person/collect.png) no-repeat center center;
      background-size: 80%;
      background-color: #fddc73;
    }

    &:nth-child(3) .option-pic {
      background: url(@/assets/img/person/myActive.png) no-repeat center center;
      background-size: 45%;
      background-color: #0bdac6;
    }

    .mask {
      position: absolute;
      z-index: 9;
      height: calc(100% - 5vw);
      width: 100%;
      border-radius: 2vw 2vw 0 0;
      transition: all 1s;
      opacity: 0;
    }

    &:nth-child(1) .mask {
      background-color: #79d8ea;
    }

    &:nth-child(2) .mask {
      background-color: #fddc73;
    }

    &:nth-child(3) .mask {
      background-color: #0bdac6;
    }
  }
}
</style>
