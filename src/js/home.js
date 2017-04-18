

var mySwiper = new Swiper('.swiper-container',{
	pagination : '.swiper-pagination',
	
})
//var  $check=$("input[type='radio']");
$(".content").on("click","input[type='radio']",function(event){
	event.stopPropagation();
	//console.log(this)
	if($(this).is(':checked')){
	   $(this).parent().css({"backgroundColor": "#239aff","color":"#ffffff","borderColor":"#ffffff"})
	   .siblings().css({"backgroundColor": "#ffffff","color":"#666666","borderColor":"#666666"});
	}
	
})
	
checkSsid(data)
$.ajax({
	url:baseURI+"Info",
	type:"post",
	data:data,
	success:function(res){
			//console.log(res)
			if(res.code==100){
				$(".total_view").html("曝光量："+res.datas.total_view)
				$(".total_click").html("曝光量："+res.datas.total_click)
			}
			
	}	
})
//标签分类
$.ajax({
	url:baseURI+"Tag",
	type:"post",
	data:data,
	success:function(res){
		console.log(res.tagList)
		var  $tagList=res.tagList;
		if($tagList.length==0){
			var $label=$('<label><a href="setad.html">+</a></label>')
			.appendTo($(".form-title"))

		}else{
			for(var i=0;i<$tagList.length;i++){
				var $label=$('<label><input name="title-w" type="radio" value='+$tagList[i].id+' />'+$tagList[i].name+'</label>')
				.appendTo($(".form-title"))
			}
		}
		
		
	}
})
//文章分类ArticleClassList

$.ajax({
	url:baseURI+"ArticleClassList",
	type:"post",
	data:data,
	success:function(res){
		console.log(res)
		var  $classList=res.classList;
		for(var i=0;i<$classList.length;i++){
			var $label=$('<label><input name="title-w" type="radio" value='+$classList[i].id+' />'+$classList[i].name+'</label>')
			.appendTo($(".form-class"))
		}
		
	}
})


//提交文章
$(".sub").click(function(){
	var  tagid=$('.form-title input:radio:checked').val();
	var  classid=$('.form-class input:radio:checked').val();
	var wxurl=$(".wxurl").val();
	console.log(tagid+" "+classid);
	var data={
		tagid:tagid,
		classid:classid,
		wxurl:wxurl
	}
	if(tagid==undefined){
		layer.open({
			className:"loginOk",
		    content:'请选择标签'
		    ,skin: 'msg'
		    ,time: 2, //2秒后自动关闭
		    end:function(){
				
		  }
		  });
	}else if(classid==undefined){
		layer.open({
			className:"loginOk",
		    content:'请选择分类'
		    ,skin: 'msg'
		    ,time: 2, //2秒后自动关闭
		    end:function(){
				
		  }
		  });
	}else if(wxurl==""){
		layer.open({
			className:"loginOk",
		    content:'文章链接不能为空'
		    ,skin: 'msg'
		    ,time: 2, //2秒后自动关闭
		    end:function(){
				
		  }
		  });
	}else{
		checkSsid(data)
		$.ajax({
			url:baseURI+"MakeArticle",
			type:"post",
			data:data,
			success:function(res){
				console.log(res)
				layer.open({
					className:"loginOk",
				    content:res.msg
				    ,skin: 'msg'
				    ,time: 2, //2秒后自动关闭
				    end:function(){
						
				  }
				  });
				
			}
		})
	}
})