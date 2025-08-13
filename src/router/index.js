// import { createRouter, createWebHistory } from 'vue-router'

// Hash
import { createWebHashHistory, createRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),

  // hash
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
  ],
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)customToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
  const isLoggedIn = !!token;

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});


export default router
