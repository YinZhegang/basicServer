<!--
 * @Author: yinzhegang
 * @Date: 2021-07-06 23:54:52
 * @LastEditTime: 2021-07-28 10:08:01
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\views\auth\role\index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="cont-main">
      <el-dialog :before-close="(d) => {
        $refs.roleDataDetailRef.clearValidate()
        d()
}" :title="roleData.detail.isEdit?'编辑角色':'添加角色'" :visible.sync="roleData.detail.visible">
        <el-form size="small" ref="roleDataDetailRef" style="width:50%;margin:0 auto" :rules="roleData.detail.rules" label-width="80px" :model="roleData.detail.form">
            <el-form-item prop="roleName" label="角色名称">
                <el-input
                  type="text"
                  placeholder="请输入角色名称"
                  v-model="roleData.detail.form.roleName"
                  maxlength="50"
                  show-word-limit
                />
            </el-form-item>
            <el-form-item prop="roleDesc" label="角色描述">
                <el-input
                  type="textarea"
                  placeholder="请输入角色描述"
                  v-model="roleData.detail.form.roleDesc"
                  maxlength="100"
                  show-word-limit
                />
            </el-form-item>
            <el-form-item>
                <el-button @click="addRoleDataMethod('roleDataDetailRef')" type="primary">提交</el-button>
                <el-button @click="() => {
 $refs.roleDataDetailRef.clearValidate();roleData.detail.visible = false
}">取消</el-button>
            </el-form-item>
        </el-form>
      </el-dialog>
      <el-form
        style="float: left; overflow: hidden"
        size="small"
        :inline="true"
        :model="roleData.params"
        ref="pub"
      >
        <el-form-item>
          <el-date-picker
            v-model="roleData.params.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
         <el-form-item>
          <el-input v-model="roleData.params.roleName" placeholder="输入角色名称">
            <el-button @click="getList" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-form-item>
      </el-form>

      <el-button-group>
        <el-button-func  size="small" @click="() => {
          roleData.detail.form ={}
          roleData.detail.isEdit = false
          roleData.detail.visible = true
          }" icon="el-icon-plus"
          >新增人角色</el-button-func
        >
         </el-button-group>
         <el-divider direction="vertical"></el-divider>
        <el-button-func @click="delRoleDatas(roleData.selections)" size="small" icon="el-icon-delete"
          >删除</el-button-func
        >
      <!-- 数据列表 -->
      <el-table
        v-loading="roleData.loading"
        border
        stripe
        size="small"
        :header-cell-style="{
          background: '#f7f8f9',
          color: '#333',
          borderBottom: '1px solid #d7dbe6'
        }"
        :data="roleData.list"
         @selection-change="(val) => {
 roleData.selections =val
}"
      >
       <el-table-column
      type="selection"
      align="center"
      width="55" />
        <el-table-column align="center" prop="roleName" label="角色名称" />
        <el-table-column align="center" prop="roleDesc" label="角色描述" />
        <el-table-column align="center" prop="userCount" label="用户数" />
        <el-table-column align="center" prop="creatorName" label="创建者"> </el-table-column>
        <el-table-column align="center" prop="createdTime" label="创建时间"> </el-table-column>
        <el-table-column
              width="150"
              align="center"
              prop="activStatus"
              label="操作"
            >
              <template slot-scope="scope">
                    <i @click="editRoleData(scope.row)" class="el-icon-edit func-opr" style="cursor: pointer"></i>
                    <el-divider direction="vertical"></el-divider>
                    <i @click="delRoleDatas([scope.row])" class="el-icon-delete func-opr" style="cursor: pointer"></i>
              </template>
            </el-table-column>
      </el-table>
      <el-pagination
        style="float: right; overflow: hidden"
        :current-page="roleData.params.current"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="roleData.params.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="roleData.total"
        @size-change="sizeChange"
        @current-change="currentChange"
      />

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { roleList, RoleListParams, roleAdd, roleUpdate, roleDeletebatch } from '@/api/role'
import { ListData } from '../../../types/page'

@Component({
  name: 'role',
  components: {
    chooseDept: () => import('@/components/ChooseItems/content.vue')
  }
})
export default class extends Vue {
  roleData:ListData<RoleListParams, any> ={
    getList: roleList,
    addData: roleAdd,
    updateData: roleUpdate,
    params: {
      size: 10,
      current: 1,
      time: []
    },
    selections: [],
    detail: {
      visible: false,
      isEdit: false,
      form: {},
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 1, max: 200, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
      }
    },
    list: [],
    loading: false,
    total: 0
  }

  currentChange(val:number) {
    this.roleData.params.current = val
    this.getList()
  }

  sizeChange(val:number) {
    this.roleData.params.size = val
    this.roleData.params.current = 1
    this.getList()
  }

  created() {
    this.getList()
  }

  getList() {
    this.roleData.loading = true
    this.roleData.getList({ ...this.roleData.params, tenantId: 183, beginTime: this.roleData.params.time ? this.roleData.params.time[0] : '', endTime: this.roleData.params.time ? this.roleData.params.time[1] : '' }).then((res:any) => {
      this.roleData.list = res.records
      this.roleData.total = res.total
      this.roleData.loading = false
    })
  }

  addRoleDataMethod(ref:string):void {
    (this.$refs[ref] as any).validate((v:boolean) => {
      if (!v) return
      const isEdit:boolean = this.roleData.detail.isEdit as boolean
      (this.roleData[isEdit ? 'updateData' : 'addData'] as Function)({ ...this.roleData.detail.form, status: 1, tenantId: 183, creator: 1 }).then(() => {
        this.$message({
          type: 'success',
          message: isEdit ? '修改成功' : '添加成功'
        })
        this.getList()
        this.roleData.detail.visible = false
      })
    })
  }

  editRoleData(row:any) {
    const data = JSON.parse(JSON.stringify(row))
    this.roleData.detail.isEdit = true
    this.roleData.detail.form = data
    this.roleData.detail.visible = true
  }

  delRoleDatas(rows:any[]) {
    if (!rows.length) {
      this.$message({
        type: 'warning',
        message: '请选择角色'
      })
      return
    }
    roleDeletebatch({ roleIds: rows.map((i:any) => i.roleId) }).then(() => {
      this.$message({
        type: 'success',
        message: '删除成功'
      })
      this.getList()
    })
  }
}
</script>

<style lang="scss" scoped>
.cont-main {
  height: calc(100vh - 110px);
}
.el-steps--simple {
  background: #fff;
}

</style>
