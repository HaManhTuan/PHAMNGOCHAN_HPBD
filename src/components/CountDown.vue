
<template>
  <div class="countdown">
    <flip-countdown :deadline="formattedDeadline"></flip-countdown>
  </div>
</template>
<script>
import FlipCountdown from 'vue2-flip-countdown'

export default {
  components: { FlipCountdown },
  data() {
    return {
      deadline: new Date("2023-09-27T00:00:00").getTime(),
      elapsedTime: null
    }
  },
  computed: {
    formattedDeadline() {
      return this.formatDate(new Date(this.deadline));
    },
  },
  mounted() {
    this.checkElapsedTime();
    this.interval = setInterval(this.checkElapsedTime, 1000); // Kiểm tra mỗi giây
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    checkElapsedTime() {
      const currentTime = new Date().getTime();
      if (currentTime >= this.deadline) {
        this.elapsedTime = "Time has elapsed!";
        this.$emit('timeRemaining', 0)
      } else {
        const remainingTime = this.deadline - currentTime;
        const seconds = Math.floor(remainingTime / 1000);
        this.elapsedTime = `${seconds} seconds left`;
        this.$emit('timeRemaining', seconds)
      }
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = this.padNumber(date.getMonth() + 1);
      const day = this.padNumber(date.getDate());
      const hours = this.padNumber(date.getHours());
      const minutes = this.padNumber(date.getMinutes());
      const seconds = this.padNumber(date.getSeconds());
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    padNumber(number) {
      return number.toString().padStart(2, "0");
    }
  }
}
</script>
<style scoped lang="scss">
.countdown {
  margin-top: 300px;
}
</style>

<style>
.flip-card__top, .flip-card__bottom, .flip-card__back-bottom, .flip-card__back::before, .flip-card__back::after {
  background: #f7f7f7 !important;
  color: #de4848 !important;
  border-top: solid 1px rgba(0, 0, 0, 0.1) !important;
}
.flip .flip-card__back::before, .flip .flip-card__back-4digits::before {
  
}
.flip-card {
  font-size: 4rem !important;
}
.flip-clock__slot {
  text-transform: uppercase;
  color: white;
}
.flip-clock__piece{
  margin: 0 25px;
}
</style>