import { createRouter, createWebHistory } from 'vue-router'
import {useUserStore} from "@/stores/user.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/MainView.vue')
    },
    {
      path: '/controlDatabase',
      name: 'controlDatabase',
      component: () => import('../views/MainView.vue')
    },
    {
      path: '/logs',
      name: 'logs',
      component: () => import('../views/LogsView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
  ]
})

router.beforeEach((to, from)=>{
  const {token} = useUserStore()

  if(token == null && to.name != 'login') {
    router.replace({name: 'login'})
    return false
  }else if(token == null && to.name == 'login'){
    return true
  }else return true
})

export default router
