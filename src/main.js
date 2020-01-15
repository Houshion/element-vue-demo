import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css
import '@/styles/o_index.less' // ocean's global css
import '@/styles/Theme-less/marginPadding.less' // ocean's global css
import '@/styles/o_color.less' // ocean's color css

import ECharts from 'vue-echarts' // echarts
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
Vue.component('v-chart', ECharts)

import components from "@/components"
Vue.use(components)

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
Object.keys(filters).forEach(key => { //返回filters对象中属性名组成的数组
  Vue.filter(key, filters[key])
})

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  // mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false

const Bus = new Vue()

new Vue({
  el: '#app',
  router,
  store,
  data: {
    Bus
  },
  render: h => h(App)
})
