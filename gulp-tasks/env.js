import args from './helpers/args'
import gulp from 'gulp'

gulp.task('env', () => {
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV = args.production ? 'production' : 'development'
  }
})
