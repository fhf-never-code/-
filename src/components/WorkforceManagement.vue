<template>
  <div class="container">
    <el-form :model="form" ref="form" label-width="100px" class="form" :rules="rules">
      <el-form-item v-model="form.date" prop="date" label="值班时间">
        <el-date-picker v-model="form.date" type="date" placeholder="请选择值班日期" value-format="yyyy-MM-dd"> </el-date-picker>
      </el-form-item>
      <el-form-item v-for="item in form.workforce" :key="item.worker" class="workforceItem" prop="item" label="值班信息">
        <el-select v-model="item.type" clearable placeholder="请选择值班类型">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        <el-select v-model="item.workerName" multiple placeholder="请选择员工姓名">
          <el-option v-for="item in colleague" :key="item" :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="submitForm('form')">保存</el-button>
      <el-button @click="addWorkforce">新增值班信息</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </el-form>
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
      colleague: [],
      form: {
        workforce: [
          {
            workerName: '',
            type: '',
          },
        ],
        date: '',
      },
      options: [
        {
          value: 'dayShift',
          label: '白班',
        },
        {
          value: 'beforeNightShift',
          label: '前夜班',
        },
        {
          value: 'afterNightShift',
          label: '后夜班',
        },
      ],
      rules: {
        date: {
          required: true,
          message: '值班日期不能为空',
        },
        item: [
          {
            required: true,
            validator: (rule, value, cb) => {
              let { durationEnd } = this.form.workforce;
              if (!value || !durationEnd) {
                console.log(value, durationEnd);
                return cb(new Error('固定时间段不能为空!'));
              }
              return cb();
            },
            trigger: 'blur',
          },
        ],
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
        if (valid) {
          let department = this.nowUser.department;
          let workforce = {
            department: department,
            form: this.form,
          };
          sessionStorage.setItem('workforce', JSON.stringify(workforce));
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    //新增表单内值班项触发事件
    addWorkforce() {
      if (this.form.workforce.length < 3) {
        this.form.workforce.push({
          workerName: '',
          type: '',
        });
      } else {
        this.$message({
          message: '值班信息不能大于三条，请进行多选',
          type: 'warning',
        });
      }
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
