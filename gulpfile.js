var config = {
  sassPath: './assets/sass',
  npmDir: './bower_components'
}
 
gulp.task('css', function() {
  return gulp.src(config.sassPath + '/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      // outputStyle: 'compressed',
      sourceMap: true,
      includePaths: [
        './assets/sass',
        config.npmDir + '/bootstrap/scss',
        // config.npmDir + '/font-awesome/scss',
      ],
     }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
    .pipe(notify('SCSS compilation done'));
});