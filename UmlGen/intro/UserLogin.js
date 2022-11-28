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
        // 判断是否输入完全
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