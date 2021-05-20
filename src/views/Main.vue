<template>
  <div class="container">
    <el-container>
      <el-aside style="width: 200px;">
        <el-menu
          default-active="1-4-1"
          class="menu"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">个人信息</span>
            </template>
              <el-menu-item index="MyInformation"> <i class="el-icon-s-check"></i> 我的信息</el-menu-item>
              <el-menu-item index="MyDepartment"> <i class="el-icon-right"></i> 我的科室</el-menu-item>
              <el-menu-item index="MyPerformance"> <i class="el-icon-money"></i> 我的绩效</el-menu-item>
          </el-submenu>
          <el-menu-item index="2" v-if="nowUser.identity == 'admin'">
            <i class="el-icon-menu"></i>
            <span slot="title">员工信息管理</span>
          </el-menu-item>
          <el-menu-item index="Diagnose" v-if="nowUser.identity == 'doctor'">
            <i class="el-icon-document"></i>
            <span slot="title">看诊管理</span>
          </el-menu-item>
          <el-menu-item index="Registration" v-if="nowUser.department == 'registration'">
            <i class="el-icon-document"></i>
            <span slot="title">挂号管理</span>
          </el-menu-item>
          <el-menu-item index="InpatientWard" v-if="nowUser.department == 'inpatientWard'">
            <i class="el-icon-document"></i>
            <span slot="title">病房管理</span>
          </el-menu-item>
          <el-menu-item index="WorkforceManagement" v-if="nowUser.identity == 'leader'&&
           (nowUser.department=='inpatientWard'||nowUser.department=='surgery'||nowUser.department=='internalMedicine'||nowUser.department=='emergencyWard')">
            <i class="el-icon-document"></i>
            <span slot="title">排班管理</span>
          </el-menu-item>
          <el-menu-item index="Notice">
            <i class="el-icon-setting"></i>
            <span slot="title">医院公告</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          {{ nowUser.name }},欢迎您登陆
          <el-button class="exit" @click="exit" type="primary" round>登出</el-button>
        </el-header>
        <el-main>
          <div class="main">
            <Notice v-show="nowCompoents == 'Notice'"></Notice>
            <Diagnose :nowUser="nowUser" v-show="nowCompoents == 'Diagnose'"></Diagnose>
            <MyInformation :nowUser="nowUser" v-show="nowCompoents == 'MyInformation'"></MyInformation>
            <Registration v-show="nowCompoents == 'Registration'"></Registration>
            <MyDepartment :nowUser="nowUser" v-show="nowCompoents == 'MyDepartment'"></MyDepartment>
            <MyPerformance :nowUser="nowUser" v-show="nowCompoents == 'MyPerformance'"></MyPerformance>
            <InpatientWard :nowUser="nowUser" v-show="nowCompoents == 'InpatientWard'"></InpatientWard>
            <WorkforceManagement :nowUser="nowUser"  v-show="nowCompoents == 'WorkforceManagement'"></WorkforceManagement>
          </div>
        </el-main>
        <el-footer>东北林业大学2017级软件工程二班李一锋 权利所有</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Notice from '../components/Notice.vue';
import Diagnose from '../components/Diagnose.vue';
import MyInformation from '../components/MyInformantion.vue';
import Registration from '../components/Registration.vue';
import MyDepartment from '../components/MyDepartment.vue';
import MyPerformance from '../components/MyPerformance.vue';
import InpatientWard from '../components/InpatientWard.vue';
import WorkforceManagement from '../components/WorkforceManagement.vue'
export default {
  components: {
    Notice,
    Diagnose,
    MyInformation,
    Registration,
    MyDepartment,
    MyPerformance,
    InpatientWard,
    WorkforceManagement
  },
  data() {
    return {
      nowCompoents: 'Notice',
      nowuser: '',
    };
  },
  methods: {
    changeCompoent(index) {
      console.log(index);
      this.nowCompoents = index;
    },
    /**
     * 登出函数 返回登陆的路由 同时清空缓存里的用户 加入患者数据
     * */
    exit() {
      sessionStorage.removeItem('user');
      this.$message({
        message: '成功登出',
        type: 'success',
      });
      this.$router.push('/');
    },
    /*
            菜单切换函数 根据index切换main的组件
            */
    handleSelect(key) {
      this.nowCompoents = key;
    },
  },
  /*
        防止因为直接切换路径进入 只要缓存里没有数据就返回登录界面
        */
  beforeCreate() {
    if (!sessionStorage.getItem('user')) {
      this.$router.push('/');
    }
  },
  created() {
    var sessionUser = sessionStorage.getItem('user'); // 从缓存中取出当前的登陆职工信息
    this.nowUser = JSON.parse(sessionUser);
  },
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: center;
}

.el-aside {
  overflow: hidden;
  background-color: #545c64;
  color: #333;
  width: 200px;
  text-align: center;
  line-height: 1em;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  width: 100%;
}

.container {
  height: 100%;
  display: flex;
  width: 100%;
  border: 10px blueviolet;
}

.main {
  height: 100%;
  width: 100%;
}

.exit {
  margin-left: 1rem;
}
</style>
