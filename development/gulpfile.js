//Gulp File used in development


//Built using references from https://github.com/shakyShane/jekyll-gulp-sass-browser-sync, http://funkyjavascript.com/resize-your-images-with-gulp/ and Lynda.com

// Include the Gulp tools
var gulp        = require('gulp');
    sass        = require('gulp-sass');
    
    livereload  = require('gulp-livereload');
    browserSync = require('browser-sync');
    prefix      = require('gulp-autoprefixer');
    cp          = require('child_process');
    jekyll      = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
    messages    = {jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'};
    
    resize      = require('gulp-image-resize');
    rename      = require('gulp-rename');
    //imagemin    = require('gulp-imagemin');
    image       = require('gulp-image'),
    
    //pagespeed   = require('psi');
    //jshint      = require('gulp-jshint');
    uglify      = require('gulp-uglify');
    cleanCSS    = require("gulp-clean-css");
    htmlmin     = require('gulp-htmlmin');
    cssnano     = require('cssnano'),
    postcss     = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    precss      = require('precss'),
    useref      = require('gulp-useref');

    rev         = require('gulp-rev'),
    revReplace  = require('gulp-rev-replace'),
    revDel      = require('rev-del'),
    

    source      = 'src/',
    dev         = 'development/',
    limbo       = 'limbo/',
    dest        = 'dist/_sitetarget';
    site_imgs   = 'development/img'

//>>>>>>>>>>>>>>>>>>>>>>>>>>> Images >>>>>>>>>>>>>>>>>>>>>>>>>>>

//Image resize & rename task
gulp.task('image-resize', () => {  
    site_imgs
        .pipe(resize({
            width: 300,
            height: 300,
            crop: true,
            upscale: false
        }))
        .pipe(rename(function (path) {
            path.basename += '-300'
        }))
        .pipe(gulp.dest(limbo + 'img'))
    site_imgs
        .pipe(resize({
            width: 200,
            height: 200,
            crop: true,
            upscale: false
        }))
        .pipe(rename(function (path) {
            path.basename += '-200'
        }))
        .pipe(gulp.dest(limbo + 'img'))
    site_imgs
        .pipe(resize({
            width: 100,
            height: 100,
            crop: true,
            upscale: false
        }))
        .pipe(rename(function (path) {
            path.basename += '-thumb'
        }))
        .pipe(gulp.dest(limbo + 'img'))
}) 

// Optimize images through gulp-image
gulp.task('imageoptim', function() {
    gulp.src(limbo + 'img/*.{jpg,JPG,png}')
    .pipe(image())
    .pipe(gulp.dest(dest + 'img'));
});


//>>>>>>>>>>>>>>>>>>>>>>>>>>> HTML, JS, CSS >>>>>>>>>>>>>>>>>>>>>>>>>>>


// CSS
gulp.task('css', function() {
    return gulp.src(dev + 'scss/*.css')
    .pipe(postcss([
        precss(),
        autoprefixer(),
        cssnano()
    ]))
    .pipe(gulp.dest(limbo +'css'));
});

//JS
gulp.task('scripts', function() {
    return gulp.src(dev + 'js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(limbo + 'js'))
});

//Html
gulp.task('minify', function() {
    gulp.src(dev +'*.html')
        .pipe(htmlmin({
        collapseWhitespace: true,
        minifyJS: true,
        removeComments: true
    }))
        .pipe(gulp.dest(limbo));
});

/*// Scan HTML for assets & optimize 
gulp.task('html', function() {
  return gulp.src('*.html')
    .pipe(useref.assets({searchPath: '{.tmp}'}))
    .pipe(gulp.dest('dist/_sitetarget'));
    });*/

// Rename assets based on content cache
gulp.task('revision', ['html','css','javascript'], function() {
    return gulp.src(limbo + '**/*.{js,css}')
    .pipe(rev())
    .pipe(gulp.dest(dest))
    .pipe(rev.manifest())
    .pipe(revDel({dest: dest}))
    .pipe(gulp.dest(dest));
});

// Replace URLs with hashed ones based on rev manifest.
// Runs immediately after revision:
gulp.task('revreplace', ['revision'], function() {
    var manifest = gulp.src(dest + 'rev-manifest.json');

    return gulp.src(limbo + '**/*.html')
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest(dest));
});
//>>>>>>>>>>>>>>>>>>>>>>>>>>> Jekyll site >>>>>>>>>>>>>>>>>>>>>>>>>>>

// Build the Jekyll Site
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

// Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: 'dist/_sitetarget'
        }
    });
});

/*//Compile files from _scss into both 'dist/ _sitetarget/css' (for live injecting) and site (for future jekyll builds)
 
gulp.task('sass', function () {
    return gulp.src('/scss/style.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('dist/_sitetarget/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});*/

// Watch everything
gulp.task('watch', function() {
    gulp.watch(dev + '**/*.{html,css,js,scss}', ['revreplace']);
    gulp.watch(dev + 'img/**/*.{jpg,JPG, png}', ['imageoptim']);
    gulp.watch('/scss/*.scss', ['sass']);
    gulp.watch(['*.html', 'views/*.html'], ['jekyll-rebuild']);
});

// Default task (runs at initiation: gulp --verbose)
gulp.task('default', ['image-resize','imageoptim', 'revreplace', 'watch', 'webserver', 'browser-sync']);
