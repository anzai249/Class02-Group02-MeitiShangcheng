<style lang="css">
body {

  background-image: url("../assets/background.png");
  background-size: 100%;
}

h1 {
  -webkit-app-region: drag;
}

.box {
  width: 800px;
  height: 500px;
  /*width: 3px;*/
  /*height: 3px;*/
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  border-radius: 10px;
  transition: 2s;
  overflow: hidden;
  background-image: linear-gradient(120deg, #FFFFFF 0%, #6d6d6d 100%);
  /*background-image: linear-gradient(120deg, #76daec 0%, #96c93d 100%);*/
  box-shadow: 0 25px 45px rgba(0, 0, 0, 1);
  user-select: none;
}

.roof {
  width: 100%;
  height: 15%;
  background-color: rgba(0, 0, 0, 0.4);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}

.centre {
  width: 100%;
  height: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.base {
  width: 100%;
  height: 10%;
  background-color: rgba(0, 0, 0, 0.4);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>

<template>
  <div class="front">
    <h1>Login</h1>
    <div class="box">
      <div class="roof">
      </div>
      <div class="centre">
        <div id="userlogin">
          <el-form ref="form" :model="form" label-width="100px" label-position="left">
            <el-form-item label="ID" prop="id" :rules="[
              { required: true, message: 'You must enter your ID!' },
              { type: 'number', message: 'Your ID must be a number!' }
            ]">
              <el-input v-model.number="form.id" placeholder="Please enter your ID."></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="pswd" :rules="[
              { required: true, message: 'You must enter your password!' },
            ]">
              <el-input v-model="form.pswd" placeholder="Please enter your password." show-password></el-input>
            </el-form-item>
            <el-form-item label="Position" prop="position" :rules="[
              { required: true, message: 'You must choose your position!' },
            ]">
              <el-select v-model="form.position" placeholder="Please select your position.">
                <el-option label="Employee" value="employee"></el-option>
                <el-option label="Manager" value="manager"></el-option>
              </el-select>
            </el-form-item>
            <el-row>
              <el-col :span="15">
                <el-form-item label="Vcode" prop="vcode" :rules="[
                  { required: true, message: 'You must enter the vcode!' },
                ]">
                  <el-input v-model="form.vcode" placeholder="???"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <validateCode ref="ref_validateCode" @change="changeCode" />
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="onSubmit(form.id, form.pswd, form.position, form.vcode)"
                icon="el-icon-check">
                Login
              </el-button>
              <el-button type="warning" @click="resetForm()" icon="el-icon-close">Clear</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="base">
      </div>
    </div>
  </div>
</template>

<script>
import validateCode from "@/components/ValidateCode"
export default {
  data() {
    return {
      isShow: false,
      checkCode: "",
      form: {
        id: '',
        pswd: '',
        position: '',
      }
    }
  },
  components: {
    validateCode
  },
  methods: {
    changeCode(value) {
      this.checkCode = value;
      console.log(this.checkCode)
    },

    onSubmit(id, pswd, position, vcode) {
      if (!id || !pswd || !position || !vcode) {
        // ????????????????????????
        alert('Please fill all of the information')
        return;
      }
      if (vcode.toUpperCase === this.checkCode.toUpperCase) {
        this.$request({
          url: "/login",
          params: { id, pswd, position, vcode },
          method: "post"
        }).then(res => {
          //alert(res.data);
          var info = res.data;
          switch (info) {
            case "Err00":
              alert('ID or password error.');
              break;
            case "Err01":
              alert('ID error.');
              break;
            case "Err02":
              alert('Your account is deactivated.');
              break;
            default:
              if (position === 'manager') {
                if (info.ID === 1) {
                  this.$router.push({
                    path: '/adminSystem',
                    name: "adminSystem",
                    params: {
                      id: info.ID,
                      name: info.Name
                    }
                  })
                } else {
                  this.$router.push({
                    path: '/manageSystem',
                    name: "manageSystem",
                    params: {
                      id: info.ID,
                      name: info.Name
                    }
                  })
                }
              } else {
                this.$router.push({
                  path: '/employeeSystem',
                  name: "employeeSystem",
                  params: {
                    id: info.ID,
                    name: info.Name
                  }
                })
              }
          }
        })
      } else {
        alert('Wrong validate code!')
      }
    },
    resetForm() {
      this.form.id = '',
        this.form.pswd = '',
        this.form.position = ''
    }
  }
}
</script>