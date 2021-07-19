/*
 * @Author: yinzhegang
 * @Date: 2021-06-29 10:34:36
 * @LastEditTime: 2021-07-13 13:38:29
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\modules\types.d.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { RouteConfig } from 'vue-router'
import { DirectiveOptions } from 'vue'

export interface Modules {
    routes: RouteConfig
    directives: DirectiveOptions
    filters: Function
  }
