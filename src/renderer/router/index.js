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
        },
        {
          path: 'team/3pointstrend',
          component: require('@/components/DashboardView/TeamView/Team3PTrend')
        },
        {
          path: 'team/3pointszone',
          component: require('@/components/DashboardView/TeamView/Team3PZone')
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
