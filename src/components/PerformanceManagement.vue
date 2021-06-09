<template>
  <div>
    <div class="buttonArea">
      <el-button @click="getSetting">更改绩效系数</el-button>
    </div>
    <el-dialog title="更改绩效系数" :visible.sync="dialogVisible" width="35%">
      <el-form :inline="true">
        <el-form-item label="护士绩效">
          <el-form-item label="出勤绩效系数:">
            <el-input v-model="form.nurse.workDaySubsidy"> </el-input>
          </el-form-item>
          <el-form-item label="工作量绩效系数:">
            <el-input v-model="form.nurse.workNumSubsidy"> </el-input>
          </el-form-item>
          <el-form-item label="工龄绩效系数:">
            <el-input v-model="form.nurse.workYearsSubsidy"> </el-input>
          </el-form-item>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="收费员绩效">
          <el-form-item label="出勤绩效系数:">
            <el-input v-model="form.cashier.workDaySubsidy"> </el-input>
          </el-form-item>
          <el-form-item label="工作量绩效系数:">
            <el-input v-model="form.cashier.workNumSubsidy"> </el-input>
          </el-form-item>
          <el-form-item label="工龄绩效系数:">
            <el-input v-model="form.cashier.workYearsSubsidy"> </el-input>
          </el-form-item>
        </el-form-item>
        <el-divider></el-divider>

        <el-form-item label="医生绩效">
          <el-form-item label="出勤绩效系数:">
            <el-input v-model="form.doctor.workDaySubsidy"> </el-input>
          </el-form-item>
          <el-form-item label="工作量绩效系数:">
            <el-input v-model="form.doctor.workNumSubsidy"> </el-input>
          </el-form-item>
          <el-form-item label="工龄绩效系数:">
            <el-input v-model="form.doctor.workYearsSubsidy"> </el-input>
          </el-form-item>
        </el-form-item>
        <el-divider></el-divider>

        <el-form-item label="检查员绩效">
          <el-form-item label="出勤绩效系数:">
            <el-input v-model="form.checker.workDaySubsidy"> </el-input>
          </el-form-item>
          <el-form-item label="工作量绩效系数:">
            <el-input v-model="form.checker.workNumSubsidy"> </el-input>
          </el-form-item>
          <el-form-item label="工龄绩效系数:">
            <el-input v-model="form.checker.workYearsSubsidy"> </el-input>
          </el-form-item>
        </el-form-item>
        <el-divider></el-divider>

        <el-form-item label="科室主任绩效">
          <el-form-item label="出勤绩效系数:">
            <el-input v-model="form.leader.workDaySubsidy"> </el-input>
          </el-form-item>
          <el-form-item label="工作量绩效系数:">
            <el-input v-model="form.leader.workNumSubsidy"> </el-input>
          </el-form-item>
          <el-form-item label="工龄绩效系数:">
            <el-input v-model="form.leader.workYearsSubsidy"> </el-input>
          </el-form-item>
        </el-form-item>
        <el-button @click="saveChange" type="primary">
          保存绩效函数修改
        </el-button>
      </el-form>
    </el-dialog>

    <div class="container">
      <div class="form">
        <el-table :data="userList" border style="width: 100%" height="450" stripe fixed :key="refresh">
          <el-table-column label="部门">
            <template slot-scope="scope">
              {{ getChinese(scope.row.department) }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column label="职责">
            <template slot-scope="scope">
              {{ getChinese(scope.row.identity) }}
            </template>
          </el-table-column>
          <el-table-column prop="workYears" label="工龄"> </el-table-column>
          <el-table-column prop="workload.day" label="出勤数"> </el-table-column>
          <el-table-column prop="workload.num" label="工作数量"> </el-table-column>
          <el-table-column prop="workYearsSubsidy" label="工龄补贴"> </el-table-column>
          <el-table-column prop="workNumSubsidy" label="工作量补贴"> </el-table-column>
          <el-table-column prop="workDaySubsidy" label="出勤日补贴"> </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { SAVEPERFORMANCECOEFFCIENT } from '../store/types';
export default {
  data() {
    return {
      userList: [], // 员工列表
      dialogVisible: false,
      form: {},
      refresh: false,
    };
  },
  watch: {
    '$store.state.performanceCoefficient'() {
      this.getUserList();
    },
  },
  methods: {
    //拿到员工列表
    getUserList() {
      this.userList = JSON.parse(JSON.stringify(this.$store.state.user));
      let performanceCoefficient = this.$store.state.performanceCoefficient;
      for (let item of this.userList) {
        if (item.identity == 'cashier') {
          item.workYearsSubsidy = performanceCoefficient.cashier.workYearsSubsidy * item.workYears;
          item.workDaySubsidy = performanceCoefficient.cashier.workDaySubsidy * item.workload.day;
          item.workNumSubsidy = performanceCoefficient.cashier.workNumSubsidy * item.workload.num;
        } else if (item.identity == 'doctor') {
          item.workYearsSubsidy = performanceCoefficient.doctor.workYearsSubsidy * item.workYears;
          item.workDaySubsidy = performanceCoefficient.doctor.workDaySubsidy * item.workload.day;
          item.workNumSubsidy = performanceCoefficient.doctor.workNumSubsidy * item.workload.num;
        } else if (item.identity == 'nurse') {
          item.workYearsSubsidy = performanceCoefficient.nurse.workYearsSubsidy * item.workYears;
          item.workDaySubsidy = performanceCoefficient.nurse.workDaySubsidy * item.workload.day;
          item.workNumSubsidy = performanceCoefficient.nurse.workNumSubsidy * item.workload.num;
        } else if (item.identity == 'checker') {
          item.workYearsSubsidy = performanceCoefficient.checker.workYearsSubsidy * item.workYears;
          item.workDaySubsidy = performanceCoefficient.checker.workDaySubsidy * item.workload.day;
          item.workNumSubsidy = performanceCoefficient.checker.workNumSubsidy * item.workload.num;
        } else if (item.identity == 'leader') {
          item.workYearsSubsidy = performanceCoefficient.leader.workYearsSubsidy * item.workYears;
          item.workDaySubsidy = performanceCoefficient.leader.workDaySubsidy * item.workload.day;
          item.workNumSubsidy = performanceCoefficient.leader.workNumSubsidy * item.workload.num;
        }
      }
      this.form = JSON.parse(JSON.stringify(performanceCoefficient));
    },
    //拿到中文名
    getChinese(value) {
      let comparisonTable = this.$store.state.comparisonTable;
      return comparisonTable.get(value);
    },
    //进入设计绩效系数界面
    getSetting() {
      this.dialogVisible = true;
    },
    //保存绩效系数修改
    saveChange() {
      this.$store.commit(SAVEPERFORMANCECOEFFCIENT, this.form);
      this.$message({
        message: '保存绩效函数成功',
        type: 'success',
      });
      this.dialogVisible = false;
      this.refresh = !this.refresh;
    },
  },
  created() {
    this.getUserList();
  },
};
</script>

<style scoped>
.buttonArea {
  margin-bottom: 20px;
}
.el-form-item {
  margin-bottom: 20px;
}
</style>
