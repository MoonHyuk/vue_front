<template>
  <div>
    <div class="row">
      <div
          v-for="(data, name) in sensors"
          class="col-lg-6"
      >
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">6시간 농도</h5>
            <h3 class="card-title"><i class="tim-icons icon-heart-2 text-primary "></i> {{ name.toUpperCase() }}</h3>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        ref="charts"
                        chart-id="purple-line-chart"
                        :chart-data="chartOptions[name].chartData"
                        :gradient-colors="chartOptions[name].gradientColors"
                        :gradient-stops="chartOptions[name].gradientStops"
                        :extra-options="chartOptions[name].extraOptions">
            </line-chart>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/Charts/LineChart';
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";

const api = require("../backend/db_select");

export default {
  name: "LongTerm",
  components: {
    LineChart,
  },
  methods: {
    makeChartOption(data) {
      chartConfigs.purpleChartOptions['scales']['yAxes'][0]['ticks']['suggestedMax'] = 0;

      return {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: data.map(d => d['checkTime'].split(' ')[1]),
          datasets: [{
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: data.map(d => d['ppm']),
          }]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0]
      }
    }
  },
  data() {
    return {
      sensors: [],
      chartOptions: {},
    }
  },
  mounted() {
    api.getLongTerm("2021-07-05 18:30").then(res => {
      this.sensors = Object.keys(res.data).sort().reduce((acc, key) => (acc[key] = res.data[key], acc), {})

      Object.entries(this.sensors).forEach(([name, { data }]) => {
        this.chartOptions[name] = this.makeChartOption(data);
      })
    })
  }
}
</script>

<style scoped>

</style>
