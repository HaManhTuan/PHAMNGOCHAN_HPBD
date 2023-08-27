<template>
  <div id="app">
    <div v-if="!isMobile" class="container-page">
      <div class="balloon">
        <div><span class="balloon-item">☺</span>
        </div>
        <div><span class="balloon-item">B</span>
        </div>
        <div><span class="balloon-item">D</span>
        </div>
        <div><span class="balloon-item">A</span>
        </div>
        <div><span class="balloon-item">Y</span>
        </div>
        <div><span class="balloon-item">!</span>
        </div>
      </div>
      <div class="content-text">
        <h2>Waiting for me</h2>
        <h2>Waiting for me</h2>
        <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tec/1/30/1f38a.png" class="icon-blink" alt="icon">
        <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tc4/1/30/1f389.png" class="icon-birthday" alt="icon">
      </div>
      <CountDown @timeRemaining="timeRemaining"/>
      <img src="https://scontent.xx.fbcdn.net/v/t39.1997-6/10935977_1435051876785769_939426339_n.webp?_nc_cat=1&ccb=1-7&_nc_sid=0572db&_nc_ohc=NpyPdUQPF0wAX9_auYx&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=00_AfCW2d6Jt58L-tG10VrjRA-S7NjK2oLGfbIF2o_1osTN7w&oe=64F052E9" class="img-final">
    </div>
    <div v-else>
      <p class="text-notice-mobile">Hãy truy cập bằng Laptop</p>
    </div>
  </div>
</template>

<script>
import CountDown from "@/components/CountDown.vue";

export default {
  name: "App",
  components: {CountDown},
  data() {
    return {
      isMobile: false
    };
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    timeRemaining(time) {
      if (time == 0) {
        console.log('1234')
      }
    }
  }
};
</script>
<style lang="scss">

</style>
