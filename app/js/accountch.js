var myChart = echarts.init(document.getElementById('main'));
myChart.title = '堆叠条形图';
function getoption(articleNum,setclass,clickNum,viewNum){
    option = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['曝光量', '点击量','文章数']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis:  {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: setclass
    },
    series: [
        {
            name: '曝光量',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: viewNum
        },
        {
            name: '点击量',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data:clickNum
        },
        {
            name: '文章数',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data:articleNum
        }
    ]
};
myChart.setOption(option);
}




//子账号文章统计
childStatic()
function childStatic(stime,etime){
    var  data={
        stime:stime,
        etime:etime
    }
    checkSsid(data)
    $.ajax({
    url:baseURI+"/MainUserInfos",
    type:"post",
    data:data,
    success:function(res){
            console.log(res)
            if(res.code==100){
                var $articleNum=res.data.articleNum;
                var $user=res.data.user;
                var $clickNum=res.data.clickNum;
                var $viewNum=res.data.viewNum;
                var $userList=res.data.userList;
                var $user=res.data.user;
                
               
                var $content=''
                for(var i=0;i<$user.length;i++){
                    $content=$content+'<input type="checkbox" checked id="test'+i+'" value='+$userList[i]+' onchange="seti(this)"><label  for="test'+i+'"><i>'+$user[i]+'</i></label>'
                }
                console.log($content)
                
                //弹出选项框
                $("header").on("click",".screen",function(){

                    layer.open({
                        title:"筛选用户<i class='allmove' onclick='allmove(this)'>反选</i><i class='all' onclick='allcheck(this)'>全选</i>",
                        className:"cscreen",
                        content: '<form>'+$content+'</form>'
                        ,btn: ['确定', '取消']
                        ,yes: function(index){
                        //location.reload();
                        var  $childId=[];
                        console.log($(".cscreen").find("input")) 
                        var $inp=$(".cscreen").find("input")
                        for(var i=0;i<$inp.length;i++){
                            if($inp.eq(i).attr("checked")){
                                var $check=$inp.eq(i).val()
                                console.log($inp.eq(i).val())
                                $childId.push($check)
                            }
                        }
                        console.log($childId);
                        childsStatic(0,0,$childId,$userList,$user);
                        layer.close(index);
                        }
                    });
                    //分页
                    
                })
                
                getoption($articleNum,$user,$clickNum,$viewNum)
            }
            
        }   
    })
}
//重选
function childsStatic(stime,etime,childid,userList,user){
    var userLis=userLis;
    var user=user;
    var  data={
        stime:stime,
        etime:etime,
        childid:childid
    }
    checkSsid(data)
    $.ajax({
    url:baseURI+"/MainUserInfos",
    type:"post",
    data:data,
    success:function(res){
            console.log(res)
            if(res.code==100){
                var $articleNum=res.data.articleNum;
                var $clickNum=res.data.clickNum;
                var $viewNum=res.data.viewNum;
                var $userList=res.data.userList;
                var $user=res.data.user;
                var $content=''
                for(var i=0;i<user.length;i++){
                    var $k=$userList.indexOf(userList[i])
                    if($k=="-1"){
                        $content=$content+'<input type="checkbox"  id="test'+i+'" value='+userList[i]+' onchange="seti(this)"><label  for="test'+i+'"><i>'+user[i]+'</i></label>'
                     }else{
                        $content=$content+'<input type="checkbox" checked id="test'+i+'" value='+userList[i]+' onchange="seti(this)"><label  for="test'+i+'"><i>'+user[i]+'</i></label>'
                     }
                   
                }
                console.log($content)
                
                //弹出选项框
                $("header").on("click",".screen",function(){

                    layer.open({
                        title:"筛选用户<i class='allmove' onclick='allmove(this)'>反选</i><i class='all' onclick='allcheck(this)'>全选</i>",
                        className:"cscreen",
                        content: '<form>'+$content+'</form>'
                        ,btn: ['确定', '取消']
                        ,yes: function(index){
                        //location.reload();
                        var  $childId=[];
                        console.log($(".cscreen").find("input")) 
                        var $inp=$(".cscreen").find("input")
                        for(var i=0;i<$inp.length;i++){
                            if($inp.eq(i).attr("checked")){
                                var $check=$inp.eq(i).val()
                                console.log($inp.eq(i).val())
                                $childId.push($check)
                            }
                        }
                        console.log($childId);
                        childsStatic(0,0,$childId,userList,user);
                        layer.close(index);
                        }
                    });
                    //分页
                    
                })
                
                getoption($articleNum,$user,$clickNum,$viewNum)
            }
            
        }   
    })
}
function allcheck(obj){
   console.log('全选')
    
    var $inp=$(obj).parent().parent().find(".layui-m-layercont input").attr("checked","true"); 
    var $check=$(obj).parent().parent().find(".layui-m-layercont input")
    .next("label").find("i").css({"color":"#239aff","borderColor": "#239aff"})
   
}
function allmove(obj){
    console.log("反选")
    
    var $inp=$(obj).parent().parent().find(".layui-m-layercont input");
    
    
    console.log($inp)
   
    $inp.each(function(){ 
    if($(this).attr("checked")) 
    { 
    $(this).removeAttr("checked").next("label").find("i").css({"color":"#666666","borderColor": "#666666"}); 
    } 
    else 
    { 
    $(this).attr("checked","true").next("label").find("i").css({"color":"#239aff","borderColor": "#239aff"}); 
    } 
    }) 
     
}
//单选
function seti(obj){

    console.log("change")
    var $check=$(obj).prop("checked")
    console.log($check)

    if($check){
        $(obj).attr("checked","true").next("label").find("i").css({"color":"#239aff","borderColor": "#239aff"})
    }else{
        $(obj).removeAttr("checked").next("label").find("i").css({"color":"#666666","borderColor": "#666666"})
    }
}




//按时间分类
$("header").on("click",".clean",function(){
    var  $starttime=$(".starttime").val();
    var  $endtime=$(".endtime").val();
    console.log(2333)
    childStatic($starttime,$endtime);
})

