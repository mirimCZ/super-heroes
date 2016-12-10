import gulp from 'gulp'
import webpackBuild from '../src/webpack/build'

gulp.task('build-electron-client', ['env'], done => webpackBuild('electron-client', done))
