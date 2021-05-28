<template>
  <div class="container">
    <el-form :model="form" ref="form" label-width="120px">
      <h1 v-if="form.itemList.length == 0">暂无物品补充申请</h1>
      <div v-for="(item, index) in form.itemList" :key="index">
        <el-form-item label="申请人">
          <el-input v-model="item.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="申请科室">
          <el-input v-model="item.department" disabled></el-input>
        </el-form-item>
        <div v-for="(item2, index2) in item.form.information" :key="index2">
          <el-form-item  label="物品名称">
            <el-input v-model="item2.itemName" disabled></el-input>
          </el-form-item>
          <el-form-item  label="物品种类">
            <el-input v-model="item2.itemType" disabled></el-input>
          </el-form-item>
          <el-form-item  label="物品数量">
            <el-input v-model="item2.itemNum" disabled></el-input>
          </el-form-item>
        </div>
        <el-button @click="confirmGrant(index)">确认发放</el-button>
        <el-divider></el-divider>
      </div>
    </el-form>
  </div>
</template>
<script>
import { DELETEITEM } from '@/store/types';
export default {
  props: ['nowUser'],
  data() {
    return {
      form: { itemList: [] },
    };
  },
  methods: {
    //拿到需求物品清单并改名
    getItem() {
      this.form.itemList = JSON.parse(JSON.stringify(this.$store.state.item));
      for (let item of this.form.itemList) {
        if (item.department == 'checkOffice') {
          item.department = '检查科';
        } else if (item.department == 'inpatientWard') {
          item.department = '病房';
        } else if (item.department == 'pharmacy') {
          item.department = '药房';
        }
        for (let item2 of item.form.information) {
          if (item2.itemType == 'medicineProduct') {
            item2.itemType = '医用品';
          } else {
            item2.itemType = '药品';
          }
        }
      }
    },
    //确认发放删除该信息
    confirmGrant(index) {
      this.$store.commit(DELETEITEM, index);
      this.getItem();
    },
  },
  created() {
    this.getItem();
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
