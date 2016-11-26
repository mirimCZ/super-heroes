import gulp from 'gulp'
import runSequence from 'run-sequence'

gulp.task('serve-all', ['env'], done => {
  if (args.production) {
    // NOTE: don´t build electron in production mode - only API server
  } else {
    runSequence('server-dev', 'electron-dev', done)
  }
})
