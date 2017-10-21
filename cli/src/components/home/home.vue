<template>
  <div id="home">
    <Vheader></Vheader>
    <div class="view" :style="{ height: viewheight + 'px' }">
      <router-view></router-view>
    </div>
    <Vfooter></Vfooter>
  </div>
</template>

<script>
  import Vheader from '../public/header/vheader.vue'
  import Vfooter from '../public/footer/vfooter.vue'

  export default {
    name: 'home',
    data () {
      return {}
    },
    components: {Vheader, Vfooter},
    computed: {
      viewheight: function () {
        var hei = $(window).height() - 100
        return hei
      }
    }
  }
</script>

<style scoped>
  .view {
    background: #abcdef;
  }
</style>
