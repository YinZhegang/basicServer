<!--
 * @Author: yinzhegang
 * @Date: 2021-07-06 23:54:52
 * @LastEditTime: 2021-07-20 13:26:39
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\views\ucenter\dict\index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div>
    <el-dialog :visible.sync="userData.detail.visible" :title="(userData.detail.isEdit?'编辑':'添加')+(userData.detail.form.form==1?'用户字段':'部门字段')">
      <el-form ref="userAddForm" size="small" :rules="userData.detail.rules" :model="userData.detail.form" label-width="100px">
          <el-form-item prop="attrName" label="字段名称">
              <el-input
                type="text"
                placeholder="请输入字段名称"
                v-model="userData.detail.form.attrName"
                maxlength="10"
                style="width:200px"
                show-word-limit
                />
          </el-form-item>
           <el-form-item prop="attrType" label="字段类型">
              <el-select :disabled="userData.detail.isEdit" v-model="userData.detail.form.attrType" placeholder="请选择活动区域">
                  <el-option :key="'userData.detail.form.attrType'+ i" v-for="(i,index) in AttrTypeArr" :label="i" :value="index"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item  v-if="userData.detail.form.attrType==9||userData.detail.form.attrType==10" prop="expandValueList" label="选项">
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
          <el-form-item prop="isNull" label="必填">
              <el-switch :inactive-value="0" :active-value="1" v-model="userData.detail.form.isNull"></el-switch>
          </el-form-item>
          <el-form-item prop="isListShow" label="展示在列表">
              <el-switch :inactive-value="1" :active-value="0" v-model="userData.detail.form.isListShow"></el-switch>
          </el-form-item>
          <el-form-item>
              <el-button @click="attrAddMethod(1,'userAddForm')" type="primary">确定</el-button>
              <el-button @click="userData.detail.visible = false">取消</el-button>
          </el-form-item>
      </el-form>
    </el-dialog>
    <el-tabs v-model="activeName">
       
      <el-tab-pane label="用户字段" name="user">
        <el-button-func @click="()=>{userData.detail.isEdit = false;userData.detail.form.form = 1;userData.detail.visible = true}" size="small" style="float: right" icon="el-icon-plus"
        >新增用户字段</el-button-func>
        <br/>
        <br/>
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
            <template slot-scope="scope">
              <i @click="editDetail(1, scope.row)"  class="el-icon-edit func-opr"></i>
              <el-divider direction="vertical"></el-divider>
              <i class="el-icon-delete func-opr"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="部门字段" name="dept">
         <el-button-func @click="()=>{userData.detail.isEdit = false;userData.detail.form.form = 2;userData.detail.visible = true}" size="small" style="float: right" icon="el-icon-plus"
        >新增部门字段</el-button-func>
        <br/>
        <br/>
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
            <template slot-scope="scope">
              <i @click="editDetail(2, scope.row)" class="el-icon-edit func-opr"></i>
              <el-divider direction="vertical"></el-divider>
              <i class="el-icon-delete func-opr"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { attrList, AttrListParams, attrAdd, AttrAddParams,attrVerify } from '@/api/dict'
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
      size: 100,
      form: 1,
      tenantId: 1
    },
    detail:{
      form:{tenantId:1,form:1,creator:973,expandValueList:[]},
      isEdit:false,
      rules:{
        attrName:[
          { required: true, message: '请输入字段名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        attrType:  { required: true, message: '请输入字段名称', trigger: 'blur' },
        expandValueList: { required: true, message: '请填写选项', trigger: 'blur' }
      },
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
      size: 100,
      form: 2,
      tenantId: 1
    },
    detail:{
      form:{tenantId:1,form:1,expandValueList:[]},
      isEdit:false,
      rules:{
        
      },
      visible:false
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
  editDetail(form:number,row:any){
    const data = JSON.parse(JSON.stringify(row))
     this.userData.detail.form = data
     this.userData.detail.form.form = form
     this.userData.detail.form.expandValueList = data.attrDictListVOList.map(i=>i.attrValue)
     this.userData.detail.visible = true
  }
  async attrAddMethod(form:1|2,ref:string){
    (<any>this.$refs[ref]).validate((valid:boolean) =>{
       if(!valid) return
       attrVerify({form,tenantId:1}).then(res=>{
         this[form==1?'userData':'deptData'].detail.form.attrField = res.attrField
          this.userData.addData((<any>this.userData.detail).form)
       })
      
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
