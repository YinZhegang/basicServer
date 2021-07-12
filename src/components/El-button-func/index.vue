<!--
 * @Author: yinzhegang
 * @Date: 2021-07-12 16:56:51
 * @LastEditTime: 2021-07-12 17:10:21
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\components\El-button-func\index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <el-button class="hover" v-on="$listeners" v-bind="$attrs">
    <slot></slot>
  </el-button>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
// 默认按钮聚焦和鼠标触碰时显示主题色
.hover:hover, .hover:focus{
    color: #fff;
    border-color: $menuActiveText;
    background-color: $menuActiveText;
}
</style>
