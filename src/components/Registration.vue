<template>
  <div class="container ">
    <div class="notice">
      挂号处病历管理
      <el-button type="primary" @click="dialogFormVisible = true">新建病历</el-button>
      <el-dialog title="病历管理" :visible.sync="dialogFormVisible">
        <el-form :model="form" class="form">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="form.sex">
              <el-option label="男性" value="male"></el-option>
              <el-option label="女性" value="female"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份证号" :label-width="formLabelWidth">
            <el-input v-model="form.IDnum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="挂号科室" :label-width="formLabelWidth">
            <el-select v-model="form.targetDepartment" placeholder="挂号科室">
              <el-option label="内科" value="internalMedicine"></el-option>
              <el-option label="外科" value="surgery"></el-option>
              <el-option label="急诊科" value="emergencyWard"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false;clearForm()">取消</el-button>
          <el-button
            type="primary"
            @click="
              dialogFormVisible = false;
              savePatient();
            "
            >保存</el-button
          >
        </div>
      </el-dialog>
    </div>
    <div class="form">
      <el-table stripe :data="tableData" style="width: 100%" border >
        <el-table-column prop="time" label="时间" sortable> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="sex" label="性别"> 
          <template slot-scope="scope">
            {{ getSex(scope) }}
          </template>
        </el-table-column>
        <el-table-column prop="targetDepartment" label="就诊科室">
          <template slot-scope="scope">
            {{ getDepartment(scope) }}
          </template>
        </el-table-column>
        <el-table-column prop="IDnum" label="身份证号"> </el-table-column>
        <el-table-column prop="status" label="状态" sortable>
          <template slot-scope="scope">
            {{ getName(scope) }}
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑 </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
   import { UPDATEPATIENT,DELETEPATIENT } from "../store/types.js"
export default {
  components: {},
  data() {
    //这里存放数据
    return {
      tableData: [],
      isEdit:-1,
      isFirst:-1,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        sex: 'male',
        targetDepartment: 'emergencyWard',
        IDnum: '',
        time: '',
        status:'unchecked'
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    /*拿到病人列表 
    初始化从缓存里拿数据
    之后修改全局数据 登出时重新把患者送进缓存里
    允许在当前页面新建新的病历(即为新的病人)
     */
    getPatient() {
    
     
         this.tableData = this.$store.state.patient;
      
    },
    /*点击编辑病历
     */
    handleEdit( row) {
      this.dialogFormVisible = true;
      this.form.IDnum = row.IDnum
      this.form.sex = row.sex
      this.form.name = row.name
      this.form.targetDepartment = row.targetDepartment
      this.form.status = row.status
      this.isEdit = row
    },
    /*点击删除病历
     */
    handleDelete(row) {
      console.log("delete")
      this.$store.commit(DELETEPATIENT,row.name)
    },
    getName(row) {
      let status = row.row.status;
      switch (status) {
        case 'unchecked':
          return '未看诊';
        case 'checked':
          return '看诊中';
        case 'finished':
          return '看诊完成';
      }
    },
    getSex (value) {
      if(value.row.sex == 'male') { return '男'}
      else return '女'
    },
    getDepartment(value) {
      switch(value.row.targetDepartment) {
        case 'internalMedicine':
          return '内科'
          case 'surgery':
          return '外科'
          case 'emergencyWard':
          return '急诊科'
      }
    },
    /*保存时触发刷新当前列表
    */
    savePatient() {
      if(this.isEdit!=-1) {
        this.handleDelete(this.isEdit)
      }
      let time = new Date();
      let h = time.getHours();
      let min = time.getMinutes();
      let sec = time.getSeconds();
      time = `${time
        .toLocaleDateString()
        .split('/')
        .join('-')} ${h}:${min}:${sec} `;
        this.form.time = time
        let patient = JSON.parse(JSON.stringify( this.$store.state.patient))
        patient.push(this.form)
        this.$store.commit(UPDATEPATIENT,patient)
        this.getPatient()
        this.form =  {
        name: '',
        sex: 'male',
        targetDepartment: 'emergencyWard',
        IDnum: '',
        time: '',
        status:'unchecked'
      }
    },
    /*取消的时候清空表单
    */
    clearForm() 
    {
      this.form = {
        name: '',
        sex: 'male',
        targetDepartment: 'emergencyWard',
        IDnum: '',
        time: '',
        status:'unchecked'
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getPatient();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.container,
.container div {
  display: inline-block;
}

.form {
  width: 100%;
  display: inline-block;
}
</style>
