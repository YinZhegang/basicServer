/*
 * @Author: yinzhegang
 * @Date: 2021-08-05 11:34:25
 * @LastEditTime: 2021-08-06 10:22:09
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\build\app\controller\build.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
const path = require('path')
const shell = require('shelljs')
const async = require('async')

const zipper = require('zip-local')

module.exports = async(ctx, next) => {
  const slees = new Promise((resolve) => {
    shell.exec('npm run build:prod', { async: true }, (code, stdout, stderr) => {
      console.log('Exit code:', code)
      // ctx.render('view/index', {
      //   title: 'pp',
      //   content: stdout
      // })

      resolve(stdout)
      console.log('Program output:', stdout)
      console.log('Program stderr:', stderr)
    })
  })
  const res = await slees
  zipper.sync.zip(path.join(__dirname, '../../public/build/')).compress().save(path.join(__dirname, '../../public/packages/build.zip'))
  ctx.body = 200
  next()
}
