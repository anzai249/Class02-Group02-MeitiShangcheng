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
        checkIt(userid){
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
        return {
            newUserid: null,
            currentWorkShift: a,
        }
    }
}
</script>
