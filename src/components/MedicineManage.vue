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
            <el-input-number v-model="item2.medicineNum" :min="1" :max="item2.maxNum" @change="handleChange(index2)"></el-input-number>
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
    <div class="buttonArea"> 应对患者进行收费: {{totalPrice}} 元
      </div> 
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
      maxNum: 10,
      dialogFormVisible: false,
      confirmRegistration: false,
      totalPrice:0,
    };
  },
  computed: {},
  watch: {
    'this.$store.state.medicine'() {
      this.getMedicineList();
    },
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
    returnMedicine() {},
    //清空表单
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
    },
    //点击发药
    submitForm() {
      for (let item of this.giveMedicineForm.medicineItem) {
          this.totalPrice +=item.totalPrice
      }
      this.confirmRegistration = true
    },
    //拿到选择的药品 反馈是否是处方药 根据药品库存动态绑定最大发药量 自动生成对应的药品总价
    getIsOTC(value) {
      //value传入的是选项的下标 再giveMedicineForm.medicineItem[value].medicineName 拿到选中内容
      let medicine = this.medicineList;
      let chooseMedicine = this.giveMedicineForm.medicineItem[value];
      for (let item of medicine) {
        if (item.medicineName == chooseMedicine.medicineName) {
          chooseMedicine.isOTC = item.isOTC;
          chooseMedicine.maxNum = item.medicineNum;
          chooseMedicine.medicineNum = 1;
        }
      }
      this.handleChange(value);
    },
    //新增发药项
    addGiveMedicineItem() {
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
      let giveMedicine = {
       price :   this.totalPrice,
       giveMedicine :this.giveMedicineForm
      }
      console.log(giveMedicine)
    }
    // //初始化注入选项
    // getOptionList() {
    //   this.optionList = this.medicineList
    // },
  },
  created() {
    this.getMedicineList();
  },
  mounted() {
    // this.getOptionList()
  },
};
</script>
<style scoped>
.container {
  display: flex;
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
</style>
