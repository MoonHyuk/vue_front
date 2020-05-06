var sql = require('./db_select_dust_pm1')();

console.log('dust_pm1 start');
var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mysql = require('mysql');

// database setting
var connection = mysql.createConnection( {
  host: '3.94.78.97',
  port: '3306',
  user: 'root',
  password: '1234',
  database: 'test'
});
connection.connect();



function getData(req, res) {

  console.log("get join url");
  var email = req.body.email;
  var responseData = {};
  var result = new Array();
  var query = connection.query('select * from testtable ORDER BY colomn1 ASC', function (err, rows) {
    if (err) throw err;
    if (!err) {

      for (var i = 0; i < rows.length; i++) {
        console.log("데이터 조회 : " + rows[i].colomn1 + '/' + rows[i].colomn2);
        result[i] = rows[i].colomn1
          + '/' + rows[i].colomn2;
      }

      res.json(result);
    } else {
      console.log("데이터 조회 안됨 ");
      responseData.result = "none";
      responseData.name = "";
    }
  });
}



exports.getData = getData;



/*  기존 코드


function getData() {
    sql.select(function (err, data) {
        var sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //각 시간대별 총 합
        var count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //각 시간대별 합의 갯수
        var avg = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //각 시간대별 평
        var nowDate = new Date();

        if (err)
            console.log(err);
        else {
            //main logic
            //1. select * from dust_1
            //2. 해당 객체로부터 최근 12시간동안 각 시간별 평균 도출
            //3. 그래프의 x축으로 사용할 시간 array return 함수 필요
            //4. 그래프의 데이터를 보내줄 return 함수 필요


            for (var index = 0; index < data.length; index++) {
                var strArray = data[index]['checkTime'].split(':'); //14:00:00을 ':' 을 기준으로 나누어 3칸의 배열에 저장
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

            for (var index = 0; index < sum.length; index++) {
                avg[index] = (sum[index] / count[index]).toFixed(2); //소수점 둘째자리까지만 저장
            }


            return avg;




*/