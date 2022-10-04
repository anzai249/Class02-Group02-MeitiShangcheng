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
                <div class="grid-content bg-purple">
                    <el-button type="primary" plain>Reset Attendance</el-button>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-button type="primary" plain>Reset Sales</el-button>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-button type="warning" plain>TestButton</el-button>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-button type="danger" plain>TestButton</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {

}
</script>
