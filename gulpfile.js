var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
//src index.html文件  复制 到 app
   gulp.task("copy-index",function(){
   	return gulp.src("src/index.html").pipe(gulp.dest("app"));
   })

gulp.task("html",function(){
	return gulp.src("src/html/*").pipe(gulp.dest("app/html"));
})


// 图片自动压缩
var imgFiles = ["src/img/**/*"];
gulp.task("img",function(){
	return gulp.src(imgFiles)
	.pipe($.imagemin({
		optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
	}))
	.pipe(gulp.dest("app/img"));
})

//1. 启动本地服务
var webserver = require("gulp-webserver");
// mock数据 模拟   json数据
gulp.task("webserver",function(){
	gulp.src("./")      //表示当前文件夹
	.pipe(webserver({
		livereload:true,    // 浏览器自动刷新，更新数据，类似热替换
		port:8080,          // 自定义端口号
		host:"192.168.2.200",    // 主机,可以更换成电脑IP
		directoryListing:{   // 要不要在浏览器中显示你开发环境得项目目录,便于开发使用，如果上线，就必须设置为false
			enable:true ,     //true 显示 默认false
			path:"./"         //作用的文件目录范围
		}
	}))
})

// 2. 编译scss
var cssFiles = ["src/css/**/*"];
var sass = require("gulp-sass");
var cssgrace = require("cssgrace");
var px2rem = require("postcss-px2rem");
gulp.task("css",function(){
	var processors = [cssgrace,px2rem({remUnit: 75})];
	gulp.src(cssFiles)
	.pipe(sass().on('error',sass.logError))   // 如果sass编译错误,不会挂起这个服务,也不会编译这个报错
	.pipe($.postcss(processors))
	.pipe($.autoprefixer({
		 browsers: ['> 1%', 'last 10 versions'],   //1%市场占有率超过1%就进行兼容自动补全
         cascade: false   //是否美化属性值 默认：true
	}))
	.pipe(gulp.dest("app/css")) 
//	.pipe($.minifyCss())
//	.pipe($.rename("style.min.css"))
//	.pipe(gulp.dest("dist/scss"))
})

// 3. webpack 模块化打包js 
//output:{
//	filename:
//}
var jsFiles = ["src/js/**/*.js"];
var webpack = require("gulp-webpack");  // 依赖webpack插件，进行模块化打包
var named = require("vinyl-named");     // 取到每一个文件的名称，不包括后缀名

gulp.task("packjs",function(){
	gulp.src(jsFiles)
	.pipe(gulp.dest("app/js"))
})
//4.复制json,模拟本地数据请求
var jsonFiles = ["src/json/**/*.json"];
gulp.task("json",function(){
	gulp.src(jsonFiles).pipe(gulp.dest("app/json"))
})

// 5 生成版本号，进行版本号替换
// var rev =  require("gulp-rev");     //生成版本号
// var revCollector = require("gulp-rev-collector");   //替换版本号
// gulp.task("rev",function(){
// 	//css
// 	gulp.src("app/prd/css/wksp.css")
// 	.pipe(rev())        // 生成版本号文件
// 	.pipe(gulp.dest("app/prd/css"))
// 	.pipe(rev.manifest())     //生成对应版本号的json文件，缓存json文件
// 	.pipe(gulp.dest("app/ver/css"))
// 	// js
// 	gulp.src("app/prd/js/wksp.js")
// 	.pipe(rev())
// 	.pipe(gulp.dest("app/prd/js"))
// 	.pipe(rev.manifest())
// 	.pipe(gulp.dest("app/ver/js"));
// })

// gulp.task("html-ver",function(){
// 	gulp.src(["app/ver/**/*.json","app/*.html"])
// 	.pipe(revCollector({replaceReved:true}))   //把json里面对应的文件名称替换为有版本号的文件名称
// 	.pipe(gulp.dest("app"))
	
// 	console.log("版本号替换");
// })
// gulp.task("min",["rev","html-ver"]);

//复制lib-flexible
gulp.task("public",function(){
	gulp.src("src/public/**/*")
	.pipe(gulp.dest("app/public"))
})



// 清空app
gulp.task("clean",function(){
	gulp.src("app").pipe($.clean()).pipe($.notify());
})
gulp.task("build",["public","copy-index","html","img","css","packjs","json"])

gulp.task("hello",function(){
	console.log("hello");
});

gulp.task("watch",function(){
	gulp.watch("src/index.html",["copy-index"]);
	gulp.watch(imgFiles,["img"]);
	gulp.watch(cssFiles,["css"]);
	gulp.watch(jsFiles,["packjs"]);
	gulp.watch(jsonFiles,["json"]);
	gulp.watch("src/html/*",["html"]);
//	gulp.watch([cssFiles,jsFiles],["min"]);
//	gulp.watch([cssFiles,jsFiles],["html-ver"]);
//	gulp.watch("app/prd/js/wksp.js",["min"]);
})
gulp.task("default",["build","webserver","watch"],function(){
	
});
