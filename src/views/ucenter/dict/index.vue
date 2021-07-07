<!--
 * @Author: yinzhegang
 * @Date: 2021-07-06 23:54:52
 * @LastEditTime: 2021-07-07 14:43:01
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\views\ucenter\dict\index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
    <div>
         <el-button size="small" style="float:right" type="primary" icon="el-icon-plus"
          >新增字段</el-button
        >
        <br>
         <br>
       <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户字段" name="first">
        <el-table
        v-loading="loading"
        border
        :header-cell-style="{
          background: '#f7f8f9',
          color: '#333',
          borderBottom: '1px solid #d7dbe6'
        }"
        :data="list"
      >
       <el-table-column width="55" prop="activName" label="序号" />
        <el-table-column prop="activName" label="字段名称" />
        <el-table-column prop="orgaName" label="类型" />
        <el-table-column prop="startTime" label="必填" />
        <el-table-column width="150" align="center" prop="activStatus" label="排序">

                  <template>
          <el-button-group>
  <el-button size="mini" icon="el-icon-arrow-up"></el-button>
  <el-button size="mini" icon="el-icon-arrow-down"></el-button>
</el-button-group>
      </template>
        </el-table-column>
        <el-table-column width="150" align="center" prop="activStatus" label="操作">

      <template>
<i class="el-icon-edit"></i>
             <el-divider direction="vertical"></el-divider>
            <i class="el-icon-delete"></i>
      </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="部门字段" name="second">
             <el-table
        v-loading="loading"
        border
         stripe
        size="small"
        :header-cell-style="{
          background: '#f7f8f9',
          color: '#333',
          borderBottom: '1px solid #d7dbe6'
        }"
        :data="list"
      >
       <el-table-column width="55" prop="activName" label="序号" />
        <el-table-column prop="activName" label="字段名称" />
        <el-table-column prop="orgaName" label="类型" />
        <el-table-column prop="startTime" label="必填" />
        <el-table-column width="150" align="center" prop="activStatus" label="排序">

                  <template>
          <el-button-group>
  <el-button size="mini" icon="el-icon-arrow-up"></el-button>
  <el-button size="mini" icon="el-icon-arrow-down"></el-button>
</el-button-group>
      </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'dict'
})
export default class extends Vue {
  activeName ='first'
  list = [{}];
}
</script>

<style>

</style>
