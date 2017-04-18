//更改广告的状态
$(".setskip").on("click",".statead",function(){
	var that=this
	layer.open({
		className:"adradio",
		title:"更改广告状态",
		content: '<label for="#yes">启用<input id="yes" class="gTel" checked="checked" name="state" type="radio" value="1"></label><label for="#no">停用<input id="no"  name="state" class="gTel" type="radio" value="0"></label>'
	    ,btn: ['保存', '取消']
	    ,yes: function(index){
	      var  $val=$('input:radio:checked').val();
	      console.log($val)
	      if($val==1){
	      	$(that).find("span").html("启用")
	      }else if($val==0){
	      	$(that).find("span").html("停用")
	      }
	      
	      layer.close(index);
	    }
	  });
})
//更改跳转时间
$(".setskip").on("click",".stime",function(){
	var that=this
	layer.open({
		className:"settime",
		title:"更改跳转时间",
		content: '<input class="getlink" type="text"><p>自动跳转的延迟时间(单位：秒， 范围：1 ~ 600)</p>'
	    ,btn: ['保存', '取消']
	    ,yes: function(index){
	      var  $val=$(".getlink").val()
	      
	      $(that).find("span").html($val)
	     
	      layer.close(index);
	    }
	  });
})	
//更改跳转链接
$(".setskip").on("click",".setlink",function(){
	var that=this
	layer.open({
		className:"linkad",
		title:"更改跳转链接",
		content: '<form><label class="rad" for="top"><input id="top" class="gTel" name="state" type="radio" value="1">顶部</label><label class="rad" for="bot"><input id="bot"  class="gTel" name="state" type="radio" value="2">底部</label><label class="rad" for="fix"><input id="fix"  class="gTel" name="state" type="radio" value="3">悬浮</label><label class="rad" for="cus"><input id="cus"  class="gTel" name="state" type="radio" value="4">自定义</label><label class="txt" for="inp"><p>链接地址</p><input id="inp"  class="gTel" name="state" type="text" value="www.baidu.com"></label></form>'
	    ,btn: ['保存', '取消']
	    ,yes: function(index){
	      var  $val=$('input:radio:checked').val();
	      console.log($val)
	      if($val==1){
	      	$(that).find("span").html("顶部广告链接")
	      }else if($val==2){
	      	$(that).find("span").html("底部广告链接")
	      }else if($val==3){
	      	$(that).find("span").html("悬浮广告链接")
	      }else if($val==4){
	      	$(that).find("span").html("自定义广告链接")
	      }
	      
	      layer.close(index);
	    }
	  });
})