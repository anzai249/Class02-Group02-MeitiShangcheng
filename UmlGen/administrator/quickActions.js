export default {
    methods: {
        resetForm() {
            this.$request({
                url: "/resetAttendance",
                method: "post"
            }).then(res => {
                alert(res.data);
            })
        }
    }
}