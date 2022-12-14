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
                        console.log(info)
                        if (info.Deleted === 0) {
                            res.send(info)
                        } else {
                            res.send('Err02')
                        }
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
    connection.query('SELECT * from employees where Deleted = 0', function (error, results, fields) {
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
    connection.query('update employees set Password=? where id=' + id, ['123456'], function (error, results, fields) {
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
    connection.query('update employees set Name=?,Gender=?,Age=?,Email=?,Address=?,Workshift=?,Salary=?,Department=? where id=' + id, [name, gender, age, email, address, workshift, salary, department], function (error, results, fields) {
        if (error) throw error;
        // result.data = results
        // res.json(result)
        res.send('Success.')
    });
})
// recycle
app.post('/recycleEmployee', function (req, res) {
    var id = req.query.id
    connection.query('update employees set Deleted=1 where id=' + id, function (error, results, fields) {
        if (error) throw error;
        res.send('Success.')
    });
})
// real delete
app.post('/removeEmployee', function (req, res) {
    var id = req.query.id
    connection.query('delete from employees where ID=' + id, function (error, results, fields) {
        if (error) throw error;
        //result.data = results
        //res.json(result)
        res.send('Success.')
    });
})
// select recycled employee
app.post('/loadrecycledData', function (req, res) {
    connection.query('SELECT * from employees where Deleted = 1', function (error, results, fields) {
        if (error) throw error;
        var info = results
        res.send(info)
    });
})
// rollback the deletion 滚回XD
app.post('/rollbackEmployee', function (req, res) {
    var id = req.query.id
    connection.query('update employees set Deleted=0 where id=' + id, function (error, results, fields) {
        if (error) throw error;
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
    connection.query('update depot set MerchandiseName=?,MerchandiseType=?,Price=?,Amount=? where MerchandiseID=' + id, [name, type, price, amount], function (error, results, fields) {
        if (error) throw error;
        // result.data = results
        // res.json(result)
        res.send('Success.')
    });
})
// delete Merchandise
app.post('/removeMerchandise', function (req, res) {
    var id = req.query.id
    connection.query('delete from depot where MerchandiseID=' + id, function (error, results, fields) {
        if (error) throw error;
        //result.data = results
        //res.json(result)
        res.send('Success.')
    });
})

// sell Merchandise
app.post('/sellMerchandise', function (req, res) {
    var id = req.query.id
    var amount = req.query.amount
    connection.query('update depot set Amount=Amount-' + amount + ' , Sales=Sales+' + amount + ' where MerchandiseID=' + id, function (error, results, fields) {
        if (error) throw error;
        //result.data = results
        //res.json(result)
        res.send('Success.')
    });
})
// END OF THE DEPOT PAGE //

// BEGIN OF THE MANAGER INFO PAGE //
// load Manger Information
app.post('/loadMangerInformation', function (req, res) {
    var id = req.query.userid
    if (!id) {
        res.send('error00')
        return
    }
    connection.query('SELECT * from managers where ID=' + id, function (error, results, fields) {
        if (error) throw error;
        var info = results
        res.send(info)
    });
})
// edit Manager info
app.post('/editManagerInfo', function (req, res) {
    var id = req.query.id
    var name = req.query.name
    var email = req.query.email
    if (!id) {
        res.send('Please Login again!')
        return
    }
    connection.query('update managers set Name=?,Email=? where id=' + id, [name, email], function (error, results, fields) {
        if (error) throw error;
        res.send('Success!')
    });
})
// edit Manager pass
app.post('/editManagerPass', function (req, res) {
    var id = req.query.id
    var oldPass = req.query.oldPass
    var newPass = req.query.newPass
    if (!id) {
        res.send('Please Login again!')
        return
    }
    connection.query('SELECT Password from managers where id=' + id, function (error, results, fields) {
        if (error) throw error;
        var info = results
        if (oldPass === info[0].Password) {
            connection.query('update managers set Password=? where id=' + id, [newPass], function (error, results, fields) {
                if (error) throw error;
                res.send('Success!')
            });
        } else {
            res.send('Failed! Please check your input!')
        }

    });

})
// END OF THE MANAGER INFO PAGE //

// BEGIN OF THE CHECK PAGE //
// get work shift
app.post('/getWorkShift', function (req, res) {
    var id = req.query.userid
    if (!id) {
        res.send('error00')
        return
    }
    connection.query('SELECT WorkShift from employees where ID=' + id, function (error, results, fields) {
        if (error) throw error;
        var info = results
        res.send(info)
    });
})
// check it
app.post('/checkIt', function (req, res) {
    var id = req.query.userid
    var checkedShift = "error"
    if (!id) {
        res.send('error00')
        return
    }
    var d = new Date();
    var hour = d.getHours();
    if (hour > 4 && hour <= 12) {
        checkedShift = "Morning"
    } else if (hour > 12 && hour <= 20) {
        checkedShift = "Afternoon"
    } else if (hour > 20 || hour <= 4) {
        checkedShift = "Evening"
    } else {
        checkedShift = "error"
    }
    connection.query('update employees set Attendance=? where ID=' + id, [checkedShift], function (error, results, fields) {
        if (error) throw error;
        res.send('Success.')
    });
})
// get check status
app.post('/getCheckStatus', function (req, res) {
    var id = req.query.userid
    if (!id) {
        res.send('error00')
        return
    }
    connection.query('SELECT Attendance from employees where ID=' + id, function (error, results, fields) {
        if (error) throw error;
        var info = results
        res.send(info)
    });
})
// END OF THE CHECK PAGE //
// BEGIN OF THE EDIT PAGE //
// load employee Info
app.post('/loadInformation', function (req, res) {
    var id = req.query.userid
    if (!id) {
        res.send('error00')
        return
    }
    connection.query('SELECT * from employees where ID=' + id, function (error, results, fields) {
        if (error) throw error;
        var info = results
        res.send(info)
    });
})
// edit employee info
app.post('/editEmployeeInfo', function (req, res) {
    var id = req.query.id
    var name = req.query.name
    var gender = req.query.gender
    var age = req.query.age
    var email = req.query.email
    var address = req.query.address
    if (!id) {
        res.send('Please Login again!')
        return
    }
    connection.query('update employees set Name=?,Gender=?,Age=?,Email=?,Address=? where id=' + id, [name, gender, age, email, address], function (error, results, fields) {
        if (error) throw error;
        res.send('Success!')
    });
})
// edit employee pass
app.post('/editEmployeePass', function (req, res) {
    var id = req.query.id
    var oldPass = req.query.oldPass
    var newPass = req.query.newPass
    if (!id) {
        res.send('Please Login again!')
        return
    }
    connection.query('SELECT Password from employees where id=' + id, function (error, results, fields) {
        if (error) throw error;
        var info = results
        if (oldPass === info[0].Password) {
            connection.query('update employees set Password=? where id=' + id, [newPass], function (error, results, fields) {
                if (error) throw error;
                res.send('Success!')
            });
        } else {
            res.send('Failed! Please check your input!')
        }

    });

})
// END OF THE EDIT PAGE //
// BEGIN OF THE ADMIN PAGE //
// load managers
app.post('/loadManagerData', function (req, res) {
    connection.query('SELECT * from managers', function (error, results, fields) {
        if (error) throw error;
        var info = results
        res.send(info)
    });
})
// add manager
app.post('/addManager', function (req, res) {
    var name = req.query.name
    var email = req.query.email
    connection.query('INSERT INTO managers(Name,Email)VALUES(?,?)', [name, email], function (error, results, fields) {
        if (error) throw error;
        res.send('Success.')
    });
})
// edit manager
app.post('/editManager', function (req, res) {
    var id = req.query.id
    var name = req.query.name
    var email = req.query.email
    connection.query('update managers set Name=?,Email=? where ID=' + id, [name, email], function (error, results, fields) {
        if (error) throw error;
        res.send('Success.')
    });
})
// delete manager
app.post('/removeManager', function (req, res) {
    var id = req.query.id
    connection.query('delete from managers where ID=' + id, function (error, results, fields) {
        if (error) throw error;
        res.send('Success.')
    });
})
// reset attendance
app.post('/resetAttendance', function (req, res) {
    connection.query('update employees set Attendance=?', ['none'], function (error, results, fields) {
        if (error) throw error;
        res.send('Success.')
    });
})
// END OF THE ADMIN PAGE //
// BEGIN OF THE STATIC PAGE //
// count amount
app.post('/countAmount', function (req, res) {
    connection.query('SELECT MerchandiseType, sum(Amount) as Amount from depot group by MerchandiseType', function (error, results, fields) {
        if (error) throw error;
        var info = results
        res.send(info)
    });
})
// brand sales
app.post('/brandSales', function (req, res) {
    connection.query('SELECT MerchandiseName as name, sum(Sales) as value from depot group by MerchandiseType', function (error, results, fields) {
        if (error) throw error;
        var info = results
        res.send(info)
    });
})
// employee gender
app.post('/employeeGender', function (req, res) {
    connection.query('SELECT Count(Name) as value, Gender as name from employees group by Gender', function (error, results, fields) {
        if (error) throw error;
        var info = results
        res.send(info)
    });
})
// work shift chart
app.post('/workShiftChart', function (req, res) {
    connection.query('SELECT Count(Name) as value, WorkShift as name from employees group by WorkShift', function (error, results, fields) {
        if (error) throw error;
        var info = results
        res.send(info)
    });
})
app.listen('8090', () => {
    console.log('Listening port 8090')
})