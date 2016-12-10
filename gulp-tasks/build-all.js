import args from './helpers/args'
import gulp from 'gulp'
import runSequence from 'run-sequence'

gulp.task('build-all', ['env'], done => {
  if (args.production) {
    runSequence('build-app-browser', done)
  } else {
    runSequence('build-app-browser', 'build-app-electron', 'build-electron', done)
  }
})
