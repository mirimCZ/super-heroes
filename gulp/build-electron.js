import gulp from 'gulp'
import webpackBuild from '../webpack/build-elec'

gulp.task('build-electron', ['env'], done => webpackBuild(done))
