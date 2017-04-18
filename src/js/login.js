var baseURI="http://192.168.2.234:8801/Api/Basic/";
//检测用户是否登录
var data = checkSsid()
$.ajax({
	url:baseURI+"CheckLogin",
	type:"post",
	data:data,
	success:function(res){
		
		if (res.sjkjssid) checkSsid(res.sjkjssid);
		
        if(res.code==100){
            if(res.ismain){
                window.location.href="../html/homec.html"
            }else{
                window.location.href="../html/home.html"
            }
        }
	}
})




//获取初始页面高度防止输入框
var HEIGHT = $('body').height();
$('body').height(HEIGHT);
//提示框数组
var mesArry=[
	"请联系上级代理商",
	"账号不能为空",
	"密码不能为空",
	"登录成功",
	"用户名或密码错误"
]
	

//点忘记密码
$(".forget").click(function(){
	layer.open({
	    content: mesArry[0]
	    ,btn: '我知道了'
  	});
})



function checkSsid (ssid) {
    var itemName = 'testssid';
    var localssid = localStorage.getItem(itemName);

    if (typeof(ssid) === 'string') {
        //  设置ssid
        if (!localssid) localStorage.setItem(itemName, ssid);
    } else {
        //  取ssid，如果有，就赋值
        if (typeof(ssid) !== 'object') ssid = {}
        if (localssid) ssid[itemName] = localssid;
    	return ssid;
    }
}
//var data = {"aaa":123}
// checkSsid(data);

// var bbb = checkSsid();

// checkSsid('asdfsadfsadfsdafsdf ');

function validate(){
	var $account=$(".use").find("input").val();
	var $password=$(".pas").find("input").val();
	if($account==""){
		layer.open({
		    content: mesArry[1]
		    ,btn: '我知道了'
	  	});
	}else if($password==""){
		layer.open({
		    content: mesArry[2]
		    ,btn: '我知道了'
	  	});
	}else{
		var data = {
			"account":$account,
			"password":$password
		}
		checkSsid(data);
			
		$.ajax({
			url:"http://192.168.2.234:8801/Api/Basic/Login",
			type:"post",
			data:data,
			success:function(res){
				console.log(res)
				if(res.code=="100"){
					layer.open({
						className:"loginOk",
					    content: mesArry[3]
					    ,skin: 'msg'
					    ,time: 1, //2秒后自动关闭
					    end:function(){
							//window.history.back();
							if(res.userinfo.type=="main"){
								window.location.href="homec.html"
							}else{
								window.location.href="home.html"
							}
					  }
					  });
					checkSsid(res.sjkjssid)
					
				}else{
					layer.open({
					    content: res.msg
					    ,btn: '我知道了'
				  	});
				  	//密码账号错误重置
				  	$(".use").find("input").val("");
				  	$(".pas").find("input").val("");
				}
			}
		})
	}
}
