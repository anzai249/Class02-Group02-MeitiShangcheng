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
  height: 400px;
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
            <el-form-item>
              <el-button type="primary" @click="onSubmit(form.id, form.pswd, form.position)">Login</el-button>
              <el-button type="warning" @click="resetForm()">Clear</el-button>
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

export default {
  data() {
    return {
      form: {
        id: '',
        pswd: '',
        position: '',
      }
    }
  },
  methods: {
    onSubmit(id, pswd, position) {
      if (!id || !pswd || !position) {
        // 判断是否输入完全
        alert('Please fill all of the information')
        return;
      }
      this.$request({
        url: "/login",
        params: { id, pswd, position },
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
          default:
            if (position == 'manager') {
              this.$router.push({
                path: '/manageSystem',
                name: "manageSystem",
                params: {
                  id: info.ID,
                  name: info.Name
                }
              })
            } else {
              alert('员工系统没做好呢等着去吧');
            }
        }
        // if (info == "Err00") {
        //   alert('ID or password error.');
        // } else if (info == "Err01") {
        //   alert('ID error.');
        // }else{
        //   alert(typeof(info));
        // }
        //alert(typeof(info));


      })
    },
    resetForm() {
      this.form.id = '',
        this.form.pswd = '',
        this.form.position = ''
    }
  }
}
</script>