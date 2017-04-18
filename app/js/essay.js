var  $flag=true;
$(".nav-l").click(function(e){
	if($flag){
		$flag=false
		$(".nav-l").find("img").attr("src","../img/pullup.png");
		$(".nav-b").css("height","127.5px")
	}else{
		$flag=true
		$(".nav-l").find("img").attr("src","../img/pulldown.png");
		$(".nav-b").css("height","0")
	}
})