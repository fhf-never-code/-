<template>
  <div class=" container">
    <el-form :model="form" ref="form" label-width="100px">
      <div v-for="(item, index) in form.information" :key="index">
        <el-form-item label="物品名称">
          <el-input v-model="item.itemName"></el-input>
        </el-form-item>
        <el-form-item label="物品种类">
          <el-select v-model="item.itemType">
            <el-option label="药品" value="medicine"></el-option>
            <el-option label="医用品" value="medicineProduct"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所需数量">
          <el-input-number v-model="item.itemNum" controls-position="right" :min="1" :max="100"></el-input-number>
        </el-form-item>
        <el-divider></el-divider>
      </div>
      <el-button type="primary" @click="submitForm">提交申请</el-button>
      <el-button @click="addItem">新增物品项</el-button>
      <el-button @click="resetForm">重置表单</el-button>
    </el-form>
  </div>
</template>
<script>
import { ADDITEM } from '@/store/types';
export default {
  props: ['nowUser'],
  data() {
    return {
      patientList: [],
      dialogFormVisible: false,
      form: {
        information: [
          {
            itemName: '',
            itemNum: '',
            itemType: '',
          },
        ],
      },
    };
  },
  methods: {
    //重置表单
    resetForm() {
      this.form = {
        information: [
          {
            itemName: '',
            itemNum: '',
            itemType: '',
          },
        ],
      };
    },
    //提交表单
    submitForm() {
      let itemApply = {
        userName: this.nowUser.name,
        department: this.nowUser.department,
        form:this.form
      };
      this.$store.commit(ADDITEM,itemApply)
       this.$message({
            message: '成功保存物品申请信息',
            type: 'success',
          });
      this.resetForm()
    },
    //新增物品项
    addItem() {
      this.form.information.push({
        itemName: '',
        itemNum: '',
        itemType: '',
      });
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
</style>
