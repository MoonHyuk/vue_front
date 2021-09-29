<template>
  <div>
    <label style="margin-right: 16px;">
      센서 ID
      <select v-model="sensorId">
        <option value="1">Byeon's sensor</option>
        <option value="2">Yoon's sensor 1</option>
        <option value="3">Yoon's sensor 2</option>
        <option value="4">Yoon's sensor 3</option>
      </select>
    </label>

    <label>
      측정 시작 시간
      <input type="datetime-local" v-model="startDate">
    </label>
    <div class="row">
      <div
          v-for="(data, name) in sensors"
          class="col-lg-6"
      >
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{ type }}</h5>
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
          <div style="height: 200px; overflow: scroll; margin-top: 16px; padding: 0 16px;">
            <table class="table tablesorter">
              <thead>
              <tr>
                <th>시간</th>
                <th style="text-align: right;">측정값</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in data['data']">
                <td>{{ item['checkTime'] }}</td>
                <td style="text-align: right;">{{ item['ppm'] }}</td>
              </tr>
              </tbody>
            </table>
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
  name: "LongTermBase",
  props: {
    type: {
      type: String,
      default: "TWA"
    },
  },
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
    },
    fetchAndDraw(sensorId, startDate) {
      api.getLongTerm(this.type, sensorId, startDate).then(res => {
        this.sensors = Object.keys(res.data).sort().reduce((acc, key) => (acc[key] = res.data[key], acc), {})

        Object.entries(this.sensors).forEach(([name, { data }]) => {
          this.chartOptions[name] = this.makeChartOption(data);
        })
      });
    }
  },
  watch: {
    startDate(newValue, _) {
      this.fetchAndDraw(this.sensorId, newValue);
    },
    sensorId(newValue, _) {
      this.fetchAndDraw(newValue, this.startDate);
    }
  },
  data() {
    return {
      sensors: [],
      chartOptions: {},
      startDate: null,
      sensorId: 1,
    }
  },
  mounted() {
    this.fetchAndDraw(this.sensorId, this.startDate);
  }
}
</script>

<style scoped>

</style>
