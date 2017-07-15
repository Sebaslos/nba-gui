<template>
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <!-- <a class="navbar-brand" href="http://getbootstrap.com/examples/dashboard/#">NBA Analyse</a> -->
        <router-link to="/" class="navbar-brand">NBA Analyse</router-link>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav navbar-right">
          <li><a @click="go">Dashboard</a></li>
          <!--<li><router-link to="/import">Import</router-link></li>-->
          <li><a @click="openImportView">Import</a></li>
          <li><a>Settings</a></li>
          <!--<li><router-link to="/help">Help</router-link></li>-->
        </ul>
<!--        <form class="navbar-form navbar-right">
          <input type="text" class="form-control" placeholder="Search...">
        </form>-->
      </div>
    </div>
  </nav>
</template>

<script>
  import {ipcRenderer} from 'electron'

  export default {
    methods: {
      go () {
        this.$router.push("/")
      },
      openImportView () {
        ipcRenderer.send('open-import-window');
      }
    }
  }
</script>

<style>
  a {
    cursor: pointer;
  }
</style>