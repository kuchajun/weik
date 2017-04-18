var baseURI="http://192.168.2.234:8801/Api/Basic/"



function checkSsid (ssid) {
    var itemName = 'testssid';
    var localssid = localStorage.getItem(itemName);

    if (typeof(ssid) === 'string') {
        //  设置ssid
        if (!localssid) localStorage.setItem(itemName, ssid);
       // console.log("参数为string")
    } else {
        //  取ssid，如果有，就赋值
        if (typeof(ssid) !== 'object') ssid = {}
        if (localssid) ssid[itemName] = localssid;
    	return ssid;
    }
}


// var data = {"name":"lifan"}
var data = checkSsid()
//console.log(data)
$.ajax({
	url:baseURI+"CheckLogin",
	type:"post",
	data:data,
	success:function(res){
		checkSsid (res.testssid)
		if (res.sjkjssid) checkSsid(res.sjkjssid);
		console.log(res)
		if(res.code=="500"){
			window.location.href="../html/login.html"
		}
        
	}
})



