import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/notation',
            name: 'notation',
            component: () => import('../views/NotationView.vue')
        },
        {
            path: '/time-signature',
            name: 'time-signature',
            component: () => import('../views/TimeSignatureView.vue')
        }
    ]
})

export default router
