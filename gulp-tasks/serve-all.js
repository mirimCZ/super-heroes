import args from './helpers/args'
import gulp from 'gulp'
import runSequence from 'run-sequence'

gulp.task('serve-all', ['env'], done => {
  if (args.production) {
    runSequence('server-isom', 'server-api', done)
  } else {
    runSequence('server-hot', 'server-isom', 'server-api', done)
  }
})
