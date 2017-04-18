$(".content").on("click",".del",function(e){
	var that=this
	 layer.open({
	    content: '您确定要删除吗？'
	    ,btn: ['确定', '取消']
	    ,yes: function(index){
	      //location.reload();
	      layer.close(index);
	      var $id=that.dataset.id;
	      var data={aid:$id};
	      checkSsid(data)
	      $.ajax({
			url:baseURI+"/DelArticle",
			type:"post",
			data:data,
			success:function(res){
					console.log(res)
					
					$(that).parent().css({height:0,border:0})
				}	
			})
	    }
	  });
	 e.stopPropagation();
})
$(".content").on("click",".item",function(e){
	var $url=this.dataset.url;
	console.log($url);
	window.location.href=$url;
})






//获取文章数据
//定义初始page
var nowpage=1;
var  $keyword="";
getdata(nowpage);
function getdata(page,keyword,starttime,endtime){
	var data={
		"page":page,
		"psize":20,
		"keyword":keyword,
		"starttime":starttime,
		"endtime":endtime
	}
	checkSsid(data)
	$.ajax({
		url:baseURI+"/ArticleList",
		type:"post",
		data:data,
		success:function(res){
			console.log(res)
			console.log(res.pageinfo)
			var totalPage=res.pageinfo.totalPage;
			checkSsid(res.testssid);
			
			if(res.code==100){
				var nowid=page
				var  datas=res.datas;
				
				if(nowpage<=totalPage){
					nowpage=page+1;
					cItems(datas,nowid)
				}else{
					$(pullUpEl).css("visibility","hidden");
					myiscroll.refresh();
					return false
					
				}
				
				
				console.log(datas)
				
			}
		}
	})
}





//创建列表
function cItems(datas,nowid){
	var $table=$(".content").find("table")
	for(i=0;i<datas.length;i++){
		var $id=datas[i].href.split("id/")[1]
		var $index=(nowid-1)*20+i+1
		var $tr=$('<tr class="item" data-url='+datas[i].href+'><td class="num">'+$index+'</td><td class="title">'+datas[i].title+'</td><td class="exposure">'+datas[i].view_times+'</td><td class="hit">'+datas[i].url_clicks+'</td><td class="handel del"  data-id='+$id+'>删除</td></tr>')
		$tr.appendTo($table)
	}
	 myiscroll.refresh();
}


//上拉加载更多
var myiscroll,
	pullDownEl, pullDownOffset,_maxScrollY,
	pullUpEl, pullUpOffset,refresh=0,loadmore=0;
var oul = document.getElementById("thelist");	


// 上拉加载更多请求ajax的回调函数
function pullUpAction(){
		
		
	getdata(nowpage,$keyword);
		
		

	
	
	
	   //ajax添加dom，dom改变，重新刷新
	
}
function loaded(){
	
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight; 
	myiscroll =  new iScroll("wrapper",{
		vScroll:true,      //false禁用垂直方向滚动条
		vScrollbar:true,   //隐藏滚动条
		hideScrollbar:true, //用户没有操作时候默认(true)隐藏滚动条 false不隐藏
		fadeScrollbar:true,
		bounce:true,   //是否有反弹效果
		lockDirection:true, //当某一方向滚动时，会锁住另一方向的滚动
		useTransition:true,  //是否使用css3过渡效果
		topOffset:pullDownOffset,    //已经滚动的基准值
		
		//表示滚动条重新 刷新  每次改变滚动区域的dom结构后必须重新刷新你的iscroll
		onRefresh: function () {
            _maxScrollY = this.maxScrollY = this.maxScrollY + pullUpOffset;
     
			 if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多...';
			}
		},
		//表示滚动条开始滑动
		onScrollMove: function () {
		// this.y  滚动条滚动的值,滚动区域滚动大大小;
		// this.maxScrollY  滚动条滚动到底部可走的最大距离  负数
		// this.minScrollY  滚动条滚动到顶部可走的最大距离  负数
		//console.log(this.maxScrollY);
		//console.log(this.y);
			if (this.y <= (_maxScrollY - pullUpOffset) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开加载...';
                this.maxScrollY = this.maxScrollY - pullUpOffset;
			} else if (this.y > (_maxScrollY - pullUpOffset) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多...';
                this.maxScrollY = this.maxScrollY + pullUpOffset;
			}
		},
		//表示滚动条滑动结束时候
		onScrollEnd: function () {
			 if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多...';
				pullUpAction();	// ajax调用
			}
		}
	});
}
//document.addEventListener("",function(e){e.preventDefault()},!1);
document.addEventListener("DOMContentLoaded",loaded,!1);	


//搜索
$("header").on("click",".search1",function(){
	$keyword=$(".keyword").val();
	console.log($keyword);
	$(".item").remove();
	nowpage=1;
	getdata(nowpage,$keyword);
})
//按时间分类
$(".ctime").on("click",".clean",function(){
	var  $starttime=$(".timestart").val();
	var  $endtime=$(".timeend").val();
	$(".item").remove();
	nowpage=1;
	getdata(nowpage,$keyword,$starttime,$endtime);
})