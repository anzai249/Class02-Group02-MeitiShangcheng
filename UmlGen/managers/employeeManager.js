export default {
    methods: {
        loadData() {
            this.loading = true;
            let tableDataInfo = new Array();
            // let total = 0;
            var i = 0;
            this.$request({
                url: "/loadEmployeeData",
                method: "post"
            }).then(res => {
                var info = res.data;
                if (info != 'undefined') {
                    for (i = 0; i < info.length; i++) {
                        var workshift = info[i].WorkShift
                        var attendance = info[i].Attendance
                        var age = info[i].Age
                        tableDataInfo.push(
                            {
                                id: info[i].ID,
                                name: info[i].Name,
                                gender: info[i].Gender,
                                age: Math.ceil((this.nowTime - Date.parse(age)) / 31536000000),
                                email: info[i].Email,
                                workshift: info[i].WorkShift,
                                attendance: info[i].Attendance,
                                department: info[i].Department,
                                arrival: this.calcArrival(workshift, attendance),
                                salary: info[i].Salary,
                                address: info[i].Address
                            }
                        )
                    }
                    this.loading = false;
                    return tableDataInfo
                }
            }).catch(err => {
                this.loading = false;
                return
            })
            return tableDataInfo
        },
        loadBinData() {
            let deletedData = new Array();
            // let total = 0;
            var i = 0;
            this.$request({
                url: "/loadRecycledData",
                method: "post"
            }).then(res => {
                var info = res.data;
                if (info != 'undefined') {
                    for (i = 0; i < info.length; i++) {
                        deletedData.push(
                            {
                                id: info[i].ID,
                                name: info[i].Name,
                            }
                        )
                    }
                    return deletedData
                }
            }).catch(err => {
                this.loading = false;
                return
            })
            return deletedData
        },
        calcArrival(workshift, attendance) {
            if (workshift === attendance) {
                return 'Yes'
            } else {
                return 'No'
            }
        },
        handleClick(row) {
            this.dialogVisible = true;
            // console.log(row);
            this.id = row.id;
            this.name = row.name;
            this.gender = row.gender;
            this.age = row.age;
            this.email = row.email;
            this.department = row.department;
            this.workshift = row.workshift;
            this.attendance = row.attendance;
            this.arrival = row.arrival;
            this.salary = row.salary;
            this.address = row.address;
        },
        editClick(row) {
            // Edit Window
            this.editFormVisible = true;
            // console.log(row);
            this.id = row.id;
            this.name = row.name;
            this.gender = row.gender;
            this.age = row.age;
            this.email = row.email;
            this.department = row.department;
            this.workshift = row.workshift;
            this.attendance = row.attendance;
            this.arrival = row.arrival;
            this.salary = row.salary;
            this.address = row.address;
        },
        recover(id) {
            this.$request({
                url: "/rollbackEmployee",
                params: { id },
                method: "post"
            }).then(res => {
                var info = res.data;
                alert(info);
            })
        },
        deleteForever(id) {
            if (confirm("Remove this employee?")) {
                this.$request({
                    url: "/removeEmployee",
                    params: { id },
                    method: "post"
                }).then(res => {
                    var info = res.data;
                    alert(info);
                })
            } else {
                return false;
            }
        },
        recycleBin() {
            this.binFormVisible = true
        },
        resetPassword(id) {
            this.$request({
                url: "/resetEmployeePassword",
                params: { id },
                method: "post"
            }).then(res => {
                //alert(res.data);
                var info = res.data;
                alert(info);
            })
            this.editFormVisible = false;
        },
        removeEmployee(id) {
            if (confirm("Remove this employee?")) {
                this.$request({
                    url: "/recycleEmployee",
                    params: { id },
                    method: "post"
                }).then(res => {
                    //alert(res.data);
                    var info = res.data;
                    alert(info);
                })
                this.editFormVisible = false;
            } else {
                return false;
            }
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        addElement() {
            this.addFormVisible = true
        },
        addNewEmployee(name, gender, age, email, address, workshift, salary, department) {
            if (!name || !gender || !age || !email || !address || !workshift || !salary || !department) {
                // 判断是否输入完全
                alert('Please fill all of the information')
                return;
            }
            this.addFormVisible = false
            this.$request({
                url: "/addEmployee",
                params: { name, gender, age, email, address, workshift, salary, department },
                method: "post"
            }).then(res => {
                //alert(res.data);
                var info = res.data;
                alert(info);
            })
        },
        editEmployee(id, name, gender, age, email, address, workshift, salary, department) {
            if (!id || !name || !gender || !age || !email || !address || !workshift || !salary || !department) {
                // 判断是否输入完全
                alert('Please fill all of the information')
                return;
            }
            this.$request({
                url: "/editEmployee",
                params: { id, name, gender, age, email, address, workshift, salary, department },
                method: "post"
            }).then(res => {
                //alert(res.data);
                var info = res.data;
                alert(info);
            })
            this.editFormVisible = false
        },
        reload() {
            this.tableData = this.loadData();
            this.deletedData = this.loadBinData();
            this.num++;
            return this.tableData;
        }
    },

    data() {
        var a = this.loadData()
        var b = this.loadBinData()
        var num = 0;
        return {
            nowTime: new Date().getTime(),
            num: num,
            tableData: a,
            deletedData: b,
            dialogVisible: false,
            addFormVisible: false,
            editFormVisible: false,
            binFormVisible: false,
            id: null,
            name: null,
            gender: null,
            age: null,
            email: null,
            workshift: null,
            attendance: null,
            department: null,
            arrival: null,
            address: null,
            salary: null,
            formLabelWidth: '120px',
            addForm: {
                name: '',
                gender: '',
                position: '',
            },
            editForm: {
            }
        }
    }
}