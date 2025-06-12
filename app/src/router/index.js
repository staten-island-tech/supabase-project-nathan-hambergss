import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ExploreUsers from '@/views/ExploreUsers.vue'
import UserProfileView from '@/views/UserProfileView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/anime',
      name: 'anime',
      component: () => import('@/views/AnimeView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue'),
    },
    {
      path: '/checkemail',
      name: 'checkemail',
      component: () => import('@/views/CheckEmail.vue'),
    },
    { path: '/profile', name: 'Profile', component: () => import('@/views/ProfileView.vue') },
    {
      path: '/info/:mal_id',
      name: 'info',
      component: () => import('@/views/InfoView.vue'),
    },

    {
      path: '/explore',
      name: 'Explore',
      component: () => import('@/views/ExploreUsers.vue'),
    },
    {
      path: '/user/:id',
      name: 'UserProfile',
      component: UserProfileView,
    },
  ],
})

export default router
