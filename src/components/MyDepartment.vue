<template>
    <div class='container'>
        <div class="form">
            <el-table  :data="colleague" stripe style="width: 100%" border  >
                <el-table-column prop="department" label="科室" width="180" >
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="identity" label="职务" width="180">
                </el-table-column>
                <el-table-column prop="workYears" label="工龄(年)" width="180" sortable>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    export default {
        props: ['nowUser'],
        //import引入的组件需要注入到对象中才能使用
        components: {},
        data() {
            //这里存放数据
            return {
                colleague: []
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            /*
            在数据库里找同部门的同事*/
            getDepartment() {
                let user = this.$store.state.user
                for (let item in user) {
                    if (user[item].department == this.nowUser.department) {
                        let depart = JSON.parse(JSON.stringify( user[item]))
                        this.colleague.push(depart)
                    }
                }
            },
            //中英文对照改名
            getName() {
                // let nowUser = this.nowUser
                // Object.assign(this.formInline,JSON.parse(JSON.stringify(nowUser))) 
                let comparisonTable = this.$store.state.comparisonTable
                for (let item in this.colleague) {
                    this.colleague[item].department =JSON.parse(JSON.stringify(comparisonTable.get(this.colleague[item].department))) 
                    this.colleague[item].identity = JSON.parse(JSON.stringify(comparisonTable.get(this.colleague[item].identity))) 
                }
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {
            this.getDepartment()
            this.getName()
        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            
        },
        beforeCreate() { }, //生命周期 - 创建之前
        beforeMount() { }, //生命周期 - 挂载之前
        beforeUpdate() { }, //生命周期 - 更新之前
        updated() { }, //生命周期 - 更新之后
        beforeDestroy() { }, //生命周期 - 销毁之前
        destroyed() { }, //生命周期 - 销毁完成
        activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style scoped>
    .container {
        display: flex;
    
    }
</style>