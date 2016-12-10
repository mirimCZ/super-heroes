import 'regenerator-runtime/runtime'
import gulp from 'gulp'
import requireDir from 'require-dir'

requireDir('./gulp-tasks', { recurse: false })

gulp.task('default', ['serve-all'])
