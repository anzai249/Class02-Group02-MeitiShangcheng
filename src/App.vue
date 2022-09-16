
<template>

  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
}
//import { ipcRenderer } from 'electron'
</script>
<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #FFFFFF;
  font-size: 30px;
  margin-top: 0px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
