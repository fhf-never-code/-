<template>
  <div class="container">
    <div class="notice">
      <p>
        绩效公告:本院绩效采取“出勤日底薪+工龄补贴+工作量补贴”的方式
      </p>
      <div class="form">
        <el-form :inline="true">
          <el-form-item label="我的工龄">
            <el-input v-model="user.workYears" disabled></el-input>
          </el-form-item>
          <el-form-item label="本月出勤日数量">
            <el-input v-model="user.workload.day" disabled></el-input>
          </el-form-item>
          <el-form-item label="本月工作量">
            <el-input v-model="user.workload.num" disabled></el-input>
          </el-form-item>
        </el-form>
        <el-form :inline="true">
          <el-form-item label="工龄补贴">
            <el-input v-model="formInline.workYearsSubsidy" disabled></el-input>
          </el-form-item>
          <el-form-item label="本月出勤补贴">
            <el-input v-model="formInline.daySubsidy" disabled></el-input>
          </el-form-item>
          <el-form-item label="本月工作量补贴">
            <el-input v-model="formInline.numSubsidy" disabled></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="formInline" :inline="true">
          <el-form-item label="合计绩效">
            <el-input v-model="formInline.count" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['nowUser'],
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      formInline: {
        workYearsSubsidy: 0,
        daySubsidy: 0,
        numSubsidy: 0,
        count: 0,
      },
      user: {},
    };
  },

  watch: {
    '$store.state.user'() {
      this.getPerfomance();
    },
  },
  methods: {
    /* 绩效管理 暂时先写一些根据职务和工龄获得的奖励 不分部门*/
    getPerfomance() {
      let user = this.$store.state.user;
      for (let item of user) {
        if (this.nowUser.name == item.name) {
          this.user = item;
          break;
        }
      }
      let performance = this.$store.state.performanceCoefficient;
      if (this.user.identity == 'doctor') {
        this.formInline.workYearsSubsidy = this.user.workYears * performance.doctor.workYearsSubsidy;
        this.formInline.daySubsidy = this.user.workload.day * performance.doctor.workDaySubsidy;
        this.formInline.numSubsidy = this.user.workload.num * performance.doctor.workNumSubsidy;
      } else if (this.user.identity == 'nurse') {
        this.formInline.workYearsSubsidy = this.user.workYears * performance.nurse.workYearsSubsidy;
        this.formInline.daySubsidy = this.user.workload.day * performance.nurse.workDaySubsidy;
        this.formInline.numSubsidy = this.user.workload.num * performance.nurse.workNumSubsidy;
      } else if (this.user.identity == 'cashier') {
        this.formInline.workYearsSubsidy = this.user.workYears * performance.cashier.workYearsSubsidy;
        this.formInline.daySubsidy = this.user.workload.day * performance.cashier.workDaySubsidy;
        this.formInline.numSubsidy = this.user.workload.num * performance.cashier.workNumSubsidy;
      } else if (this.user.identity == 'checker') {
        this.formInline.workYearsSubsidy = this.user.workYears * performance.checker.workYearsSubsidy;
        this.formInline.daySubsidy = this.user.workload.num * this.user.workload.day * performance.checker.workDaySubsidy;
        this.formInline.numSubsidy = this.user.workload.num * performance.checker.workNumSubsidy;
      } else if (this.user.identity == 'leader') {
        this.formInline.workYearsSubsidy = this.user.workYears * performance.leader.workYearsSubsidy;
        this.formInline.daySubsidy = this.user.workload.day * performance.leader.workDaySubsidy;
        this.formInline.numSubsidy = this.user.workload.num * performance.leader.workNumSubsidy;
      }
      this.formInline.count = this.formInline.workYearsSubsidy + this.formInline.daySubsidy + this.formInline.numSubsidy;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getPerfomance();
  },
};
</script>
<style scoped>
.notice {
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: aliceblue;
}

.form {
  justify-content: flex-start;
  margin-top: 20px;
}
</style>
