import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const user = [{ 
  id: 1001,
  userName: 'admin',
  password: 100000,
  department:'',
  identity:'manager'
}, { 
  id: 1002,
  userName: 'doc1',
  password: 100001,
  department:'',
  identity:'doctor'
}, {
  id: 1003,
  userName: 'doc2',
  password: 100002,
  department:'',
  identity:'manager'
}]

const store = new Vuex.Store({
  state: {
    count: 18,
    user,

  },
  mutations: {
    increment(state) {
      state.count++
     
    }
  }
})
export default store