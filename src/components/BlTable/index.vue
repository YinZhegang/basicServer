<!--
 * @Author: yinzhegang
 * @Date: 2021-07-06 15:36:21
 * @LastEditTime: 2021-07-06 15:45:32
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\components\BlTable\index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <el-table v-bind="$attrs" v-on="$listeners">
      <slot></slot>
  </el-table>
</template>

<script>
export default {

}
</script>

<style>

</style>
