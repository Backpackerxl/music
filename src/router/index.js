import { createRouter, createWebHistory } from 'vue-router'
import home from '@/components/home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },

  {
    path: '/listmusic',
    name: 'Listmusic',
    component: () => import('../components/Listmusic.vue')
  },
  {
    path: '/song',
    name: 'Song',
    component: () => import('../components/Song.vue')
  },
  {
    path: '/mv',
    name: 'Mv',
    component: () => import('../components/Mv.vue')
  },
  {
    path: '/discovery',
    name: 'Discovery',
    component: () => import('../components/Discovery.vue')
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import('../components/Result.vue')
  },
 {
   path: '/playlist',
    name: 'Playlist',
    component: () => import('../components/Playlist.vue')
  },
  {
    path: '/mvlist',
     name: 'Mvlist',
     component: () => import('../components/Mvlist.vue')
   }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  //hash:createWebHistory(process.env.BASE_URL),
  // mode: 'hash',
  // base: process.env.BASE_URL,
  routes
})

export default router
