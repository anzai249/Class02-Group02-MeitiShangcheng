export default {
    props: ['userid'], // Recieve employee id from employeeSystem
    methods: {
        loadWorkShift(userid) {
            let WorkShift = new Array();
            var i = 0;
            this.$request({
                url: "/getWorkShift",
                params: { userid },
                method: "post"
            }).then(res => {
                var info = res.data;
                if (info != 'undefined') {
                    WorkShift.push(
                        info[0].WorkShift,
                    )
                    return WorkShift
                } else if (info === 'error00') {
                    alert('Please login again!');
                }
            }).catch(err => {
                return
            })
            return WorkShift
        },
        getCheckStatus(userid) {
            let Status = new Array();
            this.$request({
                url: "/getCheckStatus",
                params: { userid },
                method: "post"
            }).then(res => {
                var infoStatus = res.data;
                if (infoStatus != 'undefined') {
                    Status.push(
                        infoStatus[0].Attendance,
                    )
                    console.log(Status)
                    return Status
                } else if (info === 'error00') {
                    alert('Please login again!');
                }
            }).catch(err => {
                return
            })
            return Status
        },
        checkIt(userid) {
            this.$request({
                url: "/checkIt",
                params: { userid },
                method: "post"
            }).then(res => {
                var info = res.data;
                alert('Request sent!');
                if (info != 'undefined') {
                    WorkShift.push(
                        info[0].WorkShift,
                    )
                    alert('Request sent!');
                    this.Status.value = getCheckStatus(this.userid);
                    this.statuKey.value = new Date().getTime;
                    return WorkShift, Status
                } else if (info === 'error00') {
                    alert('Please login again!');
                }
            }).catch(err => {
                return
            })
        }
    },
    watch: {
        userid: function (newVal, oldVal) {
            this.newUserid = newVal;
            this.loadWorkShift();
        }
    },
    data() {
        var a = this.loadWorkShift(this.userid)
        var b = this.getCheckStatus(this.userid)
        console.log(b)
        // if (b[0] === "None" || b[0] === "error" || b[0] === "none") {
        //     c = "No"
        // } else {
        //     c = "Yes"
        // }
        return {
            newUserid: null,
            currentWorkShift: a,
            currentStatus: b,
            statuKey: 1
        }
    }
}