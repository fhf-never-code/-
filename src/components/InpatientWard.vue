<template>
  <div class="container">
    <el-dialog title="病房分配" :visible.sync="dialogFormVisible">
      <el-form :inline="true" :model="form" ref="form" class="form" :rules="rules">
        <el-form-item label="当前患者">
          {{ form.patientName }}
        </el-form-item>
        <el-form-item label="临床症状">
          <el-input type="textarea" disabled autosize maxlength="300" v-model="form.clinicalSign" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="诊断意见">
          <el-input type="textarea" disabled autosize maxlength="300" v-model="form.diagnosticOpinion" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分配病房" prop="inpatientWard">
          <el-select v-model="form.inpatientWard">
            <el-option v-for="item in allInpatientWard" :key="item.inpatientWardRoom" :value="item.inpatientWardRoom"> </el-option>
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
          >保存分配方案</el-button
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
      <el-table-column prop="targetDepartment" label="就诊科室">
        <template slot-scope="scope">
          {{ getDepartment(scope) }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" sortable>
        <template slot-scope="scope">
          {{ getStatusName(scope) }}
        </template>
      </el-table-column>
      <el-table-column prop="inpatientWard" label="病房号"> </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" @click="getInpatientWard(scope.row)" v-if="!scope.row.inpatientWardStatus">分配病房</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { UPDATEINPATIENTWARD } from '../store/types.js';
export default {
  props: ['nowUser'],
  components: {},
  data() {
    return {
      patientList: [],
      dialogFormVisible: false,
      form: {
        patientName: '',
        clinicalSign: '',
        diagnosticOpinion: '',
        inpatientWard: 'a101',
      },
      allInpatientWard: [],
      rules: {
        inpatientWard: {
          required: true,
          message: '病房不能为空',
        },
      },
      formLabelWidth: '120px',
    };
  },
  computed: {},
  watch: {
    '$store.state.inpatientWard'() {
      this.getPatientList();
    },
  },
  //方法集合
  methods: {
    //拿到需要住院的患者列表
    getPatientList() {
      let allPatient = this.$store.state.diagnose;
      for (let item of allPatient) {
        if (item.disposeType == 'inHosipital') {
          for (let item2 of this.$store.state.patient) {
            if (item.patientName == item2.name) {
              if (!item2.inpatientWard) {
                item2.inpatientWardStatus = false;
                item2.inpatientWard = '';
              }
              this.patientList.push(item2);
            }
          }
        }
      }
    },
    //拿到所有病房列表
    getAllPatientWard() {
      this.allInpatientWard = this.$store.state.inpatientWard;
    },
    //转化性别显示
    getSex(value) {
      if (value.row.sex == 'male') {
        return '男';
      } else return '女';
    },
    //转化看诊状态
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
    /*点击分配病房
     */
    getInpatientWard(row) {
      let diagnose = this.$store.state.diagnose;
      for (let item of diagnose) {
        if (row.name == item.patientName) {
          this.form = item;
        }
      }
      this.dialogFormVisible = true;
    },
    //点击提交看诊
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.savePatient(this.form);
          this.$message({
            message: '成功保存病房分配',
            type: 'success',
          });
        } else {
          this.$message({
            message: '病房选择不可为空',
            type: 'error',
          });
        }
      });
    },
    // 转化科室名称
    getDepartment(value) {
      switch (value.row.targetDepartment) {
        case 'internalMedicine':
          return '内科';
        case 'surgery':
          return '外科';
        case 'emergencyWard':
          return '急诊科';
      }
    },
    //保存病房分配方案后
    savePatient(form) {
      for (let item of this.patientList) {
        if (item.name == form.patientName) {
          item.inpatientWard = form.inpatientWard;
          item.inpatientWardStatus = true;
          this.$store.commit(UPDATEINPATIENTWARD, item);
        }
      }
      this.patientList = []
      this.getPatientList();
    },
    //清空表单
    clearForm() {
      this.form = { patientName: '', clinicalSign: '', diagnosticOpinion: '', inpatientWard: 'a101' };
    },
  },
  mounted() {
    this.getPatientList();
    this.getAllPatientWard();
  },
};
</script>
<style scoped></style>
