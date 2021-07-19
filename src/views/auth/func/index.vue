<!--
 * @Author: yinzhegang
 * @Date: 2021-07-06 23:54:52
 * @LastEditTime: 2021-07-14 16:20:30
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\views\auth\func\index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="cont-main">

    <div class="cont-left">
      <el-input
        size="mini"
        v-model="input"
        placeholder="请输入关键词"
      ></el-input>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户" name="first">
          <el-tree
            style="margin-top: 10px"
            :data="data"
            :props="defaultProps"
          ></el-tree
        ></el-tab-pane>
        <el-tab-pane label="用户组" name="second">
          <el-tree
            style="margin-top: 10px"
            :data="data"
            :props="defaultProps"
          ></el-tree
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="cont-right">
      <el-form
        style="float: left; overflow: hidden"
        size="small"
        :inline="true"
        :model="params"
        ref="pub"
      >
        <el-form-item>
          <el-input v-model="params.name" placeholder="输入角色名称">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-date-picker
            v-model="params.value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>

      <el-button-group>
        <el-button-func  size="small"  icon="el-icon-plus"
          >新增人角色</el-button-func
        >
        <el-button-func  size="small"  icon="el-icon-edit"
          >编辑</el-button-func
        >
         </el-button-group>
         <el-divider direction="vertical"></el-divider>
        <el-button-func  size="small" icon="el-icon-delete"
          >删除</el-button-func
        >

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
        <el-table-column prop="activName" label="角色名称" />
        <el-table-column prop="orgaName" label="角色描述" />
        <el-table-column prop="startTime" label="用户数" />
        <el-table-column prop="activStatus" label="创建者"> </el-table-column>
        <el-table-column prop="activStatus" label="创建时间"> </el-table-column>
         <el-table-column
              width="150"
              align="center"
              prop="activStatus"
              label="操作"
            >
              <template>
                    <i class="el-icon-edit func-opr" style="cursor: pointer"></i>
              </template>
            </el-table-column>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'func',
  components: {
    chooseDept: () => import('@/components/ChooseItems/content.vue')
  }
})
export default class extends Vue {
    steps =1
  activeName = 'first';
  input = '';
  list = [{ activName: 11 }, { activName: 11 }, { activName: 11 }];
  loading = false;
  params = {
    current: 0,
    size: 10,
    type: []
  };

  addUserFrom = {};

  addUserFromRules = {};

  addUser = {
    visible: true
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

<style lang="scss" scoped>
.cont-main {
  height: calc(100vh - 110px);
  .cont-left {
    width: 280px;
    float: left;
    border-right: 1px solid #eaeefb;
    height: 100%;
    padding-right: 20px;
  }
  .cont-right {
    margin-left: 300px;
  }
}
.el-steps--simple {
  background: #fff;
}

</style>
