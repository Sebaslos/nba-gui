<template>
  <div>
    <label for="slseason">Season</label>
    <select class="form-control" id="slseason" @change="emitOption" v-model="season">
      <option>2016-17</option>
      <option>2015-16</option>
      <option>2014-15</option>
      <option>2013-14</option>
    </select>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        season: '2014-15'
      }
    },
    mounted () {
      this.emitOption()
    },
    methods: {
      emitOption () {
        this.$emit('getSeason', this.season);
      }
    }
  }
</script>