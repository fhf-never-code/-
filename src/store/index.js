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
        [types.UPDATEUSER](state, data) {
            state.user = data
        }
    },
    actions: myActions


})
export default store