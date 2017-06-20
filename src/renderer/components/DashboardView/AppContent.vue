<template>
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        <h1 class="page-header">Dashboard</h1>

        <line-chart :chart-data="dataCollection" :height="100"></line-chart>

        <div class="form-group row">
            <div class="col-xs-4">
                <label for="slseason">Season</label>
                <select class="form-control" id="slseason" v-model="season">
                    <option>2016-17</option>
                    <option>2015-16</option>
                    <option>2014-15</option>
                    <option>2013-14</option>
                </select>
            </div>

            <div class="col-xs-4">
                <label for="sltype">Season Type</label>
                <select class="form-control" id="sltype" v-model="seasonType">
                    <option>Preseason</option>
                    <option selected>Regular Season</option>
                    <option>Playoffs</option>
                </select>
            </div>

            <div class="col-xs-4">
                <label for="slteam">Team</label>
                <select class="form-control" id="slteam" v-model="teamName">
                    <option>Cavaliers</option>
                    <option>Rockets</option>
                    <option>Warriors</option>
                    <option>Spurs</option>
                </select>
            </div>

        </div>

        <h2 class="sub-header">{{ currentTitle }}</h2>   <!-- Section title  currentTitle -->
        <!-- table data: {{ currentTableData.name }} -->

        <button type="button" class="btn btn-info" @click="getTableData">show table data</button>
        <button type="button" class="btn btn-info" @click="setChartData">fill chart data</button>
        <button type="button" id="import-btn" class="btn btn-info">import</button>

        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-for="header in currentTableData.headers">
                        {{ header }}
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="rowSet in currentTableData.rowSet">
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
    import LineChart from '../../assets/js/LineChart'

    import {ipcRenderer} from 'electron'
    import path from 'path'

    export default {
        components: {
            LineChart
        },
        data () {
            return {
                dataCollection: {},
                season: '2014-15',
                seasonType: 'Regular Season',
                teamName: 'Cavaliers'
            }
        },
        mounted () {
            const newWindowBtn = document.getElementById("import-btn")

            newWindowBtn.addEventListener('click', function () {
                ipcRenderer.send('open-import-window')
            })

        },
        computed: {
            ...mapGetters({
                currentTitle: 'sectionTitle',
                currentTableData: 'tableData'
            })
        },
        methods: {
            ...mapActions([
                'updateTable'
            ]),
            getTableData () {
                axios.get('http://localhost:8080/' + 'team3points', {
                    params: {
                        teamName: this.teamName,
                        season: this.season,
                        seasonType: this.seasonType
                    }
                }).then(response => {
                        let teaminfo = response.data;
                        this.updateTable({
                            tableData: teaminfo
                        });
                        // Object.keys(teaminfo).forEach(key => {alert(teaminfo[key])});
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            setChartData () {
                let labels = [];
                let data1 = [];
                let data2 = [];

                let rowSet = this.currentTableData.rowSet;
                let length = rowSet.length;
                for (let i = 0; i < length; i++) {
                    let row = rowSet[i];
                    if (row[1] !== "null" && row[2] === "null") {
                        labels.push(row[1]);
                        data1.push(row[3]);
                        data2.push(row[4]);
                    }
                }

                this.dataCollection = {
                    labels: labels,
                    datasets: [
                        {
                            label: '3PA',
                            backgroundColor: '#f87979',
                            data: data1
                        }, {
                            label: 'FGA',
                            backgroundColor: '#05CBE1',
                            data: data2
                        }
                    ]
                }
            }
        }
    }
</script>