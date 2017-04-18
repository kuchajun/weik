function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
var  childId=GetQueryString("tid")
console.log(childId)
if(childId){
	var  data1={
	childid:childId
	}
	checkSsid(data1);
	$.ajax({
		url:baseURI+"SelfInfo",
		type:"post",
		data:data1,
		success:function(res){
			console.log(res)
			if(res.code==100){
				var $info=res.info;
				var  status=$info.status?"启用":"停用";

				$(".tel").find("span").html($info.mobile);
				$(".email").find("span").html($info.email);
				$(".cname").find("span").html($info.name);
				$(".account").find("span").html($info.account);
				$(".cstate").attr("data-status",$info.status).find("span").html(status);
				//初始页面显示
				if($info.status){
					$(".editc").show();
				}else{
					$(".editc").hide();
				}
			}
		}
			
		
	})
	//更改手机号码
	$("ul").on("click",".tel",function(){
		layer.open({
			title:"更改手机号码",
			content: '<input class="gTel" type="tel">'
		    ,btn: ['保存', '取消']
		    ,yes: function(index){
		      var  $val=$(".gTel").val();//获取输入框联系方式
		      var data = {
		      	usermobile:$val,
		      	childid:childId

		      }
				checkSsid(data);
				$.ajax({
					url:baseURI+"UpdateChildInfo",
					type:"post",
					data:data,
					success:function(res){
						console.log(res)
						checkSsid(res.testssid);
						if(res.code==100){
							$(".tel").find("span").html($val);

						}else{
							layer.open({
								className:"loginOk",
							    content: res.msg
							    ,skin: 'msg'
							    ,time: 2 //2秒后自动关闭
							    
							  });
						}
					}
				})
		      layer.close(index);
		    }
		  });
	})
	//更改邮箱地址
	$("ul").on("click",".email",function(){
		layer.open({
			title:"更改邮箱地址",
			content: '<input class="gEmail" type="email">'
		    ,btn: ['保存', '取消']
		    ,yes: function(index){
		      var  $val=$(".gEmail").val()
		      var data = {
		      	useremail:$val,
		      	childid:childId
		      }
				checkSsid(data);
				$.ajax({
					url:baseURI+"UpdateChildInfo",
					type:"post",
					data:data,
					success:function(res){
						console.log(res)
						checkSsid(res.testssid);
						if(res.code==100){
							$(".email").find("span").html($val);

						}else{
							layer.open({
								className:"loginOk",
							    content: res.msg
							    ,skin: 'msg'
							    ,time: 2 //2秒后自动关闭
							    
							  });
						}
					}
				})
		      layer.close(index);
		    }
		  });
	})
	//更改密码
	$("ul").on("click",".pass",function(){
		layer.open({
			className:"setword",
			title:"更改密码",
			content: '<input class="pass1" type="text" placeholder="请输入新密码"><input placeholder="请确认新密码" class="repass" type="text">'
		    ,btn: ['保存', '取消']
		    ,yes: function(index){
		      var  $pass=$(".pass1").val();
		      var  $repass=$(".repass").val();
		      console.log($pass)
		      var data = {
		      	password:$pass,
		      	repassword:$repass,
		      	childid:childId

		      };
				checkSsid(data);
				$.ajax({
					url:baseURI+"UpdateChildInfo",
					type:"post",
					data:data,
					success:function(res){
						console.log(res)
						checkSsid(res.testssid);
						
						layer.open({
							className:"loginOk",
						    content: res.msg
						    ,skin: 'msg'
						    ,time: 2 //2秒后自动关闭
						    
						  });
						
					}
				})




		      layer.close(index);
		    }
		  });
	})






	//子账号状态
	$(".content").on("click",".cstate",function(){
		console.log(2333)
		var that=this
		layer.open({
			className:"chstate",
			title:"更改状态",
			content: '<input id="yes" class="gTel" checked="checked" name="state" type="radio" value="1"><label for="yes">启用<i></i></label><input id="no"  name="state" class="gTel" type="radio" value="0"><label for="no">停用<i></i></label>'
		    ,btn: ['保存', '取消']
		    ,yes: function(index){
		      var  $val=$('input:radio:checked').val();
		      console.log($val)
		      var data = {
		      	userstatus:$val,
		      	childid:childId

		      };
				checkSsid(data);
				$.ajax({
					url:baseURI+"UpdateChildInfo",
					type:"post",
					data:data,
					success:function(res){
						console.log(res)
						checkSsid(res.testssid);
						if($val==1){
					      	$(that).find("span").html("启用")
					      	$(".editc").fadeIn();
					      }else if($val==0){
					      	$(that).find("span").html("停用")
					      	$(".editc").fadeOut();
					      }
						layer.open({
							className:"loginOk",
						    content: res.msg
						    ,skin: 'msg'
						    ,time: 2 //2秒后自动关闭
						    
						  });
						
					}
				})
		      
		      
		      layer.close(index);
		    }
		  });
	})
	// 子账号名称
	$(".content").on("click",".cname",function(){
		//console.log(2333)
		var that=this
		layer.open({
			className:"chname",
			title:"更改子账号名称",
			content: '<label><input type="text"></label>'
		    ,btn: ['保存', '取消']
		    ,yes: function(index){
		      var  $val=$('.chname').find("input").val();
		      console.log($val)
		       var data = {
		      	username:$val,
		      	childid:childId

		      };
				checkSsid(data);
				$.ajax({
					url:baseURI+"UpdateChildInfo",
					type:"post",
					data:data,
					success:function(res){
						console.log(res)
						checkSsid(res.testssid);
						$(that).find("span").html($val);
						layer.open({
							className:"loginOk",
						    content: res.msg
						    ,skin: 'msg'
						    ,time: 2 //2秒后自动关闭
						    
						  });
						
					}
				})
		      
		     
		      layer.close(index);
		    }
		  });
	})
}else{
	var $sub=$('<div class="sub"><a href="javascript:;">提交</a></div>').appendTo($(".content"));
	var data={}
	//填写手机号码
	$("ul").on("click",".tel",function(){
		layer.open({
			title:"更改手机号码",
			content: '<input class="gTel" type="tel">'
		    ,btn: ['保存', '取消']
		    ,yes: function(index){
		      var  $val=$(".gTel").val();//获取输入框联系方式
		      data["usermobile"]=$val;
				$(".tel").find("span").html($val);
		      layer.close(index);
		    }
		  });
	})
	//填写邮箱地址
	$("ul").on("click",".email",function(){
		layer.open({
			title:"更改邮箱地址",
			content: '<input class="gEmail" type="email">'
		    ,btn: ['保存', '取消']
		    ,yes: function(index){
		      var  $val=$(".gEmail").val()
		      data["useremail"]=$val;
			$(".email").find("span").html($val);
		      layer.close(index);
		    }
		  });
	})
	//填写密码
	$("ul").on("click",".pass",function(){
		layer.open({
			className:"setword",
			title:"更改密码",
			content: '<input class="pass1" type="text" placeholder="请输入新密码"><input placeholder="请确认新密码" class="repass" type="text">'
		    ,btn: ['保存', '取消']
		    ,yes: function(index){
		      var  $pass=$(".pass1").val();
		      var  $repass=$(".repass").val();
		      data["userpassword"]=$pass;
		      data["userrepassword"]=$repass;



		      layer.close(index);
		    }
		  });
	})






	//子账号状态
	$(".content").on("click",".cstate",function(){
		console.log(2333)
		var that=this
		layer.open({
			className:"chstate",
			title:"更改状态",
			content: '<input id="yes" class="gTel" checked="checked" name="state" type="radio" value="1"><label for="yes">启用<i></i></label><input id="no"  name="state" class="gTel" type="radio" value="0"><label for="no">停用<i></i></label>'
		    ,btn: ['保存', '取消']
		    ,yes: function(index){
		      var  $val=$('input:radio:checked').val();
		      data["userstatus"]=$val;
		      if($val==1){
		      	$(that).find("span").html("启用")
		      	$(".editc").fadeIn();
		      }else if($val==0){
		      	$(that).find("span").html("停用")
		      	$(".editc").fadeOut();
		      }
		      layer.close(index);
		    }
		  });
	})
	// 子账号名称
	$(".content").on("click",".cname",function(){
		//console.log(2333)
		var that=this
		layer.open({
			className:"chname",
			title:"更改子账号名称",
			content: '<label><input type="text"></label>'
		    ,btn: ['保存', '取消']
		    ,yes: function(index){
		      var  $val=$('.chname').find("input").val();
		      data["username"]=$val;
		     $(that).find("span").html($val);
		      layer.close(index);
		    }
		  });
	})
	//子账号
	$(".content").on("click",".account",function(){
		//console.log(2333)
		var that=this
		layer.open({
			className:"chname",
			title:"更改子账号",
			content: '<label><input type="text"></label>'
		    ,btn: ['保存', '取消']
		    ,yes: function(index){
		      var  $val=$('.chname').find("input").val();
		      data["useraccount"]=$val;
		     $(that).find("span").html($val);
		      layer.close(index);
		    }
		  });
	})



	$(".content").on("click",".sub",function(){
		console.log(data)
		checkSsid(data);
		$.ajax({
			url:baseURI+"AddChild",
			type:"post",
			data:data,
			success:function(res){
				console.log(res)
				layer.open({
					className:"loginOk",
				    content: res.msg
				    ,skin: 'msg'
				    ,time: 3 //2秒后自动关闭
				    
				  });
				
			}
		})
	})
















}


