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
          <el-menu-item
            index="Diagnose"
            v-if="nowUser.department == 'internalMedicine' || nowUser.department == 'surgery' || nowUser.department == 'emergencyWard'"
          >
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
          <el-menu-item index="CheckManage" v-if="nowUser.department == 'checkOffice'">
            <i class="el-icon-document"></i>
            <span slot="title">检查管理</span>
          </el-menu-item>
          <el-menu-item
            index="WorkforceManagement"
            v-if="nowUser.identity == 'leader' && (nowUser.department == 'inpatientWard' || nowUser.department == 'emergencyWard')"
          >
            <i class="el-icon-document"></i>
            <span slot="title">排班管理</span>
          </el-menu-item>
          <el-menu-item index="Notice">
            <i class="el-icon-setting"></i>
            <span slot="title">值班公告</span>
          </el-menu-item>
          <el-menu-item
            index="ItemSupplement"
            v-if="nowUser.department == 'inpatientWard' || nowUser.department == 'pharmacy' || nowUser.department == 'checkOffice'"
          >
            <i class="el-icon-goods"></i>
            <span slot="title">物品申请</span>
          </el-menu-item>
           <el-menu-item index="GrantItem" v-if="nowUser.department == 'financeOffice'">
            <i class="el-icon-document"></i>
            <span slot="title">物品发放</span>
          </el-menu-item>
          <el-menu-item index="PerformanceManagement" v-if="nowUser.department == 'financeOffice'">
            <i class="el-icon-star-on"></i>
            <span slot="title">绩效管理</span>
          </el-menu-item>
            <el-menu-item index="Charge" v-if="nowUser.department == 'financeOffice'">
            <i class="el-icon-money"></i>
            <span slot="title">收费</span>
          </el-menu-item>
          <el-menu-item index="CheckAccount" v-if="nowUser.department == 'financeOffice'">
            <i class="el-icon-info"></i>
            <span slot="title">账目核查</span>
          </el-menu-item>
            <el-menu-item index="MedicineManage" v-if="nowUser.department == 'pharmacy'">
            <i class="el-icon-info"></i>
            <span slot="title">药品管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          {{ nowUser.name }},欢迎您登陆
          <el-button class="exit" @click="exit" type="primary" round>登出</el-button>
          <el-button class="exit" @click="sign" type="primary" v-show="showSign" >签到</el-button>
        </el-header>
        <el-main>
          <div class="main">
            <Notice ref="getWorforceData" v-show="nowCompoents == 'Notice'"></Notice>
            <Diagnose :nowUser="nowUser" v-show="nowCompoents == 'Diagnose'"></Diagnose>
            <MyInformation :nowUser="nowUser" v-show="nowCompoents == 'MyInformation'"></MyInformation>
            <Registration v-show="nowCompoents == 'Registration'"></Registration>
            <MyDepartment :nowUser="nowUser" v-show="nowCompoents == 'MyDepartment'"></MyDepartment>
            <MyPerformance :nowUser="nowUser" v-show="nowCompoents == 'MyPerformance'"></MyPerformance>
            <InpatientWard :nowUser="nowUser" v-show="nowCompoents == 'InpatientWard'"></InpatientWard>
            <WorkforceManagement :nowUser="nowUser" v-show="nowCompoents == 'WorkforceManagement'"></WorkforceManagement>
            <ItemSupplement :nowUser="nowUser" v-show="nowCompoents == 'ItemSupplement'"></ItemSupplement>
            <CheckManage :nowUser="nowUser" v-show="nowCompoents == 'CheckManage'"></CheckManage>
            <GrantItem :nowUser="nowUser" v-show="nowCompoents == 'GrantItem'"></GrantItem>
            <MedicineManage :nowUser="nowUser" v-show="nowCompoents == 'MedicineManage'"></MedicineManage>
            <PerformanceManagement :nowUser="nowUser" v-show="nowCompoents == 'PerformanceManagement'" > </PerformanceManagement>
            <CheckAccount :nowUser="nowUser" v-show="nowCompoents == 'CheckAccount'" > </CheckAccount>
            <Charge :nowUser="nowUser" v-show="nowCompoents == 'Charge'" > </Charge>
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
import WorkforceManagement from '../components/WorkforceManagement.vue';
import ItemSupplement from '../components/ItemSupplement.vue';
import CheckManage from '../components/CheckManage';
import GrantItem from '../components/GrantItem'
import MedicineManage from '../components/MedicineManage'
import PerformanceManagement from '../components/PerformanceManagement'
import CheckAccount from '../components/CheckAccount'
import Charge from '../components/Charge'
import {SIGN} from '../store/types'
export default {
  components: {
    Notice, // 通知  
    Diagnose, // 看诊
    MyInformation,  // 个人信息
    Registration, //挂号管理
    MyDepartment, //我的部门
    MyPerformance, // 我的绩效
    InpatientWard,  // 病房管理
    WorkforceManagement, // 值班管理
    ItemSupplement, // 物品申请
    CheckManage,  // 检查管理
    GrantItem, // 物品发放
    MedicineManage, // 
    PerformanceManagement, // 绩效管理
    CheckAccount, // 查账管理
    Charge, // 财务处收检查和住院的费用
  },
  data() {
    return {
      nowCompoents: 'Notice',
      nowuser: '',
      showSign:true
    };
  },
  methods: {
    /**
     * 登出函数 返回登陆的路由 同时清空缓存里的用户
     * */
    exit() {
      sessionStorage.removeItem('user');
      this.$message({
        message: '成功登出',
        type: 'success',
      });
      this.$router.push('/');
    },
    // 菜单切换函数 根据index切换main的组件
    handleSelect(key) {
      this.nowCompoents = key;
    },
    //签到
    sign() {
      this.$store.commit(SIGN,this.nowUser.name)
      this.showSign = false
      this.$message({
        message: '成功签到',
        type: 'success',
      });
    }
  },
  // 防止因为直接切换路径进入 只要缓存里没有数据就返回登录界面
  beforeCreate() {
    if (!sessionStorage.getItem('user')) {
      this.$router.push('/');
    }
  },
  created() {
    let sessionUser = sessionStorage.getItem('user'); // 从缓存中取出当前的登陆职工信息
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
  display: flex;

  align-items: center;
}
</style>
