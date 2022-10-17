<style>
body {
    background-color: black;
}

.editInfo {
    top: 100px;
    position: absolute;
    width: 99%;
}

#whiteLabel {
    background-color: white;
    border-radius: 4px;
}
</style>
<template>
    <div class="editInfo">
        <h1>TODO：后端还没写</h1>
        <h2>Your ID is {{userid}}</h2>
        <hr />
        <el-form :inline="true" :model="editName" class="edit-name">
            <el-form-item label="Name" id="whiteLabel">
                <el-input v-model="editName.name" placeholder="Your New Name"></el-input>
            </el-form-item>
            <el-form-item label="Gender" id="whiteLabel">
                <el-select v-model="editName.gender" placeholder="Do not change">
                    <el-option label="Male" value="male"></el-option>
                    <el-option label="Female" value="famale"></el-option>
                    <el-option label="Other" value="other"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Age" id="whiteLabel">
                <el-input v-model="editName.age" placeholder="Your New Age"></el-input>
            </el-form-item>
            <el-form-item label="Email" id="whiteLabel">
                <el-input v-model="editName.email" placeholder="Your New Email"></el-input>
            </el-form-item>
            <el-form-item label="Address" id="whiteLabel">
                <el-input v-model="editName.address" placeholder="Your New Address"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="nameOnSubmit(editName.name,editName.gender)">Submit</el-button>
            </el-form-item>
        </el-form>
        <hr />
        <el-form :inline="true" :model="editPass" class="edit-pass">
            <el-form-item label="Old Password" id="whiteLabel">
                <el-input v-model="editPass.old" placeholder="Your Old Password" show-password></el-input>
            </el-form-item>
            <el-form-item label="New Password" id="whiteLabel">
                <el-input v-model="editPass.new" placeholder="Your New Password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="passOnSubmit(editPass.old,editPass.new)">Submit</el-button>
            </el-form-item>
        </el-form>
        <h4>Your hour salary: {{salary[0]}}</h4>
    </div>
</template>
<script>
export default {
    props: ['userid'], // Recieve employee id from employeeSystem
    watch: {
        userid: function (newVal, oldVal) {
            this.newUserid = newVal;
            //this.loadInformation();
        }
    },
    data() {
        var information = this.loadInformation(this.userid)
        var salary = information.Salary
        return {
            editName: {
                name: information.Name,
                gender: information.Gender, // TODO 这有个bug，要修 //
                age: information.Age,
                email: information.Email,
                address: information.Address,

            },
            editPass: {

            },
            salary
        };
    },
    methods: {
        loadInformation(userid) {
            var Name = new Array();
            var Gender = new Array();
            var Age = new Array();
            var Email = new Array();
            var Address = new Array();
            var Salary = new Array();
            this.$request({
                url: "/loadInformation",
                params: { userid },
                method: "post"
            }).then(res => {
                var info = res.data;
                if (info != 'undefined') {
                    Name.push(
                        info[0].Name
                    )
                    Gender.push(
                        info[0].Gender
                    )
                    Age.push(
                        info[0].Age
                    )
                    Email.push(
                        info[0].Email
                    )
                    Address.push(
                        info[0].Address
                    )
                    Salary.push(
                        info[0].Salary
                    )
                    return { Name, Gender, Age, Email, Address, Salary }
                } else if (info === 'error00') {
                    alert('Please login again!');
                }
            }).catch(err => {
                return
            })
            return { Name, Gender, Age, Email, Address, Salary }
        },
        nameOnSubmit(name, gender) {

        },
        passOnSubmit(oldPass, newPass) {

        }
    }
}
</script>