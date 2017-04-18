//获取子账号列表

$(".content").on("click",".del",function(e){
	var  tid=this.dataset.id;
	console.log(tid)
	window.location.href="editc.html?tid="+tid;
})



//获取文章数据
//定义初始page
var nowpage=1;
var  $keyword="";
getdata(nowpage);
function getdata(page,keyword){
	var data={
		"page":page,
		"psize":20,
		"keyword":keyword,
		"needcount":1
	}
	checkSsid(data)
	$.ajax({
		url:baseURI+"/ChildList",
		type:"post",
		data:data,
		success:function(res){
			var totalPage=res.pageinfo.totalPage;
			checkSsid(res.testssid);
			console.log(res)
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
		var $id=datas[i].id;
		var $index=(nowid-1)*20+i+1
		var $tr=$('<tr class="item" data-id='+$id+'><td class="num">'+$index+'</td><td class="title">'+datas[i].name+'</td><td class="exposure">'+datas[i].view_times+'</td><td class="hit">'+datas[i].url_clicks+'</td><td class="handel del"  data-id='+$id+'>编辑</td></tr>')
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
$("header").on("click",".search",function(){
	$keyword=$(".keyword").val();
	console.log($keyword);
	$(".item").remove();
	nowpage=1;
	getdata(nowpage,$keyword);
})





//////////////////////////////////////////////////////////////

