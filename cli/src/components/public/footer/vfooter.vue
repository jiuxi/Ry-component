<template>
  <div id="footer">
    <div class="footer">底部内容</div>
  </div>
</template>

<script>
  export default {
    name: 'footer',
    data () {
      return {
        msg: ''
      }
    }
  }
</script>

<style scoped>
  .footer{
    height:50px;
    line-height: 50px;
    background: green;
    color: #fff;
    font-weight: bold;
    text-align: center;
  }
</style>
