var gulp = require("gulp"),
    sass = require("gulp-sass"),
    browserSync = require("browser-sync"),
    uglify = require("gulp-uglifyjs"),
    del = require("del"),
    prefixer = require("gulp-autoprefixer"),
    rigger = require("gulp-rigger"),
    imagemin = require('gulp-imagemin'),
    сombineMQ = require('gulp-combine-mq'),
    cssmin = require('gulp-cssmin'),
    minify = require('gulp-minify'),
    reload = browserSync.reload;

var path = {
    build: {
        html: "build/",
        js: "build/js/",
        style: "build/css/",
        images: "build/images/",
        fonts: "build/fonts/"
    },
    src: {
        html: ["app/**/*.html", "!app/templates/*.html"],
        js: "app/js/scripts.js",
        style: "app/style/**/*.*",
        images: "app/images/**/*.*",
        fonts: "app/fonts/**/*.*"
    },
    watch: {
        html: 'app/**/*.html',
        js: 'app/js/**/*.js',
        style: 'app/style/**/*.*',
        images: 'app/images/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    clean: "build/*"
};

var config = {
    server: {
        baseDir: "./build",
        directory: true
    },
    tunnel: false,
    // host: 'localhost',
    // port: 9000,
    logPrefix: "pioo",
    notify: false
};

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .on('end', browserSync.reload);
    // .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(uglify())
        // .pipe(minify())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sass( /*{outputStyle: 'expanded'}*/ ).on('error', sass.logError))
        .pipe(prefixer(["last 15 versions", "ie 11"]))
        .pipe(сombineMQ({
            beautify: true
        }))
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.style))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('image:build', function () {
    gulp.src(path.src.images)
        //.pipe(imagemin({
        // progressive: true,
        // svgoPlugins: [{removeViewBox: false}],
        // use: [pngquant()],
        // interlaced: true
        //}))
        .pipe(gulp.dest(path.build.images))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('build', [
	    'html:build',
	    'js:build',
	    'style:build',
	    'image:build',
	    'fonts:build'
	]);


gulp.task('watch', function () {

    gulp.watch([path.watch.html], function () {
        gulp.run('html:build');
    });

    gulp.watch([path.watch.style], function () {
        gulp.run('style:build');
    });

    gulp.watch([path.watch.js], function () {
        gulp.run('js:build');
    });

    gulp.watch([path.watch.images], function () {
        gulp.run('image:build');
    });

    gulp.watch([path.watch.fonts], function () {
        gulp.run('fonts:build');
    });
});

gulp.task('clean', function () {
    del(path.clean)
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('default', ['build', 'webserver', 'watch']);