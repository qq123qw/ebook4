/*
import Vue from 'vue'
import App from './index'
import MpvueRouter from 'mpvue-router-patch'

// add this to handle exception
Vue.use(MpvueRouter)

Vue.config.errorHandler = function (err) {
  if (console && console.error) {/!**!/
    console.error(err)
  }
}

const app = new Vue(App)
app.$mount()
*/
import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
