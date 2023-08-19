import { createRouter, createWebHistory } from 'vue-router'
import socket from '../components/socket.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'socket',
      component: socket
    }
  ]
})

export default router
