import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default Line.extend({
    mixins: [reactiveProp],
    // props: ['data', 'options'],
    props: ['options'],
    mounted () {
        // this.renderChart(this.data, this.options)
        this.renderChart(this.chartData, this.options)
    }
})

        //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        //     datasets: [
        //         {
        //             label: 'GitHub Commits',
        //             backgroundColor: '#f87979',
        //             data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        //         }
        //     ]
        // }