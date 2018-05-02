var _type = 0;
var type_line = 0;
var cityparam = "";
var sdate = "";
var _area = "";
//var scene = "0";
//var custom = "0";

$(function(){
	laydate({
		elem: '#sdate', 
		istime: false, 
		format: 'YYYY-MM-DD',
		choose : function(date) { // 选择好日期的回调
			if(date>laydate.now(0)){
				layer.msg(laydate.now(0)+" 已是最新数据！");
				$("#sdate").val(laydate.now(0));
			}else{
				cleanData();
				loadInterface();
				loadIndustry();
			}
		}
	});
	$("#sdate").val(laydate.now(-1, "YYYY-MM-DD"));
	if(Gsdate!=''&&Gsdate!=null){
		$("#sdate").val(laydate.now(-1, Gsdate));
	}
	
	//地市两个下拉框初始化
	//N.Util.cities("city");
	
	initDate();
});

function loadeData(){
	cityparam = $("#city option:selected").text();
	if(cityparam!="全省"){
		_area = $("#city_district option:selected").text();
	}else{
		_area = "0";
	}
	sdate = $("#sdate").val();
	
	/*var scene = $(".J-SCENE").val();//行业
	scene = scene==""||scene==null||scene=="请选择"?"0":scene;
    var custom = $(".J-CUSTOM").val();//客户
    scene = custom==""||custom==null||custom=="请选择"?"0":custom;*/
};

function initDate(){
	var me = this;
	loadeData();
	
	//loadScene();//行业
	loadCustomer();//客户
	
	$("#chart4-clock").hide();//隐藏一个仪表盘
	
	loadDate();
	//loadClockData();//加载仪表盘
	//loadChartsLine();//加载折线图
	
	
	//获取url地市指标
    if(Gcity!='0'&&Gcity!=null&&Gcity!=''){
    	var obj = document.getElementById("city");
		for(i=0;i<obj.length;i++){
		  if(obj[i].text == Gcity)
		    obj[i].selected = true;
		}
    }
	//获取url企业指标
	if(GsceneId!='0'&&GsceneId!=null&&GsceneId!=''){
		$("#industry").val(GsceneId);
	}
	//获取url客户指标
	if(GcustomId!='0'&&GcustomId!=null&&GcustomId!=''){
		$("#customer").val(GcustomId);
	}
	
	
	loadInterface();
	loadIndustry();//行业图
	
	$("#city").change(function(){
		$("#nowcity").val("");
		cleanData();
		loadeData();
		loadCustomer();
		loadDate();
	})
	
	$("#sel-map").change(function(){
		loadeData();
		loadSenseMap();//地图
	})
	
	$("#city_district").change(function(){
		cleanData();
		loadeData();
		loadCustomer();
		loadInterface();
		loadIndustry();
	})
	
	$(".switch-tab-table").click(function(){
		
		$("#d0-chart-busrate").html("");
		$("#d0-chart-ternet").html("");
		$("#d0-chart-eps").html("");
		$("#d0-chart-transfer").html("");
		
	    $(".switch-tab-table").removeClass("active");
	    $(this).addClass("active");
	    var type = $(this).attr("data");
	    if(type==0){
	    	
	    	$("#chart3-clock").show();
	    	$("#chart4-clock").hide();
	    	
	    	$("#clock1").html("端到端成功率");
	    	$("#clock2").html("Attach建立成功率");
	    	$("#clock3").html("RRC连接成功率");
	    	me._type = 0;
	    	me.loadClockData();
	    }else if(type==1){
	    	$("#chart3-clock").hide();
	    	$("#chart4-clock").hide();
	    	
	    	$("#clock1").html("网络感知优良率");
	    	$("#clock2").html("用户感知优良率");
	    	me._type = 1;
	    	me.loadClockData();
	    	
	    }else if(type==2){
	    	$("#chart3-clock").show();
	    	$("#chart4-clock").show();
	    	
	    	$("#clock1").html("上行业务优良率");
	    	$("#clock2").html("下行业务优良率");
	    	$("#clock3").html("上行业务传递时延");
	    	$("#clock4").html("下行业务传递时延");
	    	me._type = 2;
	    	me.loadClockData();
	    }else{
	    	$("#chart3-clock").show();
	    	$("#chart4-clock").show();
	    	
	    	$("#clock1").html("PDN建立成功率");
	    	$("#clock2").html("TAU更新成功率");
	    	$("#clock3").html("PAGING成功率");
	    	$("#clock4").html("服务请求成功率");
	    	me._type = 3;
	    	me.loadClockData();
	    }
    });
	
	$(".switch-tab-table1").click(function(){
		
		$("#d0-chart-b24h").html("");
		
		$(".switch-tab-table1").removeClass("active");
	    $(this).addClass("active");
	    var type = $(this).attr("data");
	    if(type==0){
	    	//小时维度
	    	me.type_line = 0;
	    	me.loadChartsLine();
	    }else{
	    	//天维度
	    	me.type_line = 1;
	    	me.loadChartsLine();
	    }
	});
};

function loadInterface(){
	loadeData();
	loadClockData();//加载仪表盘
	loadChartsLine();//加载折线图
	loadSenseMap();//地图
	loadTableEnd();//端到端表格
};

//清空
function cleanData(){
	$("#d0-chart-busrate").html("");
	$("#d0-chart-ternet").html("");
	$("#d0-chart-eps").html("");
	$("#d0-chart-transfer").html("");
	
	//$("#d0-chart-b24h").html("");
	
	//$("#flow-data-table").html("");
	
	//$("#industry-data-table").html("");
};

function loadDate(){
	if($("#city").val()!='-1'){
		$("#city_district").html("");
		$("#_city").show();
		$.ajax({
			type: "POST",
			url:"/nbiot/general/getCities",
			data:{
				  'cityparam': $("#city option:selected").text()
			},
			dataType:'json',
		    success: function(data) {
		    	var district = "<option value='全市'>全市</option>";
		    	$.each(data,function(i,obj){
		    		if(obj.city_cn!='全市'){
		    			district+="<option value="+obj.city_cn+">"+obj.city_cn+"</option>";
		    		}
		    		if(i==data.length-1&&$("#city option:selected").text()=='六安市'){
		    			district+="<option value='叶集区'>叶集区</option>";
		    		}
	    		});
		    	$("#city_district").append(district);
		    	
		    	loadInterface();
		    	loadIndustry();
		    }
		});
		
	}else{
		$("#city_district").html("");
		$("#_city").hide();
		
		loadInterface();
		loadIndustry();
	}
	
	
};

//行业加载
/*function loadScene(){
	$.ajax({
		type: "POST",
		url:"/nbiot/general/getIndustry",
		data:{
			  //'cityparam': $("#city option:selected").text()
		},
		dataType:'json',
	    success: function(data) {
	    	var district = "<option value='请选择'>请选择</option>";
	    	$.each(data,function(i,obj){
	    		
	    		district+="<option value="+obj.c_scene_name+">"+obj.c_scene_name+"</option>";
	    		
    		});
	    	$("#industry").append(district);
	    	
	    	//loadCustomer();//客户
	    }
	});
};*/


//客户加载
function loadCustomer(){
	$("#customer").html("");
	scene = $("#industry option:selected").text();
	if(scene!='请选择'&&scene!=''&&(_area=='全市'||_area=='0'||_area=='')){
		$.ajax({
			type: "POST",
			url:"/nbiot/general/getCustomer",
			data:{
				'scene': scene
			},
			dataType:'json',
			success: function(data) {
				var district = "<option value='请选择'>请选择</option>";
				$.each(data,function(i,obj){
					
					district+="<option value="+obj.c_custom_name+">"+obj.c_custom_name+"</option>";
					
				});
				$("#customer").append(district);
				$(".J-CUSTOM").removeAttr("disabled");
				$(".J-CUSTOM").css({'color':'#f5f5f5','border':'1px solid #ccc'});
			}
		});
	}else{
		$("#customer").html("<option value='请选择'>请选择</option>");
		$(".J-CUSTOM").attr("disabled","disabled");
		$(".J-CUSTOM").css({'color':'#8a8a8a','border':'1px solid #8a8a8a'});
	}
};

function initQueryInfo(data){
	if(data=='1'){
		
		cleanData();
		loadeData();
		loadCustomer();
		loadInterface();
		loadIndustry();
	}else{
		cleanData();
		loadInterface();
		loadIndustry();
	}
};

//加载表盘数据
function loadClockData(){
	//sdate = "2018-04-08";
	$.ajax({
		type: "POST",
		url:"/nbiot/general/getLoadClock",
		data:{
			"_type":_type,
			"sdate":sdate,
			"cityparam":cityparam,
			"_area":_area,
			"scene" : $("#industry option:selected").text(),
			"custom": $("#customer option:selected").text()
		},
		dataType:'json',
	    success: function(data) {
	    	
	    	for(var key in data){
	    		
	    		var min = 70 -  Math.abs(data[key] - 70);
				if(min%5!=0){
					min = min-(min%5);
				}
				
				var center = 70;
				var max = 85;
				var limit = {min:min,center:center,max:max};
				var serise = [data[key]];
		    	if(_type==0){
		    		if(key=="END_AND_END"){
		    			createEcharts(0,{title:"端到端成功率",htmlId:"d0-chart-busrate",limit:limit,serise:serise});
		    		}
		    		if(key=="ATTACH"){
		    			createEcharts(0,{title:"Attach建立成功率",htmlId:"d0-chart-ternet",limit:limit,serise:serise});
		    		}
		    		if(key=="RRC"){
		    			createEcharts(0,{title:"RRC连接成功率",htmlId:"d0-chart-eps",limit:limit,serise:serise});
		    		}
		    	}else if(_type==1){
		    		if(key=="RATE"){
		    			createEcharts(0,{title:"网络感知优良率",htmlId:"d0-chart-busrate",limit:limit,serise:serise});
		    		}
		    		if(key=="USER_RATE"){
		    			createEcharts(0,{title:"用户感知优良率",htmlId:"d0-chart-ternet",limit:limit,serise:serise});
		    		}
		    	}else if(_type==2){
		    		if(key=="UP"){
		    			createEcharts(0,{title:"上行业务成功率",htmlId:"d0-chart-busrate",limit:limit,serise:serise});
		    		}
		    		if(key=="DOWN"){
		    			createEcharts(0,{title:"下行业务成功率",htmlId:"d0-chart-ternet",limit:limit,serise:serise});
		    		}
		    		if(key=="UP_SERVICE"){
		    			createEcharts(0,{title:"上行业务传递时延",htmlId:"d0-chart-eps",limit:limit,serise:serise});
		    		}
		    		if(key=="DOWN_SERVICE"){
		    			createEcharts(0,{title:"下行业务传递时延",htmlId:"d0-chart-transfer",limit:limit,serise:serise});
		    		}
		    	}else{
		    		if(key=="PDN"){
		    			createEcharts(0,{title:"PDN建立成功率",htmlId:"d0-chart-busrate",limit:limit,serise:serise});
		    		}
		    		if(key=="TAU"){
		    			createEcharts(0,{title:"TAU更新成功率",htmlId:"d0-chart-ternet",limit:limit,serise:serise});
		    		}
		    		if(key=="PAG"){
		    			createEcharts(0,{title:"PAGING成功率",htmlId:"d0-chart-eps",limit:limit,serise:serise});
		    		}
		    		if(key=="REQUEST"){
		    			createEcharts(0,{title:"服务请求成功率",htmlId:"d0-chart-transfer",limit:limit,serise:serise});
		    		}
		    	}
	    		
	    	}
	    	
	    }
	});
};

//地图加载
function loadSenseMap(){
	var me = this;
	var mapType = $("#sel-map").val();
	$("#map").html("");
	
	$.ajax({
		type: "POST",
		url:"/nbiot/general/getLoadSenseMap",
		data:{
			"sdate":sdate,
			"cityparam":cityparam,
			"mapType":mapType,
			"scene" : $("#industry option:selected").text(),
			"custom": $("#customer option:selected").text()
		},
		dataType:'json',
	    success: function(data) {
	    	var changedMapType = city_name;
	    	if(me.cityparam!=null && me.cityparam!="" && me.cityparam!='全省'){
	    		changedMapType = me.cityparam;
	    	}
	    	drawEchartsMap('map',data,changedMapType,mapType);
	    }
	});
};

//加载折线图
function loadChartsLine(){
	$("#d0-chart-b24h").html("");
	$.ajax({
		type: "POST",
		url:"/nbiot/general/getLloadChartsLine",
		data:{
			 "type_line":type_line,
			  "sdate":sdate,
			  "cityparam":cityparam,
			  "_area":_area,
			  "scene" : $("#industry option:selected").text(),
			  "custom": $("#customer option:selected").text()
		},
		dataType:'json',
	    success: function(data) {
	    	
	    	var text = "小时级指标概览";
	    	var xAxis = [];
	    	var series = [];
	    	var data1 = [];
	    	var data2 = [];
	    	var data3 = [];
	    	var data4 = [];
	    	
	    	if(type_line==1){
	    		text = "一周数据概览";
	    	}
	    	
	    	for(var i=0;i<data.length;i++){
	    		if(type_line==1){
	    			xAxis[i] = data[i].sdate.substring(0,data[i].sdate.length-9);
	    		}else{
	    			xAxis[i] = data[i].p_hour;
	    		}
	    		data1[i] = data[i].end_and_end_rate;
	    		data2[i] = data[i].rate;
	    		data3[i] = data[i].attach_rate;
	    		data4[i] = data[i].rrc_rate;
	    	}
	    	
	    	series = [
	    		{
	    			name:"端到端成功率",
	    			data:data1
	    		},{
	    			name:"感知优良率",
	    			data:data2
	    		},{
	    			name:"attach成功率",
	    			data:data3
	    		},{
	    			name:"RRC连接成功率",
	    			data:data4
	    		}
	    	];
	    	
	    	createChart(xAxis, series, "",1, text, "d0-chart-b24h");
	    }
	});
};

//端到端排名
function loadTableEnd(){
	$("#flow-data-table").html("");
	$.ajax({
		type: "POST",
		url:"/nbiot/general/getLoadTableEnd",
		data:{
			"sdate":sdate,
			"cityparam":cityparam,
			"scene" : $("#industry option:selected").text(),
			"custom": $("#customer option:selected").text()
		},
		dataType:'json',
	    success: function(data) {
	    	var _table = "";
	    	for(var i=0;i<data.length;i++){
	    		_table += "<tr>";
				for(var key in data[i]){
					if(key!='sdate'){
						_table += "<td>"+(data[i][key]==null?'-':data[i][key])+"</td>";
					}
				}
				_table += "</tr>";
	    	}
	    	$("#flow-data-table").html(_table);
	    }
	});
};

//行业
function loadIndustry(){
	$("#industry-data-table").html("");
	$.ajax({
		type: "POST",
		url:"/nbiot/general/getLoadIndustry",
		data:{
			"sdate":sdate,
			"cityparam":cityparam,
			"_area":_area,
			"scene" : $("#industry option:selected").text(),
			"custom": $("#customer option:selected").text()
		},
		dataType:'json',
	    success: function(data) {
	    	var _table = "";
	    	for(var i=0;i<data.length;i++){
	    		_table += "<tr>";
				for(var key in data[i]){
					if(key!='sdate'){
						_table += "<td>"+(data[i][key]==null?'-':data[i][key])+"</td>";
					}
				}
				_table += "</tr>";
	    	}
	    	$("#industry-data-table").html(_table);
	    }
	});
};

