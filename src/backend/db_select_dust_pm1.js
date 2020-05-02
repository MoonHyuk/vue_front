var pool = require('./db_connect');

module.exports = function () {
    return {
        select: function (callback) {
            pool.getConnection(function (err, con) {
                var nowDate = new Date();
                //sql문 의미 : 오늘 날짜에 해당하는 data 중에서 최근 12시간의 값들만 추출

                var sql = 'select * from dust_1 where checkDate=\'' +
                    '' + nowDate.getFullYear() + '-' + (parseInt(nowDate.getMonth()) + 1) + '-' + nowDate.getDate() + '\''
                    + ' and checkTime<=\'' + nowDate.getHours() + ':00:00\'' + ' and checkTime>=\'' + (nowDate.getHours() - 12) + ':00:00\'';


                /*

                오전 11시 이전에 호출하는 경우 하루 전날의 저녁부터 데이터를 가져오는 로직 추가 필요
                ex. 오전 3시에 페이지를 켰을 경우, 전날 16:00:00 부터 데이터를 가져와야함

                 */

                con.query(sql, function (err, result, fields) {
                    con.release();
                    if (err)
                        return callback(err);
                    callback(null, result);
                });
            });
        },
        pool: pool
    }
};