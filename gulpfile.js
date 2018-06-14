const gulp = require('gulp')
const through = require('through2')
const  urlConfig = {
	oldUrl: 'http://img124.l510881.com',
	newUrl: '//jkysxh.cn/img/wap'
}
function modifyStreamContent(modify) {
  return through.obj(function(file, endcoding, callback) {
      if(file.isNull()) {
          this.push(file)
          return callback()
      }
      if(file.isStream()){
          return callback()
      }
      var content = file.contents.toString()
      content = modify(content, file.path) || content
      file.contents = new Buffer(content)
      this.push(file)
      callback()
  })
}
function rename(){
  return modifyStreamContent((content, filePath) => {
      content = content.replace(/url\((\S+?)\)/gi, (keyword) => {
        if (keyword.includes(urlConfig.oldUrl)) {
          return keyword.replace(urlConfig.oldUrl, urlConfig.newUrl)
        }
        return keyword
      })
      return content
  })
}

gulp.task('assets', () => {
  return gulp.src('./dist/wap/css/*[^app].css')
    .pipe(rename())
    .pipe(gulp.dest('./dist/wap/css'))
})

gulp.task('default', ['assets'])


