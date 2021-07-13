<!--
 * @Author: yinzhegang
 * @Date: 2021-07-12 11:41:59
 * @LastEditTime: 2021-07-13 18:01:55
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\components\ChooseItems\content.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
     <div class="main-content">
          <div class="main-dept">
            <el-input  placeholder="请输入内容"
    prefix-icon="el-icon-search" size="mini" v-model="serachKey"></el-input>
            <el-breadcrumb style="margin-top:10px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: '/'}">活动管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: '/'}">活动列表</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: '/'}">活动详情</el-breadcrumb-item>
            </el-breadcrumb>
            <br>
            <div class="main-dept-list">
               <div v-for="i in 5" class="main-dept-list-item hover">
                   <div><svg-icon :style="{color: theme}" name="tree" /><p>研发部</p></div>
                   <p :style="{color: theme}"><svg-icon name="tree-table" />&nbsp;下级</p>

               </div>
               <div v-for="i in 4" class="main-dept-list-item hover">
                   <div><svg-icon :style="{color: theme}" name="user" /><p>王小帅</p></div>
                   <p :style="{color: theme}"><svg-icon name="tree-table" />&nbsp;下级</p>
               </div>
            </div>
          </div>
          <div class="main-choose">
             <p style="line-height:0">已选</p>
             <div class="main-choose-added">
              <div v-for="i in 5" class="main-dept-list-item">
                   <div><svg-icon :style="{color: theme}" name="tree" /><p>研发部</p></div>
                   <i class="el-icon-close" />

               </div>
               <div v-for="i in 5" class="main-dept-list-item">
                   <div><svg-icon :style="{color: theme}" name="user" /><p>王小帅</p></div>
                   <i class="el-icon-close" />
               </div>
             </div>
             <div style="text-align:center;margin-top:10px">
                    <el-button size="mini">取消</el-button>
                    <el-button size="mini" type="primary">确定</el-button>
             </div>

          </div>
      </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { SettingsModule } from '@/store/modules/settings'

@Component({
  name: 'ChooseContent'
})
export default class extends Vue {
   serachKey = ''
   get theme() {
     console.log(SettingsModule)
     return SettingsModule.theme
   }
}
</script>

<style scoped>
.main-content{
    display: flex;
}
.main-dept{
    flex: 1;
    margin-right: 10px;
    border-right: 1px solid #EBEEF5;
    padding: 10px;
}
.main-choose{
    flex: 1;
}
.main-choose-added{
   height: 400px;
   border: 1px solid #EBEEF5;
   background-color: #F2F6FC;
   border-radius: 4px;
   padding: 10px;
   overflow: auto;
}
.main-dept-list-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 5px;
}
.hover:hover{
    background-color: #EBEEF5;
}
.hover{
  cursor: pointer;
}
.main-dept-list-item > div{
  display: flex;
  align-items: center;
}
.main-dept-list-item > div>p{
  margin-left: 10px;
}
</style>
