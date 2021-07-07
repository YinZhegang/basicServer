/*
 * @Author: yinzhegang
 * @Date: 2021-06-03 09:57:20
 * @LastEditTime: 2021-07-06 15:40:56
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\shims.d.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'element-ui/lib/locale/lang/*' {
  export const elementLocale: any
}

declare module '*.gif' {
  export const gif: any
}

// TODO: remove this part after vue-count-to has its typescript file
declare module 'vue-count-to'

// TODO: remove this part after vue2-dropzone has its typescript file
declare module 'vue2-dropzone'

// TODO: remove this part after vue-image-crop-upload has its typescript file
declare module 'vue-image-crop-upload'
