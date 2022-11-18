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
        <h2>Your ID is {{ userid }}</h2>
        <hr />
        <el-form :inline="true" :model="editName" class="edit-name">
            <el-form-item label="Name" id="whiteLabel">
                <el-input v-model="editName.name" placeholder="Your New Name"></el-input>
            </el-form-item>
            <el-form-item label="Email" id="whiteLabel">
                <el-input v-model="editName.email" placeholder="Your New Email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="nameOnSubmit(id, editName.name, editName.email)">Submit</el-button>
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
                <el-button type="primary" @click="passOnSubmit(id, editPass.old, editPass.new)">Submit</el-button>
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
            //this.loadInformation();
        }
    },
    data() {
        var information = this.loadInformation(this.userid)
        return {
            editName: {
                name: information.Name,
                email: information.Email,
            },
            editPass: {

            },
        };
    },
    methods: {
        loadInformation(userid) {
            var Name = new Array();
            var Email = new Array();
            this.$request({
                url: "/loadMangerInformation",
                params: { userid },
                method: "post"
            }).then(res => {
                var info = res.data;
                if (info != 'undefined') {
                    Name.push(
                        info[0].Name
                    )
                    Email.push(
                        info[0].Email
                    )
                    return { Name, Email }
                } else if (info === 'error00') {
                    alert('Please login again!');
                }
            }).catch(err => {
                return
            })
            return { Name, Email }
        },
        nameOnSubmit(id, name, email) {
            if (!id || !name || !email) {
                alert('Please fill all of the information')
                return;
            }
            this.$request({
                url: "/editManagerInfo",
                params: { id, name, email },
                method: "post"
            }).then(res => {
                var info = res.data;
                alert(info);
            })
        },
        passOnSubmit(id, oldPass, newPass) {
            if (!id || !oldPass || !newPass) {
                alert('Please fill all of the information')
                return;
            }
            this.$request({
                url: "/editManagerPass",
                params: { id, oldPass, newPass },
                method: "post"
            }).then(res => {
                var info = res.data;
                alert(info);
            })
        }
    }
}
</script>