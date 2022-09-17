<style>
body {
    background-color: black;
}
</style>
<template>
    <div>
        <h1>-Your Work Shift-</h1><br />
        <h2>{{userid}}</h2>
    </div>
</template>
<script>
export default {
    props: ['userid'], // Recieve employee id from employeeSystem
    data() {
        return {
        };
    },
    methods: {

    }
}
</script>