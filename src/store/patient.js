/*病人挂号的信息
  targetDepartment:根据挂号信息找目标科室看诊
  status:病人的状态 :unchecked/已缴费待检查 checked/已检查待进一步处理 finished/就诊完毕
  
*/
const patient = [{
    name: '李一锋',
    IDnum: '23021619980112311X',
    sex: 'male',
    targetDepartment: 'internalMedicine',
    time: '2021-4-15 19:15:16',
    status: 'unchecked',
    disposeType:'',
    disposeDescripe:''
}, {
    name: '风红枫',
    IDnum: '121563196308291414',
    sex: 'male',
    targetDepartment: 'emergencyWard',
    time: '2021-4-15 20:5:16',
    status: 'checked'
}, {
    name: '恶魔人',
    IDnum: '35165820050515831X',
    sex: 'female',
    targetDepartment: 'surgery',
    time: '2021-4-15 20:35:23',
    status: 'finished'
}, ]
export default patient