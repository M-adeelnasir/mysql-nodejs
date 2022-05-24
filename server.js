const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

app.use(bodyParser.json());


//creats the connection with mysql
const connectionWithSql = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'second',
    multipleStatements: true
})

//chech for the connection
connectionWithSql.connect((err) => {
    if (!err) {
        console.log("connected");
    }
    else {
        console.log(err);
        console.log("Connection failed");
    }

})

//get employees data
app.get('/employees', (req, res) => {
    connectionWithSql.query("SELECT * FROM second.employee", (err, result, fields) => {
        if (err) throw err
        // console.log(result);
        console.log(fields);
        res.json(result)

    })
})


//add employee
app.post('/employee/new', (req, res) => {

    const { id, name, salary } = req.body;

    connectionWithSql.query(`INSERT INTO second.employee VALUES(${id},"${name}", "${salary}" )`, (err, result, fields) => {
        if (err) throw err;
        console.log("data insertred");
        res.json(result)
        // console.log(result);

    })
})

//update document
app.put('/employee/update', (req, res) => {
    const { name, id } = req.body
    connectionWithSql.query(`UPDATE second.employee SET Name="${name}" WHERE EmpId=${id}`, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json({
            success: true
        })
    })
})



//get single document
app.get('/employee', (req, res) => {
    const { id } = req.body;
    console.log(id);

    connectionWithSql.query(`SELECT * FROM second.employee WHERE EmpId=${id}`, (err, result, fields) => {
        if (err) throw err;
        res.json(result);
        console.log(result);
    })

})


//delete document
app.delete('/employee', (req, res) => {
    const { id } = req.body
    connectionWithSql.query(`DELETE FROM second.employee WHERE EmpId=${id}`, (err, result) => {
        if (err) throw err;
        console.log(result);
        console.log("deleted");
        res.json({
            success: true
        })
    })
})


//order and sort 
app.get('/order/employees', (req, res) => {
    connectionWithSql.query("SELECT * FROM second.employee ORDER BY Name", (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})



//table created
const createNewTable = async () => {
    try {
        await connectionWithSql.query("CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(255), Address VARCHAR(255))", (err, result) => {
            if (err) throw err;
            console.log(result);
            console.log("Table is Created");
        })
    } catch (err) {
        console.log(err);
    }
}

// createNewTable()

//drop table
const dropTable = () => {
    connectionWithSql.query("DROP TABLE users", (err, result) => {
        if (err) throw err;
        console.log("Table droped successful");
    })
}

// dropTable()









app.listen(4000, console.log('App listing'))