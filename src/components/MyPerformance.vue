<template>
  <div class="container">
    <div class="notice">
      <p>
        绩效公告:本院绩效采取“出勤日底薪+工龄补贴+工作量补贴”的方式
      </p>
      <div class="form">
        <el-form :model="formInline" :inline="true">
          <el-form-item label="我的工龄">
            <el-input v-model="formInline.workYears" disabled></el-input>
          </el-form-item>
          <el-form-item label="本月出勤工资">
            <el-input v-model="formInline.workload.day" disabled></el-input>
          </el-form-item>
          <el-form-item label="本月工作量">
            <el-input v-model="formInline.workload.num" disabled></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="formInline" :inline="true">
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
        workYearsSubsidy: '',
        daySubsidy: '',
        numSubsidy: '',
        count: '',
      },
    };
  },
  //方法集合
  watch:{
    '$store.state.user'(){
      this.getPerfomance()
    }
  },
  methods: {
    /* 绩效管理 暂时先写一些根据职务和工龄获得的奖励 不分部门*/
    getPerfomance() {
      let formData = this.formInline;
      Object.assign(formData, JSON.parse(JSON.stringify(this.nowUser)));
      switch (formData.identity) {
        case 'doctor':
          formData.workYearsSubsidy = formData.workYears * 50;
          formData.daySubsidy = formData.workload.day * 80;
          formData.numSubsidy = formData.workload.num * 10;
          break;
        case 'nurse':
          formData.workYearsSubsidy = formData.workYears * 30;
          formData.daySubsidy = formData.workload.day * 70;
          formData.numSubsidy = formData.workload.num * 8;
          break;
        case 'leader':
          formData.workYearsSubsidy = formData.workYears * 65;
          formData.daySubsidy = formData.workload.day * 100;
          formData.numSubsidy = formData.workload.num * 15;
          break;
        case 'cashier':
          formData.workYearsSubsidy = formData.workYears * 65;
          formData.daySubsidy = formData.workload.day * 75;
          formData.numSubsidy = formData.workload.num * 9;
          break;
      }
      formData.count = formData.workYearsSubsidy + formData.daySubsidy + formData.numSubsidy;
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
