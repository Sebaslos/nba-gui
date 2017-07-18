<template>
  <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
    <h1 class="page-header">Team Shot Analyse</h1>

    <div class="form-group row">
      <div class="col-xs-3">
        <season-select v-on:getSeason="setSeason"></season-select>
      </div>

      <div class="col-xs-3">
        <seasontype-select v-on:getSeasonType="setSeasonType"></seasontype-select>
      </div>

      <div class="col-xs-6">
        <team-select v-on:getTeam="setTeam"></team-select>
      </div>
    </div>

    <div>
      <button type="button" class="btn btn-primary btn-block" @click="getTableData">Run</button>
    </div>

    <h2 class="sub-header">3 Points Charts</h2>
    <bar-chart :chart-data="dataCollection" :height="100"></bar-chart>

    <h2 class="sub-header">3 Points Table</h2>

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

  import SeasonSelect from '../FormElements/SeasonSelect'
  import SeasontypeSelect from '../FormElements/SeasontypeSelect'
  import TeamSelect from '../FormElements/TeamSelect'

  export default {
    components: {
      SeasonSelect,
      SeasontypeSelect,
      TeamSelect,
      BarChart
    },
    data () {
      return {
        season: '',
        seasonType: '',
        team: {},
        tableData: {},
        dataCollection: {}
      }
    },
    methods: {
      setSeason (season) {
        this.season = season
      },
      setSeasonType (seasonType) {
        this.seasonType = seasonType
      },
      setTeam (team) {
        this.team = team
      },
      getTableData () {
        axios.get('http://localhost:8080/team/3pzone', {
          params: {
            teamName: this.team.name,
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
        let data1 = [];
        let data2 = [];

        let rowSet = this.tableData.rowSet;
        let length = rowSet.length;
        for (let i = 0; i < length; i++) {
          let row = rowSet[i];
          if (i !== 0 && i !== length - 1) {
            labels.push(row[0]);
            data1.push(row[1]);
            data2.push(row[2]);
          }
        }

        this.dataCollection = {
          labels: labels,
          datasets: [
            {
              label: '3PM',
              backgroundColor: '#f87979',
              data: data1
            }, {
              label: '3PA',
              backgroundColor: '#05CBE1',
              data: data2
            }
          ]
        }

      }
    }
  }

</script>