<template>
  <div class="container">
    <el-dialog title="发药单" :visible.sync="dialogFormVisible">
      <el-form :inline="true" :model="giveMedicineForm" ref="giveMedicineForm">
        <el-form-item label="患者姓名:">
          <el-input v-model="giveMedicineForm.patientName"> </el-input>
        </el-form-item>
        <div v-for="(item2, index2) in giveMedicineForm.medicineItem" :key="index2">
          <el-form-item label="选择药品:">
            <el-select @change="getIsOTC(index2)" v-model="item2.medicineName">
              <el-option
                v-for="(item, index) in medicineList"
                :key="index"
                :label="item.medicineName"
                :value="item.medicineName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否为处方药：">
            <el-switch v-model="item2.isOTC" disabled active-color="red" inactive-color="#9481da" active-text="是" inactive-text="否">
            </el-switch>
          </el-form-item>
          <el-form-item label="发药数量:">
            <el-input-number v-model="item2.medicineNum" :min="0" :max="item2.maxNum" @change="handleChange(index2)"></el-input-number>
          </el-form-item>
          <el-form-item label="价格:">
            {{ item2.totalPrice }}
          </el-form-item>
          <el-button @click="deleteGiveMedicineItem(index2)" type="warning">删除发药项 </el-button>
        </div>
      </el-form>
      <el-button
        @click="
          dialogFormVisible = false;
          clearForm();
        "
        >取消</el-button
      >
      <el-button @click="addGiveMedicineItem()">新增发药项</el-button>
      <el-button
        type="primary"
        @click="
          dialogFormVisible = false;
          submitForm();
        "
        >确认发药</el-button
      >
    </el-dialog>
    <el-dialog title="收费" :visible.sync="confirmRegistration">
      <div class="buttonArea">应对患者进行收费: {{ totalPrice }} 元</div>
      <el-button
        @click="
          confirmRegistration = false;
          clearForm();
        "
        >取消</el-button
      >
      <el-button
        type="primary"
        @click="
          confirmRegistration = false;
          saveGiveMedicine();
        "
        >收费完成</el-button
      >
    </el-dialog>
    <el-dialog title="退药" :visible.sync="returnMedicineIsVisible">
      <el-form :inline="true" :model="returnMedicineForm">
        <el-form-item label="请输入患者姓名进行查询:">
          <el-input v-model="returnMedicineForm.patientName" clearable> </el-input>
        </el-form-item>
        <el-button @click="getSearch" v-loading.fullscreen.lock="fullscreenLoading"> 查询</el-button>
        <el-button type="goon" @click="closeReturnMedicine"> 取消 </el-button>
        <div v-show="canSee" v-for="(item, index) in returnMedicineForm.giveMedicineRecord" :key="index">
          <el-form-item>
            药品名: {{ item.medicineName }} 发药数量 : {{ item.medicineNum }} 是否可以退换: {{ changeDisplay(item.isExchange) }}
          </el-form-item>
          <el-form-item label="选择退药数量:" v-show="item.isExchange">
            <el-input-number
              size="small"
              v-model="returnMedicineForm.returnMedicineItem[index]"
              :min="0"
              :max="item.medicineNum"
            ></el-input-number>
          </el-form-item>
        </div>
        <el-button @click="confirmReturnMedicine" v-show="returnMedicineForm.returnMedicineItem.length != 0">确认退药</el-button>
      </el-form>
    </el-dialog>
    <el-dialog title="退药退款" :visible.sync="confirmReturn">
      <div class="buttonArea">应对患者进行退费: {{ returnPrice }} 元</div>
      <el-button @click="clearForm2()">取消</el-button>
      <el-button type="primary" @click="returnMedicinePrice()">确认退费</el-button>
    </el-dialog>
    <div>
      <div class="buttonArea">
        <el-button type="goon" @click="giveMedicine">发药 </el-button>
        <el-button type="goon" @click="returnMedicine"> 退药 </el-button>
      </div>
      <el-table :data="medicineList" stripe style="width: 100%" border>
        <el-table-column prop="medicineName" label="药品名称" width="220"> </el-table-column>
        <el-table-column prop="medicineNum" label="药品剩余量" min-width="150" sortable> </el-table-column>
        <el-table-column prop="medicinePrice" label="药品单价" min-width="150" sortable> </el-table-column>
        <el-table-column prop="isOTC" label="是否为处方药" width="150">
          <template slot-scope="scope">
            {{ changeDisplay(scope.row.isOTC) }}
          </template>
        </el-table-column>
        <el-table-column prop="medicineSales" label="销售量" min-width="150" sortable=""> </el-table-column>
        <el-table-column prop="isOTC" label="是否可以退换" width="150">
          <template slot-scope="scope">
            {{ changeDisplay(scope.row.isExchange) }}
          </template>
        </el-table-column>
        <el-table-column prop="extraInformation" label="注意事项" width="220"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { ADDGIVEMEDICINE, ADDRETURNMEDICINE } from '../store/types';
export default {
  props: ['nowUser'],
  data() {
    //这里存放数据
    return {
      medicineList: [],
      giveMedicineForm: {
        patientName: '',
        medicineItem: [
          {
            medicineName: '',
            isOTC: false,
            medicineNum: '',
            totalPrice: '',
            maxNum: 10,
          },
        ],
      },
      returnMedicineForm: {
        patientName: '',
        giveMedicineRecord: [], //记录患者的发药记录
        returnMedicineItem: [], //记录选择的退药信息
      },
      maxNum: 10,
      dialogFormVisible: false, // 选择发药项界面
      confirmRegistration: false, //确认发药界面
      returnMedicineIsVisible: false, //退药界面
      confirmReturn: false, //确认退药界面
      fullscreenLoading: false, //是否启动加载中
      canSee: false, //手动控制拿到数据时间
      totalPrice: 0,
      returnPrice: 0,
    };
  },
  methods: {
    // 拿到所有药品的列表
    getMedicineList() {
      let medicineList = this.$store.state.medicine;
      this.medicineList = JSON.parse(JSON.stringify(medicineList));
    },
    //更改显示是否
    changeDisplay(value) {
      if (value) {
        return '是';
      } else return '否';
    },
    //发药
    giveMedicine() {
      this.dialogFormVisible = true;
      this.clearForm();
    },
    //退药
    returnMedicine() {
      this.returnMedicineIsVisible = true;
      this.returnMedicineForm = {
        patientName: '',
        giveMedicineRecord: [],
        returnMedicineItem: [],
      };
    },
    //清空发药表单
    clearForm() {
      this.giveMedicineForm = {
        patientName: '',
        medicineItem: [
          {
            medicineName: '',
            medicineIsOTC: false,
            medicineNum: '',
            totalPrice: '',
            maxNum: 10,
          },
        ],
      };
      this.totalPrice = 0;
    },
    //清空退药表单
    clearForm2() {
      this.confirmReturn = false;
      this.returnPrice = 0;
      this.returnMedicineForm = {
        patientName: '',
        giveMedicineRecord: [], //记录患者的发药记录
        returnMedicineItem: [], //记录选择的退药信息
      };
    },
    //点击发药
    submitForm() {
      let set = new Set();
      for (let item of this.giveMedicineForm.medicineItem) {
        set.add(item.medicineName);
      }
      let setArr = Array.from(set);
      //经过set去重检查是否表单中有一种药品占两个发药项
      if (this.giveMedicineForm.medicineItem.length == setArr.length) {
        for (let item of this.giveMedicineForm.medicineItem) {
          this.totalPrice += item.totalPrice;
        }
        this.confirmRegistration = true;
      } else {
        this.$message({
          message: '不能两次发同种药品',
          type: 'error',
        });
      }
    },
    //拿到选择的药品 反馈是否是处方药 根据药品库存动态绑定最大发药量 自动生成对应的药品总价
    getIsOTC(value) {
      //value传入的是选项的下标 再giveMedicineForm.medicineItem[value].medicineName 拿到选中内容
      let medicine = this.medicineList;
      let chooseMedicine = this.giveMedicineForm.medicineItem[value];
      for (let item of medicine) {
        if (item.medicineName == chooseMedicine.medicineName) {
          chooseMedicine.isOTC = item.isOTC;
          chooseMedicine.isExchange = item.isExchange;
          chooseMedicine.maxNum = item.medicineNum;
          chooseMedicine.medicineNum = 0;
        }
      }
      this.handleChange(value);
    },
    //新增发药项
    addGiveMedicineItem() {
      //检查发药项是否大于药品总数
      if (this.giveMedicineForm.medicineItem.length <= this.medicineList.length) {
        this.giveMedicineForm.medicineItem.push({
          medicineName: '',
          medicineIsOTC: false,
          medicineNum: '',
          totalPrice: '',
        });
      } else {
        this.$message({
          message: '发药项不能超过药品总数',
          type: 'warning',
        });
      }
    },
    // 发药数量导致的发药项的价格变化
    handleChange(value) {
      let chooseMedicine = this.giveMedicineForm.medicineItem[value];
      for (let item of this.medicineList) {
        if (item.medicineName == chooseMedicine.medicineName) {
          chooseMedicine.totalPrice = item.medicinePrice * chooseMedicine.medicineNum;
        }
      }
    },
    //删除发药项
    deleteGiveMedicineItem(index) {
      this.giveMedicineForm.medicineItem.splice(index, 1);
    },
    //保存发药内容
    saveGiveMedicine() {
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
      let giveMedicine = {
        price: this.totalPrice,
        giveMedicine: this.giveMedicineForm,
        giveMedicineDate: date,
      };
      this.$store.commit(ADDGIVEMEDICINE, giveMedicine);
      this.$message({
        message: '成功保存发药信息',
        type: 'success',
      });
      this.totalPrice = 0;
      this.getMedicineList();
    },
    //退药界面选择查询发药信息
    getSearch() {
      this.returnMedicineForm.giveMedicineRecord = [];
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
        this.canSee = true;
      }, 1000);
      for (let item of this.$store.state.giveMedicine) {
        if (this.returnMedicineForm.patientName == item.giveMedicine.patientName) {
          for (let item2 of item.giveMedicine.medicineItem) {
            let obj = item2;
            this.returnMedicineForm.giveMedicineRecord.push(obj);
            this.returnMedicineForm.returnMedicineItem.push(0);
          }
        }
      }
    },
    //关闭退药界面
    closeReturnMedicine() {
      this.returnMedicineIsVisible = false;
      this.returnMedicineForm = {
        patientName: '',
        giveMedicineRecord: [],
        returnMedicineItem: [],
      };
    },
    //确认退药按钮
    confirmReturnMedicine() {
      this.confirmReturn = true;
      for (let index in this.returnMedicineForm.giveMedicineRecord) {
        if (this.returnMedicineForm.giveMedicineRecord[index].isExchange == true) {
          let item = this.returnMedicineForm.giveMedicineRecord[index];
          for (let medicine of this.$store.state.medicine) {
            if (medicine.medicineName == item.medicineName) {
              let price = medicine.medicinePrice * this.returnMedicineForm.returnMedicineItem[index];
              this.returnPrice += price;
            }
          }
        }
      }
    },
    //确认退药相关功能
    returnMedicinePrice() {
      let obj = {
        patientName: this.returnMedicineForm.patientName,
        returnItem: [],
      };
      for (let index in this.returnMedicineForm.giveMedicineRecord) {
        if (this.returnMedicineForm.giveMedicineRecord[index].isExchange == true) {
          let item = this.returnMedicineForm.giveMedicineRecord[index];
          let obj2 = {
            giveMedicineRecord: item,
            returnNum: this.returnMedicineForm.returnMedicineItem[index],
          };
          obj.returnItem.push(obj2);
        }
      }
      this.$store.commit(ADDRETURNMEDICINE, obj);
      this.returnMedicineIsVisible = false;
      this.getMedicineList();
      this.$message({
        message: '成功退药',
        type: 'success',
      });
      this.confirmReturn = false;
    },
  },
  created() {
    this.getMedicineList();
  },
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-content: center;
}
.el-button--goon.is-active,
.el-button--goon:active {
  background: #20b2aa;
  border-color: #20b2aa;
  color: #fff;
}

.el-button--goon:focus,
.el-button--goon:hover {
  background: #9481da;
  border-color: #9481da;
  color: #fff;
}
.el-button--goon {
  color: #fff;
  background-color: #20b2aa;
  border-color: #20b2aa;
}
.buttonArea {
  margin-bottom: 16px;
}
.el-button {
  margin-left: 20px;
}
</style>
