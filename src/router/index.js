import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/dashboard/HomeView.vue'
import DetailMedicine from '../views/dashboard/DetailMedicine.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import Cart from '../views/dashboard/Cart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/dashboard/AboutView.vue')
    },
    {
      path: '/detailMedicine/:id',
      name: 'detailMedicine',
      component: DetailMedicine
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    }
  ]
})

export default router
