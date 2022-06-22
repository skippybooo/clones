// main module
import gulp from "gulp";
// modules import
import { path } from "./gulp/config/path.js";
// import common plugins
import { plugins } from "./gulp/config/plugins.js";

// send values to global variable
global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

// import tasks
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { zip } from "./gulp/tasks/zip.js";

// watch files changes
function watcher() {
  gulp
    .watch(path.watch.files, copy)
    .on("change", app.plugins.browsersync.reload);
  gulp
    .watch(path.watch.html, html)
    .on("change", app.plugins.browsersync.reload);
  gulp
    .watch(path.watch.scss, scss)
    .on("change", app.plugins.browsersync.reload);
  gulp.watch(path.watch.js, js).on("change", app.plugins.browsersync.reload);
  gulp
    .watch(path.watch.images, images)
    .on("change", app.plugins.browsersync.reload);
}

// Fonts Tasks
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Main Tasks
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images)
);

// collect tasks to run
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZip = gulp.series(reset, mainTasks, zip);

// export scenarios
export { dev };
export { build };
export { deployZip };

// run default task
gulp.task("default", dev);
