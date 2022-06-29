import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas, far)
Vue.component('font-awesome-icon', FontAwesomeIcon)
import LangFlag from 'vue-lang-code-flags';
Vue.component('lang-flag', LangFlag);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
