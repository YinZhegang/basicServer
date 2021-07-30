<!--
 * @Author: yinzhegang
 * @Date: 2021-07-06 23:54:52
 * @LastEditTime: 2021-07-29 17:17:05
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\views\ucenter\group\index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
   <div class="cont-right">
     <el-dialog :before-close="(d) => {
 $refs.groupDataFormRef.clearValidate();d()
}" :title="groupData.detail.isEdit?'编辑用户组':'新增用户组'" :visible.sync="groupData.detail.visible">
        <el-form ref="groupDataFormRef" style="width:50%;margin: 0 auto" size="small" label-width="100px" :rules="groupData.detail.rules" :model="groupData.detail.form">
          <el-form-item prop="groupName" label="用户组名称">
              <el-input
                type="text"
                placeholder="请输入组名"
                v-model="groupData.detail.form.groupName"
                maxlength="50"
                show-word-limit
                />
          </el-form-item>
          <el-form-item prop="type" label="用户组类型">
              <el-select v-model="groupData.detail.form.type">
                 <el-option label="固定用户组" :value="1"></el-option>
                 <el-option label="动态用户组" :value="2"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item prop="type">
              <el-button @click="addData('groupDataFormRef')" type="primary">提 交</el-button>
               <el-button @click="groupData.detail.visible = false">取消 </el-button>
          </el-form-item>
        </el-form>

     </el-dialog>

      <el-form
        style="float: left; overflow: hidden"
        size="small"
        :inline="true"
        :model="groupData.params"
        ref="pub"
      >
        <el-form-item>
          <el-select style="width:120px" v-model="groupData.params.type" placeholder="请选择">
            <el-option label="固定用户组" :value="1"></el-option>
            <el-option label="动态用户组" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
           <el-date-picker
                v-model="groupData.params.time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="groupData.params[groupData.params.ctype]" placeholder="输入关键词">
            <el-select
              style="width: 100px"
              v-model="groupData.params.ctype"
              slot="prepend"
              placeholder="请选择"
              @change="(val) => {
                groupData.params.groupName = ''
                groupData.params.creatorName = ''
              }"
            >
              <el-option label="用户组" value="groupName"></el-option>
              <el-option label="创建者" value="creatorName"></el-option>
            </el-select>
            <el-button @click="getList" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-form-item>
      </el-form>

      <el-button-group style="float: right; overflow: hidden">
        <el-button-func size="small" icon="el-icon-plus"
        @click="() => {
          groupData.detail.visible = true
          groupData.detail.isEdit = false
          groupData.detail.form = {}
        }"
          >新增用户组</el-button-func
        >
        <!-- <el-button-func size="small" icon="el-icon-delete"
          >删除</el-button-func
        > -->
      </el-button-group>

      <!-- 数据列表 -->
      <el-table
        v-loading="groupData.loading"
        border
         stripe
        size="small"
        :header-cell-style="{
          background: '#f7f8f9',
          color: '#333',
          borderBottom: '1px solid #d7dbe6'
        }"
        :data="groupData.list"
      >
        <el-table-column prop="groupName" label="用户组名称" />
        <el-table-column prop="type" label="类型" >
          <template slot-scope="scope">
              {{scope.row.type===1?'固定用户组':'动态用户'}}
          </template>
        </el-table-column>
        <el-table-column prop="count" label="用户/部门数" />
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
              {{scope.row.createTime}}
          </template>
        </el-table-column>
        <el-table-column width="100" align="center" label="操作">
        <template slot-scope="scope">
          <i @click="editDetail(scope.row)" class="el-icon-edit func-opr" style="cursor: pointer"></i>
          <el-divider direction="vertical"></el-divider>
          <i @click="groupDelete(scope.row)"  class="el-icon-delete func-opr" style="cursor: pointer"></i>
        </template>
      </el-table-column>
      </el-table>
      <br />
      <el-pagination
        style="float: right; overflow: hidden"
        :current-page="groupData.params.current"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="groupData.params.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="groupData.total"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ListData } from '../../../types/page'
import { GroupListParams, groupList, groupAdd, groupUpdate, groupDelete } from '@/api/group'

@Component({
  name: 'group'
})
export default class extends Vue {
  groupData:ListData<GroupListParams, any> = {
    getList: groupList,
    addData: groupAdd,
    updateData: groupUpdate,
    deleteData: groupDelete,
    list: [],
    params: {
      current: 1,
      size: 10,
      time: [],
      groupName: '',
      creatorName: '',
      ctype: 'groupName'

    },
    detail: {
      form: {},
      isEdit: false,
      visible: false,
      rules: {
        groupName: [
          { required: true, message: '请输入用户组名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        type: { required: true, message: '请选择类型', trigger: 'blur' }
      }
    },
    total: 0,
    loading: false
  }

  created() {
    this.getList()
  }

  groupDelete(row:any) {
    (this.groupData.deleteData as Function)({ ...row, tenantId: 183, creator: 1 }).then((res:any) => {
      this.$message({
        type: 'success',
        message: '删除成功'
      })
      this.getList()
    })
  }

  addData(ref:string) {
    (this.$refs[ref] as any).validate((valid:boolean) => {
      if (!valid) return
      const isEdit:boolean = this.groupData.detail.isEdit as boolean
      (this.groupData[isEdit ? 'updateData' : 'addData'] as Function)({ tenantId: 183, creator: 1, ...this.groupData.detail.form }).then((res:any) => {
        this.$message({
          message: isEdit ? '更新成功' : '添加成功',
          type: 'success'
        })
        this.getList()
      })
    })
  }

  currentChange(val:number) {
    this.groupData.params.current = val
    this.getList()
  }

  sizeChange(val:number) {
    this.groupData.params.size = val
    this.groupData.params.current = 1
    this.getList()
  }

  getList() {
    this.groupData.loading = true
    this.groupData.getList({ ...this.groupData.params, startTime: this.groupData.params.time[0], endTime: this.groupData.params.time[1] }).then((res:any) => {
      this.groupData.list = res.records
      this.groupData.total = res.total
      this.groupData.loading = false
    })
  }

  editDetail(row:any) {
    const data = JSON.parse(JSON.stringify(row))
    this.groupData.detail.form = data
    this.groupData.detail.isEdit = true
    this.groupData.detail.visible = true
  }
}
</script>

<style lang="scss">

</style>
