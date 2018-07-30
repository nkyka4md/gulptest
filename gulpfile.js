var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');



var baseDir = 'html/';
var assetsDir = 'html/assets/';

//CSSを圧縮、書き出しする「cssmin」タスク
gulp.task('cssmin', function () {
	gulp.src(assetsDir + 'css/global.dev.css')//対象ファイルを指定。pipeで処理をつなげていく
		.pipe(cssmin())                         //圧縮
		.pipe(rename('global.css'))             //リネーム
		.pipe(gulp.dest(assetsDir + 'css'));      //保存
});

//ブラウザと同期させる「browser-sync」「reload」タスク
gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: baseDir,
		}
	});
});
gulp.task('reload', function () {
	browserSync.reload();
});

//watchタスク
gulp.task('watch', function () {
	//global.cssに変更があったら「cssmin」タスクを実行
	gulp.watch(assetsDir + 'css/global.dev.css', ['cssmin']);
	//HTMLファイル,もしくはCSSファイルに変更があったら「reload」タスクを実行
	gulp.watch(baseDir + '**/*.html', ['reload']);//ワイルドカード「*」も使える
	gulp.watch(assetsDir + 'css/global.dev.css', ['reload']);
});

//defaultタスク
gulp.task('default', ['cssmin', 'browser-sync', 'watch']);
