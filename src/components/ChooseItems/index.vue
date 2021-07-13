<!--
 * @Author: yinzhegang
 * @Date: 2021-07-06 23:54:52
 * @LastEditTime: 2021-07-13 18:07:40
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\components\ChooseItems\index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
    <el-dialog v-on="$listeners" v-bind="$attrs">
      <Content></Content>
    </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import Content from './content.vue'

@Component({
  name: 'ChooseItem',
  components: {
    Content
  }
})
export default class extends Vue {
   serachKey = ''
}
</script>

<style scoped>

</style>
