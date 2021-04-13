<!--  -->
<template>
    <div class='container'>
      <el-button @click="btnClick">点击</el-button>
      <!-- <li  v-for= "item in user" :key="item.id">
        {{item.id}}
      </li> -->
      姓名 <input type="text" v-model="nowUser.name"> 
      年龄 <input type="text" v-model="nowUser.age"> 
      {{ user }}
    </div>
  </template>
  
  <script> 
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import { mapState } from "vuex"
    import { UPDATEUSER } from "../store/types.js"
    export default {
      //import引入的组件需要注入到对象中才能使用
      components: {},
      data() {
        //这里存放数据
        return {
          nowUser: {
            name : '' ,
            age : null
          }
        };
      },
      //监听属性 类似于data概念
      computed: {
        ...mapState(["user"])
      },
      //监控data中的数据变化
      watch: {},
      //方法集合
      methods: {
        btnClick() {
          // console.log(user)
        //   this.$router.push({
        //     path: 'menu'
        //   })
          // this.$store.commit(UPDATEUSER,this.nowUser)
          this.$store.dispatch(UPDATEUSER,this.nowUser)
        }
      },
      //生命周期 - 创建完成（可以访问当前this实例）
      created() {
  
      },
      //生命周期 - 挂载完成（可以访问DOM元素）
      mounted() {
  
      },
      beforeMount() {}, //生命周期 - 挂载之前
      beforeUpdate() {}, //生命周期 - 更新之前
      updated() {}, //生命周期 - 更新之后
      beforeDestroy() {}, //生命周期 - 销毁之前
      destroyed() {}, //生命周期 - 销毁完成
      activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
  </script>
  <style scoped> 
  
  </style>