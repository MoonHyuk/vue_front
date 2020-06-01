<template>
    <div>
        <div class="row">
            <div class="col-lg-4" :class="{'text-right': isRTL}">
                <card type="chart">
                    <template slot="header">
                        <h5 class="card-category">{{$t('dashboard.totalShipments')}} : 센서 1</h5>
                        <h3 class="card-title"><i class="tim-icons icon-heart-2 text-primary "></i>CO2 {{co2Value}} ppm</h3>
                    </template>
                    <div class="chart-area">
                        <line-chart style="height: 100%"
                                    ref="vocLineChart"
                                    chart-id="purple-line-chart"
                                    :chart-data="co2LineChart.chartData"
                                    :gradient-colors="co2LineChart.gradientColors"
                                    :gradient-stops="co2LineChart.gradientStops"
                                    :extra-options="co2LineChart.extraOptions">
                        </line-chart>
                    </div>
                </card>
            </div>
            <div class="col-lg-4" :class="{'text-right': isRTL}">
                <card type="chart">
                    <template slot="header">
                        <h5 class="card-category">{{$t('dashboard.totalShipments')}} : 센서 2</h5>
                        <h3 class="card-title"><i class="tim-icons icon-heart-2 text-primary "></i>CO2 {{co2Value}} ppm</h3>
                    </template>
                    <div class="chart-area">
                        <line-chart style="height: 100%"
                                    ref="vocLineChart"
                                    chart-id="purple-line-chart"
                                    :chart-data="co2LineChart.chartData"
                                    :gradient-colors="co2LineChart.gradientColors"
                                    :gradient-stops="co2LineChart.gradientStops"
                                    :extra-options="co2LineChart.extraOptions">
                        </line-chart>
                    </div>
                </card>
            </div>
            <div class="col-lg-4" :class="{'text-right': isRTL}">
                <card type="chart">
                    <template slot="header">
                        <h5 class="card-category">{{$t('dashboard.totalShipments')}} : 센서 3</h5>
                        <h3 class="card-title"><i class="tim-icons icon-heart-2 text-primary "></i>CO2 {{co2Value}} ppm</h3>
                    </template>
                    <div class="chart-area">
                        <line-chart style="height: 100%"
                                    ref="vocLineChart"
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
            <div class="col-lg-4" :class="{'text-right': isRTL}">
                <card type="chart">
                    <template slot="header">
                        <h5 class="card-category">{{$t('dashboard.totalShipments')}} : 센서 4</h5>
                        <h3 class="card-title"><i class="tim-icons icon-heart-2 text-primary "></i>CO2 {{co2Value}} ppm</h3>
                    </template>
                    <div class="chart-area">
                        <line-chart style="height: 100%"
                                    ref="vocLineChart"
                                    chart-id="purple-line-chart"
                                    :chart-data="co2LineChart.chartData"
                                    :gradient-colors="co2LineChart.gradientColors"
                                    :gradient-stops="co2LineChart.gradientStops"
                                    :extra-options="co2LineChart.extraOptions">
                        </line-chart>
                    </div>
                </card>
            </div>
            <div class="col-lg-4" :class="{'text-right': isRTL}">
                <card type="chart">
                    <template slot="header">
                        <h5 class="card-category">{{$t('dashboard.totalShipments')}} : 센서 5</h5>
                        <h3 class="card-title"><i class="tim-icons icon-heart-2 text-primary "></i>CO2 {{co2Value}} ppm</h3>
                    </template>
                    <div class="chart-area">
                        <line-chart style="height: 100%"
                                    ref="vocLineChart"
                                    chart-id="purple-line-chart"
                                    :chart-data="co2LineChart.chartData"
                                    :gradient-colors="co2LineChart.gradientColors"
                                    :gradient-stops="co2LineChart.gradientStops"
                                    :extra-options="co2LineChart.extraOptions">
                        </line-chart>
                    </div>
                </card>
            </div>
            <div class="col-lg-4" :class="{'text-right': isRTL}">
                <card type="chart">
                    <template slot="header">
                        <h5 class="card-category">{{$t('dashboard.totalShipments')}} : 센서 6</h5>
                        <h3 class="card-title"><i class="tim-icons icon-heart-2 text-primary "></i>CO2 {{co2Value}} ppm</h3>
                    </template>
                    <div class="chart-area">
                        <line-chart style="height: 100%"
                                    ref="vocLineChart"
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
    </div>
</template>
<script>
    import LineChart from '@/components/Charts/LineChart';
    import BarChart from '@/components/Charts/BarChart';
    import * as chartConfigs from '@/components/Charts/config';
    import TaskList from './Dashboard/TaskList';
    import UserTable from './Dashboard/UserTable';
    import config from '@/config';
    import NotificationTemplate from './Notifications/NotificationTemplate';        //notification 내용 template
    import notiToluene from "./Notifications/notiToluene";
    import notiVoc from "./Notifications/notiVoc";
    import notiCo2 from "./Notifications/notiCo2";
    import notiPm25 from "./Notifications/notiPm25";
    import notiPm10 from "./Notifications/notiPm10";
    import notiOxygen from "./Notifications/notiOxygen";
    import notiOxygenLow from "./Notifications/notiOxygenLow";

    let init_refresh_time = 0;                //자동 새로고침 시간 초기값 지정

    let refresh_remain = init_refresh_time;    //새로고침까지 남은시간 변수
    var refresh_set_timer;                     //새로고침 타이머 저장 변수, set과 clear 하기 위해서 필요

    let async = require('async');

    let co2_Data = [];                          // co2 data 저장용 배열
    let co2_Label = [];                          // co2 Label 저장용 배열




    async function getCo2CallBack() {
        co2_Data = [];
        co2_Label = [];

        var db = require('../backend/db_select');
        await db.getCo2Live().then((result) => {
            if (result) {
                for (var i = 0; i < 12; i++) {         //for문 안돌리면 undefined값이 return 됨
                    if (i % 2 === 0) {
                        co2_Data.push(result.data[i]);
                    }
                    else{
                        co2_Label.push(result.data[i].substr(11,8));
                    }
                }
            }
        });
        co2_Data=co2_Data.reverse();
        co2_Label=co2_Label.reverse();

        console.log("co2_Data",co2_Data);

    }

    async function getDataCallback() {                                   //모든 데이터를 불러오는 콜백 함수
        await getCo2CallBack();
    }

    function sendAlarm() {
        var fcm = require('../backend/fcm_sender');
        fcm.fcm_sender();
    }


    export default {
        components: {
            LineChart,
            BarChart,
            TaskList,
            UserTable
        },

        beforeCreate() {                                         //beforeCreate시에는 this 사용할 수 없음
            //create 전에 axios 데이터 호출
            getDataCallback();
        },
        beforeUpdate() {
            clearTimeout(refresh_set_timer);                    //timer 초기화
        },
        updated() {
            refresh_set_timer = setTimeout(async () => {
                if (this.refresh_remain > 1) {
                    this.refresh_remain--;
                    console.log("refresh timer " + this.refresh_remain);
                    this.bigLineChart.refresh_remain = this.refresh_remain;

                    this.co2Value=co2_Data[5];

                } else {                                          //refresh_remain이 0이 되었을때, 차트를 새로고침


                    /* 위험농도 넘을 시 notification, 배열 값 비교는 getData() 전에 해야 함
                    if (dust_1_Data[11] > 500) {                    //dust_1_Data의 최근 데이터가 기준값을 넘는지 확인
                        this.notifyVue('top', 'center');        //위험 농도값을 넘어갔을 경우 noti 띄움
                        this.initBigChart(0);                   //해당 차트를 표시
                        sendAlarm();
                    }

                    if(dust_10_Data[11] > 50){                  //dust_10_Data의 최근 데이터가 기준값을 넘는지 확인
                        this.notifyVue('top', 'center');        //위험 농도값을 넘어갔을 경우 noti 띄움
                        this.initBigChart(1);                   //해당 차트를 표시
                    }
                    if(dust_25_Data[11] > 50){                  //dust_25_Data의 최근 데이터가 기준값을 넘는지 확인
                        this.notifyVue('top', 'center');        //위험 농도값을 넘어갔을 경우 noti 띄움
                        this.initBigChart(2);                   //해당 차트를 표시
                    }
                    */

                    if(co2_Data[5] > 5000){
                        this.notifyCo2('top','center');
                    }


                    /* 데이터 초기화 */
                    var that = this;                            //function 내에서 this를 쓸 수 없어서 미리 that에 선언
                    await getDataCallback();
                    //get data 콜백

                    this.co2Value=co2_Data[5];

                    await that.initCo2Chart();
                    console.log("callback 지옥 끝");



                    //this.co2LineChart.data = co2_Data;

                    /* timer 초기화 */
                    this.refresh_remain = init_refresh_time;
                    this.bigLineChart.refresh_remain = this.refresh_remain;

                }
            }, 1000);

        },


        data: function () {

            return {
                refresh_remain: refresh_remain,      //refresh까지 남은 시간 data
                co2Value: co2_Data[0],
                type: ["", "info", "success", "warning", "danger"],     //noti용 type
                co2LineChart: {
                    extraOptions: chartConfigs.purpleChartOptions,
                    chartData: {
                        labels: co2_Label,
                        datasets: [{
                            label: "ppm",
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
                            data: co2_Data,
                        }]
                    },
                    gradientColors: config.colors.primaryGradient,
                    gradientStops: [1, 0.2, 0],
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
            initCo2Chart() {
                let chartData = {
                    labels: co2_Label,
                    datasets: [{
                        label: "ppm",
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
                        data: co2_Data
                    }]
                }
                this.$refs.co2LineChart.updateGradients(chartData);
                this.co2LineChart.chartData = chartData;

            },
            refreshChart(index) {
                setTimeout(() => {
                    console.log("refresh chart");
                    this.initCo2Chart();
                }, 1000);                                                //400밀리초 뒤에 chart refresh
            },
            notifyCo2(verticalAlign, horizontalAlign) {
                const color = Math.floor(Math.random() * 4 + 1);
                this.$notify({
                    component: notiCo2,   //템플릿 내용 변경 가능 부분, ./Notifications/NotificationTemplate
                    icon: "tim-icons icon-bell-55",                  //아이콘 모양
                    horizontalAlign: horizontalAlign,
                    verticalAlign: verticalAlign,
                    type: this.type[color],                          //팝업창 색깔, info=blue, success=green ,warning=orange, danger=pink,
                    timeout: 0                                       //팝업 떠 있는 시간(ms), 0초 = 무한
                });
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
            //console.log("timer멈춤");
            clearTimeout(timer);
            if (this.$rtl.isRTL) {
                this.i18n.locale = 'en';
                this.$rtl.disableRTL();
            }
        }
    };

</script>
<style>
</style>
