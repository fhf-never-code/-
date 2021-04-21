<template>
    <div class='container'>
        <div class="form">
            <el-form :model="formInline">
                <el-form-item label="姓名">
                    <el-input v-model="formInline.name" :disabled="isAdmin"></el-input>
                </el-form-item>
                <el-form-item label="职责">
                    <el-input v-model="formInline.identity" :disabled="isAdmin"></el-input>
                </el-form-item>
                <el-form-item label="科室">
                    <el-input v-model="formInline.department" :disabled="isAdmin"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="form">
            <el-form :model="formInline">
                <el-form-item label="工龄">
                    <el-input v-model="formInline.workYears" :disabled="isAdmin"></el-input>
                </el-form-item>
                <el-form-item label="本月出勤">
                    <el-input v-model="formInline.workload.day" :disabled="isAdmin"></el-input>
                </el-form-item>
                <el-form-item label="本月工作量">
                    <el-input v-model="formInline.workload.num" :disabled="isAdmin"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['nowUser'],
        components: {},
        data() {
            //这里存放数据
            return {
                formInline: {
                    department: '',
                    identity: '',
                }
            };
        },
        //监听属性 类似于data概念
        computed: {
            /*判断是管理员的话允许修改自己的信息
              先留出来函数 不确定是否允许管理员或者自己更改自己的登陆用户名和密码
            */
            isAdmin() {
                if (this.nowUser.identity == 'admin') {
                    return false
                } else return true
            },

        },
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            /*
            根据中英文对照关系*/
            getName() {
                let nowUser = this.nowUser
                Object.assign(this.formInline, JSON.parse(JSON.stringify(nowUser)))
                let comparisonTable = this.$store.state.comparisonTable
                this.formInline.department = comparisonTable.get(this.formInline.department)
                this.formInline.identity = comparisonTable.get(this.formInline.identity)
            }
        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        created() {
            this.getName()
        },
    }
</script>
<style scoped>
    .container {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        /* flex-wrap: wrap-reverse; */
    }
    
    .form {
        margin: 0 100px;
    }
</style>