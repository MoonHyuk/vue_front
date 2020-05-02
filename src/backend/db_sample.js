var mysql = require('sync-mysql');
var config = require('./db_config');    // ./는 현재 디렉토리를 나타냅니다


var connection = new mysql({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    dateStrings: 'date'
});

function getData() {
    var nowDate = new Date();
    var sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //각 시간대별 총 합
    var count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //각 시간대별 합의 갯수
    var avg = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //각 시간대별 평

    var sql;  //sql문 의미 : 오늘 날짜에 해당하는 data 중에서 최근 12시간의 값들만 추출
    var data = new Array();

    if(nowDate.getHours()>11) {//당일 데이터만 받아도 충분할경우
        sql = 'select * from dust_1 where checkDate=\'' +
            '' + nowDate.getFullYear() + '-' + (parseInt(nowDate.getMonth()) + 1) + '-' + nowDate.getDate() + '\''
            + ' and checkTime<=\'' + nowDate.getHours() + ':00:00\'' + ' and checkTime>=\'' + (nowDate.getHours() - 12) + ':00:00\'';

        data = connection.query(sql);
    }
    else{ //전 날 데이터도 필요한 경우
        var extraTime=12-nowDate.getHours();
        //ex 04시에 데이터를 조회 할 경우
        //당일 01~04시 데이터 조회
        //전날 17~24시 데이터 조회 = 24-extraTime

        sql = 'select * from dust_1 where checkDate=\''+
            nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate()+'\' and checkTime<\''+
            nowDate.getHours() + ':00:00\'' + ' and checkTime>=\'' +'00:00:00\'';

        var buffer = connection.query(sql);

        sql = 'select * from dust_1 where checkDate=\''+
            nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+(nowDate.getDate()-1)+'\' and checkTime<\''+
            '24:00:00\'' + ' and checkTime>=\''+(24-extraTime)+':00:00\'';

        var buffer2 = connection.query(sql);

        for(var index = 0; index< buffer.length; index++){
            data.push(buffer[index]);
        }

        for(var index = 0; index < buffer2.length; index++){
            data.push(buffer2[index]);
        }

    }

    //main logic
    //1. select * from dust_1
    //2. 해당 객체로부터 최근 12시간동안 각 시간별 평균 도출
    //3. 그래프의 x축으로 사용할 시간 array return 함수 필요
    //4. 그래프의 데이터를 보내줄 return 함수 필요


    for (var index = 0; index < data.length; index++) {
        if(nowDate.getHours()>11) {
            var strArray = data[index]['checkTime'].split(':'); //ex. 14:00:00 을 ':' 을 기준으로 나누어 3칸의 배열에 저장
            var time = parseInt(strArray[0]); // 그중 맨 앞의 데이터만 필요(시간 정보)
            //12 구간의 데이터로 나누어 해당 sum 배열에 저장해야한다
            //평균 산출을 위해 count도 1 더해준

            if (time < nowDate.getHours() && time >= nowDate.getHours() - 1) {
                sum[11] += data[index]['ppm'];
                count[11] += 1;
            } else if (time < nowDate.getHours() - 1 && time >= nowDate.getHours() - 2) {
                sum[10] += data[index]['ppm'];
                count[10] += 1;
            } else if (time < nowDate.getHours() - 2 && time >= nowDate.getHours() - 3) {
                sum[9] += data[index]['ppm'];
                count[9] += 1;
            } else if (time < nowDate.getHours() - 3 && time >= nowDate.getHours() - 4) {
                sum[8] += data[index]['ppm'];
                count[8] += 1;
            } else if (time < nowDate.getHours() - 4 && time >= nowDate.getHours() - 5) {
                sum[7] += data[index]['ppm'];
                count[7] += 1;
            } else if (time < nowDate.getHours() - 5 && time >= nowDate.getHours() - 6) {
                sum[6] += data[index]['ppm'];
                count[6] += 1;
            } else if (time < nowDate.getHours() - 6 && time >= nowDate.getHours() - 7) {
                sum[5] += data[index]['ppm'];
                count[5] += 1;
            } else if (time < nowDate.getHours() - 7 && time >= nowDate.getHours() - 8) {
                sum[4] += data[index]['ppm'];
                count[4] += 1;
            } else if (time < nowDate.getHours() - 8 && time >= nowDate.getHours() - 9) {
                sum[3] += data[index]['ppm'];
                count[3] += 1;
            } else if (time < nowDate.getHours() - 9 && time >= nowDate.getHours() - 10) {
                sum[2] += data[index]['ppm'];
                count[2] += 1;
            } else if (time < nowDate.getHours() - 10 && time >= nowDate.getHours() - 11) {
                sum[1] += data[index]['ppm'];
                count[1] += 1;
            } else { //(time<nowDate.getHours()-11 && time>=nowDate.getHours()-12)
                sum[0] += data[index]['ppm'];
                count[0] += 1;
            }
        }
        else{//이틀에 걸쳐 데이터가 존재하는 경우
            var strArray = data[index]['checkTime'].split(':'); //ex. 14:00:00 을 ':' 을 기준으로 나누어 3칸의 배열에 저장
            var time = parseInt(strArray[0]); // 그중 맨 앞의 데이터만 필요(시간 정보)
            //12 구간의 데이터로 나누어 해당 sum 배열에 저장해야한다
            //평균 산출을 위해 count도 1 더해준

            if (time < nowDate.getHours() && time >= nowDate.getHours() - 1) {
                sum[11] += data[index]['ppm'];
                count[11] += 1;
            } else if (time < nowDate.getHours() - 1 && time >= nowDate.getHours() - 2) {
                sum[10] += data[index]['ppm'];
                count[10] += 1;
            } else if (time < nowDate.getHours() - 2 && time >= nowDate.getHours() - 3) {
                sum[9] += data[index]['ppm'];
                count[9] += 1;
            } else if (time < nowDate.getHours() - 3 && time >= nowDate.getHours() - 4) {
                sum[8] += data[index]['ppm'];
                count[8] += 1;
            } else if (time < nowDate.getHours() - 4 && time >= nowDate.getHours() - 5) {
                sum[7] += data[index]['ppm'];
                count[7] += 1;
            } else if (time < nowDate.getHours() - 5 && time >= nowDate.getHours() - 6) {
                sum[6] += data[index]['ppm'];
                count[6] += 1;
            } else if (time < nowDate.getHours() - 6 && time >= nowDate.getHours() - 7) {
                sum[5] += data[index]['ppm'];
                count[5] += 1;
            } else if (time < nowDate.getHours() - 7 && time >= nowDate.getHours() - 8) {
                sum[4] += data[index]['ppm'];
                count[4] += 1;
            } else if (time < nowDate.getHours() - 8 && time >= nowDate.getHours() - 9) {
                sum[3] += data[index]['ppm'];
                count[3] += 1;
            } else if (time < nowDate.getHours() - 9 && time >= nowDate.getHours() - 10) {
                sum[2] += data[index]['ppm'];
                count[2] += 1;
            } else if (time < nowDate.getHours() - 10 && time >= nowDate.getHours() - 11) {
                sum[1] += data[index]['ppm'];
                count[1] += 1;
            } else { //(time<nowDate.getHours()-11 && time>=nowDate.getHours()-12)
                sum[0] += data[index]['ppm'];
                count[0] += 1;
            }
        }


    }

    for (var index = 0; index < sum.length; index++) {
        avg[index] = (sum[index] / count[index]).toFixed(2); //소수점 둘째자리까지만 저장
    }

    return avg;

}

var func = getData();
module.exports = func;