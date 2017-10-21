import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/home/home'
import Login from '@/components/login/login'
import Register from '@/components/login/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Home
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    },
    {
      path: '/home',
      component: Home,
      children: [
        {path: '/', name: 'hello', component: Hello}
        // {path: 'hello', name: 'hello', component: Hello}
      ]
    }
  ]
})

