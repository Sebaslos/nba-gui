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

    <!--<h2 class="sub-header">Shot Area Charts</h2>-->
    <h2 class="sub-header">{{ sectionTitle }} Charts</h2>

    <!--<bar-chart :chart-data="dataCollection" :height="100"></bar-chart>-->

    <div class="row">
      <div class="col-sm-6">
        <pie-chart :chart-data="FGMData" :options="getChartOption('FGM of every ' + sectionTitle + ' %')"></pie-chart>
      </div>
      <div class="col-sm-6">
        <pie-chart :chart-data="FGAData" :options="getChartOption('FGA of every ' + sectionTitle + ' %')"></pie-chart>
      </div>
    </div>

    <!--<h2 class="sub-header">Shot Area Table</h2>-->
    <h2 class="sub-header">{{ sectionTitle }} Table</h2>

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
  import {mapActions, mapGetters} from 'vuex'
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
        FGAData: {}
      }
    },
    computed: {
      ...mapGetters([
        'sectionTitle',
        'endpoint'
      ])
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
      getChartOption (title) {
        return {
          title: {
            display: true,
            text: title
          },
          legend: {
            display: true
          }
        }
      },
      getTableData () {
        axios.get('http://localhost:8080/player/' + this.endpoint, {
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
      getRandomColor () {
        let letters = '0123456789ABCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      },
      getRandomColorEachBar (count) {
        let data = [];
        for (let i = 0; i < count; i++) {
          data.push(this.getRandomColor());
        }
        return data;
      },
      getMaxNumIndex (arr) {
        const max = Math.max(...arr);
        return arr.indexOf(max);
      },
      fillChartData () {
        let labels = [];
        let FGMLabels = [];
        let FGALabels = [];
        let FGM = [];
        let FGA = [];

        let sumFGM, sumFGA;

        let rowSet = this.tableData.rowSet;
        let length = rowSet.length;

        if (length === 0) {
          this.FGMData = {
            datasets: [ {data: []} ]
          };
          this.FGAData = {
            datasets: [ {data: []} ]
          };
          return;
        }

        sumFGM = rowSet[length - 1][1];
        sumFGA = rowSet[length - 1][2];

        for (let i = 0; i < length - 1; i++) {
          let row = rowSet[i];
          labels.push(row[0]);
          FGMLabels.push(row[0]);
          FGALabels.push(row[0]);
//          FGM.push((row[1] / sumFGM * 100).toFixed(1));
          FGM.push(Math.round((row[1] / sumFGM * 100) * 1e1) / 1e1);
//          FGA.push((row[2] / sumFGA * 100).toFixed(1));
          FGA.push(Math.round((row[2] / sumFGA * 100) * 1e1) / 1e1);
        }

        let newFGM = [];
        let newFGA = [];
        let newFGMLabels = [];
        let newFGALabels = [];

        for (let i = 0; i < 5 && i < length; i++) {
          const fgmIndex = this.getMaxNumIndex(FGM);
          const fgaIndex = this.getMaxNumIndex(FGA);

          console.log('fgmindex = ' + fgmIndex);
          console.log('fgaindex = ' + fgaIndex);

          newFGM.push(FGM.splice(fgmIndex, 1));
          newFGA.push(FGA.splice(fgaIndex, 1));

          newFGMLabels.push(FGMLabels.splice(fgmIndex, 1));
          newFGALabels.push(FGALabels.splice(fgaIndex, 1));
        }

        this.FGMData = {
          labels: newFGMLabels,
          datasets: [
            {
              label: 'FGM',
//              backgroundColor: this.getRandomColorEachBar(length - 1),
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#4BC0C0',
                '#FFCD56',
                '#FF9F40'
              ],
              data: newFGM
            }
          ]
        }

        this.FGAData = {
          labels: newFGALabels,
          datasets: [
            {
              label: 'FGA',
//              backgroundColor: this.getRandomColorEachBar(length - 1),
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#4BC0C0',
                '#FFCD56',
                '#FF9F40'
              ],
              data: newFGA
            }
          ]
        }

      }
    }
  }
</script>