<template>
  <div class="container">
    <el-form class="form">
      <h1>药房账单</h1>
      <el-form-item label="药房今日发药数量:">
        {{ checkAccount.pharmacyAccount.length }}
      </el-form-item>
      <el-form-item label="药房今日应上交款项:"> {{ todayPharmacyMoney }} 元 </el-form-item>
      <el-steps :active="active" simple class="step">
        <el-step v-show="!isViable" title="待核查" icon="el-icon-edit"></el-step>
        <el-step v-show="!isViable" title="核查中" icon="el-icon-upload"></el-step>
        <el-step v-show="!isViable" title="核查无误" icon="el-icon-check"></el-step>
        <el-step title="核查有误" icon="el-icon-close"> </el-step>
      </el-steps>
      <el-form-item label="错账数额:" v-show="!falutAccount.ownSolve"> {{ falutAccount.difference }} 元 </el-form-item>
      <el-button style="margin-top: 12px;" type="goon" :disabled="isViable" @click="next">进行核查</el-button>
      <el-button style="margin-top: 12px;" type="goon" @click="checkError('pharmacy')">核查有误</el-button>
    </el-form>

    <el-dialog title="错账核查" :visible.sync="dialogVisible" width="30%">
      <span> 错账部门: 药房</span>
      <p>
        是否能自主检查错账:
        <el-switch
          style="display: block"
          v-model="falutAccount.ownSolve"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="是"
          inactive-text="否"
        >
        </el-switch>
      </p>
      <span v-show="!falutAccount.ownSolve"
        >错误账目数额:
        <el-input-number size="mini" v-model="falutAccount.difference" :precision="2" :step="0.5" :max="2000"></el-input-number
      ></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearForm">取消</el-button>
        <el-button
          type="primary"
          @click="
            dialogVisible = false;
            onSubmit('1');
          "
          >确定</el-button
        >
      </span>
    </el-dialog>

    <el-form class="form">
      <h1>挂号处账单</h1>
      <el-form-item label="挂号处今日挂号数量:">
        {{ checkAccount.registrationAccount.length }}
      </el-form-item>
      <el-form-item label="挂号处今日上应交款项:"> {{ todayRegistrationMoney }} 元 </el-form-item>
      <el-steps :active="active2" simple class="step">
        <el-step v-show="!isViable2" title="待核查" icon="el-icon-edit"></el-step>
        <el-step v-show="!isViable2" title="核查中" icon="el-icon-upload"></el-step>
        <el-step v-show="!isViable2" title="核查无误" icon="el-icon-check"></el-step>
        <el-step title="核查有误" icon="el-icon-close"> </el-step>
      </el-steps>
      <el-form-item label="错账数额:" v-show="!falutAccount2.ownSolve"> {{ falutAccount2.difference }} 元 </el-form-item>
      <el-button style="margin-top: 12px;" :disabled="isViable2" type="goon" @click="next2">进行核查</el-button>
      <el-button style="margin-top: 12px;" type="goon" @click="checkError('registration')">核查有误</el-button>
    </el-form>

    <el-dialog title="错账核查" :visible.sync="dialogVisible2" width="30%">
      <span> 错账部门: 挂号处</span>
      <p>
        是否能自主检查错账:
        <el-switch
          style="display: block"
          v-model="falutAccount2.ownSolve"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="是"
          inactive-text="否"
        >
        </el-switch>
      </p>
      <span v-show="!falutAccount2.ownSolve"
        >错误账目数额:
        <el-input-number size="mini" v-model="falutAccount2.difference" :precision="2" :step="0.5" :max="2000"></el-input-number
      ></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearForm2">取消</el-button>
        <el-button
          type="primary"
          @click="
            dialogVisible2 = false;
            onSubmit('2');
          "
          >确定</el-button
        >
      </span>
    </el-dialog>
    <el-button type="primary" size="middle" @click="saveCheckAccount"> 保存今日查账</el-button>
  </div>
</template>

<script>
import { ADDCHECKACCOUNT } from '../store/types';
export default {
  data() {
    return {
      checkAccount: {
        pharmacyAccount: [],
        registrationAccount: [],
      },
      todayPharmacyMoney: 0,
      todayRegistrationMoney: 0,
      active: 0,
      active2: 0,
      dialogVisible: false,
      dialogVisible2: false,
      falutAccount: {
        department: '',
        difference: 0, //如果不能自主查出错账原因 上报差额 按系数要求收银员赔偿
        ownSolve: true,
      },
      falutAccount2: {
        department: '',
        difference: 0, //如果不能自主查出错账原因 上报差额 按系数要求收银员赔偿
        ownSolve: true,
      },
      isViable: false,
      isViable2: false,
    };
  },
  methods: {
    //拿到病房、挂号处的对应账单
    getAccount() {
      let giveMedicine = this.$store.state.giveMedicine;
      let registration = this.$store.state.patient;
      let day = new Date();
      let year = day.getFullYear();
      let month = day.getMonth() + 1;
      if (month < 10) {
        month = '0' + month;
      }
      let today = day.getDate();
      if (today < 10) {
        today = '0' + today;
      }
      //拿到今天的标准格式日期 比对拿到今天
      let date = `${year}-${month}-${today}`;
      for (let item of registration) {
        let registrationDate = item.time.substring(0, 10);
        if (registrationDate == date) {
          this.checkAccount.registrationAccount.push(item);
        }
      }
      for (let item2 of giveMedicine) {
        if (item2.giveMedicineDate == date) {
          this.checkAccount.pharmacyAccount.push(item2);
        }
      }
      // console.log(this.checkAccount);
      this.getMoney();
    },
    //拿到每日应收得的账目数额
    getMoney() {
      for (let item of this.checkAccount.pharmacyAccount) {
        this.todayPharmacyMoney += item.price;
      }
      for (let item2 of this.checkAccount.registrationAccount) {
        if (item2.targetDepartment == 'surgery') {
          this.todayRegistrationMoney += 12;
        } else if (item2.targetDepartment == 'internalMedicine') {
          this.todayRegistrationMoney += 10;
        } else {
          this.todayRegistrationMoney += 20;
        }
      }
    },
    //点击确定查账
    onSubmit(value) {
      if (value == '1') {
        this.active = 4;
        this.isViable = true;
        this.dialogVisible = false;
      } else {
        this.active2 = 4;
        this.isViable2 = true;
        this.dialogVisible2 = false;
      }
    },
    //当查账无误进入下一步的时候
    next() {
      if (this.active < 3) {
        this.active++;
      }
    },
    next2() {
      if (this.active2 < 3) {
        this.active2++;
      }
    },
    //当查账有误的时候
    checkError(value) {
      if (value == 'registration') {
        this.falutAccount2.department = '挂号处';
        this.dialogVisible2 = true;
      } else {
        this.falutAccount.department = '药房';
        this.dialogVisible = true;
      }
    },
    //保存查账记录
    saveCheckAccount() {
      if (this.active < 3 || this.active2 < 3) {
        this.$message({
          message: '请完成查账再保存',
          type: 'error',
        });
      } else {
        let day = new Date();
        let year = day.getFullYear();
        let month = day.getMonth() + 1;
        if (month < 10) {
          month = '0' + month;
        }
        let today = day.getDate();
        if (today < 10) {
          today = '0' + today;
        }
        //拿到今天的标准格式日期
        let date = `${year}-${month}-${today}`;
        let checkAccount = {
          date: date,
          checkResult: [
            {
              department: 'registration',
              isCorrect: true,
              checkNum: this.checkAccount.registrationAccount.length,
              checkMoney: this.todayRegistrationMoney,
            },
            {
              department: 'pharmacy',
              isCorrect: true,
              checkNum: this.checkAccount.pharmacyAccount.length,
              checkMoney: this.todayPharmacyMoney,
            },
          ],
        };
        if (this.active == 4) {
          checkAccount.checkResult[0].isCorrect = false;
          checkAccount.checkResult[0].ownSolve = this.falutAccount.ownSolve;
          if (this.falutAccount.ownSolve == false) {
            checkAccount.checkResult[0].difference = this.falutAccount.difference;
          }
        }
        if (this.active2 == 4) {
          checkAccount.checkResult[1].isCorrect = false;
          checkAccount.checkResult[1].ownSolve = this.falutAccount2.ownSolve;
          if (this.falutAccount2.ownSolve == false) {
            checkAccount.checkResult[1].difference = this.falutAccount2.difference;
          }
        }
        let save = true;
        for (let item of this.$store.state.checkAccount) {
          if (item.date == checkAccount.date) {
            this.$message({
              message: '已有今日查账记录',
              type: 'error',
            });
            save = false;
            break
          }
        }
        if (save) {
          this.$store.commit(ADDCHECKACCOUNT, checkAccount);
          console.log(this.$store.state.checkAccount);
          this.$message({
            message: '成功保存查账记录',
            type: 'success',
          });
        }
      }
    },
    //点击取消按钮恢复最初状态
    clearForm() {
      this.dialogVisible = false;
      this.falutAccount = {
        department: '',
        difference: 0,
        ownSolve: true,
      };
      this.active = 0;
      this.isViable = false;
    },
    clearForm2() {
      this.dialogVisible2 = false;
      this.falutAccount2 = {
        department: '',
        difference: 0,
        ownSolve: true,
      };
      this.active2 = 0;
      this.isViable2 = false;
    },
  },
  created() {
    this.getAccount();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.form {
  width: 400px;
  height: 400px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  margin: 20px;
  padding: 20px;
}
.step {
  margin-top: 20px;
}
.el-button--goon.is-active,
.el-button--goon:active {
  background: #bfca2994;
  border-color: #bfca2994;
  color: #fff;
}

.el-button--goon:focus,
.el-button--goon:hover {
  background: #bfca2994;
  border-color: #bfca2994;
  color: #fff;
}
.el-button--goon {
  color: #fff;
  background-color: #20b2aa;
  border-color: #20b2aa;
}
</style>
