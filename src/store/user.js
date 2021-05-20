/**
 * 用户表结构 暂时当前端数据库用
 * id:唯一标识符
 * name:员工名称
 * userName:登陆用户名
 * password:登陆密码
 * department:所在科室/部门(内科、外科、急诊科、挂号处、药房、病房、检查科)
 * identity:身份信息(医生 部门主管 护士 收银员 药房工作人员 )
 * workYears:工龄
 * workload:工作量 :day 出勤日 num: 工作数量(个/人)
 */
const user = [
  {
    id: 1002,
    name: '内科辛大夫',
    userName: '1001',
    password: '1001',
    department: 'internalMedicine',
    identity: 'doctor',
    workYears: 7,
    workload: {
      day: 20,
      num: 5,
    },
  },
  {
    id: 1003,
    name: '急诊科童主任',
    userName: '1002',
    password: '1002',
    department: 'surgery',
    identity: 'leader',
    workYears: 20,
    workload: {
      day: 19,
      num: 5,
    },
  },
  {
    id: 10030,
    name: '急诊科郝医生',
    userName: '10020',
    password: '10020',
    department: 'surgery',
    identity: 'doctor',
    workYears: 6,
    workload: {
      day: 19,
      num: 50,
    },
  },
  {
    id: 10031,
    name: '急诊科廖医生',
    userName: '10021',
    password: '10021',
    department: 'surgery',
    identity: 'doctor',
    workYears: 12,
    workload: {
      day: 22,
      num: 50,
    },
  },
  {
    id: 1004,
    name: '病房沈护士',
    userName: '1',
    password: '1',
    department: 'inpatientWard',
    identity: 'nurse',
    workYears: 5,
    workload: {
      day: 20,
      num: 5,
    },
  },
  {
    id: 1005,
    name: '挂号处李出纳',
    userName: '2',
    password: '2',
    department: 'registration', //挂号处
    identity: 'cashier', //收银员
    workYears: 8,
    workload: {
      day: 20,
      num: 5,
    },
  },
  {
    id: 1006,
    name: '挂号处张主任',
    userName: '3',
    password: '3',
    department: 'registration',
    identity: 'leader',
    workYears: 12,
    workload: {
      day: 20,
      num: 6,
    },
  },
  {
    id: 1007,
    name: '财务处王管理员',
    userName: '4',
    password: '4',
    department: 'financeOffice',
    identity: 'cashier',
    workYears: 12,
    workload: {
      day: 15,
      num: 20,
    },
  },
];
export default user;
