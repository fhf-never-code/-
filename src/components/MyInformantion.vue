<template>
  <div class="container">
    <div class="form">
      <el-form :model="formInline">
        <el-form-item label="姓名">
          <el-input v-model="user.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="职责">
          <el-input v-model="formInline.identity" disabled></el-input>
        </el-form-item>
        <el-form-item label="科室">
          <el-input v-model="formInline.department" disabled></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="form">
      <el-form :model="formInline">
        <el-form-item label="工龄">
          <el-input v-model="user.workYears" disabled></el-input>
        </el-form-item>
        <el-form-item label="本月出勤">
          <el-input v-model="user.workload.day" disabled></el-input>
        </el-form-item>
        <el-form-item label="本月工作量">
          <el-input v-model="user.workload.num" disabled></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: ['nowUser'],
  data() {
    //这里存放数据
    return {
      formInline: {
        department: '',
        identity: '',
      },
      user: {},
    };
  },
  methods: {
    //根据中英文对照关系
    getName() {
      let user = this.$store.state.user;
      for (let item of user) {
        if (this.nowUser.name == item.name) {
          this.user = item;
          break;
        }
      }
      let comparisonTable = this.$store.state.comparisonTable;
      this.formInline.department = comparisonTable.get(this.nowUser.department);
      this.formInline.identity = comparisonTable.get(this.nowUser.identity);
    },
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  created() {
    this.getName();
  },
  watch: {
    '$store.state.user'() {
      this.getName();
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  /* flex-wrap: wrap-reverse; */
}
.form {
  margin: 0 100px;
}
</style>
