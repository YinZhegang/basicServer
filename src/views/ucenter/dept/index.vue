<!--
 * @Author: yinzhegang
 * @Date: 2021-07-06 23:54:52
 * @LastEditTime: 2021-07-07 17:12:59
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\views\ucenter\dept\index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
    <div>
          <el-button size="small" style="float:right" type="primary" icon="el-icon-plus"
          >新增人员</el-button
        >
        <br>
         <br>
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
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"

    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="name"
      label="部门名称"
      sortable
      width="280">
    </el-table-column>
    <el-table-column
      prop="name"
      label="人员数">
    </el-table-column>
    <el-table-column
        width="120"
        align="center"
      label="排序">
      <template>
          <el-button-group>
  <el-button size="mini" icon="el-icon-arrow-up"></el-button>
  <el-button size="mini" icon="el-icon-arrow-down"></el-button>
</el-button-group>
      </template>
    </el-table-column>
     <el-table-column
    width="100"
    align="center"
      label="操作">

      <template>
<i class="el-icon-edit"></i>
             <el-divider direction="vertical"></el-divider>
            <i class="el-icon-delete"></i>
      </template>
    </el-table-column>
  </el-table>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'dept'
})
export default class extends Vue {
 tableData = [{
   id: 1,
   date: '2016-05-02',
   name: '王小虎',
   address: '上海市普陀区金沙江路 1518 弄'
 }, {
   id: 2,
   date: '2016-05-04',
   name: '王小虎',
   address: '上海市普陀区金沙江路 1517 弄'
 }, {
   id: 3,
   date: '2016-05-01',
   name: '王小虎',
   address: '上海市普陀区金沙江路 1519 弄',
   children: [{
     id: 31,
     date: '2016-05-01',
     name: '王小虎',
     address: '上海市普陀区金沙江路 1519 弄'
   }, {
     id: 32,
     date: '2016-05-01',
     name: '王小虎',
     address: '上海市普陀区金沙江路 1519 弄'
   }]
 }, {
   id: 4,
   date: '2016-05-03',
   name: '王小虎',
   address: '上海市普陀区金沙江路 1516 弄'
 }]
}
</script>

<style>

</style>
