import gulp from 'gulp'
import webpackBuild from '../src/webpack/build'

gulp.task('build-app-electron', ['env'], done => webpackBuild('electron-app', done))
