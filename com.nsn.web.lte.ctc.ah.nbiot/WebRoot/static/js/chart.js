//echarts地图
var jsCityMap=city_json;
var mapType = [];
var mapGeoData = echarts.util.mapData.params;
for (var city in jsCityMap) {
    mapType.push(city);
    // 自定义扩展图表类型
    mapGeoData.params[city] = {
        getGeoJson: (function (c) {
            var geoJsonName = jsCityMap[c];
            return function (callback) {
                $.getJSON('static/js/js-city/' + geoJsonName + '.json', callback);
            }
        })(city)
    }
}
/*var limitGood = {start:80,end:100};//优劣门限：优
var limitMiddle = {start:70,end:80};//优劣门限：中
var limitBad = {start:0,end:70};//优劣门限：中
*/

var usersGood = {start:300,end:10000};//优劣门限：优
var usersMiddle = {start:100,end:300};//优劣门限：中
var usersBad = {start:0,end:100};//优劣门限：中

function drawEchartsMap(htmlid,data,changedMapType,mapType){
	//$("#"+htmlid).html("");
	var myChart = echarts.init(document.getElementById(htmlid));
	
	var traffic = [];
	var data1 = data["dtsj"];
	var data2 = data["sxx"];
	var max = data2.max;
	var min = data2.min;
	var _dataRange = {};
	if(mapType=='0'&&min>80){
		min = 80;
	}
	if(mapType=='1'&&min>75){
		min = 75;
	}
	
	
	if(mapType=='2'){
		_dataRange = {
			x : 'left',
			y : 'bottom',
			/*textStyle : {
				color : UI_Color.label
			},*/
			splitList : [ {
				start : usersGood.start,
				label : '优秀（300以上）',
				color : '#39AA1E'
			}, {
				start : usersMiddle.start,
				end : usersMiddle.end,
				label : '良好（100-300）',
				color : 'yellow'
			}, {
				end : usersBad.end,
				label : '劣化（100以下）',
				color : 'red'
			} ]
		}
	}else{
		_dataRange = {
				x: 'left',
				y: 'bottom',
				min: Math.floor(min),
				max: Math.ceil(max),
				text:['High','Low'],
				realtime: false,
				calculable : true,
				color: ['#39AA1E','yellow','red']
		}
	}
	
	if(mapType=="0"){
		for(var i=0;i<data1.length;i++){
			traffic[i]={
					name:data1[i].city,
					value:data1[i].end_and_end_rate
			}
		}
	}else if(mapType=="1"){
		for(var i=0;i<data1.length;i++){
			traffic[i]={
					name:data1[i].city,
					value:data1[i].rate
			}
		}
	}else if(mapType=="2"){
		for(var i=0;i<data1.length;i++){
			traffic[i]={
					name:data1[i].city,
					value:data1[i].users
			}
		}
	}else{
		for(var i=0;i<data1.length;i++){
			traffic[i]={
					name:data1[i].city,
					value:data1[i].flow
			}
		}
	}
	
		myChart.setOption({
			tooltip : {
				trigger : 'item',
				formatter : function (params,ticket,callback) {
		            var res = '';  
		            /*var traffic = 0;  
		            var user = 0;
		            var feel = 0;*/
		            
		            for(var i=0;i<data1.length;i++){
		            	
		            	if(data1[i]["city"] == params[1]){  
		            		for(var key in data1[i]){
		            			if(key=="end_and_end_rate"){
		            				res += "端到端成功率:"+data1[i][key]+"%<br/>"
		            			}
		            			if(key=="rate"){
		            				res += "网络感知优良率:"+data1[i][key]+"%<br/>"
		            			}
		            			if(key=="users"){
		            				res += "用户数:"+data1[i][key]+"<br/>"
		            			}
		            			if(key=="flow"){
		            				res += "流量:"+data1[i][key]+"MB<br/>"
		            			}
		            		}
	            		}
		            }
		            /*if(data[0].length>0){
		            	for(var i = 0; i <data[0].length; i++) {  
		            		if(data[0][i].name == params[1]){  
		            			traffic = data[0][i].value;  
		            		}
		            	}
		            	res += "端到端成功率:"+traffic+"%";
		            }*/
		           /* if(data[1].length>0){
		            	for(var j = 0; j <data[1].length; j++) {  
		            		if(data[1][j].name == params[1]) {  
		            			user = data[1][j].value;  
		            		}  
		            	}
		            	res += "<br/>网络感知优良率:"+user+"%";
		            }
		            if(data[2].length>0){
		            	for(var k = 0; k <data[2].length; k++) {  
		            		if(data[2][k].name == params[1]) {  
		            			feel = data[2][k].value;  
		            		}
		            	}
		            	res += "<br/>用户数:"+feel;
		            }
		            if(data[3].length>0){
		            	for(var k = 0; k <data[3].length; k++) {  
		            		if(data[3][k].name == params[1]) {  
		            			feel = data[3][k].value;  
		            		}
		            	}
		            	res += "<br/>流量:"+feel+"GB";
		            }*/
		            return res;
		       }
			},
			
			dataRange : _dataRange,
			series : [ {
				type : 'map',
				mapType : changedMapType,
				itemStyle : {
					normal : {
						label : {
							show : true
						}
					},
					emphasis : {
						label : {
							show : true
						},
						color : "#C8CFB6"
					}
				},
				dataRangeHoverLink : false,
				data : traffic,
				nameMap : nameMap
			}]
		});
	
	
		//绑定点击事件
		var ecConfig = echarts.config;
		myChart.on(ecConfig.EVENT.CLICK, function(info) {
			$("#_city").show();
			//表示有数据的下钻（至区级别，区级别禁止再下钻）
			//$("#isDrill").val(1);
			if(mapGeoData.params[info.name]!=null){
				$("#nowcity").val(info.name);
				var obj = document.getElementById("city");
				for(i=0;i<obj.length;i++){
				  if(obj[i].text == info.name)
				    obj[i].selected = true;
				}
				$.ajax({
					type: "POST",
					url:"/nbiot/general/getCities",
					data:{//'module': module,
						  'cityparam': info.name,
					},
					dataType:'json',
				    success: function(data) {
				    	var district = "<option value='全市'>全市</option>";
				    	$.each(data,function(i,obj){
				    		if(obj.city_cn!='全市'){
				    			district+="<option value="+obj.city_cn+">"+obj.city_cn+"</option>";
				    		}
				    		if(i==data.length-1&&info.name=='六安市'){
				    			district+="<option value='叶集区'>叶集区</option>";
				    		}
			    		});
				    	$("#city_district").html("");
				    	$("#city_district").append(district);
				    	
				    	cleanData();
				    	loadInterface();
				    	loadIndustry();//行业
				    }
				});
			}else{
				//不下钻只显示对应区的数据
				var city_d = $("#nowcity").val();
				if(city_d=="" || city_d== null){
					city_d = $("#city option:selected").text();
				}
				$("#city_district").val(info.name);
				//getUsersense(module, city_d,info.name, topparam);
				
				cleanData();
		    	loadInterface();
		    	loadIndustry();//行业
			}
		});
}


/*//仪表盘
function initMb(id, num, name,min,max,best,bad,serie) {
	$("#"+id).html("");
	if(num==null || num == ''){
		$('#'+id).html("无数据");
	} else {
	$('#' + id + '_span').html(name);
	var bestbad = "";
	var colorMb = '#ff0000';
	var id_str = id;
	var width;
	
	if($("#sense1").is(":hidden")){
		id_str = id+"1";
		width = $("#"+id_str).width();
	}
	if($("#sense2").is(":hidden") && id.length==4){
		id_str = id.substring(0,3);
		width = $("#"+id_str).width();
	}
	if($("#sense1").is(":hidden") && $("#sense2").is(":hidden")){
		width = $("#sense").width()/6;
	}
	
	
	bestbad = [{from: min,to:bad,color: UI_Color.bad },// red 差
        {from: bad,to: best,color: UI_Color.good }, // yellow 良
        {from: best,to: max,color: UI_Color.best} // green 优
        ];
    $('#' + id).highcharts({
        chart: {
            type: 'gauge',
            backgroundColor: null,
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            borderColor: '#fff',
            height: 180,
            width:width
        },
        title: {
            text: null,
            y:15,
            style:{
            	fontSize:'15px'
            }
        },
        pane: {
            startAngle: -150,
            endAngle: 150,
            size: '100%',
            background: [{
                backgroundColor: {
                    linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, UI_Color.bg],
                        [1, '#ffffff']
                    ]
                },
                borderWidth: 0,
                outerRadius: '100%'
            }, {
                backgroundColor: {
                    linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, UI_Color.bg],
                        [1, UI_Color.bg]
                    ]
                },
                borderWidth: 1,
                outerRadius: '100%'
            }, {
                backgroundColor: UI_Color.border,
                borderWidth: 0,
                outerRadius: '102%',
                innerRadius: '100%'
            }]
        },
        plotOptions: {
            gauge: {
                dial: {
                    borderWidth: 1,
                    borderColor: '#efefef',
                    backgroundColor: colorMb,
                    radius: '100%'
                },
                pivot: {
                    radius: 6,
                    borderWidth: 1,
                    borderColor: colorMb,
                    backgroundColor: colorMb
                }
            }
        },
        // the value axis
        yAxis: {
            min: min,
            max: max,
            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#fff',
            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#fff',
            labels: {
                step: 2,
                rotation: 'auto',
                style: {
                    color: UI_Color.label
                },
                formatter:function () {
                    return this.value;
                }
            },
            title: {
                text: serie,
                style: {
                    color: UI_Color.label
                }
            },
            plotBands: bestbad
        },
        series: [{
            name: name,
            data: [{
                color: '#fff',
                y: num
            }],
            dataLabels: {
                formatter: function () {
                    return '<span style="color:' + UI_Color.color + ';">' + num + '</span>';
                }
            },
            tooltip: {
            	 valueSuffix: serie,
                 shared: true,
                 pointFormat: '<span style="color:{series.color}">{series.name}: <b> '+num+serie+'</b><br/>'
            }
        }]
    });
	}
}

var xArr=[];
function parseLineChartSrcData(module,topparam,data,columnlist){
	var y0Arr = [];
	var y1Arr = [];
    var y2Arr = [];
    var y3Arr = [];
    var y4Arr = [];
    var y5Arr = [];
    var y6Arr = [];
    var y7Arr = [];
    var y8Arr = [];
    var y9Arr = [];
    var y10Arr = [];
    var y11Arr = [];
    var y12Arr = [];
    var y13Arr = [];
    var y14Arr = [];
    var serieList=[];
	if(data.length > 0){
		if(module=="1" || (module=="0" && topparam == '网页浏览优良率')){ //http
			$.each(data, function(i) {
				xArr[i] = data[i].sdate_1;
				y0Arr[i] = data[i].c0;
				y1Arr[i] = data[i].c1;
				y2Arr[i] = data[i].c2;
				y3Arr[i] = data[i].c3;
				y4Arr[i] = data[i].c4;
				y5Arr[i] = data[i].c5;
				y6Arr[i] = data[i].c6;
				y7Arr[i] = data[i].c7;
				y8Arr[i] = data[i].c8;
				y9Arr[i] = data[i].c9;
				y10Arr[i] = data[i].c10;
				y11Arr[i] = data[i].c11;
				y12Arr[i] = data[i].c12;
				y13Arr[i] = data[i].c13;
				y14Arr[i] = data[i].c14;
			});
		}
		if(module=="2" || (module=="0" && topparam == '视频优良率')){ //view
			$.each(data, function(i) {
				xArr[i] = data[i].sdate_1;
				y0Arr[i] = data[i].c0;
				y1Arr[i] = data[i].c1;
				y2Arr[i] = data[i].c2;
				y3Arr[i] = data[i].c3;
				y4Arr[i] = data[i].c4;
				y5Arr[i] = data[i].c5;
				y6Arr[i] = data[i].c6;
				y7Arr[i] = data[i].c7;
			});
		}
		if(module=="3" || (module=="0" && topparam == '即时通信优良率')){ //im
			$.each(data, function(i) {
				xArr[i] = data[i].sdate_1;
				y0Arr[i] = data[i].c0;
				y1Arr[i] = data[i].c1;
				y2Arr[i] = data[i].c2;
			});
		}
		
		if(module=="4" || (module=="0" && topparam == '游戏优良率')){ //im
			$.each(data, function(i) {
				xArr[i] = data[i].sdate_1;
				y0Arr[i] = data[i].c0;
				y1Arr[i] = data[i].c1;
				y2Arr[i] = data[i].c2;
			});
		}
		
		for(var j = 0; j< columnlist.length; j++){
			var datas = eval('y'+j+'Arr');
			serieList[j] = {
				name:columnlist[j],
				color: colors[j],
				data: datas
			}
		}
	}
	return serieList;
}

var xArr2=[];
function parseLineChartSrcData2(module,data){
	var y0Arr = [];
	var y1Arr = [];
    var y2Arr = [];
    var y3Arr = [];
    var y4Arr = [];
    var serieList=[];
	if(data.length > 0){
		$.each(data, function(i) {
			xArr2[i] = data[i].sdate_1;
			if(module=="1"){ //http
				y0Arr[i] = data[i].http_rate;
				y1Arr[i] = data[i].page_rate;
				y2Arr[i] = data[i].http_page_latency_rate;
				y3Arr[i] = data[i].first_rate;
				y4Arr[i] = data[i].http_latency_rate;
			}
			if(module=="2"){ //video
				y0Arr[i] = data[i].video_rate;
				y1Arr[i] = data[i].video_xz_rate;
				y2Arr[i] = data[i].video_throughput_rate;
				y3Arr[i] = data[i].video_halt_rate;
				y4Arr[i] = data[i].video_request_rate;
			}
			if(module=="3"){ //im
				y0Arr[i] = data[i].im_rate;
				y1Arr[i] = data[i].im_succ_num;
			}
			if(module=="4"){ //game
				y0Arr[i] = data[i].game_rate;
				y1Arr[i] = data[i].game_latency_rate;
			}
			
		});
		if(module=="1"){
			serieList = [{
				name: '网页浏览优良率(%)',
				data: y0Arr,
				yAxis: 0,
				marker: {symbol: 'circle'}
			}, {
				name: '页面打开优良率(%)',
				data: y1Arr,
				yAxis: 1,
				marker: {symbol: 'circle'}
			}, {
				name: '首屏时延(ms)',
				data: y2Arr,
				yAxis: 2,
				marker: {symbol: 'circle'}
			}, {
				name: '首屏优良率(%)',
				data: y3Arr,
				yAxis: 3,
				marker: {symbol: 'circle'}
			}, {
				name: '页面打开时延(ms)',
				data: y4Arr,
				yAxis: 4,
				marker: {symbol: 'circle'}
			}];
		}
		if(module=="2"){
			serieList = [{
				name: '视频优良率(%)',
				data: y0Arr,
				yAxis: 0,
				marker: {symbol: 'circle'}
			}, {
				name: '视频下载优良率(%)',
				data: y1Arr,
				yAxis: 1,
				marker: {symbol: 'circle'}
			}, {
				name: '视频速率(Kbps)',
				data: y2Arr,
				yAxis: 2,
				marker: {symbol: 'circle'}
			}, {
				name: '视频卡顿优良率(%)',
				data: y3Arr,
				yAxis: 3,
				marker: {symbol: 'circle'}
			}, {
				name: '视频卡顿次数',
				data: y4Arr,
				yAxis: 4,
				marker: {symbol: 'circle'}
			}];
		}
		if(module=="3"){
			serieList = [{
				name: '即时通信优良率(%)',
				data: y0Arr,
				yAxis: 0,
				marker: {symbol: 'circle'}
			},{
				name: 'IM发送成功次数',
				data: y1Arr,
				yAxis: 1,
				marker: {symbol: 'circle'}
			}];
		}
		if(module=="4"){
			serieList = [{
				name: '游戏优良率(%)',
				data: y0Arr,
				yAxis: 0,
				marker: {symbol: 'circle'}
			}, {
				name: '游戏交互时延(ms)',
				data: y1Arr,
				yAxis: 1,
				marker: {symbol: 'circle'}
			}];
		}
	}
	return serieList;
}

function parseColumnData(data){
	var xArr = [];
	var yArr = [];
	var resultList = [];
	if(data.length > 0){
		$.each(data, function(i) {
			xArr[i] = data[i].sp;
			yArr[i] = data[i].qoe;
		});
		
	}
	resultList = [xArr,yArr];
	return resultList;
}

function drawColumn(htmlid,data){
	var height = $(".sub:visible").height();
	var width = $(".sub:visible").width();
	if(height==null || height==0){
		height = "185px";
	} 
	if(width==null || width==0){
		width = "1000px";
	} 
	$("#"+htmlid).css("height", height);
	$("#"+htmlid).css("width", width);
	
	var chartOption = {
	    title : {
	        text: ''
	    },
	    tooltip : {
	        trigger: 'axis'
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : data[0]
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name:'优良率',
	            type:'bar',
	            data:data[1]
	        }
	    ]
	};
	var chart = echarts.init(document.getElementById(htmlid),'macarons');
	chart.resize();
	chart.setOption(chartOption, true);
		
}



//右下方折线图
function drawLineChart(htmlid,topparam,data,city){
	$("#"+htmlid).html("");
	var textValue = topparam;
	var limitGood=0,limitBad=0;
	var module = $("#module").val();
	
	if (topparam == "首屏延时" || topparam == "") {
		limitGood = firstPackageGoodlt;
		limitBad = firstPackagebadlt;
		textValue += '(ms)';
	}
	if (topparam == "页面打开延时") {
		limitGood = pageOpenGoodlt;
		limitBad = pageOpenbadlt;
		textValue += '(ms)';
	}
	if (topparam == "视频下载速率") {
		limitGood = videoDlGoodlt;
		limitBad = videoDlbadlt;
		textValue += '(Kbps)';
	}
	if (topparam == "页面访问成功率") {
		limitGood = pageVisitGoodlt;
		limitBad = pageVisitBadlt;
		textValue += '(%)';
	}
	if (topparam == "播放延时") {
		textValue += '(s)';
	}
	if (topparam == "播放卡顿") {
		textValue += '(次数)';
	}
	if (topparam == "发送接受成功率") {
		limitGood = totalFeelBest;
		limitBad = totalFeelBad;
		textValue += '(%)';
	}
	if (topparam == "消息上传/下载速率") {
		textValue += '(Kbps)';
	}
	if (topparam == "发送接收时延") {
		textValue += '(ms)';
	}
	
	$('#'+htmlid).highcharts({
		chart: {
			type:'spline',
			backgroundColor: 'rgba(0,0,0,0)'
		},
		title: {
			text: '',
			x: -20,
			y: 10,
			style: {
				'font-weight': 'bold',
				'color': UI_Color.label,
				'font-family': "微软雅黑"
			}
		},
		plotOptions:{
			series:{
				cursor:'pointer',
				events:{
					click:function(e){
						var date = e.point.category;
						var portalName = e.point.series.name;
						var seriesName = topparam;
						var district = $("#city_district").val();
						if(module=="3"){return;}
						if(district!='全市' && district!=null){
							return;
						}
						d_module = module;
						d_seriesName = seriesName;
						d_portalName = portalName;
						d_date = date;
						d_city = city;
						if(module=="0"){
							if(changeType=='allScreen'){
								if(interval_linechart!=null){
									clearInterval(interval_linechart);
									interval_linechart = null;
								}
							}
						}
						getDetailTab('sp');
						$("#detailul li").removeClass('active');
						$("#detailul li:first").addClass('active');
						$("#tab_11,#tab_12,#tab_13,#tab_14").removeClass('active');
						$("#tab_11").addClass('active');
						$("#detailul li").unbind("click");
						$("#detailul li").click(function(){
							getDetailTab($(this).data('name'));
						});
						layer.closeAll('loading');
				    	layer.open({
			                type: 1,shift: 2,
			                skin: 'layer-class',
			                shadeClose: true, //开启遮罩关闭
			                title: portalName+((seriesName=='首屏延时')?'网页首屏时延':seriesName)+' ( '+date+' ) ',
			                content: $('#detail'),
			                area: ['100%', '100%'],
							cancel:function(index, layero){
								if(module=="0"){
									if(changeType=='allScreen'){
										if(interval_linechart!=null){
											clearInterval(interval_linechart);
											interval_linechart = null;
										}
										flag+=1;
										setChartsInterval(topparam,dataInterval,city);
									}
								}
			                },
			                end: function () {
			                	$("#map_11").removeClass('active');
								$("#map_11").addClass('active');
			                }
			            });
					},
					mouseOut:function(e){
						if(module=="0"){
							if(changeType=='allScreen'){
								if(interval_linechart!=null){
									clearInterval(interval_linechart);
									interval_linechart = null;
								}
								flag+=1;
								setChartsInterval(topparam,dataInterval,city);
							}
						}
					},
					mouseOver:function(e){
						if(module=="0"){
							if(changeType=='allScreen'){
								if(interval_linechart!=null){
									clearInterval(interval_linechart);
									interval_linechart = null;
								}
							}
						}
					}
				}
			}
		},
		xAxis: {
			categories: xArr,
			labels: {
				style: {
					'color': UI_Color.label,
					'font-family': "微软雅黑"
				},
				rotation:0.1
			},
			lineColor: UI_Color.label
		},
		yAxis: {
			title: {
				text: textValue,
			},
			plotLines: [{
				 label:{
				        text:'劣化',     //标签的内容
				        align:'left',                //标签的水平位置，水平居左,默认是水平居中center
				        style:{ color:UI_Color.label}
				},
				width: 1,
				color: 'red',
				dashStyle: 'shortDashdot',
				value: limitBad,
				zIndex: 10000
			}, {
				 label:{
				        text:'优秀',     //标签的内容
				        align:'left',                //标签的水平位置，水平居左,默认是水平居中center
				        style:{ color:UI_Color.label}
				},
				width: 1,
				color: '#92D050',
				dashStyle: 'shortDashdot',
				value: limitGood,
				zIndex: 10000
			}],
			labels: {
				style: {
					'color': UI_Color.label,
					'font-family': "微软雅黑"
				},
				format:'{value:.,0f}'
			}
		},
		tooltip: {
			valueSuffix: ''
		},
		legend: {
			layout: 'horizontal',
			align: 'center',
			verticalAlign: 'bottom',
			borderWidth: 0,
			itemHiddenStyle: {
				'color': '#808080'
			},
			itemStyle: {
				'color': UI_Color.label,
				'font-family': "微软雅黑"
			}
		},
		series: data
	});
}

function drawLineChart2(htmlid,topparam,data,city){
	$("#"+htmlid).html("");
	var module = $("#module").val();
	$('#'+htmlid).highcharts({
		chart: {
			type:'spline',
			backgroundColor: 'rgba(0,0,0,0)'
		},
		title: {
			text: '',
			x: -20,
			y: 10,
			style: {
				'font-weight': 'bold',
				'color': '#C0D0E0',
				'font-family': "微软雅黑"
			}
		},
		plotOptions:{
			series:{
				cursor:'pointer',
				events:{
					click:function(e){
						var date = e.point.category;
						var seriesName = e.point.series.name;
						if(seriesName.length>0 && seriesName.indexOf('(')>0){
							seriesName = seriesName.substring(0,seriesName.indexOf('('));
						}
						if(module=="3"){return;}
						if(seriesName=="归一化优良率"){return;}
						d_module = module;
						d_seriesName=(seriesName=="网页首屏时延")?'首屏延时':seriesName;
						d_portalName="";
						d_date=date;
						d_city=city;
						getDetailTab('sp');
						$("#detailul li").removeClass('active');
						$("#detailul li:first").addClass('active');
						$("#tab_11,#tab_12,#tab_13,#tab_14").removeClass('active');
						$("#tab_11").addClass('active');
						$("#detailul li").unbind("click");
						$("#detailul li").click(function(){
							getDetailTab($(this).data('name'));
						});
						layer.closeAll('loading');
				    	layer.open({
			                type: 1,shift: 2,
			                skin: 'layer-class',
			                shadeClose: true, //开启遮罩关闭
			                title: seriesName+' ( '+date+' ) ',
			                content: $('#detail'),
			                area: ['100%', '100%'],
							cancel:function(index, layero){
								if(module=="0"){
									if(changeType=='allScreen'){
										if(interval_linechart!=null){
											clearInterval(interval_linechart);
											interval_linechart = null;
										}
										flag+=1;
										setChartsInterval(topparam,dataInterval,city);
									}
								}
			                },
			                end: function () {
			                	$("#map_11").removeClass('active');
								$("#map_11").addClass('active');
			                }
			            });
					}
				}
			}
		},
		xAxis: {
			categories: xArr2,
			labels: {
				style: {
					'color': UI_Color.label,
					'font-family': "微软雅黑"
				},
				rotation:0.1
			},
			lineColor: UI_Color.label
		},
		yAxis: [{
			title: {
				text: ''
			},
			labels: {
				style: {
					'color': '#2F7ED8',
					'font-family': "微软雅黑"
				},
				format:'{value:.,0f}'
			}
		}, {
			title: {
				text: ''
			},
			labels: {
				style: {
					'color': '#0D233A',
					'font-family': "微软雅黑"
				},
				format:'{value:.,0f}'
			}
		},{
			title: {
				text: ''
			},
			labels: {
				style: {
					'color': '#8BBC21',
					'font-family': "微软雅黑"
				},
				format:'{value:.,0f}'
			},
			opposite: true,
		}, {
			title: {
				text: ''
			},
			labels: {
				style: {
					'color': '#910000',
					'font-family': "微软雅黑"
				},
				format:'{value:.,0f}'
			},
			opposite: true,
		}, {
			title: {
				text: ''
			},
			labels: {
				style: {
					'color': '#910000',
					'font-family': "微软雅黑"
				},
				format:'{value:.,0f}'
			},
			opposite: true,
		}],
		tooltip: {
			valueSuffix: ''
		},
		legend: {
			layout: 'horizontal',
			align: 'center',
			verticalAlign: 'bottom',
			borderWidth: 0,
			itemHiddenStyle: {
				'color': '#808080'
			},
			itemStyle: {
				'color': UI_Color.label,
				'font-family': "微软雅黑"
			}
		},
		series: data
	});
}*/



