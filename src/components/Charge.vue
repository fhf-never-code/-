<template>
  <div class="container">
   收费
  </div>
</template>

<script>
export default {
  data(){
    return {
      userList:[], // 员工列表

    }

  },
  methods:{
    getUserList(){
      this.userList = this.$store.state.user
      console.log(this.userList)
    }
  },
  created () {
  }
};
</script>

<style></style>
