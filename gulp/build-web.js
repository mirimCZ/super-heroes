import gulp from 'gulp'
import webpackBuild from '../webpack/build-web'

gulp.task('build-web', ['env'], done => webpackBuild(done))
