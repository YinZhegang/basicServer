<!--
 * @Author: yinzhegang
 * @Date: 2021-07-06 23:54:52
 * @LastEditTime: 2021-07-07 17:11:25
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\views\ucenter\user\index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="cont-main">
    <el-dialog title="新增用户" :visible.sync="addUser.visible" width="50%">
      <el-steps :active="1" simple direction="horizontal">
        <el-step title="填写基本信息" icon="el-icon-edit"></el-step>
        <el-step title="选择所属部门" icon="el-icon-s-home"></el-step>
        <el-step title="选择所属用户组" icon="el-icon-s-custom"></el-step>
      </el-steps>
      <br />
      <br />
      <el-form
        style="width: 50%; margin: 0 auto"
        :rules="addUserFromRules"
        size="small"
        label-width="80px"
        :model="addUserFrom"
      >
        <el-form-item label="关联人员">
          <el-input v-model="addUserFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="addUserFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="addUserFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="角色">
            <el-tag size="small" style="margin:0 2px 2px 0" closable :key="i" v-for="i in 12">用户{{i}}</el-tag>
            <el-button  style="padding:5px 10px" icon="el-icon-plus" size="mini"></el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUser.visible = false">取 消</el-button>
        <el-button type="primary" @click="addUser.visible = false"
          >下一步</el-button
        >
      </span>
    </el-dialog>
    <div class="cont-left">
      <el-input
        size="mini"
        v-model="input"
        placeholder="请输入关键词"
      ></el-input>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="组织架构" name="first">
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
        <el-tab-pane label="角色" name="third">
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
          <el-select
            style="width: 100px"
            v-model="params.select"
            placeholder="请选择"
          >
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
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-popover
        style="float: right; overflow: hidden; margin-left: 10px"
        placement="bottom"
        title="列表字段展示设置"
        width="200"
        trigger="click"
      >
        <el-checkbox-group v-model="params.type">
          <el-checkbox label="用户名" name="type"></el-checkbox>
          <el-checkbox label="姓名" name="type"></el-checkbox>
          <el-checkbox label="手机号" name="type"></el-checkbox>
          <el-checkbox label="用户类型" name="type"></el-checkbox>
          <el-checkbox label="所属部门" name="type"></el-checkbox>
          <el-checkbox label="所属用户组" name="type"></el-checkbox>
          <el-checkbox label="角色" name="type"></el-checkbox>
          <el-checkbox label="创建者" name="type"></el-checkbox>
          <el-checkbox label="创建时间" name="type"></el-checkbox>
        </el-checkbox-group>
        <el-button type="text" slot="reference">
          <i class="el-icon-more"></i
        ></el-button>
      </el-popover>
      <el-button-group>
        <el-button  size="small" type="primary" icon="el-icon-plus"
          >新增人员</el-button
        >
        <el-button  size="small" type="primary" icon="el-icon-edit"
          >编辑</el-button
        >
         </el-button-group>
         <el-divider direction="vertical"></el-divider>
        <el-button  size="small" type="primary" icon="el-icon-delete"
          >删除</el-button
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
        <el-table-column prop="activName" label="用户名" />
        <el-table-column prop="orgaName" label="姓名" />
        <el-table-column prop="startTime" label="用户类型" />
        <el-table-column prop="endTime" label="角色" />
        <el-table-column prop="activStatus" label="创建者"> </el-table-column>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'user'
})
export default class extends Vue {
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
