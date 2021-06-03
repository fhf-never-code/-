import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';
import user from './user';
import comparisonTable from './comparisonTable';
import patient from './patient';
import medicine from './medicine';
import workforce from './workforce';
import diagnose from './diagnose';
import inpatientWard from './inpatientWard';
import item from './item';
import checkResult from './checkResult';
import giveMedicine from './giveMedicine';
import checkAccount from './checkAccount'
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    user, //员工列表
    patient, // 病人状态列表
    comparisonTable, // 中英文对照表
    medicine, // 药品表
    workforce, // 排班表
    diagnose, // 诊断意见表
    inpatientWard, // 病房
    item, // 物品补充清单
    checkResult, // 检查结果
    giveMedicine, // 发药单
    checkAccount, //查账记录
  },
  mutations: {
    //更新员工信息
    [types.UPDATEUSER](state, data) {
      state.user = data;
    },
    //更新患者信息
    [types.UPDATEPATIENT](state, data) {
      state.patient = data;
    },
    //删除患者信息
    [types.DELETEPATIENT](state, data) {
      for (let index in state.patient) {
        if (state.patient[index].name == data) {
          state.patient.splice(index, 1);
          break;
        }
      }
    },
    //更新工作量
    [types.UPDATEWORKLOAD](state, data) {
      state.user.work.workload = data;
    },
    //增加值班信息
    [types.ADDWORKFORCE](state, data) {
      state.workforce.push(data);
    },
    //更新值班信息
    [types.UPDATEWORKFORCE](state, data) {
      state.workforce = data;
    },
    //增加诊断意见
    [types.ADDDIAGNOSE](state, data) {
      if (!state.diagnose.includes(data)) {
        state.diagnose.push(data);
      } else {
        for (let item in state.diagnose) {
          if (data.patientName == item.patientName) {
            item = data;
          }
        }
      }
      for (let item2 of state.patient) {
        if (data.patientName == item2.name) {
          item2.status = data.patientStatus;
        }
      }
    },
    //更新患者住院信息
    [types.UPDATEINPATIENTWARD](state, data) {
      for (let item of state.diagnose) {
        if (data.name == item.patientName) {
          item = data;
        }
      }
    },
    //提出物品补充需求
    [types.ADDITEM](state, data) {
      state.item.push(data);
    },
    //补充完物品，删除物品补充需求
    [types.DELETEITEM](state, index) {
      state.item.splice(index, 1);
    },
    //添加检查项目
    [types.ADDCHECKRESULT](state, data) {
      if (!state.checkResult.includes(data)) {
        state.checkResult.push(data);
      }
    },
    //上传患者检查结果
    [types.UPDATECHECKRESULT](state, data) {
      for (let item of state.checkResult) {
        if (item.patientName == data.patientName) {
          item.checkItem = data.checkItem;
        }
      }
    },
    //添加发药记录 同时更新药品的销售量与库存量
    [types.ADDGIVEMEDICINE](state, data) {
      state.giveMedicine.push(data);
      for (let item of data.giveMedicine.medicineItem) {
        for (let medicine of state.medicine) {
          if (medicine.medicineName == item.medicineName) {
            medicine.medicineNum -= item.medicineNum;
            medicine.medicineSales += item.medicineNum;
            break;
          }
        }
      }
    },
    //添加退药记录 同时更新发药记录中的发药记录部分 若退全部直接 删除该发药项 否则只做数量修改 然后更新药品的销售量与库存量
    [types.ADDRETURNMEDICINE](state, data) {
      for (let item of state.giveMedicine) {
        if (item.giveMedicine.patientName == data.patientName) {
          for (let index in item.giveMedicine.medicineItem) {
            for (let index2 in data.returnItem) {
              //  对比退药信息和发药信息同名且数量为发药量的 直接删除对应的发药信息
              if (
                item.giveMedicine.medicineItem[index].medicineName == data.returnItem[index2].giveMedicineRecord.medicineName &&
                item.giveMedicine.medicineItem[index].medicineNum == data.returnItem[index2].returnNum
              ) {
                //  在药品单中找到对应的药品 恢复退药的库存 减去销售量
                for (let medicine of state.medicine) {
                  if (medicine.medicineName == data.returnItem[index2].giveMedicineRecord.medicineName) {
                    medicine.medicineNum += data.returnItem[index2].returnNum;
                    medicine.medicineSales -= data.returnItem[index2].returnNum;
                    break;
                  }
                }
                item.giveMedicine.medicineItem.splice(index, 1);
                break;
              }
              //当退部分药品时
              else if (item.giveMedicine.medicineItem[index].medicineName == data.returnItem[index2].giveMedicineRecord.medicineName) {
                item.giveMedicine.medicineItem[index].medicineNum -= data.returnItem[index2].returnNum;
                //  在药品单中找到对应的药品 恢复退药的库存 减去销售量
                for (let medicine of state.medicine) {
                  if (medicine.medicineName == data.returnItem[index2].giveMedicineRecord.medicineName) {
                    medicine.medicineNum += data.returnItem[index2].returnNum;
                    medicine.medicineSales -= data.returnItem[index2].returnNum;
                    break;
                  }
                }
                break;
              }
            }
          }
        }
      }
    },
    //如果发放物品时药品则对药品的存量进行补充
    [types.GRANTMEDICINE](state, data) {
      for (let item of state.medicine) {
        if (data.medicineName == item.medicineName) {
          item.medicineNum += data.medicineNum;
        }
      }
    },
  },
});
export default store;
