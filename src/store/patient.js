/*病人挂号的信息
  targetDepartment:根据挂号信息找目标科室看诊
  status:病人的状态 :unchecked/已缴费待检查 checked/已检查待进一步处理 finished/就诊完毕
*/
const patient = [{
    name: '李一锋',
    IDnum: '23021619980112311X',
    sex: 'male',
    targetDepartment: 'internalMedicine',
    time: '2021-05-25 19:15:16',
    status: 'unchecked',
}, {
    name: '钱建国',
    IDnum: '121563196308291414',
    sex: 'male',
    targetDepartment: 'emergencyWard',
    time: '2021-05-26 20:15:16',
    status: 'checked',
}, {
    name: '吴怡铮',
    IDnum: '35165820050515831X',
    sex: 'female',
    targetDepartment: 'surgery',
    time: '2021-05-29 20:35:23',
    status: 'finished',
}, {
    name: '盛华依',
    IDnum: '69151020010715831X',
    sex: 'female',
    targetDepartment: 'surgery',
    time: '2021-05-31 20:32:13',
    status: 'unchecked',
},]
export default patient