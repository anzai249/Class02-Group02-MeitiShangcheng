import Vue from 'vue'
import Router from 'vue-router'
import UserLogin from '@/intro/UserLogin'
import manageSystem from '@/managers/manageSystem'
import employeeSystem from '@/employees/employeeSystem'
import attendanceCheck from '@/employees/attendanceCheck'
import editInformation from '@/employees/editInformation'
import sellingSystem from '@/employees/sellingSystem'
import employeeManager from '@/managers/employeeManager'
import depotManager from '@/managers/depotManager'
import staticView from '@/managers/staticView'
import editManInfo from '@/managers/editManInfo'
import adminSystem from '@/administrator/adminSystem'
import editManagers from '@/administrator/editManagers'
import quickActions from '@/administrator/quickActions'
import ElementUI from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import serve from '@/service/api'

Vue.prototype.$serve = serve
Vue.use(Router)
Vue.use(ElementUI, { enLocale })

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/manageSystem',
      name: 'manageSystem',
      component: manageSystem,
      children: [{
        path: '/manageSystem/employeeManager',
        name: 'employeeManager',
        component: employeeManager
      },
      {
        path: '/manageSystem/depotManager',
        name: 'depotManager',
        component: depotManager
      },
      {
        path: '/manageSystem/staticView',
        name: 'staticView',
        component: staticView
      },
      {
        path: '/manageSystem/editManInfo',
        name: 'editManInfo',
        component: editManInfo
      }
      ]
    },
    {
      path: '/employeeSystem',
      name: 'employeeSystem',
      component: employeeSystem,
      children: [{
        path: '/employeeSystem/attendanceCheck',
        name: 'attendanceCheck',
        component: attendanceCheck
      },
      {
        path: '/employeeSystem/editInformation',
        name: 'editInformation',
        component: editInformation
      },
      {
        path: '/employeeSystem/sellingSystem',
        name: 'sellingSystem',
        component: sellingSystem
      }
      ]
    },
    {
      path: '/adminSystem',
      name: 'adminSystem',
      component: adminSystem,
      children: [{
        path: '/adminSystem/editManagers',
        name: 'editManagers',
        component: editManagers
      },
      {
        path: '/adminSystem/quickActions',
        name: 'quickActions',
        component: quickActions
      }
      ]
    }
  ]
})