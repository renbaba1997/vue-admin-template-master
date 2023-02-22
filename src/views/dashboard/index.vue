<template>
  <div>
    <el-form :model="searchForm" label-width="80px" style="border:1px solid #C4E1C5;padding: 8px;margin-top: 10px;">
      <el-row>
        <el-col :span="3">
          <el-form-item label="学号" style="margin-top: 30px; width: 150px;">
            <el-input v-model="searchForm.studentNo" style="width: 150px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="姓名" style="margin-top: 30px; width: 150px;">
            <el-input v-model="searchForm.name" style="width: 150px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="年龄" style="margin-top: 30px; width: 150px;">
            <el-input v-model="searchForm.age" style="width: 150px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="城市" style="margin-top: 30px; width: 150px;">
            <el-input v-model="searchForm.city" style="width: 150px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" style="margin-top: 30px; width: 100px;" icon="el-icon-search" @click="search()">查询</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" style="margin-top: 30px; width: 100px;" icon="el-icon-edit" @click="reset()">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-form ref="form">
      <el-row>
        <el-col :span="2">
          <el-button type="success" icon="el-icon-plus" class="add-tun" style="width: 100px; margin-left: 20px; margin-top: 20px;" @click="dialogVsible = true">新增</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="danger" icon="el-icon-delete" style="width: 120px; margin-left: 20px; margin-top: 20px;" @click="delayMany()">批量删除</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="tableData" tooltip-effect="dark" stripe style="margin-top: 20px; width: 100%;" @selection-change="handleSelectionChange" row-key="studentNo">
          <el-table-column type="selection" width="50px" height="50px" :selectable="checkBoxState" :reserve-selection="true"></el-table-column>
            <el-table-column fixed="left" key="1" width="auto" min-width="5%" label="序号" align="center">
              <template scope="scope">
                <span>{{(pageNum - 1) * pageSize + scope.$index + 1 }}</span>
              </template>
            </el-table-column>
          <el-table-column key="2" label="学生编号" prop="studentNo" width="auto" min-width="15%" align="center"></el-table-column>
          <el-table-column key="3" label="学生姓名" prop="name" width="auto" min-width="15%" align="center"></el-table-column>
          <el-table-column key="4" label="学生年龄" prop="age" width="auto" min-width="15%" align="center"></el-table-column>
          <el-table-column key="5" label="学生城市" prop="city" width="auto" min-width="15%" align="center"></el-table-column>
          <el-table-column key="6" label="操作" fixed="right" width="auto" min-width="20%" align="center">
            <template slot-scope="scope">
              <el-button type="danger" @click="deleteRow(scope.row)" size="medium" align="center" style="width: 30%;" icon="el-icon-delete">删除</el-button>
              <el-button type="warning" @click="editRow(scope.row)" size="medium" align="center" style="width: 30%;" icon="el-icon-edit">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 10px;">
          <el-pagination style="text-align:center;" :current-change="currentChange" @size-change="sizeChange" :current-page="pageNum" :page-size="pageSize" layout="prev, pager, next, total" :total="total" background @current-change="currentChange"></el-pagination>
        </div>
      </el-row>
    </el-form>
    <el-dialog title="新增学生信息" :visible.sync="dialogVsible" width="45%" :show-close="false" center>
      <el-form :model="addForm" label-width="100px" label-position="left" :rules="addFormRules" ref="addFormRef" style="margin-left: 40px;">
        <el-row>
          <el-col :span="10">
            <el-form-item label="学号" prop="studentNo">
              <el-input v-model="addForm.studentNo" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="addForm.name" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="addForm.age" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="城市" prop="city">
              <el-input v-model="addForm.city" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelInput(addForm)" icon="el-icon-circle-close">取消</el-button>
        <el-button type="primary" @click="addRow(addForm)" icon="el-icon-circle-check">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { testInit, addStudentInfo, deleteStudentInfo, deleteStudentInfos } from '@/api/initTest'
export default {
  data() {
    return {
      searchForm: {
        studentNo: '',
        name: '',
        age: '',
        city: ''
      },
      addForm: {},
      tableData: [],
      dialogVsible: false,
      addFormRules: {
        studentNo: [{ required: true, message: '请输入学生编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入学生姓名', trigger: 'blur' }],
        age: [{ required: true, message: '请输入学生年龄', trigger: 'blur' }],
        city: [{ required: true, message: '请输入学生所在城市', trigger: 'blur' }]
      },
      multipleSelection: [],
      pageNum: 1,
      pageSize: 8,
      total: 4
    }
  },
  computed: {
  },
  mounted() {
    this.initTableData()
  },
  methods: {
    onInput() {
      this.$forceUpdate()
    },
    cancelInput(addForm) {
      this.addForm.studentNo = ''
      this.addForm.name = ''
      this.addForm.age = ''
      this.addForm.city = ''
      this.dialogVsible = false
    },
    reset() {
      this.searchForm.studentNo = ''
      this.searchForm.name = ''
      this.searchForm.age = ''
      this.searchForm.city = ''
    },
    currentChange(currentChange) {
      this.pageNum = currentChange
      this.initTableData()
    },
    sizeChange(currentSize) {
      this.pageSize = currentSize
      this.initTableData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 初始化
    async initTableData() {
      const params = {
        pageIndex: this.pageNum,
        pageSize: this.pageSize
      }
      testInit(params)
        .then(response => {
          this.tableData = response.data.data
          this.total = response.data.total
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 查询函数
    async search() {
      const params = {
        studentNo: this.searchForm.studentNo,
        name: this.searchForm.name,
        age: this.searchForm.age,
        city: this.searchForm.city
      }
      testInit(params)
        .then(response => {
          this.tableData = response.data.data
          this.total = response.data.total
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 增加学生信息
    addRow(addForm) {
      this.pageNum = 1
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return this.$message.warning('表单尚未完全填写')
        const params = {
          studentNo: this.addForm.studentNo,
          name: this.addForm.name,
          age: this.addForm.age,
          city: this.addForm.city
        }
        this.addForm.studentNo = ''
        this.addForm.name = ''
        this.addForm.age = ''
        this.addForm.city = ''
        debugger
        addStudentInfo(params)
          .then(response => {
            debugger
            this.initTableData()
            this.dialogVsible = false
          })
          .catch(error => {
            this.$message.error(error.message)
          })
      })
    },
    // 删除
    deleteRow(row) {
      this.$confirm('确定要删除选中的数据吗？', '系统提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          const params = {
            studentNo: row.studentNo
          }
          deleteStudentInfo(params)
            .then(response => {
              this.pageNum = 1
              this.initTableData()
              this.dialogVsible = false
            })
            .catch(error => {
              this.$message.error(error.message)
            })
        })
    },
    delayMany() {
      this.$confirm('确定要删除选中的数据吗？', '系统提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          const params = [...this.multipleSelection]
          deleteStudentInfos(params)
            .then(response => {
              this.pageNum = 1
              this.initTableData()
              this.dialogVsible = false
              alert('删除成功！')
            })
            .catch(error => {
              this.$message.error(error.message)
            })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
