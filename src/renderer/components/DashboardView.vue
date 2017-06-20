<template>
    <div>
        <app-nav></app-nav>
        <app-view></app-view>
    </div>
</template>

<script>
  import AppNav from './DashboardView/AppNav'
  import AppView from './DashboardView/AppView'
  export default {
    components: {
      AppNav,
      AppView
    }
  }
</script>