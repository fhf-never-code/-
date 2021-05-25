<template>
  <div class="container">
    <el-carousel :interval="4000" indicator-position="outside" height="500px" trigger="click" class="carousel">
      <el-carousel-item v-for="(item, index) in carouselData" :key="index">
        <h1>{{ changeDepartMent(item.department) }} {{ item.information.date }} 日值班信息</h1>
        <h2>
          白班:
          <p v-for="(item2, index2) in item.information.dayShift" :key="index2">
            {{ item2 }}
          </p>
        </h2>
        <h2>
          前夜班:
          <p v-for="(item3, index3) in item.information.beforeNightShift" :key="index3">
            {{ item3 }}
          </p>
        </h2>
        <h2>
          后夜班:
          <p v-for="(item4, index4) in item.information.afterNightShift" :key="index4">
            {{ item4 }}
          </p>
        </h2>
      </el-carousel-item>
      <h1 v-if="carouselData.length == 0">
        暂无今日明日值班信息
      </h1>
    </el-carousel>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      carouselData: [],
    };
  },
  //监听属性 类似于data概念
  computed: {
    changeDepartMent() {
      return function(department) {
        if (department == 'inpatientWard') {
          return '病房';
        } else return '急诊科';
      };
    },
  },
  //vuex中因为保存新的值班信息刷新公告栏中数据
    watch: {
    "$store.state.workforce"() {
     this.getWorforceData()
    },
  },
  //方法集合
  methods: {
    //拿到走马灯中数据
    getWorforceData() {
      this.carouselData = []
      let workforce
       if(sessionStorage.getItem('workforce')) {
        workforce = JSON.parse(sessionStorage.getItem('workforce')) 
      }
       else {
         workforce = this.$store.state.workforce;
       } 
      let day = new Date();
      let todayTime = new Date();
      day.setTime(day.getTime() + 24 * 60 * 60 * 1000);
      var today;
      var tomorrow;
      //月份不足两位补零;
      if (day.getMonth() < 10) {
        tomorrow = day.getFullYear() + '-0' + (day.getMonth() + 1) + '-' + day.getDate();
      } else {
        tomorrow = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate();
      }
      if (todayTime.getMonth() < 10) {
        today = todayTime.getFullYear() + '-0' + (todayTime.getMonth() + 1) + '-' + todayTime.getDate();
      } else {
        today = todayTime.getFullYear() + '-' + (todayTime.getMonth() + 1) + '-' + todayTime.getDate();
      }
      //符合日期在今日和明日的值班信息
      for (let item of workforce) {
        if (item.information.date == today || item.information.date == tomorrow) {
          this.carouselData.push(item);
        }
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  mounted() {
    this.getWorforceData();
    // this.getSessionData()
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: inline-block;
}
.carousel {
  width: 100%;
  height: 100%;
}
.carousel p {
  display: inline-block;
  padding-left: 10px;
}
/* .el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
} */

.el-carousel__item:nth-child(2n) {
  background-color: rgb(95, 178, 233);
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #306cdb;
}
</style>
