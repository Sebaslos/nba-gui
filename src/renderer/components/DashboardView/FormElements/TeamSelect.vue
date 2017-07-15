<template>
  <div>
    <label for="slteam">Player</label>
    <v-select id="slteam" label="name" :options="sortList" :on-change="emitTeam"></v-select>
  </div>
</template>

<script>
  import axios from 'axios'
  import vSelect from 'vue-select'

  export default {
    components: {
      vSelect
    },
    data () {
      return {
        team: {},
        teamList: []
      }
    },
    mounted () {
      this.getTeamList()
    },
    computed: {
      sortList () {
        return this.teamList.sort(function (a, b) {
            return a.name.localeCompare(b.name)
          }
        )
      }
    },
    methods: {
      emitOption () {
        this.$emit('getTeam', this.team);
      },
      emitTeam (val) {
        this.$emit('getTeam', val);
      },
      getTeamList () {
        axios.get('http://localhost:8080/team/all')
          .then(response => {
            this.teamList = response.data;
            console.log(this.teamList);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>