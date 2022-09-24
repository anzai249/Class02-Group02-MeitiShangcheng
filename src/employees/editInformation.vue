<style>
body {
    background-color: black;
}
</style>
<template>
    <div class="editInfo">
        <h2>Your ID is {{userid}}</h2>
        <hr />
        <el-form :inline="true" :model="editName" class="edit-name">
            <el-form-item label="Name">
                <el-input v-model="editName.name" placeholder="Your New Name"></el-input>
            </el-form-item>
            <el-form-item label="Gender">
                <el-select v-model="editName.gender" placeholder="Your Gender">
                    <el-option label="Male" value="male"></el-option>
                    <el-option label="Female" value="famale"></el-option>
                    <el-option label="Other" value="other"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="nameOnSubmit(editName.name,editName.gender)">Submit</el-button>
            </el-form-item>
        </el-form>
        <el-form :inline="true" :model="editAge" class="edit-age">
            <el-form-item label="Age">
                <el-input v-model="editAge.age" placeholder="Your New Age"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="ageOnSubmit(editAge.age)">Submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    props: ['userid'], // Recieve employee id from employeeSystem
    watch: {
        userid: function (newVal, oldVal) {
            this.newUserid = newVal;
            // this.loadWorkShift();
        }
    },
    data() {
        return {
            editName: {
                name: '',
                gender: ''
            },
            editAge: {
                age: ''
            }
        };
    },
    methods: {
        nameOnSubmit(name,gender){

        }
    }
}
</script>