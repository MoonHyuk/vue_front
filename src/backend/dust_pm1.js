var sql = require('./db_select_dust_pm1')();

console.log('dust_pm1 started');
var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
 
// database setting
var connection = mysql.createConnection({
    host : '3.94.78.97',
    port : '3306',
    user : 'root',
    password : '1234',
    database : 'test'
});
connection.connect();


function getData(req,res) {

      console.log("get join url");
    var email = req.body.email;
    var responseData = {};
    var result  = new Array();
    var query = connection.query('select * from testtable ORDER BY colomn1 ASC', function(err, rows){
    if(err) throw err;
    if(!err){
      
      for(var i=0; i<rows.length;i++){
        console.log("데이터 조회 : " +rows[i].colomn1+'/'+rows[i].colomn2);
            result[i]=rows[i].colomn1
                        +'/'+rows[i].colomn2;
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

