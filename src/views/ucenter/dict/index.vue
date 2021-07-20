<!--
 * @Author: yinzhegang
 * @Date: 2021-07-06 23:54:52
 * @LastEditTime: 2021-07-20 10:31:18
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\views\ucenter\dict\index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div>
    <el-dialog :visible.sync="userData.detail.visible" :title="userData.detail.isEdit?'编辑字段':'添加字段'">
      <el-form ref="userAddForm" size="small" :model="userData.detail.form" label-width="100px">
          <el-form-item prop="attrName" label="字段名称">
              <el-input
                type="text"
                placeholder="请输入字段名称"
                v-model="userData.detail.form.attrName"
                maxlength="10"
                show-word-limit
                />
          </el-form-item>
           <el-form-item prop="attrType" label="字段类型类型">
              <el-select :disabled="userData.detail.isEdit" v-model="userData.detail.form.attrType" placeholder="请选择活动区域">
                  <el-option :key="'userData.detail.form.attrType'+ i" v-for="(i,index) in AttrTypeArr" :label="i" :value="index"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item prop="expandValueList" label="字段类型类型">
              <el-tag
                :key="tag + index"
                v-for="(tag,index) in userData.detail.form.expandValueList"
                closable
                style="margin:1px"
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input
                  class="input-new-tag"
                  v-if="expandValueList.inputVisible"
                  v-model="expandValueList.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                />
               <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button> 
          </el-form-item>
          <el-form-item prop="isNull" label="是否必填">
              <el-switch :inactive-value="0" :active-value="1" v-model="userData.detail.form.isNull"></el-switch>
          </el-form-item>
          <el-form-item prop="isListShow" label="是否必填">
              <el-switch :inactive-value="1" :active-value="0" v-model="userData.detail.form.isListShow"></el-switch>
          </el-form-item>
          <el-form-item>
              <el-button @click="attrAddMethod('userAddForm')" type="primary">确定</el-button>
              <el-button>取消</el-button>
          </el-form-item>
      </el-form>
    </el-dialog>
    <el-button-func @click="userData.detail.visible = true" size="small" style="float: right" icon="el-icon-plus"
      >新增字段</el-button-func>
    <br />
    <br />
    <el-tabs v-model="activeName">
      <el-tab-pane label="用户字段" name="user">
        <el-table
          v-loading="userData.loading"
          border=""
          :header-cell-style="{
            background: '#f7f8f9',
            color: '#333',
            borderBottom: '1px solid #d7dbe6'
          }"
          :data="userData.list"
        >
          <el-table-column width="55" prop="attrOrder" label="序号" />
          <el-table-column prop="attrName" label="字段名称" />
          <el-table-column prop="attrType" label="类型" >
            <template slot-scope="scope">
                {{AttrTypeArr[scope.row.attrType]}}
            </template>
          </el-table-column>
          <el-table-column prop="isNull" label="必填" >
          <template slot-scope="scope">
                {{scope.row.isNull?'必填':'非必填'}}
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            align="center"
            label="排序"
          >
            <template>
              <el-button-group>
                <el-button size="mini" icon="el-icon-arrow-up"></el-button>
                <el-button size="mini" icon="el-icon-arrow-down"></el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            align="center"
            label="操作"
          >
            <template>
              <i class="el-icon-edit"></i>
              <el-divider direction="vertical"></el-divider>
              <i class="el-icon-delete"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="部门字段" name="dept">
          <el-table
          v-loading="deptData.loading"
          border
          :header-cell-style="{
            background: '#f7f8f9',
            color: '#333',
            borderBottom: '1px solid #d7dbe6'
          }"
          :data="deptData.list"
        >
          <el-table-column width="55" prop="attrOrder" label="序号" />
          <el-table-column prop="attrName" label="字段名称" />
          <el-table-column prop="attrType" label="类型" >
            <template slot-scope="scope">
                {{AttrTypeArr[scope.row.attrType]}}
            </template>
          </el-table-column>
          <el-table-column prop="isNull" label="必填" >
          <template slot-scope="scope">
                {{scope.row.isNull?'必填':'非必填'}}
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            align="center"
            label="排序"
          >
            <template>
              <el-button-group>
                <el-button size="mini" icon="el-icon-arrow-up"></el-button>
                <el-button size="mini" icon="el-icon-arrow-down"></el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            align="center"
            label="操作"
          >
            <template>
              <i class="el-icon-edit"></i>
              <el-divider direction="vertical"></el-divider>
              <i class="el-icon-delete"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { attrList, AttrListParams, attrAdd, AttrAddParams } from '@/api/dict'
import { ListData } from '../../../types/page'

@Component({
  name: 'dict'
})
export default class extends Vue {
  activeName: 'user' | 'dept' = 'user';
  userData: ListData<AttrListParams, any> = {
    type:'user',
    getList: attrList,
    addData:attrAdd,
    params: {
      current: 1,
      size: 10,
      form: 1,
      tenantId: 1
    },
    detail:{
      form:{expandValueList:[]},
      isEdit:false,
      rules:{},
      visible:false
    },
    list: [],
    total: 0,
    loading: false
  };

  deptData: ListData<AttrListParams, any> = {
    type:'dept',
    getList: attrList,
    addData:attrAdd,
    params: {
      current: 1,
      size: 10,
      form: 2,
      tenantId: 1
    },
    list: [],
    total: 0,
    loading: false
  };
  AttrTypeArr:Array<string> = [
    '默认属性','单行文本', '多行文本','手机号','邮箱','超链接','数字','日期','时间','下拉选择','多项选择','开关'
  ]
  expandValueList = {
    inputVisible: false,
    inputValue:'',
   
  }
  attrAddMethod(ref:string){
    (<any>this.$refs[ref]).validate((valid:boolean) =>{
       if(!valid) return
       console.log((<any>this.userData.detail).form)
    })
  }
  showInput(){
    this.expandValueList.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
  }
   handleInputConfirm(){
        let inputValue = this.expandValueList.inputValue;
        if (inputValue) {
          this.userData.detail.form.expandValueList.push(inputValue);
        }
        this.expandValueList.inputVisible = false;
        this.expandValueList.inputValue = '';
    }
  created() {
    attrList(<AttrListParams>this.userData.params).then((res:any)=>{
      this.userData.list = res.records
    })
     attrList(<AttrListParams>this.deptData.params).then((res:any)=>{
      this.deptData.list = res.records
    })
  }
  addData(params: AttrAddParams){
    
  }
}
</script>

<style>
el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 2px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
