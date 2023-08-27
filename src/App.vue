<template>
  <div id="app">
    <div class="player">
      <av-circle
          playtime-color="#DB485E"
          audio-class="audio-class fade-out-collapse"
          canv-class="canvas-audio"
          :playtime="true"
          progress-color="#DB485E"
          bar-color="#F75A71"
          :audio-src="audioFile"
          @playing="playing"
          @ended="end"
      ></av-circle>
    </div>
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
        <img src="https://scontent.xx.fbcdn.net/v/t39.1997-6/10935977_1435051876785769_939426339_n.webp?_nc_cat=1&ccb=1-7&_nc_sid=0572db&_nc_ohc=NpyPdUQPF0wAX9_auYx&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=00_AfCW2d6Jt58L-tG10VrjRA-S7NjK2oLGfbIF2o_1osTN7w&oe=64F052E9" class="img-final">
      </div>
      <div v-else>
        <p class="text-notice-mobile">Hãy truy cập bằng Laptop</p>
      </div>
    </div>
    <div v-else>
      Main
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
      isMobile: false,
      expired: false,
      audio: null,
      audioPlaying: false,
      audioFile: require('@/assets/media/HappyBirthdayRemix-DJ-4052574.mp3')

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
    toggleAudio() {
      if (!this.audio) {
        this.audio = new Audio(require('@/assets/media/HappyBirthdayRemix-DJ-4052574.mp3'));
        this.audio.onended = () => {
          this.audioPlaying = false;
        };
      }

      if (this.audioPlaying) {
        this.audio.pause();
      } else {
        this.audio.play();
      }

      this.audioPlaying = !this.audioPlaying;
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    timeRemaining(time) {
      if (time === 0) {
        this.expired = true
        console.log('1234')
      }
    },
    playing() {
      const audioElement = this.$el.querySelector('.audio-class');
      if (audioElement) {
        audioElement.classList.add('hidden');
      }
    },
    end() {
      const audioElement = this.$el.querySelector('.audio-class');
      if (audioElement) {
        audioElement.classList.remove('hidden');
      }
    }
  }
};
</script>
<style lang="scss">
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
