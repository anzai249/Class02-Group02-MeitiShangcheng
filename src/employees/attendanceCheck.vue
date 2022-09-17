<style>
body {
    background-color: black;
}
</style>
<template>
    <div>
        <h1>-Your Work Shift-</h1><br />
        <h2>{{Workshift}}</h2>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userid: this.$route.params.id,
            userName: this.$route.params.name,
            Workshift: this.$route.params.name
        };
    },
    methods: {

    }
}
</script>