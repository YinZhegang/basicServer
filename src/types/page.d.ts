/*
 * @Author: yinzhegang
 * @Date: 2021-07-12 17:41:35
 * @LastEditTime: 2021-07-19 10:49:47
 * @LastEditors: yinzhegang
 * @Description: 
 * @FilePath: \basicServes\src\types\list.d.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
export interface pageParam {
  size: number,
  current: number
}
export interface Params extends pageParam{
  [paramName: string]: any;
}
export interface ListData <T> {
    getList: Promise<any>
    updateData?:Promise<any>
    deleteData?:Promise<any>
    addData: Promise<any>
    params?:Params
    list:Array<T>
    total?: number
    loading: boolean,
    selections?:Array<T>
    detail?:{
      form:T,
      rules?:Array<any>|object,
      visible:boolean,
      isEdit:boolean
    }
    [paramName: string]: any
  }