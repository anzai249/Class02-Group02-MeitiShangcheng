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
        <el-button type="primary" style="float:left;" @click="reload()" icon="el-icon-refresh-right">Refresh</el-button>
        <el-table v-loading="loading" max-height="490" :data='tableData' border :key="num" style="width: 100%;">
            <el-table-column sortable fixed prop="id" label="ID" width="100">
            </el-table-column>
            <el-table-column fixed prop="name" label="Name" width="200">
            </el-table-column>
            <el-table-column prop="email" label="Email" width="250">
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
            <span>ID: {{ id }}</span><br />
            <span>Name: {{ name }}</span><br />
            <span>Email: {{ email }}</span><br />
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false" plain>OK</el-button>
            </span>
        </el-dialog>
        <!--Add New Merchandise-->
        <el-dialog title="Add" :visible.sync="addFormVisible">
            <el-form :model="addForm">
                <el-form-item label="Name" :label-width="formLabelWidth">
                    <el-input v-model="addForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Email" :label-width="formLabelWidth">
                    <el-input v-model="addForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <p>The password will be set to default "123456".</p>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false" plain>Cancel</el-button>
                <el-button type="primary" @click="addNewMerchandise(addForm.name, addForm.email)" plain>
                    Submit</el-button>
            </div>
        </el-dialog>
        <!--Edit-->
        <el-dialog title="Edit" :visible.sync="editFormVisible">
            <el-form :model="editForm">
                <span>You are editing ID: {{ id }}</span><br />
                <el-form-item label="Name" :label-width="formLabelWidth">
                    <el-input v-model="editForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="email" :label-width="formLabelWidth">
                    <el-input v-model="editForm.email" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false" plain>Cancel</el-button>
                <el-button type="primary" @click="editManager(id, editForm.name, editForm.email)" plain>
                    Submit</el-button>
                <!-- <el-button @click="resetPassword(id)" type="warning" plain>Reset Password</el-button> -->
                <el-button @click="removeManager(id)" type="danger" plain>Remove Manager</el-button>
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
                url: "/loadManagerData",
                method: "post"
            }).then(res => {
                var info = res.data;
                if (info != 'undefined') {
                    for (i = 0; i < info.length; i++) {
                        tableDataInfo.push(
                            {
                                id: info[i].ID,
                                name: info[i].Name,
                                email: info[i].Email,
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
        handleClick(row) {
            this.dialogVisible = true;
            // console.log(row);
            this.id = row.id;
            this.name = row.name;
            this.email = row.email;
        },
        editClick(row) {
            // Edit Window
            this.editFormVisible = true;
            this.id = row.id;
            this.name = row.name;
            this.email = row.email;
        },
        removeManager(id) {
            if (confirm("Remove this manager?")) {
                this.$request({
                    url: "/removeManager",
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
        addNewManager(name, email) {
            if (!name || !email) {
                alert('Please fill all of the information')
                return;
            }
            this.addFormVisible = false
            this.$request({
                url: "/addManager",
                params: { name, email },
                method: "post"
            }).then(res => {
                var info = res.data;
                alert(info);
            })
        },
        editManager(id, name, email) {
            if (!name || !email) {
                // 判断是否输入完全
                alert('Please fill all of the information')
                return;
            }
            this.$request({
                url: "/editManager",
                params: { id, name, email },
                method: "post"
            }).then(res => {
                var info = res.data;
                alert(info);
            })
            this.editFormVisible = false
        },
        reload() {
            this.tableData = this.loadData();
            this.num++;
            return this.tableData;
        }
    },

    data() {
        var a = this.loadData()
        console.log(a)
        var num = 0;
        return {
            tableData: a,
            dialogVisible: false,
            addFormVisible: false,
            editFormVisible: false,
            id: null,
            name: null,
            email: null,
            formLabelWidth: '120px',
            addForm: {
            },
            editForm: {
            }
        }
    }
}
</script>