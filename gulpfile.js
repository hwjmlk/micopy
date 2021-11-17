const gulp = require('gulp');
const babel = require('gulp-babel'); // 语法转换
const concat = require('gulp-concat'); // 合并
const uglify = require('gulp-uglify'); // js压缩
const sass = require('gulp-sass')(require('sass')); // scc编译
const htmlmin = require('gulp-htmlmin'); //html压缩
const connect = require('gulp-connect'); // 服务
// const imagemin = require('gulp-imagemin') // 图片压缩
const del = require('del') // 清空目录
const cleancss = require('gulp-clean-css') //css压缩

let destPath = "d:\\phpstudy_pro\\www";

// index首页
gulp.task('index', async () => {
    await gulp.src('./src/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(destPath + '\\dist/'))
        .pipe(connect.reload())
});
// html压缩
gulp.task('html', async () => {
    await gulp.src('./src/html/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(destPath + '\\dist\\html'))
        .pipe(connect.reload())
});
// scss编译成css
gulp.task("scss", async () => {
    await gulp.src('./src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))

});
// css合并压缩
gulp.task("css", async () => {
    await gulp.src(['./src/css/*.css'])
        // await gulp.src(['./src/css/index.css', './src/css/base.css'])
        // .pipe(concat('index.css'))
        .pipe(cleancss({
            keepBreaks: true
        }))
        .pipe(gulp.dest(destPath + '\\dist/css'))
        .pipe(connect.reload())
})
// es6语法转换 js压缩 md5命名
gulp.task('js', async () => {
    await gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(destPath + '\\dist/js'))
        .pipe(connect.reload())
});

// 复制php
gulp.task('php', async () => {
    await gulp.src('./src/php/*')
        .pipe(gulp.dest(destPath + '\\dist/php'))
})
// 复制图片
gulp.task('img', async () => {
    await gulp.src('./src/images/*')
        .pipe(gulp.dest(destPath + '\\dist/images'))
})
//复制字体
gulp.task('fonts', async () => {
    await gulp.src('./src/fonts/*')
        .pipe(gulp.dest(destPath + '\\dist/fonts'))
})

// 清理dist
gulp.task('clean', async () => {
    await del([destPath + '\\dist/*']);
})

//服务
gulp.task('connect', function () {
    connect.server({
        root: "dist",
        port: 8080,
        livereload: true,
        // host:'0.0.0.0'
    });
});
//监视文件， 自动执行
gulp.task('watch', function () {
    gulp.watch('./src/sass/*.scss', gulp.series('scss'))
    gulp.watch('./src/css/*.css', gulp.series('css'))
    gulp.watch('./src/js/*.js', gulp.series('js'))
    gulp.watch('./src/index.html', gulp.series('index'))
    gulp.watch('./src/html/*.html', gulp.series('html'))
    gulp.watch('./src/img/*', gulp.series('img'))
    gulp.watch('./src/php/*', gulp.series('php'))
    gulp.watch('./src/fonts/*', gulp.series('fonts'))
})
// 构建项目
gulp.task('dist', gulp.series('clean', gulp.parallel('index', 'html', 'scss', 'css', 'js', 'img', 'php', 'fonts')));
//启动开发环境 gulp.series是顺序执行 gulp.parallel是同步执行
gulp.task('default', gulp.series(gulp.parallel('watch', 'connect')));