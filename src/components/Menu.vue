<template>
  <div>
    
    {{getUSer.count}}
    <el-button @click="change">点我</el-button>
  </div>
</template>

<script> 
export default {
 
  data () {
    return {

    }
  },
  computed:{
    getUSer() {
      return this.$store.state
    }
  },
  methods:{
    change() {
      this.$store.commit('increment')
    }
  }
}
</script>

<style>

</style>