<template>
  <div id="header">
    <div class="header">头部内容</div>
  </div>
</template>

<script>
  export default {
    name: 'header',
    data () {
      return {
        msg: ''
      }
    }
  }
</script>

<style scoped>
  .header{
    height:50px;
    line-height: 50px;
    background: green;
    color: #fff;
    font-weight: bold;
    text-align: center;
  }
</style>
