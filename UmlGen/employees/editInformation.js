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
        nameOnSubmit(id, name, gender, age, email, address) {
            if (!id || !name || !gender || !age || !email || !address) {
                alert('Please fill all of the information')
                return;
            }
            this.$request({
                url: "/editEmployeeInfo",
                params: { id, name, gender, age, email, address },
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
                url: "/editEmployeePass",
                params: { id, oldPass, newPass },
                method: "post"
            }).then(res => {
                var info = res.data;
                alert(info);
            })
        }
    }
}