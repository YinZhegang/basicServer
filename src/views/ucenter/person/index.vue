<!--
 * @Author: yinzhegang
 * @Date: 2021-07-06 23:54:52
 * @LastEditTime: 2021-07-07 17:13:25
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\views\ucenter\person\index.vue
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
      <p>组织架构</p>
      <el-tree
        style="margin-top: 10px"
        :data="data"
        :props="defaultProps"
      ></el-tree>
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
              <el-option label="姓名" value="1"></el-option>
              <el-option label="手机号" value="2"></el-option>
              <el-option label="工号" value="3"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="params.select" placeholder="请选择">
            <el-option label="全部标签" value="1"></el-option>
            <el-option label="辅警" value="2"></el-option>
            <el-option label="东城" value="3"></el-option>
            <el-option label="西城" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-popover
        style="float: right; overflow: hidden;margin-left:10px"
        placement="bottom"
        title="列表字段展示设置"
        width="200"
        trigger="click"
      >
        <el-checkbox-group v-model="params.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
        <el-button type="text" slot="reference"><i class="el-icon-more"></i></el-button>
      </el-popover>
      <el-button-group style="float: right; overflow: hidden">
        <el-button size="small" type="primary" icon="el-icon-plus"
          >新增人员</el-button
        >
        <el-button size="small" type="primary" icon="el-icon-edit"
          >编辑</el-button
        >
        <el-button size="small" type="primary" icon="el-icon-delete"
          >删除</el-button
        >
        <el-button size="small" type="primary" icon="el-icon-upload2"
          >批量导入</el-button
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
        <el-table-column prop="activName" label="姓名" />
        <el-table-column prop="orgaName" label="手机号" />
        <el-table-column prop="startTime" label="工号" />
        <el-table-column prop="endTime" label="所属部门" />
        <el-table-column prop="activStatus" label="邮箱"> </el-table-column>
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
  name: 'person'
})
export default class extends Vue {
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
</style>
