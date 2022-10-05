<style>
body {
    background-color: black;
}

#btn {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: none
}

.checkShift {
    top: 100px;
    position: absolute;
    width: 99%;
}
</style>
<template>
    <div class="checkShift">
        <h1>-Your Work Shift-</h1><br />
        <h2>{{currentWorkShift[0]}}</h2>
        <input type="button" value="Check" id="btn" @click="checkIt(userid)">
        <h2>Status: {{currentStatus[0]}}</h2>
    </div>
</template>
<script>
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
                if (info != 'undefined') {
                    WorkShift.push(
                        info[0].WorkShift,
                    )
                    alert('Request sent!');
                    return WorkShift
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
            currentStatus: b
        }
    }
}
</script>
