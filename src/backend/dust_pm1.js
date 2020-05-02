var sql = require('./db_select_dust_pm1')();

console.log('dust_pm1 started');

sql.select(function(err, data){
    if (err)
        console.log(err);
    else {
        //main logic
        //1. select * from dust_1
        //2. 해당 객체로부터 최근 12시간동안 각 시간별 평균 도출
        //3. 그래프의 x축으로 사용할 시간 array return 함수 필요
        //4. 그래프의 데이터를 보내줄 return 함수 필요
        console.log(data);
    }

    sql.pool.end(function(err){
        if (err)
            console.log(err);
        else {
            console.log('Connection pool has closed');
            console.log('dust_pm1 finished');
        }
    });
});



