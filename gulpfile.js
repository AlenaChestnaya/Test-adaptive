"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var run = require("run-sequence");
var del = require("del");
var js_sources = require("./bundles/js.json");
var concat = require("gulp-concat");

gulp.task("style", function() {
  gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", ["style"]);
  gulp.watch("source/*.html", ["html"]).on("change", server.reload);
  gulp.watch("source/js/*.js", ["copy-js"]);
});

gulp.task("sprite", function() {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("copy-js", function() {
  return gulp.src([
    "source/js/**"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("js-vendor", function() {
  return gulp.src(js_sources.vendor)
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest("build/js"));
});

gulp.task("build", function(done) {
  run("clean", "copy", "copy-js", "style", "sprite", "html", "js-vendor", done);
});
