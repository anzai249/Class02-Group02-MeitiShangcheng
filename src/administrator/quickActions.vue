<style>
.actionButtons {
    top: 100px;
    position: absolute;
    width: 99%;
}
</style>

<template>
    <div class="actionButtons">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-button type="primary" plain @click="resetForm()">Reset Attendance</el-button>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" plain @click="resetSales()">Reset Sales</el-button>
            </el-col>
            <el-col :span="6">
                <el-button type="danger" plain @click="delAll()">Delete All</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    methods: {
        resetForm() {
            if (confirm("Reset Attendance?")) {
                this.$request({
                    url: "/resetAttendance",
                    method: "post"
                }).then(res => {
                    alert(res.data);
                })
            } else {
                return false;
            }
        },
        resetSales() {
            if (confirm("Reset Sales?")) {
                this.$request({
                    url: "/resetSales",
                    method: "post"
                }).then(res => {
                    alert(res.data);
                })
            } else {
                return false;
            }
        },
        delAll() {
            if (confirm("Did you truly want to delete ALL OF THE DATA?")) {
                if (confirm("Confirm?")) {
                    this.$request({
                        url: "/DELETEALL",
                        method: "post"
                    }).then(res => {
                        alert(res.data);
                    })
                } else {
                    return false;
                }
            } else {
                return false;
            }

        },
    }
}
</script>
