import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Callback from '@/components/Callback'
import WorkList from '@/components/WorkList'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/worklist',
      name: 'Worklist',
      component: WorkList
    }, {
      path: '/home',
      name: 'Home',
      component: Home
    }, {
      path: '/callback',
      name: 'Callback',
      component: Callback
    }, {
      path: '*',
      redirect: '/home'
    }
  ]
})

export default router
