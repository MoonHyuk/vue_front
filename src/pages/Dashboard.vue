<template>
    <div>

        <div class="row">
            <div class="col-12">
                <card type="chart">
                    <template slot="header">
                        <div class="row">
                            <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                                <h5 class="card-category">{{$t('dashboard.totalShipments')}}</h5>
                                <h2 class="card-title">{{$t('dashboard.FineDust')}}</h2>
                            </div>
                            <div class="col-sm-6">
                                <div class="btn-group btn-group-toggle"
                                     :class="isRTL ? 'float-left' : 'float-right'"
                                     data-toggle="buttons">
                                    <label v-for="(option, index) in bigLineChartCategories"
                                           :key="option"
                                           class="btn btn-sm btn-primary btn-simple"
                                           :class="{active: bigLineChart.activeIndex === index}"
                                           :id="index">
                                        <input type="radio"
                                               @click="initBigChart(index)"
                                               name="options" autocomplete="off"
                                               :checked="bigLineChart.activeIndex === index">
                                        {{option}}
                                    </label>

                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="chart-area">
                        <line-chart style="height: 100%"
                                    ref="bigChart"
                                    chart-id="big-line-chart"
                                    :chart-data="bigLineChart.chartData"
                                    :gradient-colors="bigLineChart.gradientColors"
                                    :gradient-stops="bigLineChart.gradientStops"
                                    :extra-options="bigLineChart.extraOptions">
                        </line-chart>
                    </div>
                </card>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4" :class="{'text-right': isRTL}">
                <card type="chart">
                    <template slot="header">
                        <h5 class="card-category">{{$t('dashboard.totalShipments')}}</h5>
                        <h3 class="card-title"><i class="tim-icons icon-heart-2 text-primary "></i>VOC 32.22 PPM</h3>
                    </template>
                    <div class="chart-area">
                        <line-chart style="height: 100%"
                                    chart-id="purple-line-chart"
                                    :chart-data="vocLineChart.chartData"
                                    :gradient-colors="vocLineChart.gradientColors"
                                    :gradient-stops="vocLineChart.gradientStops"
                                    :extra-options="vocLineChart.extraOptions">
                        </line-chart>
                    </div>
                </card>
            </div>
            <div class="col-lg-4" :class="{'text-right': isRTL}">
                <card type="chart">
                    <template slot="header">
                        <h5 class="card-category">{{$t('dashboard.totalShipments')}}</h5>
                        <h3 class="card-title"><i class="tim-icons icon-heart-2 text-primary "></i>O2 21.8%</h3>
                    </template>
                    <div class="chart-area">
                        <line-chart style="height: 100%"
                                    chart-id="purple-line-chart"
                                    :chart-data="o2LineChart.chartData"
                                    :gradient-colors="o2LineChart.gradientColors"
                                    :gradient-stops="o2LineChart.gradientStops"
                                    :extra-options="o2LineChart.extraOptions">
                        </line-chart>
                    </div>
                </card>
            </div>

            <div class="col-lg-4" :class="{'text-right': isRTL}">
                <card type="chart">
                    <template slot="header">
                        <h5 class="card-category">{{$t('dashboard.totalShipments')}}</h5>
                        <h3 class="card-title"><i class="tim-icons icon-heart-2 text-primary "></i>CO2 1300 PPM</h3>
                    </template>
                    <div class="chart-area">
                        <line-chart style="height: 100%"
                                    chart-id="purple-line-chart"
                                    :chart-data="co2LineChart.chartData"
                                    :gradient-colors="co2LineChart.gradientColors"
                                    :gradient-stops="co2LineChart.gradientStops"
                                    :extra-options="co2LineChart.extraOptions">
                        </line-chart>
                    </div>
                </card>
            </div>


        </div>
        <div class="row">
            <div class="col-lg-6 col-md-12">
                <card type="tasks" :header-classes="{'text-right': isRTL}">
                    <template slot="header">
                        <h6 class="title d-inline">{{$t('dashboard.tasks', {count: 5})}}</h6>
                        <p class="card-category d-inline">{{$t('dashboard.today')}}</p>
                        <base-dropdown menu-on-right=""
                                       tag="div"
                                       title-classes="btn btn-link btn-icon"
                                       aria-label="Settings menu"
                                       :class="{'float-left': isRTL}">
                            <i slot="title" class="tim-icons icon-settings-gear-63"></i>
                            <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.action')}}</a>
                            <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.anotherAction')}}</a>
                            <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.somethingElse')}}</a>
                        </base-dropdown>
                    </template>
                    <div class="table-full-width table-responsive">
                        <task-list></task-list>
                    </div>
                </card>
            </div>
            <div class="col-lg-6 col-md-12">
                <card class="card" :header-classes="{'text-right': isRTL}">
                    <h4 slot="header" class="card-title">{{$t('dashboard.simpleTable')}}</h4>
                    <div class="table-responsive">
                        <user-table></user-table>
                    </div>
                </card>
            </div>
        </div>
    </div>
</template>
<script>
    import LineChart from '@/components/Charts/LineChart';
    import BarChart from '@/components/Charts/BarChart';
    import * as chartConfigs from '@/components/Charts/config';
    import TaskList from './Dashboard/TaskList';
    import UserTable from './Dashboard/UserTable';
    import config from '@/config';

    let number = 10;

    let async = require('async');
    let chartLabel = require('../backend/chartLabel'); // chart의 x축 시간 계산하여 return 해주는 모듈
    let dust_1_Data = []; // dust_1 data 저장용 배열
    let dust_25_Data = []; // dust_2.5 data 저장용 배열
    let dust_10_Data = []; // dust_10 data 저장용 배열

    export default {
        components: {
            LineChart,
            BarChart,
            TaskList,
            UserTable
        },
        async created() {
            //await getDust1Data();
            var db = require('../backend/db_select');
            db.get_Con_dust('1').then((result) => {
                if (result) {
                    for (var i = 0; i < 12; i++)   //for문 안돌리면 undefined값이 return 됨
                        dust_1_Data.push(result.data[i]);
                }
            });

          db.get_Con_dust('25').then((result) => {
            if (result) {
              for (var i = 0; i < 12; i++)   //for문 안돌리면 undefined값이 return 됨
                dust_25_Data.push(result.data[i]);
            }

          });

          db.get_Con_dust('10').then((result) => {
            if (result) {
              for (var i = 0; i < 12; i++)   //for문 안돌리면 undefined값이 return 됨
                dust_10_Data.push(result.data[i]);
            }

          });
        },

        data: function () {

            return {
                //theArray:theArray,
                bigLineChart: {
                    allData: [
                        dust_1_Data,
                        dust_25_Data,
                        dust_10_Data
                    ],
                    activeIndex: 0,
                    chartData: null,
                    extraOptions: chartConfigs.purpleChartOptions,
                    gradientColors: config.colors.primaryGradient,
                    gradientStops: [1, 0.4, 0],
                    categories: []
                },
                vocLineChart: {

                    extraOptions: chartConfigs.purpleChartOptions,
                    chartData: {
                        labels: chartLabel.labelRecent(6),
                        datasets: [{
                            label: "Data",
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
                            data: [80, 100, 70, 80, 120, 32.22],
                        }]
                    },
                    gradientColors: config.colors.primaryGradient,
                    gradientStops: [1, 0.2, 0],
                },
                o2LineChart: {
                    extraOptions: chartConfigs.purpleChartOptions,
                    chartData: {
                        labels: chartLabel.labelRecent(6),
                        datasets: [{
                            label: "Data",
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
                            data: [100, 20, 40, 50, 20, 21.8],
                        }]
                    },
                    gradientColors: config.colors.primaryGradient,
                    gradientStops: [1, 0.2, 0],
                },
                co2LineChart: {
                    extraOptions: chartConfigs.purpleChartOptions,
                    chartData: {
                        labels: chartLabel.labelRecent(6),
                        datasets: [{
                            label: "Data",
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
                            data: [10, 20, 80, 70, 30, 13],
                        }]
                    },
                    gradientColors: config.colors.primaryGradient,
                    gradientStops: [1, 0.2, 0],
                },
                purpleLineChart: {
                    extraOptions: chartConfigs.purpleChartOptions,
                    chartData: {
                        labels: ['10시', '11시', '12시', '13시', '14시', '15시'],
                        datasets: [{
                            label: "Data",
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
                            data: [80, 100, 70, 80, 120, 80],
                        }]
                    },
                    gradientColors: config.colors.primaryGradient,
                    gradientStops: [1, 0.2, 0],
                },
                greenLineChart: {
                    extraOptions: chartConfigs.greenChartOptions,
                    chartData: {
                        labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
                        datasets: [{
                            label: "My First dataset",
                            fill: true,
                            borderColor: config.colors.danger,
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            pointBackgroundColor: config.colors.danger,
                            pointBorderColor: 'rgba(255,255,255,0)',
                            pointHoverBackgroundColor: config.colors.danger,
                            pointBorderWidth: 20,
                            pointHoverRadius: 4,
                            pointHoverBorderWidth: 15,
                            pointRadius: 4,
                            data: [90, 27, 60, 12, 80],
                        }]
                    },
                    gradientColors: ['rgba(66,134,121,0.15)', 'rgba(66,134,121,0.0)', 'rgba(66,134,121,0)'],
                    gradientStops: [1, 0.4, 0],
                },
                blueBarChart: {
                    extraOptions: chartConfigs.barChartOptions,
                    chartData: {
                        labels: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'],
                        datasets: [{
                            label: "Countries",
                            fill: true,
                            borderColor: config.colors.info,
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            data: [53, 20, 10, 80, 100, 45],
                        }]
                    },
                    gradientColors: config.colors.primaryGradient,
                    gradientStops: [1, 0.4, 0],
                }
            }
        },

        computed: {
            enableRTL() {
                return this.$route.query.enableRTL;
            },
            isRTL() {
                return this.$rtl.isRTL;
            },
            bigLineChartCategories() {
                return this.$t('dashboard.chartCategories');
            }
        },
        methods: {
            initBigChart(index) {


                let chartData = {
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
                        data: this.bigLineChart.allData[index]
                    }],
                    labels: chartLabel.labelRecent(12),
                }
                this.$refs.bigChart.updateGradients(chartData);
                this.bigLineChart.chartData = chartData;
                this.bigLineChart.activeIndex = index;

            },

            refreshChart(index) {
                setTimeout(() => {
                    console.log("refresh chart");
                    this.initBigChart(index);
                }, 400);         //400밀리초 뒤에 chart refresh
            }


        },
        mounted() {
            this.i18n = this.$i18n;
            if (this.enableRTL) {
                this.i18n.locale = 'ar';
                this.$rtl.enableRTL();
            }
            //this.initBigChart(0);
            this.refreshChart(0);

        },
        beforeDestroy() {
            if (this.$rtl.isRTL) {
                this.i18n.locale = 'en';
                this.$rtl.disableRTL();
            }
        }
    };

</script>
<style>
</style>
