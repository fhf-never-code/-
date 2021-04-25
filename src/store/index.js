import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
import user from './user'
import comparisonTable from './comparisonTable'
import patient from './patient'
Vue.use(Vuex)
const myActions = {
    [types.UPDATEUSER]({
        commit
    }, data) {
        setTimeout(() => {
            commit(types.UPDATEUSER, data)
        }, 2000)
    }
}
const store = new Vuex.Store({
    state: {
        user, //员工列表
        patient, // 病人状态列表
        comparisonTable, // 中英文对照表

    },
    mutations: {
        //更新员工信息
        [types.UPDATEUSER](state, data) {
            state.user = data
        },
        //更新患者信息
        [types.UPDATEPATIENT](state,data) {
            state.patient = data
        },
        //删除患者信息
        [types.DELETEPATIENT](state,data) {
            for (let index in state.patient) {
                if(state.patient[index].name==data){
                    state.patient.splice(index,1)
                    break
                }
            }
        },
        //更新工作量
        [types.UPDATEWORKLOAD](state,data) {
            state.user.work.workload = data
        },

    },
    actions: myActions
})
export default store