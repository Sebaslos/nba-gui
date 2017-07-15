<template>
  <div class="col-sm-3 col-md-2 sidebar">
    <ul class="nav nav-sidebar">
      <!--<li class="active"><a href="/">Overview <span-->
      <!--class="sr-only">(current)</span></a></li>-->
      <!--<li><a href="http://getbootstrap.com/examples/dashboard/#">Reports</a></li>-->
      <!--<li class="active"><a href="http://getbootstrap.com/examples/dashboard/#">Analytics</a></li>-->
      <!--<li><a href="http://getbootstrap.com/examples/dashboard/#">Export</a></li>-->
      <li class="active">
        <router-link to="/">Overview</router-link>
      </li>
    </ul>
    <ul class="nav nav-sidebar">
      <li class="disabled"><a style="cursor: default">Player</a></li>
      <li><a @click="update('Shot Zone', 'shotzone')">Shot Zone</a></li>
      <!--<li><router-link to="/dashboard/player" @click="updateView('Shot Zone', 'shotzone')">Shot Zone</router-link></li>-->
      <!--<li><a href="#" @click="updateData('Shot Type', 'typequote')">Shot Type</a></li>-->
      <li><a @click="update('Shot Type', 'shottype')">Shot Type</a></li>
      <li>
        <router-link to="/dashboard/player/shotzonewithtype">Shot Type in Zone</router-link>
      </li>
    </ul>
    <ul class="nav nav-sidebar">
      <li class="disabled"><a style="cursor: default">Team</a></li>
      <li>
        <router-link to="/dashboard/team/3pointstrend">3 Points Trend</router-link>
      </li>
      <!--<li><a href="#" @click="updateData('Team 3 Points Trend', 'team3point')">3 Points Trend</a></li>-->
    </ul>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import axios from 'axios'

  export default {
    methods: {
      ...mapActions([
        'updateTable',
        'updateView'
      ]),
      update (title, endpoint) {
        this.updateView({
          sectionTitle: title,
          endpoint: endpoint
        });
        this.$router.push('/dashboard/player');
//        this.$router.push({
//          name: 'playershot',
//          params: {
//            title: title,
//            endpoint: endpoint
//          }
//        })
      },
      updateData (title, endpoint) {
        axios.get('http://localhost:8080/' + endpoint)
          .then(response => {
            var teaminfo = response.data;
            this.updateTable({
              sectionTitle: title,
              tableData: teaminfo
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>