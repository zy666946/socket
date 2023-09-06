import { createRouter, createWebHistory } from 'vue-router'
import talk from '../components/talk.vue'
import home from '../components/Home.vue'
import login from '../components/Login.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
	{
      		path: '/',
		redirect: {
			path: '/home/test'
		}
    	},
	{
		path: '/login',
		name: 'login',
		component: login
	},
	{
		path: '/home',
		redirect: {
			path: '/home/test'
		}
	},
	{
		path: '/home/:name',
		name: 'home',
		component: home
		  
	},
	{
		path: '/talk/:name/:toname',
		name: 'talk',
		component: talk,
		props: true
	}
	]
    })

export default router
