let lsData = JSON.parse(window.localStorage.getItem('user'))
if (!lsData) {
	window.location.href = './verifyPhone.html'
} else if (-1 == lsData.authorities.indexOf('ROLE_SERVICE_MANAGER')) {
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
