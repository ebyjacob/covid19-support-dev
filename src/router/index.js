import Vue from 'vue'
import VueRouter from 'vue-router'
const DefaultContainer = () => import('@/containers/DefaultContainer');
const NotFound = () => import('@/views/NotFound')

import Welcome from '../views/Welcome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/welcome',
    component: DefaultContainer,
    children: [
      {
        path: '',
        name: 'Home',
        redirect: '/welcome'
      },
      {
        path: 'welcome',
        name: 'welcome',
        component: Welcome
      },
      {
        path: 'about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: 'need/support',
        name: 'request-support',
        component: () => import(/* webpackChunkName: "suppport" */ '../views/help/RequestSupport.vue')
      },
      {
        path: 'can/support',
        name: 'offer-support',
        component: () => import(/* webpackChunkName: "suppport" */ '../views/help/OfferSupport.vue')
      },
      {
        path: 'donate',
        name: 'donate',
        component: () => import(/* webpackChunkName: "donate" */ '../views/help/Donate.vue')
      },
      {
        path: 'sorry',
        name: 'sorry',
        component: NotFound
      },
      { 
        path: '*', 
        redirect: '/sorry' 
      }    
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
