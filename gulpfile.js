var gulp = require('gulp'),
    jade = require('gulp-jade'),
    //sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    compass = require('gulp-compass'),
    spritesmith = require('gulp.spritesmith'),
    browserSync = require('browser-sync');

    gulp.task('browser-sync', function () {
      browserSync({
        port: 9000,
        server: {
          baseDir: 'app'
        }
      });
    });


    gulp.task('jade-compile', function() {
      var YOUR_LOCALS = {};
      gulp.src('./app/markups/_pages/*.jade')
         .pipe(plumber())
         .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: '\t',
         }))
         .pipe(gulp.dest('./app/'))
    });


    gulp.task('sprite', function() {
      var spriteData =
          gulp.src('./app/img/spriteicon/*.*') // путь, откуда берем картинки для спрайта
              .pipe(spritesmith({
                  imgName: '../img/sprite.png',
                  cssName: '_sprite.scss',
                cssFormat: 'scss',
                  padding: 0
              }));

      spriteData.img.pipe(gulp.dest('./app/img/')); // путь, куда сохраняем картинку
      spriteData.css.pipe(gulp.dest('./app/scss/_general/')); // путь, куда сохраняем стили
    });

    gulp.task('compass', function() {
      gulp.src('app/sass/main.scss')
        .pipe(plumber())
        .pipe(compass({
            config_file: './config.rb',
              css: './app/css',
              sass: './app/scss'
        }))
        .pipe(gulp.dest('./app/css/'));
    });
    // gulp.task('sass', function () {
    //   return gulp.src('app/sass/main.scss')
    //     .pipe(plumber())
    //     .pipe(sass().on('error', sass.logError))
    //     .pipe(gulp.dest('./app/css'));
    // });

    gulp.task('watch', function () {
      gulp.watch([
        'app/**/*.html',
        'app/css/**/*.css',
        'app/js/**/*.js'
      ]).on("change", browserSync.reload);
      gulp.watch('app/markups/**/*.jade', ['jade-compile']);
      gulp.watch('app/scss/**/*.scss', ['compass']);
    });

    // Default Task
    gulp.task('default', [
      'jade-compile',
      'browser-sync',
      'compass',
      'watch'
    ]);
