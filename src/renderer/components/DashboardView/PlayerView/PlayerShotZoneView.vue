<template>
  <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
    <h1 class="page-header">Player Shot Analyse</h1>

    <div class="form-group row">
      <div class="col-xs-4">
        <season-select v-on:getSeason="setSeason"></season-select>
      </div>

      <div class="col-xs-4">
        <seasontype-select v-on:getSeasonType="setSeasonType"></seasontype-select>
      </div>

      <div class="col-xs-4">
        <player-select v-on:getPlayer="setPlayer"></player-select>
      </div>
    </div>

    <div>
      <button type="button" class="btn btn-primary btn-block" @click="getTableData">Run</button>
    </div>

    <span>Selected: {{ season }} {{ seasonType }} {{ player.id }} {{ player.name }} </span>

    <h2 class="sub-header">Shot Area Charts</h2>

    <!--<bar-chart :chart-data="dataCollection" :height="100"></bar-chart>-->

    <div class="row">
      <div class="col-sm-6">
        <pie-chart :chart-data="FGMData" :options="options"></pie-chart>
      </div>
      <div class="col-sm-6">
        <pie-chart :chart-data="FGAData" :options="options"></pie-chart>
      </div>
    </div>

    <h2 class="sub-header">Shot Area Table</h2>

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
        <tr v-for="rowSet in tableData.rowSet">
          <td v-for="value in rowSet">
            {{ value }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>


<script>
  import axios from 'axios'
  import BarChart from '../../../assets/js/BarChart'
  import PieChart from '../../../assets/js/PieChart'

  import SeasonSelect from '../FormElements/SeasonSelect'
  import SeasontypeSelect from '../FormElements/SeasontypeSelect'
  import PlayerSelect from '../FormElements/PlayerSelect'

  export default {
    components: {
      SeasonSelect,
      SeasontypeSelect,
      PlayerSelect,
      BarChart,
      PieChart
    },
    data () {
      return {
        season: '',
        seasonType: '',
        player: {},
        tableData: {},
        dataCollection: {},
        FGMData: {},
        FGAData: {},
        options: {
          title: {
            display: true,
            text: 'FGM of every shot zone'
          },
          legend: {
            display: false
          }
        }
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
      getTableData () {
        axios.get('http://localhost:8080/player/shotzone', {
          params: {
            playerName: this.player.name,
            season: this.season,
            seasonType: this.seasonType
          }
        }).then(response => {
          this.tableData = response.data;
          this.fillChartData();
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      fillChartData () {
        let labels = [];
        let FGM = [];
        let FGA = [];

        let sumFGM, sumFGA;

        let rowSet = this.tableData.rowSet;
        let length = rowSet.length;
        /*        for (let i = 0; i < length; i++) {
         let row = rowSet[i];
         if (row[0] !== "null") {
         labels.push(row[0]);
         FGM.push(row[1]);
         FGA.push(row[2]);
         } else {
         sumFGM = row[1];
         sumFGA = row[2];
         }
         }*/
        sumFGM = rowSet[length - 1][1];
        sumFGA = rowSet[length - 1][2];

        for (let i = 0; i < length - 1; i++) {
          let row = rowSet[i];
          labels.push(row[0]);
          FGM.push(row[1]);
          FGA.push(row[2]);
        }

        this.FGMData = {
          labels: labels,
          datasets: [
            {
              label: 'FGM',
              backgroundColor: '#f87979',
              data: FGM
            }
          ]
        }

        this.FGAData = {
          labels: labels,
          datasets: [
            {
              label: 'FGA',
              backgroundColor: '#05CBE1',
              data: FGA
            }
          ]
        }

      }
    }
  }
</script>