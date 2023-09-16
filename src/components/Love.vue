<script>
function getHeart(e){
  const mainLoveElement = document.querySelector(".main-love"); // Tìm thẻ có class "main-love"
        if (mainLoveElement) {
          let ele = document.createElement("div");
          mainLoveElement.appendChild(ele);
          ele.className = "element"
          mainLoveElement.prepend(ele)
          ele.style.left = e.clientX + 'px';
          ele.style.top = e.clientY -10 +'px';
          setTimeout(()=>{
            let text = document.querySelectorAll(".element")[0],
                directionX = Math.random() < .5 ? -1 : 1,
                directionY = Math.random() < .5 ? -1 : 1

            text.style.left = parseInt(text.style.left) - (directionX * (Math.random() * 100)) + 'px';
            text.style.top = parseInt(text.style.top) - (directionY * (Math.random() * 100)) + 'px';
            text.style.opacity = 0;
            text.style.transform = 'scale(0.4)'
            text.innerHTML = "💗"
            text.style.zIndex = "100"

            setTimeout(()=>{
              ele.remove()
            },1000)
          },10)
        }
}
const textToType = "Phạm Ngọc Hân";
const typingSpeed = 100; // milliseconds per character

let charIndex = 0;

let indexText = 0;
const textLetterH2 = "Gửi em! 💗";
let timoutTextLetter;

let indexTextContent = 0;
const textLetterP = "Nhân ngày sinh nhật, anh chúc cô gái của anh luôn luôn xinh đẹp, yêu đời và tràn đầy năng lượng. Anh sẽ luôn là người đứng sau em, là bờ vai vững chắc để em dựa vào, đồng hành và hỗ trợ em trên mọi con đường đến với thành công. Chúc mừng sinh nhật tình yêu 💗 của anh!";
let timoutTextLetterContent;
export default {
  props: {
    love: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.love) {
      this.init();
    }

    setTimeout(() => {
      this.loading = true
    }, 2000)
  },
  data() {
    return {
      textLetter: '',
      text: '',
      textButton: null,
      letterImageSrc: require('@/assets/letters.png'),
      audioSrc: require('@/assets/media/audio.mp3'),
      isPlaying: false,
      textLetterContent: '',
      showTextLetter: false,
      showTextLetter2: false,
      loading: false,
    }
  },
  methods: {
    init() {
      if (this.love) {
        this.removePreloading();
        this.fadeOutLoadingLove();
        this.handleMouseEvents();


        setTimeout(()=>{
          this.typeText();
        }, 11500)

      }
    },
    typeText() {
      if (charIndex < textToType.length) {
        this.text += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(this.typeText, typingSpeed);
      }
      if(this.text.length === textToType.length){
        setTimeout(()=>{
          if (this.$refs.cricleBtn && this.$refs.buttonLove) {
            this.$refs.buttonLove.style.transform = "translateY(0%)"
            this.$refs.cricleBtn.style.transform = "scale(0.1)"
          }
        },1000)
        setTimeout(()=>{
          if(this.$refs.cricleBtn && this.$refs.cricleBtn) {
            this.$refs.cricleBtn.style.transform = "scale(1)"
            this.$refs.cricleBtn.innerHTML = "💗"
          }
        },2000)
        setTimeout(()=>{
          if (this.$refs.buttonLove && this.$refs.button) {
            this.$refs.buttonLove.style.width = "120px"
            this.$refs.button.style.transform = "translateX(25px)"
          }
        },2500)
        setTimeout(()=>{
          if ( this.$refs.button) { 
            this.$refs.button.style.width = "calc(100% - 25px)"
            this.$refs.button.style.height = "10px"
          }
        
        },3000)
        setTimeout(()=>{
          if ( this.$refs.button) { 
            this.$refs.button.style.height = "30px"
          } 
        },3500)
        setTimeout(()=>{
          this.textButton = 'Nhận thư'
        },4000)
      }
    },
    removePreloading() {
      document.body.classList.remove("preloading");
    },
    fadeOutLoadingLove() {
      setTimeout(() => {
        // Equivalent of $('.loadingLove').delay(1000).fadeOut('fast');
        document.querySelector('.loadingLove').style.opacity = 0;
        setTimeout(() => {
          document.querySelector('.loadingLove').style.display = "none";
        }, 1000);
      }, 1000);
    },
    handleMouseEvents() {
      document.onmousemove = function(e){
        getHeart(e)
      }
      document.onmousedown = (e)=>{
        getHeart(e)
      }
    },
    clickButtonLove() {
      this.timeout = setInterval(() => {
        const mainLoveElement = document.querySelector(".main-love"); // Tìm thẻ có class "main-love"
        if (mainLoveElement) {
          const letters = document.createElement("div"); // Tạo thẻ div mới
          mainLoveElement.appendChild(letters); // Thêm thẻ div mới vào thẻ "main-love"
        // const letters = document.createElement("div");
        letters.className = "letters";
        const img = document.createElement("img");
        img.src = this.letterImageSrc; // Sử dụng đường dẫn hình ảnh từ dữ liệu Vue
        letters.appendChild(img); // Thêm hình ảnh vào letters
        mainLoveElement.prepend(letters);
        let left = Math.floor(Math.random() * 100);
        let rotate = Math.floor(Math.random() * 360);
        letters.style.left = left + "%";
        letters.style.top = "-10%";
        letters.style.transform = `rotate(${rotate}deg)`;
        setTimeout(() => {
          letters.style.top = "100%";
        }, 1000);
        setTimeout(() => {
          letters.remove();
        }, 14000);
          const audioPlayer = this.$refs.audioPlayer;
          audioPlayer.play();
        }
      }, 500);
      setTimeout(() => {
        this.$refs.wrapperLetterForm.style.display = "block";
        this.funcTimeoutLetter()
      }, 5000)
    },
    closePopup() {
      this.$refs.wrapperLetterForm.style.display = "none";
      this.showTextLetter2 = true
      const audioPlayer = this.$refs.audioPlayer;
      audioPlayer.end();
    },

    clickOpenPopup() {
      this.$refs.wrapperLetterForm.style.display = "block"
      const audioPlayer = this.$refs.audioPlayer;
      audioPlayer.play();
    },

    funcTimeoutLetter() {
      indexText = 0; // Reset indexText
      this.textLetter= ''; // Xóa nội dung hiện tại của textLetter
      clearInterval(timoutTextLetter);
      timoutTextLetter =  setInterval(()=>{
        this.textCharLetter();
      }, 200)
    },
    textCharLetter() {
      if (indexText < textLetterH2.length) {
        this.textLetter += textLetterH2[indexText];
        indexText++;
        setTimeout(indexText, 100);
      }
      else{
        clearInterval(timoutTextLetter);
        setTimeout(() => {
          this.funcTimeoutLetterContent()
        },500)
      }
    },
    funcTimeoutLetterContent() {
      indexTextContent = 0; // Reset indexTextContent
      this.textLetterContent = ''; // Xóa nội dung hiện tại của textLetter
      clearInterval(timoutTextLetterContent);
      timoutTextLetterContent =  setInterval(()=>{
        this.textCharLetterContent();
      }, 100)
    },
    textCharLetterContent(){
      if (indexTextContent < textLetterP.length) {
        this.textLetterContent += textLetterP[indexTextContent];
        indexTextContent++;
        setTimeout(indexTextContent, 100);
      }
      else{
        clearInterval(timoutTextLetterContent)

      }
    }
  }
}
</script>

<template>
  <div class="main-love">
    <div class="container-image transY" v-if="loading">
        <div class="container-inner">
          <img src="@/assets/avatar.jpg" alt="">  
        </div>
    </div>

    <div class="container-image transY-2" v-if="loading">
        <div class="container-inner">
          <img src="@/assets/avatar_2.jpg" alt="">
        </div>
    </div>
    <div class="wrapper">
      <!-- <img src="../thư love.png" alt=""> -->
      <div class="formInput">

        <div class="boxHands">
          <div class="handsCat">
            <img src="@/assets/handsCat.png" alt="">
          </div>
          <h1>Welcome</h1>
        </div>
        <div class="boxSlider">
          <div class="listSlider">
            <div class="slider">
              <img src="@/assets/Anh5.jpg" alt="">
            </div>
          </div>
        </div>
        <div class="boxHandsInput">
          <div class="handsCatImgInput">
            <img src="@/assets/handsCat.png" alt="">
          </div>
          <input type="text" v-model="text" id="inputField" placeholder="........................................................." readonly>
        </div>
        <div class="buttonLove" ref="buttonLove">
          <div class="cricleBtn" ref="cricleBtn"></div>
          <div class="button" ref="button" @click="clickButtonLove">{{ textButton }}</div>
          <img src="@/assets/letter_2.webp" class="letter_2" v-if="showTextLetter2" @click="clickOpenPopup">
        </div>
      </div>
      <div class="boxLine">
        <div class="boxCar">
          <img src="@/assets/car.gif" alt="">
        </div>
        <div class="boxHeart">
          <div class="heart1"></div>
          <div class="heart2"></div>
          <div class="heart3"></div>
          <div class="heart4"></div>
          <div class="heart5"></div>
          <div class="heart6"></div>
        </div>
        <div class="ground-line">
          <div>
            <span class="line1"></span>
            <span class="line2"></span>
            <span class="line3"></span>
            <span class="line4"></span>
            <span class="line5"></span>
            <span class="line1"></span>
            <span class="line2"></span>
            <span class="line3"></span>
            <span class="line4"></span>
            <span class="line5"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="loadingLove" ref="loadingLove">
      <div class="rhombus">
        <div class="circle1"></div>
        <div class="circle2"></div>
      </div>
    </div>

    <div class="wrapperLetterForm" ref="wrapperLetterForm">
      <div class="boxLetter" @click="closePopup">
        <i class="fa-solid fa-xmark"></i>
        <div class="formLetter">
          <div class="heartLetter">
            <div class="heartLetterItem"></div>
          </div>
          <div class="heartLetter">
            <div class="heartLetterItem"></div>
          </div>

          <div class="wrapperLetter">
            <div class="giftbox">
              <div class="img">
                <img src="@/assets/giftbox.png" alt="">
              </div>
            </div>
            <div class="textLetter">
              <h2>{{ textLetter }}</h2>
              <p class="contentLetter"> {{ textLetterContent }}</p>
              <div class="heartAnimation">
                <img src="@/assets/heartAnimation.gif" alt="">
              </div>
            </div>
            <div class="mewmew1">
              <img src="@/assets/mewmew.gif" alt="">
            </div>
            <div class="mewmew2">
              <img src="@/assets/mewmew.gif" alt="">
            </div>
          </div>
        </div>
        <div class="before"></div>
      </div>
    </div>
    <audio ref="audioPlayer" :src="audioSrc"></audio>

  </div>
</template>

<style scoped lang="scss">
body{
  overflow: hidden;
}
.listSlider {
  margin-top: 40px;
}
</style>