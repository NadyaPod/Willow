import gulp from "gulp";
import plumber from "gulp-plumber";
import sass from "gulp-dart-sass";
import browser from "browser-sync";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";

const styles = () => {
  return gulp
    .src("source/sass/style.scss", { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("source/css", { sourcemaps: "." }))
    .pipe(browser.stream());
};

const html = () => {
  return gulp.src("source/*.html").pipe(gulp.dest("source"));
};

const server = (done) => {
  browser.init({
    server: {
      baseDir: "source",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

const reload = (done) => {
  browser.reload();
  done();
};

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/*.html", gulp.series(html, reload));
};

export default gulp.series(
  gulp.parallel(styles, html),
  gulp.series(server, watcher)
);
