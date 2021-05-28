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
    name: '徐继红',
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
    name: '于慧洋',
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
    name: '张慧斌',
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
    name: '王树清',
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
    name: '张磊',
    userName: '10010',
    password: '10010',
    department: 'inpatientWard',
    identity: 'leader',
    workYears: 5,
    workload: {
      day: 22,
      num: 20,
    },
  },
  {
    id: 10040,
    name: '徐静',
    userName: '10011',
    password: '10011',
    department: 'inpatientWard',
    identity: 'nurse',
    workYears: 5,
    workload: {
      day: 20,
      num: 5,
    },
  },
  {
    id: 10041,
    name: '张红英',
    userName: '10012',
    password: '10012',
    department: 'inpatientWard',
    identity: 'nurse',
    workYears: 2,
    workload: {
      day: 21,
      num: 10,
    },
  },
  {
    id: 1005,
    name: '王静杰',
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
    name: '张华义',
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
    name: '徐刚',
    userName: '1007',
    password: '1007',
    department: 'financeOffice',
    identity: 'cashier',
    workYears: 12,
    workload: {
      day: 15,
      num: 20,
    },
  },
  {
    id: 1008,
    name: '盛秋月',
    userName: '1008',
    password: '1008',
    department: 'checkOffice',
    identity: 'leader',
    workYears: 2,
    workload: {
      day: 15,
      num: 22,
    },
  },
  {
    id: 1009,
    name: '黄尚林',
    userName: '1009',
    password: '1009',
    department: 'pharmacy',
    identity: 'leader',
    workYears: 15,
    workload: {
      day: 12,
      num: 30,
    },
  },
  {
    id: 1010,
    name: '左武金',
    userName: '1010',
    password: '1010',
    department: 'emergencyWard',
    identity: 'leader',
    workYears: 15,
    workload: {
      day: 19,
      num: 36,
    },
  },
];
export default user;
