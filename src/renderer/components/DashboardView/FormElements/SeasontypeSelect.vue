<template>
  <div>
    <label for="sltype">Season Type</label>
    <select class="form-control" id="sltype" @change="emitOption" v-model="seasonType">
      <option>Preseason</option>
      <option>Regular Season</option>
      <option>Playoffs</option>
    </select>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        seasonType: 'Regular Season'
      }
    },
    mounted () {
      this.emitOption()
    },
    methods: {
      emitOption () {
        this.$emit('getSeasonType', this.seasonType);
      }
    }
  }
</script>