import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
Vue.use(Vuex)
const user = [{ 
  id: 1001,
  userName: 'admin',
  password: 'admin',
  department:'',
  identity:'manager'
}, { 
  id: 1002,
  userName: '1001',
  password: '1001',
  department:'',
  identity:'doctor'
}, {
  id: 1003,
  userName: 'doc2',
  password: '1002',
  department:'',
  identity:'manager'
}, {
  id: 1004,
  userName: '1',
  password: '1',
  department:'',
  identity:'nurse'
}]
const myActions = {
  [types.UPDATEUSER]({commit} , data){
    setTimeout (()=> {
      commit(types.UPDATEUSER,data)
    },2000)
  }
}
const store = new Vuex.Store({
  state: {
    user
  },
  mutations: {
    [types.UPDATEUSER] (state ,data ) {
      state.user = data
    }
  },
  actions:  myActions
  
  
})
export default store