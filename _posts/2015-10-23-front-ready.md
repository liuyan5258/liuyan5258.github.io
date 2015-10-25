---
layout: post
title:  "如何用gulp搭建一个自动化的(gulp+browserify+react+less+es6)前端开发环境"
date:   2015-10-23 15:42:00
categories: tools
excerpt: 前端项目框架
---

* content
{:toc}

###一些前期准备    

> 1. node
> 2. browserify VS webpack  
> 3. npm VS bower  
> 4. npm的package.json配置文件  
> 5. webpack的配置文件webpack.config.js 
> 6. ES6 (babel-loader组件，有了babel工具就可以用ES6编写react组件了)  
> 7. grunt vs gulp  

`好吧，回归主题` 

###gulp 

Gulp 是一款基于任务的设计模式的自动化工具，通过插件的配合解决全套前端解决方案，如静态页面压缩、图片压缩、JS合并、less同步编译并压缩CSS、服务器控制客户端同步刷新。  

###gulp的安装  
> npm install -g gulp  #全局安装  

###选择gulp组件  

前端项目的功能：  
1. 样式 （支持less 同时支持合并、压缩、重命名）  
2. javascript （检查、合并、压缩、重命名）  
3. 利用node.js实现js模块化加载  
4. 浏览器自动刷新  
5. 保持发布环境的清洁   

gulp的组件：  

1. `del`：删除文件／文件夹  
2. `gulp-run`：让gulp任务，可以相互独立，解除任务间的依赖，增强task复用  
3. `gulp-less`：支持less  
4. `gulp-minify-css`：压缩css   
5. `gulp-uglify`：压缩js代码  
6. `gulp-concat`：合并文件  
7. `gulp-jshint`：检查js  

其他组件：  

1. `browserify`：前端模块及依赖管理  
2. `browser-sync`：浏览器同步刷新  
3. `vinyl-source-stream` ＋ `vinyl-buffer`：把browserify 输出的数据进行准换，使之流符合 gulp 的标准  
4. `babelify`：合并模块时对 ES6 和 ES7 进行编译转换  

实际编程用到的组件库：  

1. jquery.min.js  
2. react.min.js  
3. react-dom.min.js 

###安装所有组件  

	npm install .  

###项目目录结构  

react-example（项目名称）  
|-app（生产环境下的所有react组件和js文件）  
|-assets（生产环境下的所有less文件）  
|-dist（发布环境）  
	&emsp;&emsp;|-app.js（合并之后的js文件）  
	&emsp;&emsp;|-style.css（合并之后的css文件）  
|-node_modules（组件目录）  
|-.gitignore （不需要加入版本管理的文件）  
|-gulpfile.js（gulp任务文件）  
|-index.html（静态文件）  
|-package.json（npm安装模块的配置文件）  

###gulp基本语法  

> gulpfile.js中gulp有五个方法：src、dest、task、run、watch  
> src和dest：指定源文件和处理后文件的路径  
> watch：用来监听文件的变化  
> task：指定任务  
> run：执行任务  

###编写gulp任务  

	var gulp = require('gulp'),
	    del = require('del'),
	    run = require('gulp-run'),
	    less = require('gulp-less'),
	    cssmin = require('gulp-minify-css'),
	    browserify = require('browserify'),
	    uglify = require('gulp-uglify'),
	    concat = require('gulp-concat'),
	    jshint = require('gulp-jshint'),
	    browserSync = require('browser-sync'),
	    source = require('vinyl-source-stream'),
	    buffer = require('vinyl-buffer'),
	    package = require('./package.json'),
	    babelify = require('babelify'),
	    reload = browserSync.reload;


	/**
	 * Cleaning dist/ folder
	 */
	gulp.task('clean', function(cb) {
	  del(['dist/**'], cb);
	})

	/**
	 * Running livereload server
	 */
	.task('server', function() {
	  browserSync({
	    server: {
	     baseDir: './' 
	    }
	  });
	})

	/**
	 * Less compilation
	 */
	.task('less', function() {
	  return gulp.src(package.paths.less)
	  .pipe(less())
	  .pipe(concat(package.dest.style))
	  .pipe(gulp.dest(package.dest.dist));
	})
	.task('less:min', function() {
	  return gulp.src(package.paths.less)
	  .pipe(less())
	  .pipe(concat(package.dest.style))
	  .pipe(cssmin())
	  .pipe(gulp.dest(package.dest.dist));
	})

	/**
	 * JSLint/JSHint validation
	 */
	.task('lint', function() {
	  return gulp.src(package.paths.js)
	  .pipe(jshint())
	  .pipe(jshint.reporter('default'));
	})

	/** JavaScript compilation */
	.task('js', function() {
	  return browserify(package.paths.app)
	  .transform(babelify)
	  .bundle()
	  .pipe(source(package.dest.app))
	  .pipe(gulp.dest(package.dest.dist));
	})
	.task('js:min', function() {
	  return browserify(package.paths.app)
	  .transform(babelify)
	  .bundle()
	  .pipe(source(package.dest.app))
	  .pipe(buffer())
	  .pipe(uglify())
	  .pipe(gulp.dest(package.dest.dist));
	})

	/**
	 * Compiling resources and serving application
	 */
	.task('serve', ['clean', 'lint', 'less', 'js', 'server'], function() {
	  return gulp.watch([
	    package.paths.js, package.paths.jsx, package.paths.html, package.paths.less
	  ], [
	   'lint', 'less', 'js', browserSync.reload
	  ]);
	})
	.task('serve:minified', ['clean', 'lint', 'less:min', 'js:min', 'server'], function() {
	  return gulp.watch([
	    package.paths.js, package.paths.jsx, package.paths.html, package.paths.less
	  ], [
	   'lint', 'less:min', 'js:min', browserSync.reload
	  ]);
	});  

###package.json配置文件  

	{
	  "name": "react-test",
	  "version": "0.0.0",
	  "devDependencies": {
	    "gulp-run": "1.6.5",
	    "gulp-less": "2.0.1",
	    "gulp-concat": "2.4.3",
	    "gulp-uglify": "1.0.2",
	    "gulp-minify-css": "0.3.11",
	    "gulp-jshint": "1.9.0",
	    "browser-sync": "1.8.2",
	    "browserify": "^10.2.1",
	    "vinyl-source-stream": "^1.1.0",
	    "vinyl-buffer": "1.0.0",
	    "jquery": "^2.0.3",
	    "react": "0.14.0",
	    "react-dom": "0.14.0",
	    "babelify": "^6.1.1",
	    "del": "1.1.1"
	  },
	  "paths": {
	    "less": "assets/less/*.less",
	    "js": "./app/**/*.js",
	    "jsx": "./app/**/*.jsx",
	    "app": "./app/app.jsx",
	    "html": "*.html"
	  },
	  "dest": {
	    "style": "style.css",
	    "app": "app.js",
	    "dist": "dist"
	  },
	  "dependencies": {
	    "gulp": "^3.9.0"
	  },
	  "engines": {
	    "node": ">=0.10.0"
	  }
	}  

###用es6编写react组件  

组件`Hello.jsx`  

	import React from 'react';
	export default class Hello extends React.Component {
	  render() {
	    return (
	      <h1>Hello {this.props.name}!</h1>
	    );
	  }
	}  

`app.jsx`  

	import Hello from './components/Hello.jsx';

	var render = function() {

	  ReactDOM.render(
	    <div>
	      <Hello name="kenan"/>
	      <p>how are you?</p>
	    </div>,
	    document.getElementById("example")
	 );
	};

	render();  


###运行项目  

gulp serve  

###git 仓库  

https://github.com/liuyan5258/react-example.git  

###学习资源链接  

0. [《ECMAScript 6入门》阮一峰](http://es6.ruanyifeng.com/)
1. [通过 Browserify 在浏览器中使用 NodeJS 模块](http://www.ibm.com/developerworks/cn/web/1501_chengfu_browserify/)    
2. [browserify运行原理分析](http://blog.jobbole.com/78825/)  
3. [Gulp思维——Gulp高级技巧](http://segmentfault.com/a/1190000000711469#articleHeader2)  
4. [gulp api文档](http://www.gulpjs.com.cn/docs/api/)  
5. [基于ES6，使用React、Webpack、Babel构建模块化JavaScript应用](http://www.csdn.net/article/2015-05-24/2824757-building-modular-javascript-applications-in-es6-with-react-webpack-and-babel?reload=1)  
6. [React 入门–高效开发环境的搭建](http://www.tuicool.com/articles/rY7FR32)  
7. [React.js + Babel + Browserify + gulp の環境を作ってみた](http://qiita.com/hkusu/items/e068bba0ae036b447754)  
8. [在 Gulp 中使用 Browserify](http://www.tuicool.com/articles/MFjAZn6)  
9. [package.json字段全解](http://blog.csdn.net/woxueliuyun/article/details/39294375)  
10. [当 React 遇见 Gulp 和 Browserify](http://www.jianshu.com/p/tY6UPN)  
11. [WEBPACK FOR BROWSERIFY USERS](https://webpack.github.io/docs/webpack-for-browserify-users.html)  
















