const express = require("express");
const mysql = require("mysql");
const app = express();
const path = require("path");
const router = express.Router();

app.set('view engine', 'ejs');
app.set('views', './views');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'base',
    debug: false,
    multipleStatements: true
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySql Connected...");
})

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    let sql = 'select ESTADO as country, truncate(SUM(VALOR), 2) as value from base.pessoa group by ESTADO order by value DESC;select DATA as date, VALOR as value from base.pessoa;';
    db.query(sql, [2, 1], (err, result, fields) => {
        if (err) throw err;
        res.render('index.ejs', {pessoa:result[0], line:result[1]});
    })
});

app.listen(8080, (error) => {
    if(error) {
        console.log(error);
    }
    else {
        console.log('server running in localhost:8080');
    }
});
