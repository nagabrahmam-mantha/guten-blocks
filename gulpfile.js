var autoprefixer = require('autoprefixer');
var gulp = require('gulp');
var concat = require('gulp-concat');
var cssnano = require('cssnano');
var order = require('gulp-order');
var path = require('path');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
const terser = require('gulp-terser');
var browserify = require('browserify')

var gulpConfig = require('./gulp-config.json');
if (!gulpConfig.wp_content_dir) {
	console.log('error: wp_content_dir is not defined in gulp-config.json');
	process.exit(1);
}

var wpcontent = path.resolve(gulpConfig.wp_content_dir);
var theme = path.resolve(gulpConfig.wp_content_dir + '/wp-content/themes/blocks');
console.log(theme);

//Moves the required CSS and JS files from node_modules folder.
function moveCss(){
	/*return gulp.src([
		//ppp
		])
	.pipe(gulp.dest('src/vendor-css'))*/
}

function moveJs(){
	return gulp.src([
		'lib/bootstrap/dist/js/bootstrap.js',
		'node_modules/popper.js/dist/umd/popper.js',
		'node_modules/jquery/dist/jquery.js',
		'node_modules/moment/min/moment.min.js',   // For moment.js, use minified version else gulp will throw an error.
	])
	.pipe(gulp.dest('src/vendor-js'))
}

function moveFonts(){
	/*return gulp.src([
	])
	.pipe(gulp.dest(theme + '/assets/fonts/'));*/
}

function moveCssImages(){  /*Since empty, removed it from gulp-move function. Add it back if there are any files*/
	return gulp.src([
	])
	.pipe(gulp.dest(theme + '/assets/css/images/'));
}

//Moves all the build files from src folder to theme folder.
function img() {
	return gulp.src('src/img/**/*')
	.pipe(gulp.dest(theme + '/assets/img/'));
};

function frontendJs() {
	return gulp.src('src/js/front-end/**/*.js')
	.pipe(plumber())
	.pipe(uglify())
	.pipe(concat('script.min.js'))
	.pipe(gulp.dest(theme + '/assets/js/'));
};

function adminJs() {
	return gulp.src('src/js/admin/**/*.js')
	.pipe(terser())
	.pipe(plumber())
	.pipe(concat('admin.min.js'))
	.pipe(gulp.dest(theme + '/assets/js/'));
};

function loginJs() {
	return gulp.src('src/js/login/**/*.js')
	.pipe(plumber())
	.pipe(uglify())
	.pipe(concat('login.min.js'))
	.pipe(gulp.dest(theme + '/assets/js/'));
};

function frontendScss() {
	return gulp.src(['src/scss/front-end/style.scss'])
	.pipe(plumber())
	.pipe(sass())
	.pipe(postcss([autoprefixer(), cssnano()]))
	.pipe(concat('style.min.css'))
	.pipe(gulp.dest(theme + '/assets/css/'));
};

function adminSpecificCss() {
	return gulp.src('src/scss/admin/admin-specific/*.css')
	.pipe(postcss([autoprefixer(), cssnano()]))
	.pipe(gulp.dest(theme + '/assets/css/'));
};

function adminScss() {
	return gulp.src(['src/scss/admin/admin-style.scss'])
	.pipe(plumber())
	.pipe(sass())
	.pipe(postcss([autoprefixer(), cssnano()]))
	.pipe(concat('admin.min.css'))
	.pipe(gulp.dest(theme + '/assets/css/'));
};

function loginScss() {
	return gulp.src(['src/scss/login/login-style.scss'])
	.pipe(plumber())
	.pipe(sass())
	.pipe(postcss([autoprefixer(), cssnano()]))
	.pipe(concat('login.min.css'))
	.pipe(gulp.dest(theme + '/assets/css/'));
};

function templates() {
	return gulp.src('src/templates/**/*')
	.pipe(gulp.dest(theme));
};

function vendorCss() {
	return gulp.src('src/vendor-css/*.css')
	.pipe(plumber())
	.pipe(postcss([autoprefixer(), cssnano()]))
	.pipe(concat('vendor.min.css'))
	.pipe(gulp.dest(theme + '/assets/css/'));
};

function vendorJs() {
	return gulp.src('src/vendor-js/*.js')
	.pipe(plumber())
	.pipe(order([
		"src/vendor-js/jquery.js",
		"src/vendor-js/popper.js",
		"src/vendor-js/bootstrap.js",
		"src/vendor-js/moment.min.js",
		"src/vendor-js/*.js"
	], { base: __dirname }))
	.pipe(concat('vendor.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest(theme + '/assets/js/'));
};

exports.moveCss = moveCss
exports.moveJs = moveJs
exports.moveFonts = moveFonts
exports.moveCssImages = moveCssImages

exports.img = img
exports.frontendJs = frontendJs
exports.adminJs = adminJs
exports.loginJs = loginJs
exports.frontendScss = frontendScss
exports.adminSpecificCss = adminSpecificCss
exports.adminScss = adminScss
exports.loginScss = loginScss
exports.templates = templates
exports.vendorCss = vendorCss
exports.vendorJs = vendorJs

var move = gulp.parallel(moveCss, moveJs, moveFonts);
var build = gulp.parallel(img, frontendJs, adminJs, loginJs, frontendScss, adminSpecificCss, adminScss, loginScss, templates, vendorCss, vendorJs);

gulp.task('move', move);
gulp.task('default', build);

gulp.task('watch', function () {
	gulp.watch('src/img/**/*', gulp.series('img'));
	gulp.watch('src/js/front-end/**/*.js', gulp.series('frontendJs'));
	gulp.watch('src/js/admin/**/*.js', gulp.series('adminJs'));
	gulp.watch('src/js/login/**/*.js', gulp.series('loginJs'));
	gulp.watch('src/scss/front-end/**/*.scss', gulp.series('frontendScss'));
	gulp.watch('src/scss/admin/**/*.scss', gulp.series('adminScss', 'adminSpecificCss'));
	gulp.watch('src/scss/login/**/*.scss', gulp.series('loginScss'));
	gulp.watch('src/templates/**/*', gulp.series('templates'));
	gulp.watch('src/vendor-css/*.css', gulp.series('vendorCss'));
	gulp.watch('src/vendor-js/*.js', gulp.series('vendorJs'));
});
