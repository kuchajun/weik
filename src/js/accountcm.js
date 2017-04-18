


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



static()
function static(stime,etime){

    var  data={
        "stime":stime,
        "etime":etime
    }
    checkSsid(data)
    console.log(data)
    $.ajax({
    url:baseURI+"/MainClassInfos",
    type:"post",
    data:data,
    success:function(res){
            console.log(res)
            if(res.code==100){
                var $articleNum=res.msg.data.articleNum;
                var $class=res.msg.data.class;
                var $clickNum=res.msg.data.clickNum;
                var $viewNum=res.msg.data.viewNum;
                getoption($articleNum,$class,$clickNum,$viewNum)
            }
            
        }   
    })
}
//按时间分类
$("header").on("click",".clean",function(){
    var  $starttime=$(".starttime").val();
    var  $endtime=$(".endtime").val();
    
    static($starttime,$endtime);
})


