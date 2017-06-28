<template>
  <div>
    <label for="slplayer">Player</label>
<!--    <select class="form-control" id="slplayer" @change="emitOption" v-model="player">
      <option v-for="option in sortList" v-bind:value="option">
        {{ option.name }}
      </option>
:value.sync="player"
    </select>-->
    <v-select id="slplayer" label="name" :options="sortList" :on-change="emitPlayer"></v-select>

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
        player: {},
        playerList: []
      }
    },
    mounted () {
      this.getPlayerList()
    },
    computed: {
      sortList () {
        return this.playerList.sort(function (a, b) {
            return a.name.localeCompare(b.name)
          }
        )
      }
    },
    methods: {
      emitOption () {
        this.$emit('getPlayer', this.player);
      },
      emitPlayer (val) {
        this.$emit('getPlayer', val);
      },
      getPlayerList () {
        axios.get('http://localhost:8080/player/all')
          .then(response => {
            this.playerList = response.data;
            console.log(this.playerList);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>