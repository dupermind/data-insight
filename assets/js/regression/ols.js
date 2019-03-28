var myChart = echarts.init(document.getElementById('main'));
var markLineOpt = {
    animation: false,
    label: {
        normal: {
            formatter: 'y = 0.5 * x + 3',
            textStyle: {
                align: 'right'
            }
        }
    },
    lineStyle: {
        normal: {
            type: 'solid'
        }
    },
    tooltip: {
        formatter: 'y = 0.5 * x + 3'
    },
    data: [
        [{
            coord: [10.0, 8.04],
            symbol: 'none'
        }, {
            coord: [5.0, 5.68],
            symbol: 'none'
        }]
    ]
};
// 指定图表的配置项和数据
var option = {
    xAxis: {},
    yAxis: {},
    series: [{
        symbolSize: 20,
        data: [
            [10.0, 8],
            [8.0, 6],
            [13.0, 7],
            [9.0, 8],
            [11.0, 8],
            [14.0, 9],
            [6.0, 7],
            [4.0, 4],
            [12.0, 10],
            [7.0, 4],
            [5.0, 5]
        ],
        markLine: markLineOpt,
        type: 'scatter'
    }]
};


// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
var _ = str=>document.querySelector(str)

var xSet = [];
var ySet = []
_('#x-set').onchange=(dom)=>{
    var value = dom.target.value;
    var set = value.split(',')
                    .filter(item=>isFinite(item)&&item!=="")
                    .map(str=>str*1)
    _("#x-label").innerText =`X (${set.length}个)`;
    if(set.length!==value.split(",").length){
        _("#x-label").innerText +="数据输入有误";
    }
    xSet = set;
}

_('#y-set').onchange=(dom)=>{
    var value = dom.target.value;
    var set = value.split(',')
                    .filter(item=>isFinite(item)&&item!=="")
                    .map(str=>str*1)
    _("#y-label").innerText =`Y (${set.length}个)`;
    if(set.length!==value.split(",").length){
        _("#y-label").innerText +="数据输入有误";
    }
    ySet = set;
}

_("#update-data").onclick=()=>{
    if(xSet.length!==ySet.length){
        alert("数据集长度不等");
    }
    var data = [];
    for(var i in xSet){
        data.push( [ xSet[i] , ySet[i] ] )
    }
    console.log(data)
    result = regression.linear(data);

    var xMax = Math.max.apply( null, xSet )
    var xMin = Math.min.apply( null, xSet )
    console.log(xMax,xMin)
    var yMax = result.predict(xMax)[1];
    var yMin = result.predict(xMin)[1];

    markLineOpt.data =[
        [{
            coord: [xMax, yMax],
            symbol: 'none'
        }, {
            coord: [xMin, yMin],
            symbol: 'none'
        }]
    ]
    console.log(markLineOpt.data)
    option.series[0].data = data;

    myChart.setOption(option);

}

var getK = (xSet,ySet)=>{
    var Vx = $V(xSet);
    var Vy = $V(ySet);
    return Vx.dot(Vy)/Vx.dot(Vx);
}