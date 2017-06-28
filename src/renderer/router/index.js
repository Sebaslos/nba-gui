import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dashboard',
      component: require('@/components/DashboardView'),
      children: [
        {
          path: '',
          component: require('@/components/DashboardView/AppContent')
        },
        {
          path: 'player',
          component: require('@/components/DashboardView/PlayerView/PlayerShotZoneView')
        },
        {
          path: 'player/shotzonewithtype',
          component: require('@/components/DashboardView/PlayerView/PlayerShotZWA')
        }
      ]
    },
    {
      path: '*',
      redirect: '/dashboard'
    },
    {
      path: '/help',
      component: require('@/components/LandingPage')
    }
  ]
})
