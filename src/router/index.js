import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { useAuthStore } from '@/stores/authentication';
import { defineComponent } from 'vue'

import AboutView from '../views/dashboard/AboutView.vue'
import HomeView from '../views/dashboard/HomeView.vue'
import DetailMedicine from '../views/dashboard/DetailMedicine.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import Cart from '../views/dashboard/Cart.vue'
import App from '../App.vue'
import Profile from '../views/dashboard/Profile.vue'
import Transaction from '@/views/dashboard/Transaction.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
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
      path: '/transaction',
      name: 'transaction',
      component: Transaction,
      meta: {
        requiresAuth: true 
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta: {
        requiresAuth: true 
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true 
      }
    }
  ],
  
})

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

const auth = useAuthStore()

router.beforeEach((to, from, next) => {
  const isAuthenticated = auth.isLoggedIn || localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
