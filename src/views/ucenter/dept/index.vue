<!--
 * @Author: yinzhegang
 * @Date: 2021-07-06 23:54:52
 * @LastEditTime: 2021-07-12 14:19:23
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\views\ucenter\dept\index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div>
    <el-button
      size="small"
      style="float: right; cursor: pointer"
      type="primary"
      icon="el-icon-plus"
      @click="showDialog('新增部门', '', '')"
      >新增部门</el-button
    >
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="部门名称" prop="department">
          <el-input
            v-model="ruleForm.department"
            placeholder="请输入部门名称"
            @focus="showCheckDialog"
          ></el-input>
        </el-form-item>
        <el-form-item label="上级部门" prop="ParentName">
          <el-input
            v-model="ruleForm.ParentName"
            placeholder="请选择上级部门"
            @focus="showCheckDialog"
          ></el-input>
        </el-form-item>
        <el-button type="primary" @click="dialogVisible = false"
          >保存</el-button
        >
        <el-button @click="dialogVisible = false">取 消</el-button>
      </el-form>
    </el-dialog>
    <el-dialog title="选择部门" :visible.sync="checkDialogVisible" width="50%">
      <div
        :style="{
          display: 'flex'
        }"
      >
        <dept-block title="选择">
          <el-input
            placeholder="搜索"
            v-model="searchValue"
            suffix-icon="el-icon-search"
          >
          </el-input>
          <div>
            <div
              v-for="item in departmentList"
              :key="item.id"
              :style="{display: 'flex', justifyContent: 'space-between'}"
              @click="checkedDepartmentList.push(item)"
            >
              <div>
                <i class="el-icon-star-off"></i>
                {{ item.name }}
              </div>
              <div>
                <i class="el-icon-star-off"></i>
                下级
              </div>
            </div>
          </div>
        </dept-block>
        <dept-block title="已选">
          <div>
            <div
              v-for="(item, index) in checkedDepartmentList"
              :key="item.id"
              :style="{display: 'flex', justifyContent: 'space-between'}"
            >
              {{ item.name }}
              <i
                class="el-icon-circle-close"
                @click="checkedDepartmentList.splice(index, 1)"
              ></i>
            </div>
          </div>
        </dept-block>
      </div>
      <div :style="{textAlign: 'center', paddingTop: '30px'}">
        <el-button type="primary" @click="checkDialogVisible = false"
          >确定</el-button
        >
        <el-button @click="checkDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <br />
    <br />
    <el-table
      border
      stripe
      size="small"
      :header-cell-style="{
        background: '#f7f8f9',
        color: '#333',
        borderBottom: '1px solid #d7dbe6'
      }"
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      @row-click="rowClick"
    >
      <el-table-column prop="name" label="部门名称" sortable width="280">
      </el-table-column>
      <el-table-column prop="name" label="人员数"> </el-table-column>
      <el-table-column width="120" align="center" label="排序">
        <template>
          <el-button-group>
            <el-button size="mini" icon="el-icon-arrow-up"></el-button>
            <el-button size="mini" icon="el-icon-arrow-down"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="操作">
        <template>
          <i class="el-icon-edit" style="cursor: pointer"></i>
          <el-divider direction="vertical"></el-divider>
          <i class="el-icon-delete" style="cursor: pointer"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import DeptBlock from '@/components/DeptBlock/index.vue'

@Component({
  name: 'dept',
  components: {
    DeptBlock
  }
})
export default class extends Vue {
  tableData = [
    {
      id: 1,
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    },
    {
      id: 2,
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    },
    {
      id: 3,
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄',
      children: [
        {
          id: 31,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          id: 32,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }
      ]
    },
    {
      id: 4,
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    }
  ];

  // 新增、编辑部门
  dialogVisible = false;
  dialogTitle = '';
  ruleForm = {
    department: '',
    ParentName: ''
  };

  showDialog(title: string, department: string, ParentName: string) {
    this.dialogTitle = title
    this.ruleForm.department = department
    this.ruleForm.ParentName = ParentName
    this.dialogVisible = true
  }

  rowClick({ name }: { name: string }, column: any, event: any) {
    if (event.target.className === 'el-icon-edit') {
      this.showDialog('编辑部门', name, name)
    }
  }

  // 选择部门
  checkDialogVisible = false;
  searchValue = '';
  departmentList = [
    {
      id: 1,
      name: '王小虎1'
    },
    {
      id: 2,
      name: '王小虎2'
    },
    {
      id: 3,
      name: '王小虎3'
    },
    {
      id: 4,
      name: '王小虎4'
    },
    {
      id: 5,
      name: '王小虎5'
    },
    {
      id: 6,
      name: '王小虎6'
    }
  ];

  checkedDepartmentList = [];
  showCheckDialog() {
    this.checkDialogVisible = true
  }
}
</script>

<style scoped>
.el-dialog__body {
  padding-top: 0;
}
</style>
