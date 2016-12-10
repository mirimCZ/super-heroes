import gulp from 'gulp'
import webpackBuild from '../src/webpack/build'

gulp.task('build-browser', ['env'], done => webpackBuild('browser', done))
