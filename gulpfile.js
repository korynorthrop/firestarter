var gulp              = require('gulp');
var browserSync       = require('browser-sync').create();
var changed           = require('gulp-changed');
var concat            = require('gulp-concat');
var cleanCSS          = require('gulp-clean-css');
var cssnano           = require('gulp-cssnano');
var ignore            = require('gulp-ignore');
var imagemin          = require('gulp-imagemin');
var imageminGiflossy  = require('imagemin-giflossy');
var imageminMozjpeg   = require('imagemin-mozjpeg');
var imageminPngquant  = require('imagemin-pngquant');
var rename            = require('gulp-rename');
var rimraf            = require('gulp-rimraf');
var sass              = require('gulp-sass');
var gulpSequence      = require('gulp-sequence');
var sourcemaps        = require('gulp-sourcemaps');
var uglify            = require('gulp-uglify');


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src(['src/scss/main.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({
      sourceMap: true,
      includePaths: [
        './src/scss',
        './node_modules/bootstrap/scss',
        './node_modules/font-awesome/scss',,
      ],
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

// Minify the outputted CSS
gulp.task('minify-css', ['cleancss'], function() {
  return gulp.src('src/css/main.css')
  .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(cleanCSS({compatibility: '*'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('src/css/'));
});

// Clean out existing minified CSS files from the directory
gulp.task('cleancss', function() {
  return gulp.src('src/css/*.min.css', { read: false }) // much faster
    .pipe(ignore('main.css'))
    .pipe(rimraf());
});

// Run the all of the Gulp tasks relating to styles
gulp.task('styles', function(callback){ gulpSequence('sass', 'minify-css')(callback) });

// Declare all javascript files that should be concatenated
var js_files = [
  'src/js/*.js',
  // 'node_modules/jquery/dist/jquery.js',
  // 'node_modules/bootstrap/dist/js/bootstrap.js',
  // 'node_modules/tether/dist/js/tether.js',
  '!src/js/*.min.js',
  '!src/js/combined.js'
];

// Combine all .js files declared above into one 'combined.js' script
gulp.task('concat-js',  function() {
  return gulp.src(js_files)
    .pipe(sourcemaps.init())
    .pipe(concat('combined.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/js/'))
    .pipe(browserSync.stream());
});

// Minify the 'combined.js' script
gulp.task('minify-js', ['cleanjs'], function() {
  return gulp.src('src/js/combined.js')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify().on('error', function(e){ console.log(e); }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('src/js/'));
});

// Clean out existing minified JS file from the directory
gulp.task('cleanjs', function() {
  return gulp.src('src/js/combined.min.js', { read: false }) // much faster
    .pipe(rimraf());
});

// Move the vendor javascript files into our /src/js folder
gulp.task('copy-js', function() {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
    .pipe(gulp.dest("src/js/vendor"))
    .pipe(browserSync.stream());
});

// Run the all of the Gulp tasks relating to scripts
gulp.task('scripts', function(callback){ gulpSequence('concat-js', 'minify-js', 'copy-js')(callback) });


// Copy the raw image to the general assets directory
gulp.task( 'image-copy', function() {
  return gulp.src('src/assets/raw/*')
    .pipe(changed('src/assets'))
    .pipe(gulp.dest('src/assets'))
    .pipe(browserSync.stream());
});

// Minify the images placed in the general assets directory
gulp.task( 'images-min', function() {
  return gulp.src('src/assets/*')
    .pipe(imagemin([      
        imageminPngquant({ speed: 1, quality: 98 }),
        imageminGiflossy({
          optimizationLevel: 3,
          optimize: 3, //keep-empty: Preserve empty transparent frames
          lossy: 2
        }),
        imagemin.svgo({ plugins: [{ removeViewBox: false } ]}),
        imagemin.jpegtran({ progressive: true }),
        imageminMozjpeg({ quality: 85 })
      ]))
    .pipe(gulp.dest('src/assets'));
});

// Run all image tasks
gulp.task('images', function(callback){ gulpSequence('image-copy', 'images-min')(callback) });

// Watch for changes to SASS files (run appropriate styles tasks when they change)
gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch('src/assets/raw/*', ['images']);
  // gulp.watch([basePaths.dev + 'js/**/*.js','js/**/*.js','!js/child-theme.js','!js/child-theme.min.js'], ['scripts']);
});

// Refresh browser when changes to minfified CSS, PHP files, and raw images are detected
gulp.task('browser-sync', function() {
  browserSync.init(['src/css/*.min.css','./*.php','src/assets/raw/**/*'], {
    proxy: "http://firestarterdemo.dev/",
    notify: false
  });
});

// Setup the browser synch tasks
gulp.task('watch-bs', ['browser-sync', 'watch'], function () { });

// Declare the default task(s) to run if a plain 'gulp' command is entered
gulp.task('default', ['styles']);