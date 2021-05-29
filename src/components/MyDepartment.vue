<template>
  <div class="container">
    <div class="form">
      <el-table :data="colleague" stripe style="width: 100%" border>
        <el-table-column prop="department" label="科室" width="300"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="300"> </el-table-column>
        <el-table-column prop="identity" label="职务" width="300"> </el-table-column>
        <el-table-column prop="workYears" label="工龄(年)" width="300" sortable> </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  props: ['nowUser'],
  data() {
    //这里存放数据
    return {
      colleague: [],
    };
  },
  //方法集合
  methods: {
    // 在数据库里找同部门的同事
    getDepartment() {
      let user = this.$store.state.user;
      for (let item in user) {
        if (user[item].department == this.nowUser.department) {
          let depart = JSON.parse(JSON.stringify(user[item]));
          this.colleague.push(depart);
        }
      }
    },
    //中英文对照改名
    getName() {
      // let nowUser = this.nowUser
      // Object.assign(this.formInline,JSON.parse(JSON.stringify(nowUser)))
      let comparisonTable = this.$store.state.comparisonTable;
      for (let item in this.colleague) {
        this.colleague[item].department = JSON.parse(JSON.stringify(comparisonTable.get(this.colleague[item].department)));
        this.colleague[item].identity = JSON.parse(JSON.stringify(comparisonTable.get(this.colleague[item].identity)));
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getDepartment();
    this.getName();
  },
};
</script>
<style scoped>
.container {
  display: flex;
}
</style>
