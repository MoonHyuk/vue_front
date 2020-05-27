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
                                 <span id="timer" style="float:right; margin-right:5px">{{ refresh_remain }} 초 후 새로고침</span><br/>
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
                                    ref="co2LineChart"
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
    import NotificationTemplate from './Notifications/NotificationTemplate';        //notification 내용 teㄴmplate

    let init_refresh_time = 10;                //자동 새로고침 시간 초기값 지정

    let number = 10;
    let indexValue = 0;                        //현재 보고 있는 탭의 index값 저장용 변수
    let refresh_remain = init_refresh_time;    //새로고침까지 남은시간 변수
    var refresh_set_timer;                     //새로고침 타이머 저장 변수, set과 clear 하기 위해서 필요 

    let async = require('async');
    let chartLabel = require('../backend/chartLabel'); // chart의 x축 시간 계산하여 return 해주는 모듈

    let dust_1_Data = [];                       // dust_1 data 저장용 배열
    let dust_25_Data = [];                      // dust_2.5 data 저장용 배열
    let dust_10_Data = [];                      // dust_10 data 저장용 배열
    let co2_Data = [];                          // co2 data 저장용 배열

    let co2_Label = [];                         // co2 label 저장용 배열


    //data 호출 함수화
    function getData() {
         dust_1_Data = [];                      // dust_1 data 저장용 배열 초기화
         dust_25_Data = [];                     // dust_2.5 data 저장용 배열 초기화
         dust_10_Data = [];                     // dust_10 data 저장용 배열 초기화
         co2_Data = [];

         //await getDust1Data();
            var db = require('../backend/db_select');
            db.get_Con_dust('1').then((result) => {
                if (result) {
                    for (var i = 0; i < 12; i++)    //for문 안돌리면 undefined값이 return 됨
                        dust_1_Data.push(result.data[i]);
                }
            });

          db.get_Con_dust('25').then((result) => {
            if (result) {
              for (var i = 0; i < 12; i++)          //for문 안돌리면 undefined값이 return 됨
                dust_25_Data.push(result.data[i]);
            }

          });

          db.get_Con_dust('10').then((result) => {
            if (result) {
              for (var i = 0; i < 12; i++)          //for문 안돌리면 undefined값이 return 됨
                dust_10_Data.push(result.data[i]);
            }

          });

        db.getCo2Live().then((result) => {
            if (result) {
                for (var i = 0; i < 12; i++) {         //for문 안돌리면 undefined값이 return 됨
                    if(i%2===0){
                        co2_Data.push(result.data[i]);
                    }
                }
            }

        });


    }

    function sendAlarm(){
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
    
        beforeCreate(){
            getData();                                          //create 전에 axios 데이터 호출
        },
        beforeUpdate(){       
            clearTimeout(refresh_set_timer);                    //timer 초기화
        },
        updated(){
            refresh_set_timer=setTimeout(() => {
                if(this.refresh_remain>1){
                    this.refresh_remain--;
                     console.log("refresh timer "+this.refresh_remain);
                    this.bigLineChart.refresh_remain = this.refresh_remain;
                
                }
                else{                                          //refresh_remain이 0이 되었을때, 차트를 새로고침

                    /* 위험농도 넘을 시 notification, 배열 값 비교는 getData() 전에 해야 함 */
                    if(dust_1_Data[11] > 5){                    //dust_1_Data의 최근 데이터가 기준값을 넘는지 확인
                        this.notifyVue('top', 'center');        //위험 농도값을 넘어갔을 경우 noti 띄움
                        this.initBigChart(0);                   //해당 차트를 표시
                        sendAlarm();
                    }
                    /*
                    if(dust_10_Data[11] > 50){                  //dust_10_Data의 최근 데이터가 기준값을 넘는지 확인
                        this.notifyVue('top', 'center');        //위험 농도값을 넘어갔을 경우 noti 띄움
                        this.initBigChart(1);                   //해당 차트를 표시
                    }    
                    if(dust_25_Data[11] > 50){                  //dust_25_Data의 최근 데이터가 기준값을 넘는지 확인
                        this.notifyVue('top', 'center');        //위험 농도값을 넘어갔을 경우 noti 띄움
                        this.initBigChart(2);                   //해당 차트를 표시
                    }
                    */
                    

                    /* 데이터 초기화 */
                    getData();   
                    console.log("refresh chart num="+indexValue);
                    this.initBigChart(indexValue);
                    this.initCo2Chart();

                    this.bigLineChart.allData = [
                            dust_1_Data,
                            dust_25_Data,
                            dust_10_Data
                    ];
                    this.co2LineChart.chartData = co2_Data;
                
                    /* timer 초기화 */ 
                     this.refresh_remain=init_refresh_time;
                     this.bigLineChart.refresh_remain = this.refresh_remain;
                }                
            },1000);

        },


        data: function () {

            return {
                refresh_remain:refresh_remain,      //refresh까지 남은 시간 data
                type: ["", "info", "success", "warning", "danger"],     //noti용 type
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
                            label: "PPM",
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

                indexValue = index;                                     //현재 누른 index 값을 전역 변수에 저장
                this.refresh_remain = init_refresh_time;                //refresh_remain에 초기값 init_refresh_time 저장
                this.bigLineChart.refresh_remain=this.refresh_remain;   //index 값이 바뀌면 새로고침 타이머도 초기화

            },
            initCo2Chart(){
                let chartData =  {
                    labels: chartLabel.labelRecent(6),
                        datasets: [{
                        label: "PPM",
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
                }
                this.$refs.co2LineChart.updateGradients(chartData);
                this.co2LineChart.chartData = chartData;
            },
            refreshChart(index) {
                setTimeout(() => {
                    console.log("refresh chart");
                    this.initBigChart(index);
                    this.initCo2Chart();
                }, 500);                                                //400밀리초 뒤에 chart refresh
            },
            notifyVue(verticalAlign, horizontalAlign) {
                const color = Math.floor(Math.random() * 4 + 1);
                this.$notify({
                    component: NotificationTemplate,                 //템플릿 내용 변경 가능 부분, ./Notifications/NotificationTemplate
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
