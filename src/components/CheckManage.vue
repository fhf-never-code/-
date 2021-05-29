<template>
  <div class="container">
    <el-dialog title="进行检查" :visible.sync="dialogFormVisible">
      <el-form :inline="true" :model="form" ref="form" class="form">
        <el-form-item label="当前患者:">
          {{ form.patientName }}
        </el-form-item>
        <el-form-item label="临床症状:">
          <el-input type="textarea" disabled autosize maxlength="300" v-model="form.clinicalSign" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="诊断意见:">
          <el-input type="textarea" disabled autosize maxlength="300" v-model="form.diagnosticOpinion" autocomplete="off"></el-input>
        </el-form-item>
        <div v-for="(item, index) in form.checkItem" :key="index">
          <el-form-item label="检查项名称:" prop="checkName">
            <el-input v-model="item.checkName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="removeItem(index)">删除检查项</el-button>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="success" @click="addCheckItem">新增检查项</el-button>
        </el-form-item>
      </el-form>
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
          submitForm();
        "
        >保存检查单</el-button
      >
    </el-dialog>
    <el-dialog title="检查结果" :visible.sync="form2isible">
      <el-form :inline="true" :model="form2" ref="form2" class="form">
        <el-form-item label="当前患者:">
          {{ form2.patientName }}
        </el-form-item>
        <div v-for="(item, index) in form2.checkItem" :key="index">
          <el-form-item label="检查项名称:" prop="checkName">
            {{ item.checkName }}
          </el-form-item>
          <el-form-item label="检查结果:">
            <el-input :disabled="noInput" v-model="item.checkData"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <el-button
        @click="
          form2isible = false;
          clearForm2();
        "
        >取消</el-button
      >
      <el-button
        type="primary"
        @click="
          form2isible = false;
          saveCheckResult();
        "
        >保存检查结果</el-button
      >
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
      <el-table-column prop="checkStatus" label="检查状态">
        <template slot-scope="scope">
          {{ getCheckStatus(scope) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="goon" @click="getCheck(scope.row)" v-show="!scope.row.checkStatus">进行检查</el-button>
          <el-button size="mini" type="goon" @click="uploadResult(scope.row)" v-show="scope.row.checkStatus == 'uploading'">上传结果</el-button>
          <el-button size="mini" type="goon" @click="getResult(scope.row)" v-show="scope.row.checkStatus == 'uploaded'">查看结果</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { ADDCHECKRESULT, UPDATECHECKRESULT } from '../store/types.js';
export default {
  props: ['nowUser'],
  components: {},
  data() {
    return {
      patientList: [],
      dialogFormVisible: false,
      form2isible: false,
      noInput: false,
      form: {
        patientName: '',
        clinicalSign: '',
        diagnosticOpinion: '', // 诊断意见
        checkItem: [
          {
            checkName: '', // 检查项名称
          },
        ],
      },
      form2: {},
      formLabelWidth: '120px',
    };
  },
  methods: {
    //拿到需要检查的患者列表
    getPatientList() {
      let allPatient = this.$store.state.diagnose;
      for (let item of allPatient) {
        if (item.disposeType == 'check') {
          for (let item2 of this.$store.state.patient) {
            if (item.patientName == item2.name) {
              this.patientList.push(item2);
            }
          }
        }
      }
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
    //转化检查状态
    getCheckStatus(row) {
      if (row.row.checkStatus == 'uploading') {
        return '待上传检查结果';
      } else if (row.row.checkStatus == 'uploaded') {
        return '已完成检查';
      } else return '未检查';
    },
    /*点击进行检查
     */
    getCheck(row) {
      this.dialogFormVisible = true;
      let allDiagnose = this.$store.state.diagnose;
      for (let item of allDiagnose) {
        if (item.patientName == row.name) {
          this.form.patientName = row.name;
          this.form.clinicalSign = item.clinicalSign;
          this.form.diagnosticOpinion = item.diagnosticOpinion;
        }
      }
    },
    //点击上传检查结果
    uploadResult(row) {
      this.form2isible = true;
      this.noInput = false
      let checkResult = JSON.parse(JSON.stringify(this.$store.state.checkResult));
      for (let item of checkResult) {
        if (item.patientName == row.name) {
          this.form2 = item;
        }
      }
    },
    //点击查看检查结果
    getResult() {
      this.form2isible = true;
      this.noInput = true;
    },
    //新增检查项
    addCheckItem() {
      this.form.checkItem.push({
        checkName: '',
      });
    },
    //删除检查项
    removeItem(index) {
      this.form.checkItem.splice(index, 1);
    },
    //点击保存检查单
    submitForm() {
      for (let item of this.patientList) {
        if (this.form.patientName == item.name) {
          this.$set(item, 'checkStatus', 'uploading'); //这里使用V-show不可刷新视图 所以改成默认没有这个属性 然后在点击进行检查后checkStatus属性方便修改
        }
      }
      for (let item of this.form.checkItem) {
        item.checkData = '';
      }
      let checkResult = {
        checkItem: this.form.checkItem,
        patientName: this.form.patientName,
      };
      this.$store.commit(ADDCHECKRESULT, checkResult);
      this.$message({
        message: '保存检查项成功',
        type: 'success',
      });
    },
    //点击保存检查结果
    saveCheckResult() {
      for (let item of this.patientList) {
        if (this.form2.patientName == item.name) {
          this.$set(item, 'checkStatus', 'uploaded');
        }
      }
      this.$store.commit(UPDATECHECKRESULT, this.form2);
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

    //清空表单
    clearForm() {
      this.form = {
        patientName: '',
        clinicalSign: '',
        diagnosticOpinion: '', // 诊断意见
        checkItem: [
          {
            checkName: '', // 检查项名称
          },
        ],
      };
    },
    clearForm2() {
      this.form2 = {};
    },
  },
  mounted() {
    this.getPatientList();
  },
};
</script>

<style scoped>
.el-button--goon.is-active,
.el-button--goon:active {
  background: #20B2AA;
  border-color: #20B2AA;
  color: #fff;
}

.el-button--goon:focus,
.el-button--goon:hover {
  background: #48D1CC;
  border-color: #48D1CC;
  color: #fff;
}

.el-button--goon {
  color: #FFF;
  background-color: #20B2AA;
  border-color: #20B2AA;
}
</style>
