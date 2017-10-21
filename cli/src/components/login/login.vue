<template>
  <div id="login">
      <h1>登陆</h1>
    <div>{{msg}}</div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        msg: this.$store.state.a.counter
      }
    }
  }
</script>

<style scoped>
</style>
