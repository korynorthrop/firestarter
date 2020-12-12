var gulp              = require('gulp');
var browserSync       = require('browser-sync').create();
var changed           = require('gulp-changed');
var concat            = require('gulp-concat');
var cleanCSS          = require('gulp-clean-css');
var ignore            = require('gulp-ignore');
var imagemin          = require('gulp-imagemin');
var imageminGiflossy  = require('imagemin-giflossy');
var imageminMozjpeg   = require('imagemin-mozjpeg');
var imageminPngquant  = require('imagemin-pngquant');
var rename            = require('gulp-rename');
var rimraf            = require('gulp-rimraf');
var sass              = require('gulp-sass');
var sourcemaps        = require('gulp-sourcemaps');
var uglify            = require('gulp-uglify');

// Compile sass into CSS & auto-inject into browsers
function sassify() {
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
};

// Clean out existing minified CSS files from the directory
function cleancss() {
  return gulp.src('src/css/*.min.css', { read: false }) // much faster
    .pipe(ignore('main.css'))
    .pipe(rimraf());
};

// Minify the outputted CSS
function minifycss() {
  return gulp.src('src/css/main.css')
  .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(cleanCSS({compatibility: '*'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('src/css/'));
};

// Run the all of the Gulp tasks relating to styles
gulp.task('styles', gulp.series(sassify, cleancss, minifycss));

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
function concatenateJS() {
  return gulp.src(js_files)
    .pipe(sourcemaps.init())
    .pipe(concat('combined.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/js/'))
    .pipe(browserSync.stream());
};

// Clean out existing minified JS file from the directory
function cleanjs() {
  return gulp.src('src/js/combined.min.js', { read: false, allowEmpty: true })
    .pipe(rimraf());
};

// Minify the 'combined.js' script
function minifyjs() {
  return gulp.src('src/js/combined.js')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify().on('error', function(e){ console.log(e); }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('src/js/'));
};

// Move the vendor javascript files into our /src/js folder
function copyjs() {
  return gulp.src([
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/tether/dist/js/tether.min.js',
      'node_modules/popper.js/dist/umd/popper.min.js'
    ])
    .pipe(gulp.dest("src/js/vendor"))
    .pipe(browserSync.stream());
};

// Run the all of the Gulp tasks relating to scripts
gulp.task('scripts', gulp.series(concatenateJS, cleanjs, minifyjs, copyjs));

// Run the concat and minify tasks only (don't copy vendor js scripts)
gulp.task('watch-scripts', gulp.series(concatenateJS, minifyjs));

// Move Font Awesome font files into our /src/fonts directory
function icons() {
  return gulp.src('node_modules/font-awesome/fonts/**.*')
    .pipe(gulp.dest('src/fonts'));
};

// Copy new/changed images from the raw directory to the root assets directory
function imagecopy() {
  return gulp.src('src/assets/raw/*')
    .pipe(changed('src/assets'))
    .pipe(gulp.dest('src/assets'))
    .pipe(browserSync.stream());
};

// Minify the images in the root assets directory
function imageminification() {
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
};

// Watch for changes to sass, js, and image files
gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', gulp.series('styles', reload));
  gulp.watch(['src/js/*.js','!src/js/*.min.js','!src/js/combined.js'], gulp.series('watch-scripts', reload));
  gulp.watch('src/assets/raw/*', gulp.series(imagecopy, reload));
  return
});

function reload(done) {
  browserSync.reload();
  done();
}

// Refresh browser when changes to minfified CSS, PHP files, and raw images are detected
function browsersynchronize(done) {
  browserSync.init(['src/css/*.min.css','./inc/*.php','./template-parts/*.php','./*.php','src/assets/raw/**/*'], {
    proxy: "https://localdevserver.testing/", // change this to your local development server
    notify: false
  });
  done();
};

// Setup the browser synch tasks
gulp.task('watch-bs', gulp.series(browsersynchronize, 'watch'));

// Run some tasks to optimize for distribution/production
gulp.task('dist', gulp.series(imageminification));

// Declare the default task(s) to run if a plain 'gulp' command is entered
gulp.task('default', gulp.parallel('styles', 'scripts', icons));