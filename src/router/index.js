import Vue from 'vue'
import VueRouter from 'vue-router'
import Shop from '../components/Shop'
import Cart from '../components/Cart'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/shop'
    // component: App
  },
  {
    path: '/shop',
    name: 'shop',
    component: Shop
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
