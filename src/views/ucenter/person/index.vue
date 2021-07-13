<!--
 * @Author: yinzhegang
 * @Date: 2021-07-06 23:54:52
 * @LastEditTime: 2021-07-13 17:43:03
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\views\ucenter\person\index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="cont-main">
    <choose-member title="选择部门" :visible.sync="detpVisible"></choose-member>
    <!-- 添加用户信息 -->
    <el-dialog title="新增人员" :visible.sync="outerVisible">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <el-form
            size="small"
            label-width="80px"
            ref="form"
            :model="baseModel"
            style="width:50%;margin:0 auto"
          >
            <el-form-item label="头像" prop="avatar">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="姓名" prop="username">
              <el-input
               style="width:200px"
                placeholder="请填写姓名"
                v-model="baseModel.username"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="baseModel.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="身份证号" prop="idCard">
              <el-input
               style="width:200px"
                placeholder="请填写身份证号"
                v-model="baseModel.idCard"
              ></el-input>
            </el-form-item>
            <el-form-item label="工号" prop="num">
              <el-input
               style="width:200px"
                placeholder="请填写工号"
                v-model="baseModel.num"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input
               style="width:200px"
                placeholder="请填写邮箱"
                v-model="baseModel.email"
              ></el-input>
            </el-form-item>
            <el-form-item   label="扩展字段1" prop="ext1">
              <el-input
              style="width:200px"
                placeholder="扩展字段1"
                v-model="baseModel.ext1"
              ></el-input>
            </el-form-item>
            <el-form-item label="所属部门" prop="ext1">
              <div class="dept-choose-list">
                <el-tag
                  closable
                  size="small"
                  style="margin: 1px"
                  v-for="tag in 5"
                  >部门{{ i }}</el-tag
                >
                <el-button
                  @click="detpVisible = true"
                  style="height: 24px; margin: 1px; padding: 5px 15px"
                  icon="el-icon-plus"
                  size="mini"
                ></el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="关联用户" name="second">
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
            <el-table-column prop="activName" label="所属部门" />
            <el-table-column prop="orgaName" label="所属用户组" />
            <el-table-column prop="startTime" label="角色" />
            <el-table-column prop="startTime" label="创建者" />
            <el-table-column prop="startTime" label="创建时间" />
            <el-table-column
              width="150"
              align="center"
              prop="activStatus"
              label="操作"
            >
              <template>
                 <i class="el-icon-setting func-opr" style="cursor: pointer"></i>
                    <el-divider direction="vertical"></el-divider>
                    <i class="el-icon-edit func-opr" style="cursor: pointer"></i>
                    <el-divider direction="vertical"></el-divider>
                    <i class="el-icon-delete func-opr" style="cursor: pointer"></i>
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
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" style="text-align:center" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="outerVisible = true">保存</el-button>
      </div>
    </el-dialog>

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
        style="float: right; overflow: hidden; margin-left: 10px"
        placement="bottom"
        title="列表字段展示设置"
        width="200"
        trigger="click"
      >
        <el-checkbox-group v-model="params.type">
          <el-checkbox label="姓名" name="type"></el-checkbox>
          <el-checkbox label="手机号" name="type"></el-checkbox>
          <el-checkbox label="工号" name="type"></el-checkbox>
          <el-checkbox label="所属部门" name="type"></el-checkbox>
        </el-checkbox-group>
        <el-button type="text" slot="reference"
          ><i class="el-icon-more"></i
        ></el-button>
      </el-popover>
      <el-button-group style="float: right; overflow: hidden">
        <el-button-func
          size="small"
          icon="el-icon-plus"
          @click="outerVisible = true"
          >新增人员</el-button-func
        >

        <el-button-func size="small" icon="el-icon-edit">编辑</el-button-func>
        <el-button-func size="small" icon="el-icon-delete">删除</el-button-func>
        <el-button-func size="small" icon="el-icon-upload2"
          >批量导入</el-button-func
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
  name: 'person',
  components: {
    ChooseMember: () => import('@/components/ChooseItems')
  }
})
export default class extends Vue {
  baseModel = {};

  detpVisible = false;
  activeName = 'first';
  input = '';
  list = [{}];
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

  outerVisible = false;
  innerVisible = false;
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.dept-choose-list {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  border: 1px solid #ebeef5;
  padding: 2px;
  border-radius: 3px;
}
</style>
