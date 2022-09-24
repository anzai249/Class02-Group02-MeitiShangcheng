<style>
.employeeMan {
    top: 100px;
    position: absolute;
    width: 99%;
}
</style>
<template>
    <div class="employeeMan">
        <el-button type="success" style="float:left;" @click="addElement()" icon="el-icon-plus">Add</el-button>
        <el-button type="primary" style="float:left;" onclick="javascript:location.reload()"
            icon="el-icon-refresh-right">Refresh</el-button>
        <el-table v-loading="loading" max-height="490" :data='tableData' border :key="Math.random()"
            style="width: 100%;">
            <el-table-column sortable fixed prop="id" label="ID" width="100">
            </el-table-column>
            <el-table-column fixed prop="name" label="Name" width="120">
            </el-table-column>
            <el-table-column
                :filters="[{text: 'male', value: 'male'}, {text: 'female', value: 'female'}, {text: 'other', value: 'other'}]"
                :filter-method="filterHandler" prop="gender" label="Gender" width="110">
            </el-table-column>
            <el-table-column sortable prop="age" label="Age" width="80">
            </el-table-column>
            <el-table-column prop="email" label="Email" width="230">
            </el-table-column>
            <el-table-column
                :filters="[{text: 'Sell', value: 'Sell'}, {text: 'Maintenance', value: 'Maintenance'}, {text: 'Depot', value: 'Depot'}, {text: 'Finance', value: 'Finance'}]"
                :filter-method="filterHandler" prop="department" label="Department" width="120">
            </el-table-column>
            <el-table-column prop="workshift" label="WorkShift" width="120">
            </el-table-column>
            <el-table-column
                :filters="[{text: 'Morning', value: 'Morning'}, {text: 'Afternoon', value: 'Afternoon'}, {text: 'Evening', value: 'Evening'}]"
                :filter-method="filterHandler" prop="attendance" label="Attendance" width="120">
            </el-table-column>
            <el-table-column :filters="[{text: 'Yes', value: 'Yes'}, {text: 'No', value: 'No'}]"
                :filter-method="filterHandler" prop="arrival" label="Arrival" width="120">
            </el-table-column>
            <el-table-column sortable prop="salary" label="Salary/Hour" width="125">
            </el-table-column>
            <el-table-column prop="address" label="Address" width="150">
            </el-table-column>
            <el-table-column fixed="right" label="Action" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">View</el-button>
                    <el-button @click="editClick(scope.row)" type="text" size="small">Edit</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--View Details Window-->
        <el-dialog title="Details" :visible.sync="dialogVisible" width="30%">
            <span>ID: {{id}}</span><br />
            <span>Name: {{name}}</span><br />
            <span>Gender: {{gender}}</span><br />
            <span>Age: {{age}}</span><br />
            <span>Email: {{email}}</span><br />
            <span>Address: {{address}}</span><br />
            <span>Salary/Hour: {{salary}}</span><br />
            <span>Department: {{department}}</span><br />
            <span>Work Shift: {{workshift}}</span><br />
            <span>Attendance: {{attendance}}</span><br />
            <span>Arrival: </span><span>{{arrival}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false" plain>OK</el-button>
            </span>
        </el-dialog>
        <!--Add New Employee-->
        <el-dialog title="Add" :visible.sync="addFormVisible">
            <el-form :model="addForm">

                <el-form-item label="Name" :label-width="formLabelWidth">
                    <el-input v-model="addForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Age" :label-width="formLabelWidth">
                    <el-input v-model="addForm.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Email" :label-width="formLabelWidth">
                    <el-input v-model="addForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Department" :label-width="formLabelWidth">
                    <el-input v-model="addForm.department" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Address" :label-width="formLabelWidth">
                    <el-input v-model="addForm.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Salary/Hour" :label-width="formLabelWidth">
                    <el-input v-model="addForm.salary" autocomplete="off"></el-input>
                </el-form-item>
                <el-select v-model="addForm.gender" placeholder="Gender">
                    <el-option label="Male" value="male"></el-option>
                    <el-option label="Female" value="female"></el-option>
                    <el-option label="Other" value="other"></el-option>
                </el-select>
                <el-select v-model="addForm.workshift" placeholder="WorkShift">
                    <el-option label="Morning" value="Morning"></el-option>
                    <el-option label="Afternoon" value="Afternoon"></el-option>
                    <el-option label="Evening" value="Evening"></el-option>
                </el-select>
                <p>The password will be set to default "123456".</p>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false" plain>Cancel</el-button>
                <el-button type="primary"
                    @click="addNewEmployee(addForm.name,addForm.gender,addForm.age,addForm.email,addForm.address,addForm.workshift,addForm.salary,addForm.department)"
                    plain>
                    Submit</el-button>
            </div>
        </el-dialog>
        <!--Edit-->
        <el-dialog title="Edit" :visible.sync="editFormVisible">
            <el-form :model="editForm">
                <span>You are editing ID: {{id}}</span><br />
                <el-form-item label="Name" :label-width="formLabelWidth">
                    <el-input v-model="editForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Age" :label-width="formLabelWidth">
                    <el-input v-model="editForm.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Email" :label-width="formLabelWidth">
                    <el-input v-model="editForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Department" :label-width="formLabelWidth">
                    <el-input v-model="editForm.department" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Address" :label-width="formLabelWidth">
                    <el-input v-model="editForm.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Salary/Hour" :label-width="formLabelWidth">
                    <el-input v-model="editForm.salary" autocomplete="off"></el-input>
                </el-form-item>
                <el-select v-model="editForm.gender" placeholder="Gender">
                    <el-option label="Male" value="male"></el-option>
                    <el-option label="Female" value="female"></el-option>
                    <el-option label="Other" value="other"></el-option>
                </el-select>
                <el-select v-model="editForm.workshift" placeholder="WorkShift">
                    <el-option label="Morning" value="Morning"></el-option>
                    <el-option label="Afternoon" value="Afternoon"></el-option>
                    <el-option label="Evening" value="Evening"></el-option>
                </el-select>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false" plain>Cancel</el-button>
                <el-button type="primary"
                    @click="editEmployee(id,editForm.name,editForm.gender,editForm.age,editForm.email,editForm.address,editForm.workshift,editForm.salary,editForm.department)"
                    plain>
                    Submit</el-button>
                <el-button @click="resetPassword(id)" type="warning" plain>Reset Password</el-button>
                <el-button @click="removeEmployee(id)" type="danger" plain>Remove Employee</el-button>
            </div>
        </el-dialog>
    </div>
</template>
  
<script>
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
                        tableDataInfo.push(
                            {
                                id: info[i].ID,
                                name: info[i].Name,
                                gender: info[i].Gender,
                                age: info[i].Age,
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
                url: "/removeEmployee",
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
        }
    },

    data() {
        var a = this.loadData()
        console.log(a)
        return {
            tableData: a,
            dialogVisible: false,
            addFormVisible: false,
            editFormVisible: false,
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
</script>