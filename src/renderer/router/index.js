import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: require('@/components/DashboardView')
        },
        {
            path: '*',
            redirect: '/'
        },
        {
            path: '/help',
            component: require('@/components/LandingPage')
        }
    ]
})
