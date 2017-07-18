<template>
  <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
    <h1 class="page-header">Player Shot Analyse</h1>

    <div class="form-group row">
      <div class="col-xs-3">
        <season-select v-on:getSeason="setSeason"></season-select>
      </div>

      <div class="col-xs-3">
        <seasontype-select v-on:getSeasonType="setSeasonType"></seasontype-select>
      </div>

      <div class="col-xs-6">
        <player-select v-on:getPlayer="setPlayer"></player-select>
      </div>
    </div>

    <div>
      <button type="button" class="btn btn-primary btn-block" @click="getTableData">Run</button>
    </div>

    <h2 class="sub-header">Shot Type in Zone Table</h2>

    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
        <tr>
          <th v-for="header in tableData.headers">
            {{ header }}
          </th>
        </tr>
        </thead>
        <tbody>
        <!--<tr v-for="row in tableData.rowSet">-->
        <tr v-for="row in zoneTypeData">
          <!--<td v-for="value in row">-->
          <!--{{ value }}-->
          <!--</td>-->
          <td :rowspan="row[4]" v-show="row[5]">{{ row[0] }}</td>
          <td>{{ row[1] }}</td>
          <td>{{ row[2] }}</td>
          <td>{{ row[3] }}</td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>


<script>
  import axios from 'axios'

  import SeasonSelect from '../FormElements/SeasonSelect'
  import SeasontypeSelect from '../FormElements/SeasontypeSelect'
  import PlayerSelect from '../FormElements/PlayerSelect'

  export default {
    components: {
      SeasonSelect,
      SeasontypeSelect,
      PlayerSelect,
    },
    data () {
      return {
        season: '',
        seasonType: '',
        player: {},
        tableData: {},
        zoneTypeData: []
      }
    },
    methods: {
      setSeason (season) {
        this.season = season
      },
      setSeasonType (seasonType) {
        this.seasonType = seasonType
      },
      setPlayer (player) {
        this.player = player
      },
      combineCell () {
        let rowSet = this.tableData.rowSet;
        let length = rowSet.length;
//        let rowspan = 1;
        for (let i = 0; i < length; i++) {
//          let row = rowSet[i];
          if (rowSet[i][0] !== "Sum") {
            rowSet[i][4] = 1;
            rowSet[i][5] = false;

            let j = i + 1;
            for (; j < length; j++) {
              if (rowSet[i][0] === rowSet[j][0] && rowSet[j][0] !== "Sum") {
                rowSet[i][4]++;
                rowSet[i][5] = true;
                rowSet[j][4] = 1;
                rowSet[j][5] = false;
              } else {
                break;
              }
            }
            i = j - 1;
          }
//          else {
//            console.log(i);
//            this.tableData.rowSet.splice(i, 1);
//          }
        }

        this.zoneTypeData = [];
        for (let i = 0; i < length; i++) {
          if (rowSet[i][0] !== "Sum") {
            this.zoneTypeData.push(rowSet[i]);
          }
        }

      },
      getTableData () {
        axios.get('http://localhost:8080/player/shottypeinzone', {
          params: {
            playerName: this.player.name,
            season: this.season,
            seasonType: this.seasonType
          }
        }).then(response => {
          this.tableData = response.data;
          console.log(this.tableData);
          this.combineCell();
        })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>