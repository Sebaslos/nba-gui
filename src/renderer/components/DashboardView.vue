<template>
  <div>
    <app-nav></app-nav>

    <div class="container-fluid">
      <div class="row">
        <app-sidebar></app-sidebar>
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  import AppNav from './DashboardView/AppNav'
  import AppSidebar from './DashboardView/AppSidebar'
  export default {
    components: {
      AppNav,
      AppSidebar
    }
  }
</script>