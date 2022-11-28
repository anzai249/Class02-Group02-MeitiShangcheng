export default {
    data() {
        return {
            activeIndex: '/employeeSystem/attendanceCheck',
            userid: this.$route.params.id,
            userName: this.$route.params.name
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        logOut() {
            if (confirm("Log out?")) {
                this.$router.push('/')
            } else {
                return;
            }
        }
    }
}