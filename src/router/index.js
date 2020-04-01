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
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "auth" */ '../views/Login.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "auth" */ '../views/Register.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import(/* webpackChunkName: "contact" */ '../views/ContactUs.vue')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/Profile.vue')
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
        path: 'support-requests',
        name: 'support-requests',
        component: () => import(/* webpackChunkName: "support" */ '../views/help/SupportRequests.vue')
      },
      {
        path: 'support-request/:supportrequestid',
        name: 'supportrequest',
        component: () => import(/* webpackChunkName: "support" */ '../views/help/SupportRequest.vue')
      },
      {
        path: 'volunteers',
        name: 'volunteers',
        component: () => import(/* webpackChunkName: "volunteers" */ '../views/help/Volunteers.vue')
      },
      {
        path: 'donations',
        name: 'donations',
        component: () => import(/* webpackChunkName: "donate" */ '../views/help/Donations.vue')
      },
      {
        path: 'donation/:donationid',
        name: 'donation',
        component: () => import(/* webpackChunkName: "donate" */ '../views/help/Donation.vue')
      },
      {
        path: 'donate',
        name: 'donate',
        component: () => import(/* webpackChunkName: "donate" */ '../views/help/Donate.vue')
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import(/* webpackChunkName: "admin" */ '../views/admin/Admin.vue')
      },
      {
        path: 'users/manage',
        name: 'manageusers',
        component: () => import(/* webpackChunkName: "admin" */ '../views/admin/ManageUsers.vue')
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
