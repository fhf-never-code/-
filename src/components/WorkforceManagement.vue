<template>
  <div class="container">
    <el-form :model="form" ref="form" label-width="100px" class="form" :rules="rules">
      <el-form-item v-model="form.date" prop="date" label="值班时间">
        <el-date-picker v-model="form.date" type="date" placeholder="请选择值班日期" value-format="yyyy-MM-dd"> </el-date-picker>
      </el-form-item>
      <el-form-item class="workforceItem" prop="dayShift" label="白班">
        <el-select v-model="form.dayShift" multiple placeholder="请选择员工姓名">
          <el-option v-for="item in colleague" :key="item" :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="workforceItem" prop="beforeNightShift" label="前夜班">
        <el-select v-model="form.beforeNightShift" multiple placeholder="请选择员工姓名">
          <el-option v-for="item in colleague" :key="item" :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="workforceItem" prop="afterNightShift" label="后夜班">
        <el-select v-model="form.afterNightShift" multiple placeholder="请选择员工姓名">
          <el-option v-for="item in colleague" :key="item" :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="submitForm('form')">保存</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form>
  </div>
</template>
<script>
 import { ADDWORKFORCE } from "../store/types.js"
export default {
  props: ['nowUser'],
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      colleague: [],
      form: {
        dayShift: [],
        beforeNightShift: [],
        afterNightShift: [],
        date: '',
      },
      rules: {
        date: {
          required: true,
          message: '值班日期不能为空',
        },
        dayShift: {
          required: true,
          message: '白班值班人员不能为空',
        },
        beforeNightShift: {
          required: true,
          message: '前夜班值班人员不能为空',
        },
        afterNightShift: {
          required: true,
          message: '后夜值班人员不能为空',
        },
      },
    };
  },
  //方法集合
  methods: {
    //拿到同科室同事姓名
    getDepartment() {
      let user = this.$store.state.user;
      for (let item in user) {
        if (user[item].department == this.nowUser.department) {
          let depart = JSON.parse(JSON.stringify(user[item]));
          this.colleague.push(depart.name);
        }
      }
    },
    submitForm(form) {
      this.$refs[form].validate(valid => {
        var able = true;
        if (valid) {
          for (let item of this.$store.state.workforce) {
            if (this.form.date == item.information.date && this.nowUser.department == item.information.department) {
              able = false;
                this.$message({
                  message: '已有指定日期值班信息',
                  type: 'error'
                });
            }
          }
          //在已有值班数据中检索未得到选定日期的值班数据时保存
          if (able) {
            let department = this.nowUser.department;
            let workforce = {
              department: department,
              information: this.form,
            };
            this.$store.commit(ADDWORKFORCE,workforce)
            sessionStorage.setItem('workforce',JSON.stringify(this.$store.state.workforce))
            this.resetForm('form')
            this.form.date = ''
              this.$message({
                  message: '保存值班信息成功',
                  type: 'success'
                });
          }
        } else {
           this.$message({
                  message: '值班信息不可为空',
                  type: 'error'
                });
          return false;
        }
      });
    },
    resetForm() {
      this.form = { dayShift: [],
        beforeNightShift: [],
        afterNightShift: [],
        date: '',}
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getDepartment();
  },
};
</script>
<style scoped>
.form {
  padding: 10px;
}
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
</style>
