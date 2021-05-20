<template>
  <div class="form">
    <el-form :model="form" ref="form" label-width="100px" class="demo-dynamic">
      <el-form-item v-model="form.date" label="值班时间">
        <el-date-picker v-model="form.date" type="date" placeholder="请选择值班日期" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item v-for="index in form.workforce" :key="index.worker" class="workforceItem">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link"> 值班类型<i class="el-icon-arrow-down el-icon--right"></i> </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="dayShift">白班</el-dropdown-item>
          <el-dropdown-item command="beforeNightShift">前夜班</el-dropdown-item>
          <el-dropdown-item command="afterNightShift">后夜班</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> 
    </el-form-item>
      <el-button type="primary" @click="submitForm('form')">保存</el-button>
      <el-button @click="addWorkforce">新增值班项</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </el-form>
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
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
      workforceType: ['dayShift', 'beforeNightShift', 'afterNightShift'],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            
          console.log(this.form)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //新增表单内值班项触发事件
    addWorkforce() {
      this.form.workforce.push({
        workerName: '',
        type: '',
      });
    },
    handleCommand(index,command) {
        this.$message(index,command);
      },
      beforeHandleCommand(index,command){   //index我这里是遍历的角标，即你需要传递的额外参数
            return {
            'index': index,
            'command':command
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
  width: 500px;
  display: flex;
}
.workforceItem {
    border: blueviolet 1px solid;
}
</style>
