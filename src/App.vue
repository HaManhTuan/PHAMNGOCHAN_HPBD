<template>
  <div id="app">
    <div v-if="!expired">
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
      </div>
      <div v-else>
        <p class="text-notice-mobile">Mở bằng Laptop em nhé</p>
      </div>
    </div>
    <div v-else>
      <div v-show="!love" class="loading">
        <div class="boxHeartImg">
          <div class="heartItem item1">
            <img src="@/assets/heart.png" alt="">
          </div>
          <div class="heartItem item2">
            <img src="@/assets/heart.png" alt="">
          </div>
          <div class="heartItem item3">
            <img src="@/assets/heart.png" alt="">
          </div>
        </div>
        <div class="heartBox">
          <div class="heart"></div>
        </div>
        <div class="progress-bar">
          <div class="progress" :style="{ width: percentWidth + '%' }"></div>
          <div class="percent">{{ count }}</div>
        </div>
        <h2 class="textBox">
          <span class="textLoad">loading love</span>
          <span class="cricle1">.</span>
          <span class="cricle2">.</span>
          <span class="cricle3">.</span>
        </h2>
        <div class="buttonCLick">
          <img src="@/assets/cursor.png" alt="">
          <div class="button" @click="navigateToLovePage">
            <p class="textBtn">{{ buttonText }}</p>
          </div>
        </div>
      </div>
      <div v-if="love">
        <Love :love="love" @showLetter="showLetter"/>
      </div>
    </div>
  </div>
</template>

<script>
import CountDown from "@/components/CountDown.vue";
import Love from "@/components/Love.vue";
export default {
  name: "App",
  components: {Love, CountDown},
  data() {
    return {
      isMobile: false,
      expired: false,
      count: 0,
      percentWidth: 0,
      heartLeft: -3.2,
      buttonTransform: '',
      buttonBackground: '',
      buttonWidth: '',
      buttonBorderRadius: '',
      buttonHeight: '',
      buttonText: '',
      cursorOpacity: 0,
      progressLoad: null,
      love: false,
      showLetters: false,
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
    showLetter(value) {
      this.showLetters = value
    },
    progressInterval() {
      if (this.count === 100 && this.percentWidth === 100) {
        clearInterval(this.progressLoad);
        const percent = document.querySelector(".percent");
        percent.style.letterSpacing = "1px";

        const textBox = document.querySelector(".textBox");
        textBox.style.transform = "scale(1.3)"

        const heartItem3 = document.querySelector(".heartItem.item3")
        heartItem3.style.animation = "1s heartScale forwards"

        const button = document.querySelector(".button");

        setTimeout(()=>{
          textBox.style.transform = "scale(0)"
        },400)
        setTimeout(()=>{
          textBox.style.opacity = "0"
        },600)
        setTimeout(()=>{
          button.style.transform= "scale(1)";
        },800);
        setTimeout(()=>{
          button.style.background = "rgb(244,118,121)"
          button.style.width = "130px";
          button.style.borderRadius = "20px"
        },1500)
        setTimeout(()=>{
          button.style.height = "40px";
        },2000)

        const textBtn = document.querySelector(".textBtn");

        setTimeout(()=>{
          textBtn.textContent = "Click me!"
          textBtn.style.color = "#fff"
        },2500)

        const cursor = document.querySelector(".buttonCLick img");
        setTimeout(()=>{
          cursor.style.opacity = "1";
        },3000)
      } else {
        const heartItem1 = document.querySelector(".heartItem.item1");
        const heartItem2 = document.querySelector(".heartItem.item2");
        const progress = document.querySelector(".progress");
        const percent = document.querySelector(".percent");
        const heartBox = document.querySelector(".heartBox");

        if(this.count == 10){
          heartItem1.style.animation = "1s heartScale forwards"
        }
        if(this.count ==46){
          percent.style.color= "#fff"
        }
        if(this.count == 60){
          heartItem2.style.animation = "1s heartScale forwards"
        }
        this.count += 1;
        this.percentWidth += 1;
        this.heartLeft += 0.968;
        progress.style.width = this.percentWidth + '%'
        percent.innerText = this.count + '%'
        heartBox.style.left = this.heartLeft + '%'
      }
    },
    navigateToLovePage() {
      this.buttonTransform = 'scale(0.8)';
      setTimeout(() => {
        this.buttonTransform = 'scale(1)';
        document.body.classList.remove('before');
        document.body.classList.remove('after');

        this.love = true
      }, 200);
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    timeRemaining(time) {
      if (time === 0) {
        this.expired = true
        document.body.classList.remove('before');
        document.body.classList.add('after');
        this.progressLoad = setInterval(this.progressInterval, 100);
      } else {
        document.body.classList.remove('after');
        document.body.classList.add('before');
      }
    }
  }
};
</script>
<style lang="scss">
.before {
  background-image: -webkit-gradient(radial, 50% 50%, 0, 50% 50%, 100, color-stop(0%, #374566), color-stop(100%, #010203));
  background-image: -webkit-radial-gradient(#374566, #010203);
  background-image: -moz-radial-gradient(#374566, #010203);
  background-image: -o-radial-gradient(#374566, #010203);
  background-image: radial-gradient(#374566, #010203);
}
.after {
  background: rgb(255, 218, 232);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.fade-out-collapse {
  opacity: 1;
  max-height: 1000px; /* A large value, so it doesn't affect element's height */
  transition: opacity 0.3s ease, max-height 0.3s ease;
}

.fade-out-collapse.hidden {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

audio::-webkit-media-controls-panel {
  background-color: #181E2C;
}
audio::-webkit-media-controls-enclosure {
  border-radius: 0;
}
</style>
