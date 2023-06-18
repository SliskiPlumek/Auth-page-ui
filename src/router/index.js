import {createRouter, createWebHistory} from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Navigation from '../views/Navigation.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },

    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },

    {
        path: '/',
        name: 'Main',
        component: Navigation
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
