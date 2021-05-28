<template>
  <div class="container">
    <div class="form">
      <el-form :model="nowUser" status-icon :rules="rules" ref="nowUser" label-width="100px" class="demo-nowUser">
        <p>欢迎登录依安县医院管理系统</p>
        <el-form-item label="工号" prop="userName">
          <el-input v-model="nowUser.userName" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="nowUser.password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('nowUser')">提交</el-button>
          <el-button @click="resetForm('nowUser')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      nowUser: {
        userName: '',
        password: '',
      },
      rules: {
        userName: {
          required: true,
          message: '用户名不能为空',
        },
        password: {
          required: true,
          message: '密码不能为空',
        },
      },
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    /*
      表单检验函数 
      在非空检测后若当前输入的用户名和密码存在于全局数据中 
      进入主界面
      */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let user = this.user;
          let nowUser = this.nowUser;
          for (let item in user) {
            if (user[item].userName == nowUser.userName && user[item].password == nowUser.password) {
              var realUser = user[item];
              this.$message({
                message: '登陆成功',
                type: 'success',
              });
              this.$router.push('Main');
              sessionStorage.setItem('user', JSON.stringify(realUser));
              var success = true;
              break;
            }
          }
          if (!success) {
            // 遍历到最后仍然没有匹配项 即为数据库没有这个用户名和密码的组合
            this.$message({
              message: '用户名或密码不正确',
              type: 'error',
            });
          }
        } else {
          this.$message({
            message: '用户名或密码不能为空',
            type: 'warning',
          });
        }
      });
    },
    /* 表单重置
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  /*在创建之前检测是否已有缓存数据
   */
  beforeCreate() {
    if (sessionStorage.getItem('user')) {
      this.$router.push('Main');
    }
  },
};
</script>
<style scoped>
.container {
  /* background-color: rgb(241, 240, 150); */
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url('../public/医院图.png');
}

.form {
  background-color: thistle;
  display: flex;
  width: 500px;
  height: 400px;
  margin-left: calc(50% - 250px);
  margin-top: 50px;
  padding: 50px;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.form p {
  font-size: 24px;
  margin-left: 50px;
}
</style>
