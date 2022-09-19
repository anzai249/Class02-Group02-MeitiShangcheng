<style>
body {
    background-color: black;
}
#btn {
    width: 50px;height: 50px;border-radius: 50%;border: none
}
</style>
<template>
    <div>
        <h1>-Your Work Shift-</h1><br />
        <h2>{{userid}}</h2>
        <input type="button" value="Check" id="btn">
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
