<template>
  <div class="col-sm-3 col-md-2 sidebar">
    <ul class="nav nav-sidebar">
      <li class="active"><a href="http://getbootstrap.com/examples/dashboard/#">Overview <span
          class="sr-only">(current)</span></a></li>
      <li><a href="http://getbootstrap.com/examples/dashboard/#">Reports</a></li>
      <li><a href="http://getbootstrap.com/examples/dashboard/#">Analytics</a></li>
      <li><a href="http://getbootstrap.com/examples/dashboard/#">Export</a></li>
    </ul>
    <ul class="nav nav-sidebar">
      <li><a href="#">Player</a></li>
      <!--<li><a href="#" @click="updateData('Shot Zone', 'zonequote')">Shot Zone</a></li>-->
      <li><router-link to="/dashboard/player">Shot Zone</router-link></li>
      <li><a href="#" @click="updateData('Shot Type', 'typequote')">Shot Type</a></li>
      <li><router-link to="/dashboard/player/shotzonewithtype">Shot Type in Zone</router-link></li>
    </ul>
    <ul class="nav nav-sidebar">
      <li><a href="#">Team</a></li>
      <li><a href="#" @click="updateData('Team 3 Points Trend', 'team3point')">3 Points Trend</a></li>
    </ul>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import axios from 'axios'

  export default {
    methods: {
      ...mapActions([
        'updateTable'
      ]),
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