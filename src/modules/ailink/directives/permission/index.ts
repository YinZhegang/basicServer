/*
 * @Author: yinzhegang
 * @Date: 2021-07-13 12:39:05
 * @LastEditTime: 2021-07-13 12:39:14
 * @LastEditors: yinzhegang
 * @Description: 
 * @FilePath: \basicServes\src\modules\ailink\directives\permission\index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { DirectiveOptions } from 'vue'
import { UserModule } from '@/store/modules/user'

export const permissionAi: DirectiveOptions = {
  inserted(el, binding) {
    const { value } = binding
    const roles = UserModule.roles
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) {
        el.style.display = 'none'
      }
    } else {
      throw new Error('need roles! Like v-permission="[\'admin\',\'editor\']"')
    }
  }
}
