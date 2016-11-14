import gulp from 'gulp'

gulp.task('server-dev', () => {
  bg('node', './webpack/hot-server')
})
