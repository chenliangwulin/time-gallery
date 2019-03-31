let gulp         = require('gulp'),                 //基础库
    browserSync  = require('browser-sync').create(),//浏览器自动刷新
    htmlMin      = require('gulp-htmlmin'),         //HTML压缩
    rev          = require('gulp-rev'),             //对文件名加MD5后缀
    revCollector = require('gulp-rev-collector'),   //路径替换
    imageMin     = require('gulp-imagemin'),        //图片压缩
    cssMin       = require('gulp-minify-css'),      //css压缩
    less         = require('gulp-less'),            //less
    lessReporter = require('gulp-less-reporter'),   //检查less错误
    autoprefixer = require('gulp-autoprefixer'),    //css3前缀
    rename       = require('gulp-rename'),          //重命名
    runSequence  = require('run-sequence'),
    del          = require('del'),                  //删除文件
    sourcemaps   = require('gulp-sourcemaps'),
    notify       = require('gulp-notify'),          //异常错误提示
    plumber      = require('gulp-plumber'),		    //异常并不终止watch事件
    inlinesource = require('gulp-inline-source'),
    babel        = require("gulp-babel"),
    uglify       = require('gulp-uglify');          //js压缩

const path = {
    input : {
        root   : 'src/',
        html   : ['src/*.+(html|php)'],
        less   : ['src/assets/less/index.less'],
        js     : ['src/assets/js/*.js'],
        images : ['src/assets/images/*.*'],
        lib    : ['src/assets/lib/**'],
        rev    : 'rev/*.json'
    },
    output : {
        root   : 'dist/',
        html   : 'dist/',
        css    : 'dist/assets/css/',
        js     : 'dist/assets/js/',
        images : 'dist/assets/images/',
        lib    : 'dist/assets/lib/',
        rev    : 'rev/'
    }
};

// Task
// ====================================================================================================

// html处理
gulp.task('html', function () {
    let options = {
        removeComments: true,                 //清除HTML注释
        collapseWhitespace: true,             //压缩HTML
        collapseBooleanAttributes: true,      //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,          //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,     //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
        minifyJS: true,                       //压缩页面JS
        minifyCSS: true                       //压缩页面CSS
    };

    return gulp.src(path.input.html)
        .pipe(htmlMin(options))
        .pipe(gulp.dest(path.output.html))
        .pipe(browserSync.reload({stream:true}));
});

// js 处理
gulp.task('js:dev', function () {
    return gulp.src(path.input.js)
        .pipe(sourcemaps.init({loadMaps:true}))
        .pipe(plumber({errorHandler:notify.onError('Error: <%= error.message %>')}))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(rename({suffix:'.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.output.js))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function () {
    return gulp.src(path.input.js)
        .pipe(plumber({errorHandler:notify.onError('Error: <%= error.message %>')}))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(path.output.js))
});

// 样式处理
gulp.task('css:dev', function () {
    return gulp.src(path.input.less)
        .pipe(sourcemaps.init())
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less()).on('error', lessReporter)
        .pipe(autoprefixer({
            browsers: ['iOS >= 7', 'Android >= 4', 'last 2 version']
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(path.output.css))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('css', function () {
    return gulp.src(path.input.less)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less()).on('error', lessReporter)
        .pipe(autoprefixer({
            browsers: ['iOS >= 7', 'Android >= 4', 'last 2 version']
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssMin())
        .pipe(gulp.dest(path.output.css));
});

// 图片处理
gulp.task('images:dev', function () {
    return gulp.src(path.input.images)
        .pipe(gulp.dest(path.output.images))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('images', function () {
    return gulp.src(path.input.images)
        .pipe(imageMin())
        .pipe(gulp.dest(path.output.images));
});

// 插件处理
gulp.task('lib', function () {
    return gulp.src(path.input.lib)
        .pipe(gulp.dest(path.output.lib))
        .pipe(browserSync.reload({stream:true}));
});

// 清理所有编译后的文件
gulp.task('clean', function () {
    del('./release');
    return del(path.output.root);
});

gulp.task('rev-js', function () {
    return gulp.src(path.output.js + 'index.js')
        .pipe(rev())
        .pipe(rev.manifest({
            path: 'rev-js-manifest.json'
        }))
        .pipe(gulp.dest(path.output.rev))
});

gulp.task('rev-css', function () {
    return gulp.src(path.output.css + 'index.min.css')
        .pipe(rev())
        .pipe(rev.manifest({
            path: 'rev-css-manifest.json'
        }))
        .pipe(gulp.dest(path.output.rev))
});

gulp.task('rev-images', function () {
    return gulp.src(path.output.images + '**')
        .pipe(rev())
        .pipe(rev.manifest({
            path: 'rev-images-manifest.json'
        }))
        .pipe(gulp.dest(path.output.rev))
});

// 更新 css、js、img 文件版本
gulp.task('rev', function () {
    gulp.src([path.input.rev, path.output.css + 'index.min.css'])
        .pipe(revCollector())
        .pipe(gulp.dest(path.output.css));

    gulp.src([path.input.rev, path.output.js + '*.js'])
        .pipe(revCollector())
        .pipe(gulp.dest(path.output.js));

    return gulp.src([path.input.rev, path.output.html + '*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest(path.output.html));
});

gulp.task('develop', function () {
    runSequence('clean', ['html', 'js:dev', 'css:dev', 'images:dev', 'lib']);
});

gulp.task('build', function () {
    runSequence('clean', ['html', 'js', 'css', 'images', 'lib']);
});

// 发布并更新版本号
gulp.task('release', function () {
    runSequence('clean', ['html', 'js', 'css', 'images', 'lib'], ['rev-js', 'rev-css', 'rev-images'], 'rev');
});

// 新浪发布到空白模板
gulp.task('sina-release', function () {
    return gulp.src(path.output.html + '*.html')
        .pipe(inlinesource())
        .pipe(gulp.dest('./release'));
});

// Watch
// ====================================================================================================

gulp.task('browser-sync', function () {
    // 动态输入服务器地址及监控文件
    browserSync.init([path.input.html, path.input.less, path.input.js, path.input.images, path.input.lib], {
        port: 3000,
        server: {
            baseDir: ['dist'],
        },
        open: true,
    });

});

// 监听任务 运行语句 gulp watch
gulp.task('watch', ['browser-sync', 'develop'], function () {

    // 监听html
    gulp.watch(path.input.html, ['html']);

    // 监听css
    gulp.watch(path.input.js, ['js:dev']);

    // 监听images
    gulp.watch(path.input.less, ['css:dev']);

    // 监听js
    gulp.watch(path.input.images, ['images:dev']);

    // 监听插件
    gulp.watch(path.input.lib, ['lib']);


});

// 直接运行默认语句 gulp , 自动进行 watch 监听;
gulp.task('default', ['watch']);
