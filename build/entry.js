const path = require('path')
const fs = require('fs')
const dev = process.env.NODE_ENV !== 'production'
const argv__param = process.argv.length > 2 ? process.argv[process.argv.length -1] : 'ly'

module.exports = function () {
  const dirs = fs.readdirSync(path.join(__dirname, '..', 'global'))
  const arr = dirs.filter(item => item !== 'index.js')
  let obj = {}
  arr.forEach(item => {
    obj[item.substr(0, item.lastIndexOf('.'))] = `./global/${item}`
  })
  return dev ? {[`${argv__param}_global.config`]: `./global/${argv__param}_global.config.js`} : obj
}