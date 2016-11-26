import bg from 'gulp-bg'
import gulp from 'gulp'

gulp.task('server-dev', () => {
  bg('node', './webpack/hot-server')
})
