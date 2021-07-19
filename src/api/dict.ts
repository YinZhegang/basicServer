/*
 * @Author: yinzhegang
 * @Date: 2021-07-19 10:46:33
 * @LastEditTime: 2021-07-19 17:33:13
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\api\dict.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { Params, ListResponse } from '../types/page'
import request from './request'
import url from './url'

export const attrList = (params: AttrListParams) =>
  request.post(url.attrList, params)
export interface AttrListParams extends Params {
    form: number
    tenantId: number
}
export type AttrAddParams = {
    form: 1|2
    tenantId: number
    attrField: string
    attrName: string
    attrType: 0|1|2|3|4|5|6|7|8|9|10|11
    isNull: 0|1
    isListShow: 0|1
    creator: number
    expandValueList:Array<string>
}
export const attrAdd = (params: AttrAddParams) => request.post(url.attrAdd, params)

