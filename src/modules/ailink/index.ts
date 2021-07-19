/*
 * @Author: yinzhegang
 * @Date: 2021-06-04 09:58:25
 * @LastEditTime: 2021-07-13 12:42:40
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\modules\ailink\index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import aiRoute from './router'
import * as directives from '@/directives'
import * as filters from '@/filters'

export default {
  routes: aiRoute,
  directives,
  filters
}
