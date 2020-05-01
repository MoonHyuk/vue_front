var sql = require('./db_sql')();

console.log('app.js started');

sql.select(function(err, data){
    if (err)
        console.log(err);
    else {
        console.log(data);
        a=[100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100];
        console.log(a);
    }

    sql.pool.end(function(err){
        if (err)
            console.log(err);
        else {
            console.log('Connection pool has closed');
            console.log('app.js finished');
        }
    });
});



