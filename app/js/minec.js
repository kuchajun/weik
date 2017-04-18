$(function(){
	//获取个人信息
	checkSsid(data);
	$.ajax({
		url:baseURI+"SelfInfo",
		type:"post",
		data:data,
		success:function(res){
			console.log(res)
			if(res.code==100){
				var $info=res.info;
				console.log($info)
				$(".tel").find("span").html($info.mobile);
				$(".email").find("span").html($info.email);
				$(".username").find("span").html($info.account);
				$(".shortname").find("span").html($info.short_name);
				if($info.qrcodepath){
					var $markImg=$('<img class="markImg" src=http://192.168.2.234:8801'+$info.qrcodepath+' >')
					
					$(".mark span").prepend($markImg)
				}
				var $time=$info.time_start?$info.time_start+"~"+$info.time_end:$info.time_end;
				$(".time").find("span").html($time);
				 
			}
		}
			
		
	})
	//更改昵称
	$("ul").on("click",".username",function(){
		var $username=$(".username").find("span").html();
		layer.open({
			title:"更改昵称",
    		content: '<input class="gTel" type="text" value='+$username+'>'
		    ,btn: ['保存', '取消']
		    ,yes: function(index){
		      var  $val=$(".gTel").val()
		      var data = {
		      	username:$val
		      }
				checkSsid(data);
				$.ajax({
					url:baseURI+"UpdateInfoMain",
					type:"post",
					data:data,
					success:function(res){
						console.log(res)
						checkSsid(res.testssid);
						if(res.code==100){
							$(".username").find("span").html($val);

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
	//更改公司简称
	$("ul").on("click",".shortname",function(){
		var  $shortname=$(".shortname").find("span").html();
		layer.open({
			title:"更改公司简称",
    		content: '<input class="gTel" type="text" value='+$shortname+'>'
		    ,btn: ['保存', '取消']
		    ,yes: function(index){
		      var  $val=$(".gTel").val()
		      var data = {
		      	shortname:$val
		      }
				checkSsid(data);
				$.ajax({
					url:baseURI+"UpdateInfoMain",
					type:"post",
					data:data,
					success:function(res){
						console.log(res)
						checkSsid(res.testssid);
						if(res.code==100){
							$(".shortname").find("span").html($val);

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
	//更改手机号码
	$("ul").on("click",".tel",function(){
		var  $tel=$(".tel").find("span").html();
		layer.open({
			title:"更改手机号码",
    		content: '<input class="gTel" type="tel" value='+$tel+'>'
		    ,btn: ['保存', '取消']
		    ,yes: function(index){
		      var  $val=$(".gTel").val()
		      var data = {
		      	usermobile:$val
		      }
				checkSsid(data);
				$.ajax({
					url:baseURI+"UpdateInfoMain",
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
		var $email=$(".email").find("span").html();
		layer.open({
			title:"更改邮箱地址",
    		content: '<input class="gEmail" type="email" value='+$email+'>'
		    ,btn: ['保存', '取消']
		    ,yes: function(index){
		      var  $val=$(".gEmail").val()
		     var data = {
		      	useremail:$val
		      }
				checkSsid(data);
				$.ajax({
					url:baseURI+"UpdateInfoMain",
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
		      	repassword:$repass

		      };
				checkSsid(data);
				$.ajax({
					url:baseURI+"UpdateInfoMain",
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
	//退出登录
	$("ul").on("click",".out",function(){
		layer.open({
			title:"退出登录",
			content:"退出到登录页"
		    ,btn: ['确定', '取消']
		    ,yes: function(index){
		      var  data=checkSsid();
				$.ajax({
					url:baseURI+"LoginOut",
					type:"post",
					data:data,
					success:function(res){
						console.log(res)
						checkSsid(res.testssid);
						window.location.href="login.html"
					}
				})
		      
		      layer.close(index);
		    }
		  });
	})


})
//更换二维码
function changeFile (obj) {
    if (!obj.files.length) return;
    if (obj.files.length > 1) {
        alert("只允许上传一张图片!");
        return;
    }
   
    var file = obj.files[0];

    var reader = new FileReader();
    reader.onload = function () {
        var result = this.result;    //data:base64    
        //console.log(result) 
        $(".markImg").attr("src",result) 
        var data = {
			wxqrcode:result
		}
		checkSsid(data);
		$.ajax({
			url:baseURI+"UpdateInfoMain",
			type:"post",
			data:data,
			success:function(res){
				console.log(res)
				checkSsid(res.testssid);
				if(res.code==100){
					//console.log($(".markImg").length)
					if($(".markImg").length!=0){
						$(".markImg").attr("src",result) 
						console.log(2323)
					}else{
						var $markImg=$('<img class="markImg" src='+result+' >')
						console.log($(obj).parent())
						$(obj).parent().prepend($markImg)
					}

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

    };
    reader.readAsDataURL(file);
}
//点击展示二维码
$("ul").on("click",".markImg",function(){
	var $src=$(".markImg").attr("src")
	layer.open({
		className: 'alertImg',
		content:"<img src="+$src+">"
	  });
})