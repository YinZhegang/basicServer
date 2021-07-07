<!--
 * @Author: yinzhegang
 * @Date: 2021-06-04 16:22:48
 * @LastEditTime: 2021-07-06 15:47:53
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\modules\ailink\views\ai\List.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div>
      <el-table :data='data'>
        <el-table-column
          prop="name"
          label="姓名"
          width="180" />
          <el-table-column
          prop="name"
          label="姓名"
          width="180" />

      </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'Ailist',
  data() {
    return {
      data: [{ name: 12 }]
    }
  }
})
export default class List extends Vue {

}
</script>

<style>

</style>
