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