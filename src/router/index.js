import Vue from 'vue'
import VueRouter from 'vue-router'
import Shop from '../components/Shop'
import Cart from '../components/Cart'
import SingleProduct from '../components/SingleProduct'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/shop'    
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
  },
  {
    path: '/products/:id',
    name: 'SingleProduct',
    component: SingleProduct
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
