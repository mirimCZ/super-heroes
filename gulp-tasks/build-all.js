import args from './helpers/args'
import gulp from 'gulp'
import runSequence from 'run-sequence'

gulp.task('build-all', ['env'], done => {
  if (args.production) {
    runSequence('build-web', done)
  } else {
    runSequence('build-web', 'build-electron', done)
  }
})
