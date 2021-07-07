<!--
 * @Author: yinzhegang
 * @Date: 2021-07-06 23:54:52
 * @LastEditTime: 2021-07-07 17:13:16
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\views\ucenter\group\index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
   <div class="cont-right">
      <el-form
        style="float: left; overflow: hidden"
        size="small"
        :inline="true"
        :model="params"
        ref="pub"
      >
        <el-form-item>
          <el-input v-model="params.name" placeholder="输入关键词">
            <el-select
              style="width: 100px"
              v-model="params.name1"
              slot="prepend"
              placeholder="请选择"
            >
              <el-option label="用户名" value="1"></el-option>
              <el-option label="姓名" value="2"></el-option>
              <el-option label="手机号" value="3"></el-option>
              <el-option label="创建者" value="4"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-select style="width:100px" v-model="params.select" placeholder="请选择">
            <el-option label="全部类型" value="1"></el-option>
            <el-option label="辅警" value="2"></el-option>
            <el-option label="东城" value="3"></el-option>
            <el-option label="西城" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
           <el-date-picker
                v-model="params.value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
      </el-form>

      <el-button-group style="float: right; overflow: hidden">
        <el-button size="small" type="primary" icon="el-icon-plus"
          >新增用户组</el-button
        >
        <el-button size="small" type="primary" icon="el-icon-edit"
          >编辑</el-button
        >
        <el-button size="small" type="primary" icon="el-icon-delete"
          >删除</el-button
        >
      </el-button-group>

      <!-- 数据列表 -->
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
        <el-table-column prop="activName" label="用户组名称" />
        <el-table-column prop="orgaName" label="类型" />
        <el-table-column prop="startTime" label="用户/部门数" />
        <el-table-column prop="activStatus" label="创建时间"> </el-table-column>
      </el-table>
      <el-pagination
        style="float: right; overflow: hidden"
        :current-page="params.current"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="params.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'group'
})
export default class extends Vue {
     activeName = 'first'
  input = '';
  list = [];
  loading = false;
  params = {
    current: 0,
    size: 10,
    type: []
  };

  total = 10;

  data: any = [
    {
      label: '部门1',
      children: [
        {
          label: '二级 1-1',
          children: [
            {
              label: '三级 1-1-1'
            }
          ]
        }
      ]
    },
    {
      label: '部门2',
      children: [
        {
          label: '二级 2-1',
          children: [
            {
              label: '三级 2-1-1'
            }
          ]
        },
        {
          label: '二级 2-2',
          children: [
            {
              label: '三级 2-2-1'
            }
          ]
        }
      ]
    },
    {
      label: '一级 3',
      children: [
        {
          label: '二级 3-1',
          children: [
            {
              label: '三级 3-1-1'
            }
          ]
        },
        {
          label: '二级 3-2',
          children: [
            {
              label: '三级 3-2-1'
            }
          ]
        }
      ]
    }
  ];

  defaultProps: any = {
    children: 'children',
    label: 'label'
  };
}
</script>

<style lang="scss">

</style>
