import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//import css
import './assets/css/reset.css'
import './assets/css/base.css'

//router vue
import VueRouter from 'vue-router'
import routes from "./routes";
Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  routes
})

// vuex
import {store} from './store'

// change title for each page
const DEFAULT_TITLE = "Todo list";
router.afterEach(to =>{
  Vue.nextTick(()=>{
    document.title = to.meta.title || DEFAULT_TITLE;
  })
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
