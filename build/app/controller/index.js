/*
 * @Author: yinzhegang
 * @Date: 2021-08-03 16:37:27
 * @LastEditTime: 2021-08-05 10:20:36
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\build\app\controller\index.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
const path = require('path')
const shell = require('shelljs')

// const exec = require('child_process').exec

module.exports = async(ctx, next) => {
  const rootPath = path.join(__dirname, '../../../')
  console.log(rootPath)
  if (!shell.which('git')) {
    // 向命令行打印git命令不可用的提示信息
    shell.echo('Sorry, this script requires git')
    // 退出当前进程
    shell.exit(1)
  }
  shell.cd(rootPath)
  if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
    shell.echo('Error: Git commit failed')
    shell.exit(1)
  }
  //   exec('cd D:/work/basicServes', function(error, stdout, stderr) {
  //     exec('npm run build:prod', function(error, stdout, stderr) {

  //     })
  //   })

  await ctx.render('view/index', {
    title: 'pp'
  })
}
