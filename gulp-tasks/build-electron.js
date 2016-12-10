import gulp from 'gulp'
import webpackBuild from '../src/webpack/build'

gulp.task('build-electron', ['env'], done => webpackBuild('electron', done))
