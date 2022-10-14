// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import serve from '@/service/api'
import request from "@/service/request.js"
import bodyParser from 'body-parser'
import ECharts from 'echarts'
import validateCode from "@/components/ValidateCode"
//Vue.config.lang = 'en'
Vue.use(ElementUI, { enLocale })
Vue.use(validateCode)
Vue.prototype.$bodyParser = bodyParser
Vue.prototype.$request = request
Vue.prototype.$http = axios
Vue.prototype.$serve = serve
Vue.prototype.$echarts = ECharts
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, validateCode },
  template: '<App/>'
})
