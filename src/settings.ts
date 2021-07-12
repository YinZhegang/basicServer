/*
 * @Author: yinzhegang
 * @Date: 2021-06-03 09:57:20
 * @LastEditTime: 2021-07-12 16:43:15
 * @LastEditors: yinzhegang
 * @Description: 
 * @FilePath: \basicServes\src\settings.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
interface ISettings {
  title: string // Overrides the default title
  showSettings: boolean // Controls settings panel display
  showTagsView: boolean // Controls tagsview display
  showSidebarLogo: boolean // Controls siderbar logo display
  fixedHeader: boolean // If true, will fix the header component
  errorLog: string[] // The env to enable the errorlog component, default 'production' only
  sidebarTextTheme: boolean // If true, will change active text color for sidebar based on theme
  devServerPort: number // Port number for webpack-dev-server
  mockServerPort: number // Port number for mock server
}

// You can customize below settings :)
const settings: ISettings = {
  title: '基础服务',
  showSettings: false,
  showTagsView: true,
  fixedHeader: false,
  showSidebarLogo: true,
  errorLog: ['production'],
  sidebarTextTheme: true,
  devServerPort: 9527,
  mockServerPort: 9528
}

export default settings
