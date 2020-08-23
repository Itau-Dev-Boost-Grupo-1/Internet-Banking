/* ------------------------
  GULP TASKS
-------------------------*/

// REQUIRES
var gulp = require("gulp");
var gulpUtil = require("gulp-util");
var uglify = require("gulp-uglify");
var prefix = require("gulp-autoprefixer");
var imageMin = require("gulp-imagemin");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");

// SCRIPTS TASK
gulp.task("scripts", function () {
  gulp
    .src("src/js/**/*.js")
    .pipe(uglify().on("error", gulpUtil.log))
    .pipe(gulp.dest("dist/js"));
});

// Image Minification
gulp.task("images", function () {
  gulp.src("src/img/*").pipe(imageMin()).pipe(gulp.dest("dist/img"));
});

// Get the final SCSS file and convert to CSS
gulp.task("styles", function () {
  gulp
    .src("src/sass/pages/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(
      prefix({
        overrideBrowserslist: ["last 2 versions"],
      })
    )
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("serve", ["scripts", "styles"], function () {
  browserSync.init({
    server: "./",
  });

  gulp.watch("src/js/**/*.js", ["scripts"]);
  gulp.watch("src/sass/**/*.scss", ["styles"]);
  gulp.watch("./*.html").on("change", browserSync.reload);
});

// DEFAULT
gulp.task("default", ["serve"]);
