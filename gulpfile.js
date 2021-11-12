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

// index首页
gulp.task('index', async () => {
    await gulp.src('./src/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload())
});
// html压缩
gulp.task('html', async () => {
    await gulp.src('./src/html/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist/html'))
        .pipe(connect.reload())
});
// scss编译成css
gulp.task("scss", async () => {
    await gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        // .pipe(gulp.dest('./dist/css'))
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
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload())
})
// es6语法转换 js压缩 md5命名
gulp.task('js', async () => {
    await gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
            // presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload())
});

// 复制图片
gulp.task('img', async () => {
    await gulp.src('./src/images/*')
        .pipe(gulp.dest('./dist/images'))
})
//复制字体
gulp.task('fonts', async () => {
    await gulp.src('./src/fonts/*')
        .pipe(gulp.dest('./dist/fonts'))
})

// 清理dist
gulp.task('clean', async () => {
    await del(['dist/*']);
})

//服务
gulp.task('connect', function () {
    connect.server({
        root: "src",
        port: 8080,
        livereload: true,
        host:'0.0.0.0'
    });
});
//监视文件， 自动执行
gulp.task('watch', function () {
    gulp.watch('./src/scss/*.scss', gulp.series('scss'))
    gulp.watch('./src/css/*.css', gulp.series('css'))
    gulp.watch('./src/js/*.js', gulp.series('js'))
    gulp.watch('./src/index.html', gulp.series('index'))
    gulp.watch('./src/html/*.html', gulp.series('html'))
    gulp.watch('./src/img/*', gulp.series('img'))
})
// 构建项目
gulp.task('dist', gulp.series('clean', gulp.parallel('index', 'html', 'scss', 'css', 'js', 'img')));
//启动开发环境 gulp.series是顺序执行 gulp.parallel是同步执行
gulp.task('default', gulp.series(gulp.parallel('dist','watch', 'connect')));