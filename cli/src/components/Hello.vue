<template>
  <div class="hello">
    <h1>{{$store.state.a.counter}}</h1>
    <h1>{{$store.state.a.msg}}</h1>
    <router-link to="/login">login</router-link>
    <button @click="increment()">点击</button>
    <button @click="cheng()">点击</button>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {}
    },
    /* computed: {
      value () {
        return this.$store.getters.tripleCounter
      }
    }, */
    mounted () {},
    methods: {
      increment () {
        this.$store.commit('increment', 10)
      },
      cheng () {
        this.$store.commit('cheng', 10)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
