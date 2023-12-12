import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixins from './mixins'
import importComponent from './components'
import importDirective from './directive'
import axios from './lib/axios'
import 'amfe-flexible'

Vue.config.productionTip = false

importComponent(Vue)
importDirective(Vue)
Vue.mixin(mixins)

Vue.prototype.$http = axios

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

// store 恢复
// if (sessionStorage.getItem('VUEX_STORE')) {
//     store.replaceState(Object.assign(store.state, JSON.parse(sessionStorage.getItem('VUEX_STORE'))))
//     sessionStorage.removeItem('VUEX_STORE')
// }

// // 页面刷新或离开
// window.onunload = function () {
//     sessionStorage.setItem('VUEX_STORE', JSON.stringify(store.state))
// }
