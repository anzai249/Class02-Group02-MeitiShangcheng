<style>
body {
    background-color: black;
}
</style>
    
<template>
    <div class="title">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="
        position: fixed;
        top:-3px;
        left: -3px; width: 110%;" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
            <el-menu-item index="/adminSystem/editManagers">Edit Managers</el-menu-item>
            <el-menu-item index="/adminSystem/quickActions">Quick Actions</el-menu-item>
            <el-menu-item><a target="_self" style="text-decoration: none;" @click="logOut()">Log
                    out</a>
            </el-menu-item>
            <el-menu-item style="-webkit-app-region: drag;">&ensp;&ensp;<i class="el-icon-rank"></i>&ensp;&ensp;Hello,
                {{userName}}!
            </el-menu-item>
        </el-menu>
        <router-view></router-view>
    </div>
</template>
    <router-view/>
<script>

export default {
    data() {
        return {
            activeIndex: '/adminSystem/editManagers',
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
</script>