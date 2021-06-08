<template>
  <div>
    <div class="buttonArea">
      <el-button @click="getSetting"> 设计绩效系数</el-button>
    </div>
    <el-dialog title="更改绩效系数" :visible.sync="dialogVisible" width="30%">
      <el-input> </el-input>
    </el-dialog>

    <div class="container">
      <div class="form">
        <el-table :data="userList" border style="width: 100%" height="450" stripe fixed>
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
          <el-table-column prop="workYearsSubsidy" label="工龄补贴"> 
            <template slot-scope="scope">
              {{ getMoney(scope.row) }}
            </template>

          </el-table-column>
          <el-table-column prop="workNumSubsidy" label="工作量补贴"> </el-table-column>
          <el-table-column prop="workDaySubsidy" label="出勤日补贴"> </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [], // 员工列表
      dialogVisible: false,
      form: {
        doctor: {
          workYearsSubsidy: 50,
          workNumSubsidy: 20,
          workDaySubsidy: 80,
        },
        nurse: {
          workYearsSubsidy: 30,
          workNumSubsidy: 20,
          workDaySubsidy: 80,
        },
        cashier: {
          workYearsSubsidy: 50,
          workNumSubsidy: 20,
          workDaySubsidy: 80,
        },
        leader: {
          workYearsSubsidy: 50,
          workNumSubsidy: 20,
          workDaySubsidy: 80,
        },
      },
    };
  },
  methods: {
    //拿到员工列表
    getUserList() {
      this.userList = this.$store.state.user;
      for (let item of this.userList) {
        item.workYearsSubsidy = 0;
        item.workDaySubsidy = 0;
        item.workNumSubsidy = 0;
      }
      // console.log(this.userList);
    },
    //拿到中文名
    getChinese(value) {
      let comparisonTable = this.$store.state.comparisonTable;
      return comparisonTable.get(value);
    },
    //进入设计绩效系数界面
    getSetting() {
      this.dialogVisible = true;
      let performanceCoefficient = this.$store.state.performanceCoefficient;
      this.form = performanceCoefficient;
      console.log(performanceCoefficient);
    },
    //拿到乘以绩效系数得到的对应绩效
    getMoney(row) {
      let performanceCoefficient = this.$store.state.performanceCoefficient;
      console.log(row,performanceCoefficient)
    //  if (condition) {
       
    //  }
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
</style>
