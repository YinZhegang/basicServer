/*
 * @Author: yinzhegang
 * @Date: 2021-07-12 17:41:35
 * @LastEditTime: 2021-07-12 17:58:42
 * @LastEditors: yinzhegang
 * @Description: 
 * @FilePath: \basicServes\src\types\list.d.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

export interface Params {
  size: number,
  current: number
}

export interface ListData <T> {
    getList?: Promise<any>
    params:Params
    list:Array<T>
    total: number
    loading: boolean,
    selections?:Array<T>
  }