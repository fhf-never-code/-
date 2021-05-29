/*药品表
isOTC 是否为处方药 
isExchange 是否可退换 
extraInformation 额外信息
 */
const medicine = [
  {
    medicineName: '快好牌感冒药',
    isOTC: false,
    isExchange: true,
    extraInformation: '',
    medicinePrice: 15,
    medicineNum: 230,
    medicineSales: 121,
  },
  {
    medicineName: '阿莫西林胶囊',
    isOTC: true,
    isExchange: false,
    extraInformation: '抗生素',
    medicinePrice: 22,
    medicineNum: 190,
    medicineSales: 70,
  },
  {
    medicineName: '六味地黄丸',
    isOTC: false,
    isExchange: true,
    extraInformation: '',
    medicinePrice: 8,
    medicineNum: 20,
    medicineSales: 80,
  },
  {
    medicineName: '金嗓子喉片',
    isOTC: false,
    isExchange: true,
    extraInformation: '',
    medicinePrice: 8,
    medicineNum: 70,
    medicineSales: 180,
  },
  {
    medicineName: '肾上腺素',
    isOTC: true,
    isExchange: false,
    extraInformation: '避光保存',
    medicinePrice: 50,
    medicineNum: 10,
    medicineSales: 5,
  },
];
export default medicine;
