/**
 * 用户表结构 暂时当前端数据库用
 * id:唯一标识符
 * name:员工名称
 * userName:登陆用户名
 * password:登陆密码
 * department:所在科室/部门(内科、外科、急诊科、挂号处、药房、病房、检查科)
 * identity:身份信息(医生 部门主管 护士 收银员 药房工作人员 系统管理员)
 * workYears:工龄
 * workload:工作量 :day 出勤日 num: 工作数量(个/人)
 */
const user = [
  {
    id: 1001,
    name: '管理员老大哥',
    userName: 'admin',
    password: 'admin',
    department: 'hospital',
    identity: 'admin',
    workYears: 10,
    workload: {
      day: 20,
      num: 5,
    },
  },
  {
    id: 1002,
    name: '辛大夫',
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
    name: '童主任',
    userName: '1002',
    password: '1002',
    department: 'surgery',
    identity: 'leader',
    workYears: 20,
    workload: {
      day: 20,
      num: 5,
    },
  },
  {
    id: 1004,
    name: '沈护士',
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
    name: '李出纳',
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
    name: '王科长',
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
];
export default user;
