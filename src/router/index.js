import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Start from '@/components/Start'
import QuizRunner from '@/components/QuizRunner'
import CreateQuiz from '@/components/CreateQuiz'
import Callback from '@/components/Callback'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    }, {
      path: '/createquiz',
      name: 'CreateQuiz',
      component: CreateQuiz
    }, {
      path: '/quizrunner',
      name: 'QuizRunner',
      component: QuizRunner
    }, {
      path: '/start',
      name: 'Start',
      component: Start
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
