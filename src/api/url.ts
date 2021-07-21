/*
 * @Author: yinzhegang
 * @Date: 2021-07-19 13:21:32
 * @LastEditTime: 2021-07-21 11:37:28
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\api\url.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
const baseUrl = 'http://172.16.20.74:8080'
export default {
  attrList: `${baseUrl}/attr/list`,
  attrAdd: `${baseUrl}/attr/add`,
  attrUpdate: `${baseUrl}/attr/update`,
  attrVerify: `${baseUrl}/attr/verify`,
  attrDelete:  `${baseUrl}/attr/delete`
}
