//获取地址栏参数
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
var  tId=GetQueryString("tid")
console.log(tId);
if(tId){
	$("header").find(".active").html("广告设置");
	//获取广告配置
	var data={
		tid:tId
	}
	checkSsid(data)
	console.log(data)
	$.ajax({
		url:baseURI+"GetTagInfo",
		type:"post",
		data:data,
		success:function(res){
			console.log(res)
			if(res.code==100){
				var tagInfo=res.tagInfo
				//$(".setad").empty();
				createState(tagInfo);
			}
		}
	})

}
//修改元素状态
function createState(tagInfo){
	
	function changState(adon,adclass){
		//更改状态
		if(tagInfo["article_"+adon+"_adon"]){
			$(adclass+" .statead").attr("data-adon","1").find("span").html("启用")
		}else{
			$(adclass+" .statead").attr("data-adon","0").find("span").html("停用")
		}
		//更改广告链接
		$(adclass+" .linkad").find("span").html(tagInfo["article_"+adon+"_adurl"])
		//图片
		var $imgLIst=tagInfo["article_"+adon+"_adimagepath"];
		console.log($imgLIst)
		var $setImg=$(adclass+" .setImg");
		if($imgLIst.length==3){
			$setImg.find(".morepic").hide();
		}
		for(var i=0;i<$imgLIst.length;i++){
			var $liImg=$('<li class="newpic oldpic" data-id='+$imgLIst[i].id+' ><img src="http://192.168.2.234:8801'+$imgLIst[i].path+'"/><span class="pdel"></span></li>')
			$setImg.prepend($liImg);
		}
		
	}
	changState("top",".topad");
	changState("bottom",".botad");
	changState("float",".fixad");
	//自动跳转状态
	if(tagInfo.article_auto_jump){
		$(".setskip .statead").attr("data-adon","1").find("span").html("启用")
	}else{
		$(".setskip .statead").attr("data-adon","0").find("span").html("停用")
	}
	//跳转链接
	var $autoType=tagInfo.article_auto_type
	if($autoType=="top"){
		$(".setskip .setlink").attr("data-adtype","top").find("span").html("顶部广告链接")
	}else if($autoType=="bottom"){
		$(".setskip .setlink").attr("data-adtype","bottom").find("span").html("底部广告链接")
	}else if($autoType=="float"){
		$(".setskip .setlink").attr("data-adtype","float").find("span").html("悬浮广告链接")
	}else if($autoType=="custom"){
		$(".setskip .setlink").attr("data-adtype","custom").find("span").html(tagInfo.article_jump_target)
	}
	//跳转延时
	var $seconds=tagInfo.article_jump_seconds
	$(".setskip .stime").find("span").html($seconds)
	//标签名
	var $name=tagInfo.name;
	$(".iName").val($name)

	//初始显示隐藏
	if(tagInfo.article_top_adon==0){
		$(".topad").find(".stop").hide()
	}
	if(tagInfo.article_bottom_adon==0){
		$(".botad").find(".stop").hide()
	}
	if(tagInfo.article_float_adon==0){
		$(".fixad").find(".stop").hide()
	}
	if(tagInfo.article_auto_jump==0){
		$(".fixad").find(".stop").hide()
	}
}
//保存修改标签
$(".setad").on("click",".keep",function(){
	//获取标签属性
	var data={};
	if(tId){
		data["tagid"]=tId;
	}
	function setdata(pos,adclass){
		data[pos+"adon"]=$(adclass+" .statead").attr("data-adon");
		data[pos+"adurl"]=$(adclass+" .linkad").find("span").html();
		data[pos+"adimgold"]=[];
		var oldImg=$(adclass+" .setImg").find(".oldpic");//.attr("data-id");
		for(var i=0;i<oldImg.length;i++){
			data[pos+"adimgold"][i]=oldImg.eq(i).attr("data-id")
		}
		data[pos+"adimg"]=[];
		var newImg=$(adclass+" .setImg").find(".newImg");
		for(var i=0;i<newImg.length;i++){
			data[pos+"adimg"][i]=newImg.eq(i).find("img").attr("src")
		}

	}
	setdata("top",".topad");
	setdata("bottom",".botad");
	setdata("float",".fixad");
	//autojumpon、autojumptype、autojumptarget、autojumptime、tagname
	data["autojumpon"]=$(".setskip .statead").attr("data-adon");
	data["autojumptype"]=$(".setskip .setlink").attr("data-adtype");
	if(data["autojumptype"]=="custom"){
		data["autojumptarget"]=$(".setskip .setlink").find("span").html();
	}
	data["autojumptime"]=$(".setskip .stime").find("span").html();
	data["tagname"]=$(".iName").val()
	//console.log(data)
	checkSsid(data)
	console.log(data)
	$.ajax({
		url:baseURI+"UpdateTag",
		type:"post",
		data:data,
		success:function(res){
			layer.open({
				className:"loginOk",
			    content: res.msg
			    ,skin: 'msg'
			    ,time: 2, //2秒后自动关闭
			    end:function(){
					
			  }
			  });
			
		}
	})


})




//更改广告的状态
$(".setad").on("click",".statead",function(){
	

	var that=this
	
	var $adno=that.dataset.adon;
	if($adno){
		var $content='<input id="yes" checked class="gTel" name="state" type="radio" value="1"><label for="yes">启用<i></i></label><input id="no" name="state" class="gTel" type="radio" value="0"><label for="no">停用<i></i></label>';
	}else{
		var $content='<input id="yes"  class="gTel" name="state" type="radio" value="1"><label for="yes">启用<i></i></label><input id="no" name="state" class="gTel" type="radio" value="0" checked><label for="no">停用<i></i></label>'
	}
	
	layer.open({
		className:"chstate",
		title:"更改状态",
		content: $content
	    ,btn: ['保存', '取消']
	    ,yes: function(index){
	      var  $val=$('input:radio:checked').val();
	      var $dl=$(that).parent()
	      console.log($val)
	      if($val==1){
	      	$(that).attr("data-adon","1").find("span").html("启用")
	      	$dl.find(".stop").fadeIn();
	      }else if($val==0){
	      	$(that).attr("data-adon","0").find("span").html("停用")
	      	$dl.find(".stop").fadeOut();
	      }
	      
	      layer.close(index);
	    }
	  });
	

})

//更改广告链接
$(".setad").on("click",".linkad",function(){
	var that=this
	layer.open({
		className:"lianjie",
		title:"更改广告链接",
		content: '<input class="getlink" type="text">'
	    ,btn: ['保存', '取消']
	    ,yes: function(index){
	      var  $val=$(".getlink").val()
	      
	      $(that).find("span").html($val)
	     
	      layer.close(index);
	    }
	  });
})
//更改广告图片
function changeFile (obj) {
	var $ul=$(obj).parent().parent();
    if (!obj.files.length) return;
    if (obj.files.length > 1) {
        alert("只允许上传一张图片!");
        return;
    }
   
    var file = obj.files[0];

    var reader = new FileReader();
    reader.onload = function () {
    	
        var result = this.result;    //data:base64    
        
        var $li=$("<li  class='newpic newImg'><img src="+result+"><span class='pdel'></span></li>")
        $ul.prepend($li)

        //监听图片数量
        var $newpic=$ul.find(".newpic").length;
        console.log($newpic)
        if($newpic>=3){
        	$ul.find(".morepic").hide()
        }else{
        	$ul.find(".morepic").show()
        }
        
        // $.post('/upload', {'base64': result}, function(result) {
        	
        // });

    };
    reader.readAsDataURL(file);
}
//删除图片
$(".setad").on("click",".pdel",function(event){
	var $ul=$(this).parent().parent();
	//删除父节点
	$(this).parent().remove();
	//监听图片数量
	
	var $newpic=$ul.find(".newpic").length;
   
    if($newpic>=3){
    	$ul.find(".morepic").hide()
    }else{
    	$ul.find(".morepic").show()
    }
	event.stopPropagation()
})
//点击展示图片
$(".setad").on("click",".newpic",function(){
	var $src=$(this).find("img").attr("src")
	layer.open({
		className: 'alertImg',
		content:"<img src="+$src+">"
	  });
})

//更改跳转时间
$(".setskip").on("click",".stime",function(){
	var that=this
	layer.open({
		className:"settime",
		title:"更改跳转时间",
		content: '<input placeholder="请输入秒数" class="getlink" type="text"><p>自动跳转的延迟时间(单位：秒， 范围：1 ~ 600)</p>'
	    ,btn: ['保存', '取消']
	    ,yes: function(index){
	      var  $val=parseInt($(".getlink").val()) 
	      
	      $(that).find("span").html($val)
	     
	      layer.close(index);
	    }
	  });
})	
//更改跳转链接

var $linkad='<form><input id="top"class="gTel"name="state"type="radio"value="1"/><label class="rad"for="top"><i></i>顶部</label><input id="bot"class="gTel"name="state"type="radio"value="2"/><label class="rad"for="bot"><i></i>底部</label><input id="fix"class="gTel"name="state"type="radio"value="3"/><label class="rad"for="fix"><i></i>悬浮</label><input id="cus"class="gTel"name="state"type="radio"value="4"/><label class="rad"for="cus"><i></i>自定义</label><label class="txt" for="inp"><input placeholder="请输入链接地址" id="inp"class="gTel"name="state"type="text"value="www.baidu.com"/></label></form>'
$(".setskip").on("click",".setlink",function(){
	var that=this
	layer.open({
		className:"linkad",
		title:"更改跳转链接",
		content:$linkad
	    ,btn: ['保存', '取消']
	    ,yes: function(index){
	      var  $val=$('input:radio:checked').val();
	      console.log($val)
	      if($val==1){
	      	$(that).attr("data-adtype","top").find("span").html("顶部广告链接")
	      }else if($val==2){
	      	$(that).attr("data-adtype","bottom").find("span").html("底部广告链接")
	      }else if($val==3){
	      	$(that).attr("data-adtype","float").find("span").html("悬浮广告链接")
	      }else if($val==4){
	      	$(that).attr("data-adtype","custom").find("span").html($(".txt").find("input").val())
	      }
	      
	      layer.close(index);
	    }
	  });
})










