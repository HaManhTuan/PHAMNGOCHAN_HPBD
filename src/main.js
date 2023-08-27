import Vue from 'vue'
import App from './App.vue'

import AudioVisual from 'vue-audio-visual'


import "./styles/index.scss"

Vue.config.productionTip = false

Vue.use(AudioVisual)

new Vue({
  render: h => h(App),
}).$mount('#app')
