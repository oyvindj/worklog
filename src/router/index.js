import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Callback from '@/components/Callback'
import WorkList from '@/components/WorkList'
import TodoList from '@/components/TodoList'
import CreateTodo from '@/components/CreateTodo'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/createtodo',
      name: 'CreateTodo',
      component: CreateTodo
    }, {
      path: '/todolist',
      name: 'TodoList',
      component: TodoList
    }, {
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
