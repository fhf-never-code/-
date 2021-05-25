<template>
  <div class="container">
    <el-dialog title="看诊单" :visible.sync="dialogFormVisible">
      <el-form :inline="true" :model="form" ref="form" class="form" :rules="rules">
        <el-form-item label="当前患者">
          {{ form.patientName }}
        </el-form-item>
        <el-form-item label="临床症状" prop="clinicalSign">
          <el-input type="textarea" autosize maxlength="300" v-model="form.clinicalSign" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否检查身体">
          <el-switch v-model="form.check" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
          <el-form-item v-show="form.check" label="身体检查状况">
            <el-input v-model="form.bodyCheck" autocomplete="off"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="诊断意见" prop="diagnosticOpinion">
          <el-input type="textarea" autosize maxlength="300" v-model="form.diagnosticOpinion" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="处置方案" prop="disposeType">
          <el-select v-model="form.disposeType">
            <el-option label="无需处理" value="hold"></el-option>
            <el-option label="用药处理" value="medicine"></el-option>
            <el-option label="检查处理" value="check"></el-option>
            <el-option label="住院处理" value="inHosipital"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="病人状态" prop="patientStatus">
          <el-select v-model="form.patientStatus">
            <el-option label="待进一步处理" value="checked"></el-option>
            <el-option label="看诊完毕" value="finished"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogFormVisible = false;
            clearForm();
          "
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false;
            submitForm('form');
          "
          >保存看诊</el-button
        >
      </div>
    </el-dialog>
    <el-table stripe :data="patientList" style="width: 100%" border>
      <el-table-column prop="time" label="挂号时间" sortable> </el-table-column>
      <el-table-column prop="name" label="患者姓名"> </el-table-column>
      <el-table-column prop="sex" label="性别" width="100">
        <template slot-scope="scope">
          {{ getSex(scope) }}
        </template>
      </el-table-column>
      <el-table-column prop="IDnum" label="身份证号"> </el-table-column>
      <el-table-column prop="status" label="状态" sortable>
        <template slot-scope="scope">
          {{ getStatusName(scope) }}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" @click="getRecord(scope.row)" v-if="scope.row.status != 'unchecked'">查看看诊记录</el-button>
          <el-button size="mini" type="primary" @click="getCheck(scope.row)" v-if="scope.row.status == 'unchecked'">进行看诊</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { ADDDIAGNOSE } from '../store/types.js';
export default {
  props: ['nowUser'],
  data() {
    return {
      patientList: [],
      dialogFormVisible: false,
      form: {
        patientName: '',
        clinicalSign: '',
        check: false,
        bodyCheck: '',
        diagnosticOpinion: '',
        disposeType: 'hold',
        patientStatus: 'checked',
      },
      rules: {
        clinicalSign: {
          required: true,
          message: '临床症状不能为空',
        },
        diagnosticOpinion: {
          required: true,
          message: '诊断意见不能为空',
        },
        patientStatus: {
          required: true,
          message: '病人状态不能为空',
        },
      },
      formLabelWidth: '120px',
    };
  },
  watch: {
    '$store.state.patient'() {
      this.getPatient();
    },
  },
  methods: {
    getStatusName(row) {
      let status = row.row.status;
      switch (status) {
        case 'unchecked':
          return '未看诊';
        case 'checked':
          return '待进一步处理';
        case 'finished':
          return '看诊完成';
      }
    },
    getSex(value) {
      if (value.row.sex == 'male') {
        return '男';
      } else return '女';
    },
    //拿到本科室的已挂号患者列表
    getPatient() {
      let allPatient = this.$store.state.patient;
      for (let item of allPatient) {
        if (item.targetDepartment == this.nowUser.department) {
          this.patientList.push(item);
        }
      }
    },
    //进行看诊
    getCheck(row) {
      this.form = {
        clinicalSign: '',
        check: false,
        bodyCheck: '',
        diagnosticOpinion: '',
        disposeType: 'hold',
        patientStatus: 'checked',
      };
      this.dialogFormVisible = true;
      this.form.patientName = row.name;
    },
    //点击提交看诊
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.savePatient();
          this.$message({
            message: '成功保存看诊信息',
            type: 'success',
          });
        } else {
          this.$message({
            message: '必填项不可为空',
            type: 'error',
          });
        }
      });
    },
    //保存看诊信息
    savePatient() {
      this.$store.commit(ADDDIAGNOSE, this.form);
    },
    //查看已有看诊信息
    getRecord(row) {
      this.dialogFormVisible = true;
      let diagnose = this.$store.state.diagnose;
      for (let item of diagnose) {
        if (row.name == item.patientName) {
          this.form = item;
          break
        }
      }
    },
    //重置表单
    clearForm() {
      this.form = {
        patientName: '',
        clinicalSign: '',
        check: false,
        bodyCheck: '',
        diagnosticOpinion: '',
        disposeType: 'hold',
        patientStatus: 'checked',
      };
    },
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getPatient();
  },
};
</script>
<style scoped>
.el-switch__core {
  margin-left: -50px;
}
</style>
