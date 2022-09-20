const express = require('express') // 引入express
const mysql = require('mysql') // 引入mysql
// 连接数据库
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'meitishangcheng'
});
connection.connect();
let app = express()
// Parse掉恶心的json
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 解决跨域
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})
const result = {
    "status": "200",
    "message": "success",
}

// Login
app.post('/login', function (req, res) {
    var id = req.query.id
    var pswd = req.query.pswd
    var position = req.query.position
    if (position == 'manager') {
        connection.query('SELECT Password from managers where ID = ' + id, function (error, results, fields) {
            if (error) throw error;
            // result.data = results 回传会造成密码泄露
            // res.json(result)
            if (typeof (results[0]) != 'undefined') {
                if (results[0].Password == pswd) {
                    connection.query('SELECT * from managers where ID = ' + id, function (error, results, fields) {
                        var info = results[0]
                        res.send(info)
                    })
                } else {
                    res.send('Err00')// ID or password error.
                }
            } else {
                res.send('Err01')// ID error.
            }
        });
    } else {
        connection.query('SELECT Password from employees where ID = ' + id, function (error, results, fields) {
            if (error) throw error;
            //result.data = results
            // res.json(result)
            if (typeof (results[0]) != 'undefined') {
                if (results[0].Password == pswd) {
                    connection.query('SELECT * from employees where ID = ' + id, function (error, results, fields) {
                        var info = results[0]
                        res.send(info)
                    })
                } else {
                    res.send('Err00')
                }
            } else {
                res.send('Err01')
            }
        });
    }
})

// BEGIN OF THE EMPLOYEE PAGE //
// loadEmployeeData
app.post('/loadEmployeeData', function (req, res) {
    connection.query('SELECT * from employees', function (error, results, fields) {
        if (error) throw error;
        var info = results
        res.send(info)
    });
})
// addEmployee
app.post('/addEmployee', function (req, res) {
    var name = req.query.name
    var gender = req.query.gender
    var age = req.query.age
    var email = req.query.email
    var address = req.query.address
    var workshift = req.query.workshift
    var salary = req.query.salary
    var department = req.query.department
    // Need name, gender, age, email, address, workshift, salary, department.
    connection.query('INSERT INTO employees(Name,Gender,Age,Email,Address,Workshift,Salary,Department,Password)VALUES(?,?,?,?,?,?,?,?,?)', [name, gender, age, email, address, workshift, salary, department, "123456"], function (error, results, fields) {
        if (error) throw error;
        //result.data = results
        res.send('Success.')
    });
})
app.post('/resetEmployeePassword', function (req, res) {
    var id = req.query.id
    connection.query('update employees set Password=? where id='+id, ['123456'], function (error, results, fields) {
        if (error) throw error;
        // result.data = results
        // res.json(result)
        res.send('Success.')
    });
})
app.post('/editEmployee', function (req, res) {
    var id = req.query.id
    var name = req.query.name
    var gender = req.query.gender
    var age = req.query.age
    var email = req.query.email
    var address = req.query.address
    var workshift = req.query.workshift
    var salary = req.query.salary
    var department = req.query.department
    connection.query('update employees set Name=?,Gender=?,Age=?,Email=?,Address=?,Workshift=?,Salary=?,Department=? where id='+id, [name, gender, age, email, address, workshift, salary, department], function (error, results, fields) {
        if (error) throw error;
        // result.data = results
        // res.json(result)
        res.send('Success.')
    });
})
app.post('/removeEmployee', function (req, res) {
    var id = req.query.id
    connection.query('delete from employees where ID='+id, function (error, results, fields) {
        if (error) throw error;
        //result.data = results
        //res.json(result)
        res.send('Success.')
    });
})
// END OF THE EMPLOYEE PAGE //

// BEGIN OF THE DEPOT PAGE //
// loadDepotData
app.post('/loadDepotData', function (req, res) {
    connection.query('SELECT * from depot', function (error, results, fields) {
        if (error) throw error;
        var info = results
        // console.log(info)
        res.send(info)
    });
})
// add Merchandise
app.post('/addMerchandise', function (req, res) {
    var name = req.query.name
    var type = req.query.type
    var price = req.query.price
    var amount = req.query.amount
    connection.query('INSERT INTO depot(MerchandiseName,MerchandiseType,Price,Amount)VALUES(?,?,?,?)', [name, type, price, amount], function (error, results, fields) {
        if (error) throw error;
        //result.data = results
        res.send('Success.')
    });
})
// edit Merchandise
app.post('/editMerchandise', function (req, res) {
    var id = req.query.id
    var name = req.query.name
    var type = req.query.type
    var price = req.query.price
    var amount = req.query.amount
    connection.query('update depot set MerchandiseName=?,MerchandiseType=?,Price=?,Amount=? where MerchandiseID='+id, [name, type, price, amount], function (error, results, fields) {
        if (error) throw error;
        // result.data = results
        // res.json(result)
        res.send('Success.')
    });
})
// delete Merchandise
app.post('/removeMerchandise', function (req, res) {
    var id = req.query.id
    connection.query('delete from depot where MerchandiseID='+id, function (error, results, fields) {
        if (error) throw error;
        //result.data = results
        //res.json(result)
        res.send('Success.')
    });
})
// END OF THE DEPOT PAGE //
// BEGIN OF THE CHECK PAGE //
// get work shift
app.post('/getWorkShift', function (req, res) {
    var id = req.query.userid
    if(!id){
        res.send('error00')
        return
    }
    connection.query('SELECT WorkShift from employees where ID='+id, function (error, results, fields) {
        if (error) throw error;
        var info = results
        res.send(info)
    });
})

app.listen('8090', () => {
    console.log('Listening port 8090')
})