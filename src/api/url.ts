/*
 * @Author: yinzhegang
 * @Date: 2021-07-19 13:21:32
 * @LastEditTime: 2021-07-20 10:47:44
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\api\url.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
const baseUrl = 'http://172.16.20.74:8080'
export default {
  attrList: `${baseUrl}/attr/list`,
  attrAdd: `${baseUrl}/attr/add`,
  attrVerify: `${baseUrl}/attr/verify`
}
