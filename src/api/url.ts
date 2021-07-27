/*
 * @Author: yinzhegang
 * @Date: 2021-07-19 13:21:32
 * @LastEditTime: 2021-07-27 10:34:32
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\api\url.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
const baseUrl = 'http://172.16.20.74:8080'
const moduleName = '/ucenter'
export default {
//   扩展字段模块  
  attrList: `${baseUrl}${moduleName}/attr/list`,
  attrAdd: `${baseUrl}${moduleName}/attr/add`,
  attrUpdate: `${baseUrl}${moduleName}/attr/update`,
  attrVerify: `${baseUrl}${moduleName}/attr/verify`,
  attrDelete:  `${baseUrl}${moduleName}/attr/delete`,
  attrSort: `${baseUrl}${moduleName}/attr/sort`,
//   部门管理
  deptAdd: `${baseUrl}${moduleName}/dept/add`,
  deptTop:  `${baseUrl}${moduleName}/dept/top`,
  deptGet: `${baseUrl}${moduleName}/dept/get`,
  deptList: `${baseUrl}${moduleName}/dept/list`,
  deptGet_batch:  `${baseUrl}${moduleName}/dept/get_batch`,
  deptOrder: `${baseUrl}${moduleName}/dept/order`,
  deptMove:`${baseUrl}${moduleName}/dept/move`,
  deptUpdate: `${baseUrl}${moduleName}/dept/update`,
  deptDelete:  `${baseUrl}${moduleName}/dept/delete`,
//   用户组
  groupList: `${baseUrl}${moduleName}/ac/group/list`,
  groupAdd: `${baseUrl}${moduleName}/ac/group/add`,
  groupUpdate: `${baseUrl}${moduleName}/ac/group/update`,
  groupDelete: `${baseUrl}${moduleName}/ac/group/delete`,
  groupAddMember: `${baseUrl}${moduleName}/ac/group/add/member`,
  groupDeleteMember: `${baseUrl}${moduleName}/ac/group/delete/member`,
//   角色
  roleList: `${baseUrl}${moduleName}/role/list`,
  roleAdd: `${baseUrl}${moduleName}/role/add`,
  roleUpdate: `${baseUrl}${moduleName}/role/update`,
  roleDeletebatch: `${baseUrl}${moduleName}/role/deletebatch`
 
}
