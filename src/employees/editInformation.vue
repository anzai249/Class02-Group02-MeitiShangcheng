<style>
body {
    background-color: black;
}
</style>
<template>
    <div>
        <h1>THIS IS EDIT PAGE</h1><br />
        <h2>{{userid}}</h2>
    </div>
</template>
<script>
export default {
    props: ['userid'], // Recieve employee id from employeeSystem
    watch: {
        userid: function (newVal, oldVal) {
            this.newUserid = newVal;
            // this.loadWorkShift();
        }
    },
    data() {
        return {
        };
    },
    methods: {

    }
}
</script>