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
        <el-table :data="tableData" tooltip-effect="dark" stripe style="margin-top: 20px; width: 100%;" @selection-change="handleSelectionChange" row-key="studentNo" border>
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
          <el-pagination style="text-align: center;" :current-change="currentChange" @size-change="sizeChange" :current-page="pageNum" :page-size="pageSize" layout="prev, pager, next, total" :total="total" background @current-change="currentChange"></el-pagination>
        </div>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { testInit } from '@/api/initTest'
export default {
  data() {
    return {
      searchForm: {
        studentNo: '',
        name: '',
        age: '',
        city: ''
      },
      tableData: [],
      multipleSelection: [],
      pageNum: 1,
      pageSize: 6,
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
    async initTableData() {
      const params = {
        pageIndex: this.pageNum,
        pageSize: this.pageSize
      }
      testInit(params)
        .then(response => {
          debugger
          this.tableData = response.data.data
          this.total = response.data.total
        })
        .catch(error => {
          console.log(error)
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
