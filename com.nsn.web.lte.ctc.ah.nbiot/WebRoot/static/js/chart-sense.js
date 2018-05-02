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
function drawEchartsMap(htmlid,data,changedMapType,mapType){
	//$("#"+htmlid).html("");
	var myChart = echarts.init(document.getElementById(htmlid));
	
	var traffic = [];
	var data1 = data["dtsj"];
	var data2 = data["sxx"];
	var max = data2.max;
	var min = data2.min;
	if((mapType=='0'||mapType=='1'||mapType=='2')&&min>80){
		min = 80;
	}
	
	if(mapType=="0"){
		for(var i=0;i<data1.length;i++){
			traffic[i]={
					name:data1[i].city,
					value:data1[i].integration_rate
			}
		}
	}else if(mapType=="1"){
		for(var i=0;i<data1.length;i++){
			traffic[i]={
					name:data1[i].city,
					value:data1[i].qoe_rate
			}
		}
	}else if(mapType=="2"){
		for(var i=0;i<data1.length;i++){
			traffic[i]={
					name:data1[i].city,
					value:data1[i].attach_rate
			}
		}
	}else if(mapType=="3"){
		for(var i=0;i<data1.length;i++){
			traffic[i]={
					name:data1[i].city,
					value:data1[i].traffic
			}
		}
	}else{
		for(var i=0;i<data1.length;i++){
			traffic[i]={
					name:data1[i].city,
					value:data1[i].user_count
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
		            			if(key=="integration_rate"){
		            				res += "一体化指标:"+data1[i][key]+"%<br/>"
		            			}
		            			if(key=="qoe_rate"){
		            				res += "整体感知优良率:"+data1[i][key]+"%<br/>"
		            			}
		            			if(key=="attach_rate"){
		            				res += "attach成功率:"+data1[i][key]+"%<br/>"
		            			}
		            			if(key=="user_count"){
		            				res += "用户数:"+data1[i][key]+"<br/>"
		            			}
		            			if(key=="traffic"){
		            				res += "流量:"+data1[i][key]+"GB<br/>"
		            			}
		            		}
	            		}
		            }
		            return res;
		       }
			},
			
			dataRange : {
				x: 'left',
				y: 'bottom',
				min: Math.floor(min),
				max: Math.ceil(max),
				text:['High','Low'],
				realtime: false,
				calculable : true,
				color: ['#39AA1E','yellow','red']
			},
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
					url:"/nbiot/sense/getCities",
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
				    	
				    	initDate();
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
				initDate();
			}
		});
}




