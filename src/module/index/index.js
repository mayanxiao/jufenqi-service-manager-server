if (!window.localStorage.getItem('service-manager')) {
  window.location.href = `./verifyPhone.html`
}
import Vue from 'vue'
import App from './app'
import vueTap from 'v-tap'

Vue.use(vueTap)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
