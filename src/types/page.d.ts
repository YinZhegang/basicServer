/*
 * @Author: yinzhegang
 * @Date: 2021-07-12 17:41:35
 * @LastEditTime: 2021-07-19 16:53:03
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\types\page.d.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { AxiosResponse } from 'axios'

// 分页参数
export interface BaseParams {
  size: number
  current: number
}

// 分页
export interface Params extends BaseParams{
  [paramName: string]: any
}

// 基础借口返回类型
export interface BaseResponse<Data> {
   code:number
   message: string
   data:Data
}
// 列表接口返回类型
export interface ListResponse <ListItem> {
  code:number
  message: string
  data:{
       size:number
       total:number
       pages: number
       records:Array<ListItem>
  }
}
export interface ListData <P, LI> {
    getList:(params: P) => Promise<AxiosResponse<any>>
    updateData?:(params: LI|any) => Promise<AxiosResponse<any>>
    deleteData?:(params: Array<number>) => Promise<AxiosResponse<any>>
    addData?:(params: LI|any) => Promise<AxiosResponse<any>>
    params?:P
    list:Array<LI>
    total?: number
    loading: boolean
    selections?:Array<LI>
    detail?:{
      form:LI
      rules?:{[pname: string]: object|Array<object>}
      visible:boolean
      isEdit:boolean
    }
    [paramName: string]: any
  }
