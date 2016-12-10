import args from './helpers/args'
import gulp from 'gulp'

gulp.task('env', () => {
  process.env.NODE_ENV = args.production ? 'production' : 'development'
})
