<template>
  <div>
    <el-dialog title="收费" :visible.sync="dialogVisible">
      <el-form :inline = "true">
        <el-form-item label="当前患者:">
          {{form.patientName}}
          <!-- <el-input disabled v-model="form.patientName"></el-input> -->
        </el-form-item>
        <el-form-item label="选择收费项:">
          <el-select v-model="form.price">
            <el-option label="空腹血糖测量" value="20"></el-option>
            <el-option label="肾上腺囊手术综合收费" value="2000"></el-option>
          </el-select>
          <el-form-item label="收费金额:"> {{ form.price }} 元 </el-form-item>
        </el-form-item>
        <el-button @click="saveCharge"> 保存收费</el-button>
      </el-form>
    </el-dialog>
    <div class="container">
      <div class="form">
        <el-table :data="patientList" border style="width: 100%" stripe fixed :key="show">
          <el-table-column prop="patientName" label="患者姓名" width="200px"> </el-table-column>
          <el-table-column prop="disposeType" label="处置种类">
            <template slot-scope="scope">
              {{ getDiagnoseType(scope.row.disposeType) }}
            </template>
          </el-table-column>
          <el-table-column prop="clinicalSign" label="临床症状"> </el-table-column>
          <el-table-column prop="diagnosticOpinion" label="指导意见"> </el-table-column>
          <el-table-column prop="charge" label="收费">
            <template slot-scope="scope">
              <el-button v-show="!scope.row.charge" @click="charge(scope.row)"> 收费</el-button>
              <span v-show="scope.row.charge"> 收费完成 </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      patientList: [],
      dialogVisible: false,
      show: false,
      form: {
        patientName: '',
        price: '',
      },
    };
  },
  methods: {
    //拿到需要检查住院的患者缴费列表
    getpatientList() {
      let diagnose = this.$store.state.diagnose;
      for (let item of diagnose) {
        if (item.disposeType == 'check' || item.disposeType == 'inHosipital') {
          item.charge = false;
          this.patientList.push(item);
        }
      }
    },
    //转化检查状态中文名
    getDiagnoseType(value) {
      if (value == 'check') {
        return '检查处置';
      } else return '住院处置';
    },
    //收费
    charge(value) {
      this.dialogVisible = true;
      this.show = !this.show;
      this.form.patientName = value.patientName;
    },
    //保存收费
    saveCharge() {
      this.dialogVisible = false;
      this.$message({
        message: '成功保存收费信息',
        type: 'success',
      });
      for (let item of this.patientList) {
        if (this.form.patientList == item.name) {
          item.charge = true;
          this.show = !this.show;
          this.form = {
            patientName: '',
            price: '',
          };
          break;
        }
      }
    },
  },
  created() {
    this.getpatientList();
  },
};
</script>

<style scoped></style>
