import bg from 'gulp-bg'
import gulp from 'gulp'

gulp.task('server-hot', bg('node', './src/server/hot'))
