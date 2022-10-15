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
                <el-button type="primary" plain>Reset Sales</el-button>
            </el-col>
            <el-col :span="6">
                <el-button type="warning" plain>TestButton</el-button>
            </el-col>
            <el-col :span="6">
                <el-button type="danger" plain>TestButton</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    methods: {
        resetForm() {
            this.$request({
                url: "/resetAttendance",
                method: "post"
            }).then(res => {
                alert(res.data);
            })
        }
    }
}
</script>
