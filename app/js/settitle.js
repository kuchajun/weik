
var  data=checkSsid();		
$.ajax({
	url:baseURI+"Tag",
	type:"post",
	data:data,
	success:function(res){
		console.log(res)
		var  $tagList=res.tagList;
		if($tagList.length){
			 createItem($tagList)
		}
		
	}
})






//创建元素
function createItem(tagList){
	var $table = $(".settitle").find("table");
	//console.log(tagList)
	for(var i=0;i<tagList.length;i++){
		$tr=$('<tr><td class="num">'+(i+1)+'</td><td class="title">'+tagList[i]["name"]+'</td><td  data-id='+tagList[i]["id"]+'  class="edit">编辑</td><td data-id='+tagList[i]["id"]+' class="handel del">删除</td></tr>').appendTo($table)

	}
}


//文章标签点击删除
$(".settitle").on("click",".del",function(){
	var that=this
	layer.open({
		className:'tdel',
		content: '您确定要删除吗？'
		,btn: ['确定', '取消']
		,yes: function(index){
			var $tid=that.dataset.id
			console.log($tid)
			var data={
				tid:$tid
			}
			data=checkSsid(data)
			console.log(data)

			$.ajax({
				url:baseURI+"DeleteTag",
				type:"post",
				data:data,
				success:function(res){
					console.log(res)
					if(res.code==100){
						$(that).parent().css({"height":0,"border":"none"})
					}else{

					}
				}
			})

			layer.close(index);
		}
	});
})

//点击跳转编辑标签
$(".settitle").on("click",".edit",function(){
	console.log(this.dataset.id)
	var  $tid=this.dataset.id;
	window.location.href="setad.html?tid="+$tid;
})


















