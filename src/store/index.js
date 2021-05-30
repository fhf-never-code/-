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
    [types.ADDGIVEMEDICINE](state, data) {
      state.giveMedicine.push(data);
      for (let item of data.giveMedicine.medicineItem) {
        for (let medicine of state.medicine) {
          if (medicine.medicineName == item.medicineName) {
            console.log(item,medicine)
              medicine.medicineNum -= item.medicineNum
              medicine.medicineSales +=item.medicineNum
              break
          }
        }
      }
    },
  },
});
export default store;
