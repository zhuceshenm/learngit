var dts1,dts2,dts3;
var _type=2;
var type_line=0;
var v_data_type;
var v_sdate;
var v_scity ;
var v_area;
var v_c_scene_name;
var v_c_custom_name;
var i = 0;
$(function() {
	
   /* $(".nav_gis").click(function() {
        $(".nav_gis").removeClass("tab-active");
        $(this).addClass("tab-active");
        var index = $(this).index();
        //$("#gisFrame").attr("src","static/esr.html?type="+index);
    });*/
    
    /*$(".switch-tab-table").click(function(){
	    $(".switch-tab-table").removeClass("active");
	    $(this).addClass("active");
	    	var type = $(this).attr("data");
	    	var sdate = $(".J-SDATE").val();
	    	var isknow = $(".J-ISKNOW").val();
	    var area = $(".J-AREA").val();
	    var scene = $(".J-SCENE").val();
	    var custom = $(".J-CUSTOM").val();
	    	initMonYearChart(type,sdate,isknow,area,scene,custom);
    });*/
    
   /* $("._ico_exp").click(function(){
    	var type = $(this).attr("data");//1,2(wireshark),3,4
	 	var loading = layer.msg('正在下载,请稍等...');
	 	//nbiotService.exportFile("1","NBIOT"
	 	$.get("/nbiot/sense/exportFile", {
			"type":"1",
			"templateName":"NBIOT"
			},function(data){
				layer.close(loading);
		 		window.open("../" + data, "_self");
		});
	});*/

    /*$('#nbiot-sense-group-apn').niceScroll({
		cursorcolor: "#ccc",//#CC0071 光标颜色
		cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
		touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
		cursorwidth: "5px", //像素光标的宽度
		cursorborder: "5", // 游标边框css定义
		cursorborderradius: "5px",//以像素为光标边界半径
		autohidemode: true //是否隐藏滚动条
	});*/
    
    laydate({
		elem: '#sdate1', 
		istime: false, 
		format: 'YYYY-MM-DD',
		choose : function(date) { // 选择好日期的回调
			if(date>laydate.now(0)){
				layer.msg(laydate.now(0)+" 已是最新数据！");
				$("#sdate1").val(laydate.now(0));
			}else{
				//加载页面上的指标
				initDate();
			}
		}
	});
    
    laydate({
		elem: '#sdate2', 
		istime: true, 
		format: 'YYYY-MM-DD hh:00:00',
		choose : function(date) { // 选择好日期的回调
			if(date>laydate.now(0)){
				layer.msg(laydate.now(0)+" 已是最新数据！");
				$("#sdate2").val(laydate.now(0));
			}else{
				//加载页面上的指标
				initDate();
			}
		}
	});
    
    loadTimeComponent();//加载时间组件
    $("#_date").change(function(){
    	loadTimeComponent();
    	initDate();
    });
    
    
  //仪表盘选择
	$(".switch-tab-table").click(function(){
		
		$("#d0-chart-busrate").html("");
		$("#d0-chart-ternet").html("");
		$("#d0-chart-eps").html("");
		$("#d0-chart-transfer").html("");
		$("#all_in_one").html("");
		
	    $(".switch-tab-table").removeClass("active");
	    $(this).addClass("active");
	    var type = $(this).attr("data");
	    if(type==0){
	    	$("#left_center_count").show();
	    	$("#clock1").html("业务完成率");
	    	$("#clock2").html("能力协商");
	    	$("#clock3").html("承载建立");
	    	$("#clock4").html("网络切换");
	    	$("#center_count").html("一体化指标");
	    	_type = 0;
	    	loadClockData();
	    }else if(type==1){
	    	$("#left_center_count").show();
	    	
	    	$("#clock1").html("网页浏览优良率");
	    	$("#clock2").html("视频优良率");
	    	$("#clock3").html("游戏优良率");
	    	$("#clock4").html("即时通信优良率");
	    	$("#center_count").html("整体优良率");
	    	_type = 1;
	    	loadClockData();
	    	
	    }else if(type==2){
	    	
	    	$("#left_center_count").hide();
	    	
	    	$("#clock1").html("ATTACH成功率");
	    	$("#clock2").html("PDN成功率");
	    	$("#clock3").html("TAU成功率");
	    	$("#clock4").html("能力协商");
	    	_type = 2;
	    	loadClockData();
	    }
    });
	
	//折线图小时天
	$(".switch-tab-table1").click(function(){
		
		$("#d0-chart-b24h").html("");
		
		$(".switch-tab-table1").removeClass("active");
	    $(this).addClass("active");
	    var type = $(this).attr("data");
	    if(type==0){
	    	//小时维度
	    	type_line = 0;
	    	loadChartsLine();
	    }else{
	    	//天维度
	    	type_line = 1;
	    	loadChartsLine();
	    }
	});
	
	//地市区域
	loadDate();
	//地市改变
	$("#city").change(function(){
		loadDate();
		//获取维度数据
		loadIndicators();
		loadCustomer();//客户加载
		//initDate();
	});
	
	//区域改变
	$("#city_district").change(function(){
		//获取维度数据
		loadIndicators();
		loadCustomer();//客户加载
		//initDate();
	});
	
	//loadScene();//行业下拉框加载
	//行业改变
	$("#industry").change(function(){
		//获取维度数据
		loadIndicators();
		loadCustomer();//客户加载
		//initDate();
	});
	
	
	
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
	
	
	loadCustomer();//客户加载
	//客户改变
	$("#customer").change(function(){
		initDate();
	});
	
	//地图渲染指标
	$("#sel-map").change(function(){
		loadSenseMap();//地图
	})
	
	
	//initDate();//加载
	
	
	
});


function loadTimeComponent(){
	if($("#_date option:selected").text()=='天'){
    	//$("#kong_sdate").empty();
    	//$("#kong_sdate").append("<input type='text' id='sdate1' class='J-SDATE' />");
		$("#sdate1").show();
		$("#sdate2").hide();
    	/*laydate({
    		elem: '#sdate1', 
    		istime: false, 
    		format: 'YYYY-MM-DD',
    		choose : function(date) { // 选择好日期的回调
    			if(date>laydate.now(0)){
    				layer.msg(laydate.now(0)+" 已是最新数据！");
    				$("#sdate1").val(laydate.now(0));
    			}else{
    				
    			}
    		}
    	});*/
		$("#sdate1").val(laydate.now(-1, "YYYY-MM-DD"));
		if(Gsdate!=''&&Gsdate!=null){
			$("#sdate1").val(laydate.now(-1, Gsdate));
		}
    }else{
    	//$("#kong_sdate").empty();
    	//$("#kong_sdate").append("<input type='text' id='sdate2' class='J-SDATE' />");
    	$("#sdate1").hide();
		$("#sdate2").show();
    	/*laydate({
    		elem: '#sdate1', 
    		istime: true, 
    		format: 'YYYY-MM-DD hh:00:00',
    		choose : function(date) { // 选择好日期的回调
    			if(date>laydate.now(0)){
    				layer.msg(laydate.now(0)+" 已是最新数据！");
    				$("#sdate1").val(laydate.now(0));
    			}else{
    				
    			}
    		}
    	});*/
    	$("#sdate2").val(laydate.now(-1, "YYYY-MM-DD hh:00:00"));
    }
	
}

//区域加载
function loadDate(){
	if($("#city").val()!='-1'){
		$("#city_district").html("");
		$("#_city").show();
		$.ajax({
			type: "POST",
			url:"/nbiot/sense/getCities",
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
		    }
		});
		
	}else{
		$("#city_district").html("");
		$("#_city").hide();
	}
}

//获取页面上所有指标
function loadIndicators(){
	//获取时间
	if($("#_date option:selected").text()=='天'){
		v_sdate = $("#sdate1").val();
	}else{
		v_sdate = $("#sdate2").val();
	}
	
	//时间维度
	v_data_type = $("#_date").val();
	
	//获取地市
	v_scity = $("#city option:selected").text();
	
	//获取区域
	var area = $("#city_district option:selected").text();
	v_area = area==null||area==''?'全市':area;
	
	//场景
	var scene = $("#industry option:selected").text();
	v_c_scene_name = scene==null||scene==''||scene=='请选择'?'所有':scene;
	
	//客户
	var custom = $("#customer option:selected").text();
	v_c_custom_name = custom==null||custom==''||custom=='请选择'?'所有':custom;
	
}

//初始化
function initDate(){
	
	//获取维度数据
	loadIndicators();
	
	//loadCustomer();//客户加载
	
	//加载页面上的指标
	loadClockData();//仪表盘
	loadChartsLine();//折线图
	loadSenseMap();//地图
	loadTableEnd();//端到端表
	loadIndustry();//行业表
}


//加载表盘数据
function loadClockData(){
	
	$("#d0-chart-busrate").html("");
	$("#d0-chart-ternet").html("");
	$("#d0-chart-eps").html("");
	$("#d0-chart-transfer").html("");
	$("#all_in_one").html("");
	$.ajax({
		type: "POST",
		url:"/nbiot/sense/getSenseClock",
		data:{
			"_type":_type,
			"v_sdate":v_sdate,
			"v_data_type":v_data_type,
			"v_scity":v_scity,
			"v_area" : v_area,
			"v_c_scene_name": v_c_scene_name,
			"v_c_custom_name": v_c_custom_name
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
		    		if(key=="businesscomp_rate"){
		    			createEcharts(0,{title:"业务完成率",htmlId:"d0-chart-busrate",limit:limit,serise:serise});
		    		}
		    		if(key=="ability_rate"){
		    			createEcharts(0,{title:"能力协商",htmlId:"d0-chart-ternet",limit:limit,serise:serise});
		    		}
		    		if(key=="connect_rate"){
		    			createEcharts(0,{title:"承载建立",htmlId:"d0-chart-eps",limit:limit,serise:serise});
		    		}
		    		if(key=="netupdate_rate"){
		    			createEcharts(0,{title:"网络切换",htmlId:"d0-chart-transfer",limit:limit,serise:serise});
		    		}
		    		if(key=="integration_rate"){
		    			$("#all_in_one").html(data[key]+"%");
		    		}
		    	}else if(_type==1){
		    		if(key=="http_rate"){
		    			createEcharts(0,{title:"网页浏览优良率",htmlId:"d0-chart-busrate",limit:limit,serise:serise});
		    		}
		    		if(key=="video_rate"){
		    			createEcharts(0,{title:"视频优良率",htmlId:"d0-chart-ternet",limit:limit,serise:serise});
		    		}
		    		if(key=="game_rate"){
		    			createEcharts(0,{title:"游戏优良率",htmlId:"d0-chart-eps",limit:limit,serise:serise});
		    		}
		    		if(key=="im_rate"){
		    			createEcharts(0,{title:"即时通信优良率",htmlId:"d0-chart-transfer",limit:limit,serise:serise});
		    		}
		    		if(key=="qoe_rate"){
		    			$("#all_in_one").html(data[key]+"%");
		    		}
		    	}else if(_type==2){
		    		if(key=="attach_rate"){
		    			createEcharts(0,{title:"ATTACH成功率",htmlId:"d0-chart-busrate",limit:limit,serise:serise});
		    		}
		    		if(key=="pdn_rate"){
		    			createEcharts(0,{title:"PDN成功率",htmlId:"d0-chart-ternet",limit:limit,serise:serise});
		    		}
		    		if(key=="tau_rate"){
		    			createEcharts(0,{title:"TAU成功率",htmlId:"d0-chart-eps",limit:limit,serise:serise});
		    		}
		    		if(key=="ability_rate"){
		    			createEcharts(0,{title:"能力协商",htmlId:"d0-chart-transfer",limit:limit,serise:serise});
		    		}
		    	}
	    		
	    	}
	    	
	    }
	});
}


//加载折线图
function loadChartsLine(){
	$("#d0-chart-b24h").html("");
	$.ajax({
		type: "POST",
		url:"/nbiot/sense/getLloadChartsLine",
		data:{
			"type_line":type_line,
			"v_sdate":v_sdate,
			"v_data_type":v_data_type,
			"v_scity":v_scity,
			"v_area" : v_area,
			"v_c_scene_name": v_c_scene_name,
			"v_c_custom_name": v_c_custom_name
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
	    	}else{
	    		xAxis = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
	    	}
	    	
	    	for(var i=0;i<data.length;i++){
	    		if(type_line==1){
	    			xAxis[i] = data[i].sdate.substring(0,data[i].sdate.length-9);
	    		}
	    		data1[i] = data[i].businesscomp_rate;
	    		data2[i] = data[i].ability_rate;
	    		data3[i] = data[i].connect_rate;
	    		data4[i] = data[i].netupdate_rate;
	    	}
	    	
	    	series = [
	    		{
	    			name:"业务完成率",
	    			data:data1
	    		},{
	    			name:"能力协商",
	    			data:data2
	    		},{
	    			name:"承载建立",
	    			data:data3
	    		},{
	    			name:"网络更新",
	    			data:data4
	    		}
	    	];
	    	
	    	createChart(xAxis, series, "",1, text, "d0-chart-b24h");
	    }
	});
}


//地图加载
function loadSenseMap(){
	var mapType = $("#sel-map").val();
	$("#map").html("");
	
	$.ajax({
		type: "POST",
		url:"/nbiot/sense/getLoadSenseMap",
		data:{
			"mapType":mapType,
			"v_sdate":v_sdate,
			"v_data_type":v_data_type,
			"v_scity":v_scity,
			"v_area" : v_area,
			"v_c_scene_name": v_c_scene_name,
			"v_c_custom_name": v_c_custom_name
		},
		dataType:'json',
	    success: function(data) {
	    	var changedMapType = city_name;
	    	if(v_scity!=null && v_scity!="" && v_scity!='全省'){
	    		changedMapType = v_scity;
	    	}
	    	drawEchartsMap('map',data,changedMapType,mapType);
	    }
	});
}



//端到端排名
function loadTableEnd(){
	$("#flow-data-table").html("");
	$.ajax({
		type: "POST",
		url:"/nbiot/sense/getLoadTableEnd",
		data:{
			"v_sdate":v_sdate,
			"v_data_type":v_data_type,
			"v_scity":v_scity,
			"v_area" : v_area,
			"v_c_scene_name": v_c_scene_name,
			"v_c_custom_name": v_c_custom_name
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
}


//行业表
function loadIndustry(){
	$("#industry-data-table").html("");
	$.ajax({
		type: "POST",
		url:"/nbiot/sense/getIndustry",
		data:{
			"v_sdate":v_sdate,
			"v_data_type":v_data_type,
			"v_scity":v_scity,
			"v_area" : v_area,
			"v_c_scene_name": v_c_scene_name,
			"v_c_custom_name": v_c_custom_name
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
}


//加载行业下拉框
/*function loadScene(){
	$.ajax({
		type: "POST",
		url:"/nbiot/sense/getIndustrySelect",
		data:{
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
}*/

//客户下拉框加载
function loadCustomer(){
	$("#customer").html("");
	v_c_scene_name = $("#industry option:selected").text();
	v_area = $("#city_district option:selected").text();
	if(v_c_scene_name!='所有'&&v_c_scene_name!=''&&v_c_scene_name!='请选择'&&(v_area=='全市'||v_area=='')){
		$.ajax({
			type: "POST",
			url:"/nbiot/sense/getCustomer",
			data:{
				'v_c_scene_name': v_c_scene_name
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
				
				//获取url客户指标
				if(GcustomId!='0'&&GcustomId!=null&&GcustomId!=''&&i==0){
					$("#customer").val(GcustomId);
				}
				initDate();
				i++;
			}
		});
	}else{
		$("#customer").html("<option value='请选择'>请选择</option>");
		$(".J-CUSTOM").attr("disabled","disabled");
		$(".J-CUSTOM").css({'color':'#8a8a8a','border':'1px solid #8a8a8a'});
		
		//获取url客户指标
		if(GcustomId!='0'&&GcustomId!=null&&GcustomId!=''){
			$("#customer").val(GcustomId);
		}
		initDate();
	}
}
























//1业务完成率下钻
//2终端与网络能力协商下钻
//3承载建立下钻
//4数据传送下钻

var parentType;
function initDetail(type){
	parentType = type;
	var loading = layer.load(2);
	var sdate = $(".J-SDATE").val();
	var isknow = $(".J-ISKNOW").val();
	var area = $(".J-AREA").val();
	var category = $(".J-CATEGORY").val();
	var scene = $(".J-SCENE").val();
	var custom = $(".J-CUSTOM").val();
	var apn = $(".J-APN").val();
	scene = scene==''||scene==null?0:scene;
	custom = custom==''||custom==null?0:custom;
	//nbiotService.initDetail(type, sdate, isknow, area,category, scene, custom, apn,
	$.get("/nbiot/public/initDetail", {
		"type":type,
		"sdate":sdate,
		"isknow":isknow,
		"area":area,
		"category":category,
		"scene":scene,
		"custom":custom,
		"apn":apn
		},function(data){
			clearDataTable(dts2);
			createTable(data,"sense-detail-table");
			dts2 = createDataTable("sense-detail-table");
			layer.open({
	            title: " ",
	            type: 1,
	            area: ['90%', '70%'],
	            skin: 'demo-class', //样式类名
	            closeBtn: 1,
	            shift: 2,
	            shadeClose: true,
	            content: $('#senseDetail')
			});
			layer.close(loading);
	})
}

function initSubDetail(scene){
	var loading = layer.load(2);
	var sdate = $(".J-SDATE").val();
	var isknow = $(".J-ISKNOW").val();
	var area = $(".J-AREA").val();
	var category = $(".J-CATEGORY").val();
	
	//nbiotService.initCustomByScene(parentType,sdate, isknow, area,category, scene,
	$.get("/nbiot/public/initCustomByScene", {
		"parentType":parentType,
		"sdate":sdate,
		"isknow":isknow,
		"area":area,
		"category":category,
		"scene":scene
		},function(data){
			clearDataTable(dts3);
			createTable(data,"sense-scene-detail-table");
			dts3 = createDataTable("sense-scene-detail-table");
			layer.open({
	            title: " ",
	            type: 1,
	            area: ['90%', '70%'],
	            skin: 'demo-class', //样式类名
	            closeBtn: 1,
	            shift: 2,
	            shadeClose: true,
	            content: $('#senseSceneDetail')
	        });
			layer.close(loading);
	})
}

function initPageData(type,sdate,isknow,city,area,category,scene,custom,apn){
	var loading = layer.load(2);
	initMonYearChart(0,sdate,isknow,area,category,scene,custom);
	//nbiotService.initSenseData(type,sdate,isknow,city,area,category,scene,custom,apn
	$.get("/nbiot/sense/initSenseData", {
		"type":type,
		"sdate":sdate,
		"isknow":isknow,
		"city":city,
		"area":area,
		"category":category,
		"scene":scene,
		"custom":custom,
		"apn":apn
		},function(data){
			initAllInOne(data.ALL_IN_ONE);
			initHorseBord(data.HORSE_BORD_DATA);
			initDashBord(data.DASH_BORD_CHART);
			init24hChart(data.DASH_BORD_CHART);
			initUserTable(data.USER_DATA);
			initFlowTable(data.FLOW_DATA);
			layer.close(loading);
	});
	$("#gisFrame").attr("src","static/esr.html?type=0");
}

function initAllInOne(data){
	if(data && data.length>0){
		data = data[0];
		$("#all_in_one").html(replaceNull(data['VALUE'])+"%");
	}
}

function initMonYearChart(type,sdate,isknow,area,category,scene,custom){
	//nbiotService.initMonthYear(type,sdate,isknow,area,category,scene,custom
	$.get("/nbiot/sense/initMonthYear", {
		"type":type,
		"sdate":sdate,
		"isknow":isknow,
		"area":area,
		"category":category,
		"scene":scene,
		"custom":custom
		},function(data){
			initMonthYear(data.YEAR_MONTH_CHART);
	});
}

function initHorseBord(data){
	var html = "";
	if(data.length>0){
		$.each(data,function(i){
			
			if(data[i]['VALUE']>=90){
				html += "<i class='fa fa-volume-up fa-2x'></i><font color='#50B432' style='margin-right:20px;'>"+data[i]['C_CUSTOM_NAME']+/*"  "+data[i]['C_CUSTOM_APN']+*/"  "+data[i]['VALUE']+"%</font>";
			}
			else if(data[i]['VALUE']>=80 && data[i]['VALUE']<90 ){
				html += "<i class='fa fa-volume-up fa-2x'></i><font color='#DDDF00' style='margin-right:20px;'>"+data[i]['C_CUSTOM_NAME']+/*"  "+data[i]['C_CUSTOM_APN']+*/"  "+data[i]['VALUE']+"%</font>";
			} 
			else if(data[i]['VALUE']<80){
				html += "<i class='fa fa-volume-up fa-2x'></i><font color='#ED561B' style='margin-right:20px;'>"+data[i]['C_CUSTOM_NAME']+/*"  "+data[i]['C_CUSTOM_APN']+*/"  "+data[i]['VALUE']+"%</font>";
			}
			//TODO 临时版本
			/*
			if(data[i]['VALUE']>=90){
				html += "<i class='fa fa-volume-up fa-2x'></i><font color='#50B432' style='margin-right:20px;'>"+data[i]['C_SCENE_NAME']+"  "+data[i]['VALUE']+"%</font>";
			}
			else if(data[i]['VALUE']>=80 && data[i]['VALUE']<90 ){
				html += "<i class='fa fa-volume-up fa-2x'></i><font color='#DDDF00' style='margin-right:20px;'>"+data[i]['C_SCENE_NAME']+"  "+data[i]['VALUE']+"%</font>";
			} 
			else if(data[i]['VALUE']<80){
				html += "<i class='fa fa-volume-up fa-2x'></i><font color='#ED561B' style='margin-right:20px;'>"+data[i]['C_SCENE_NAME']+"  "+data[i]['VALUE']+"%</font>";
			}*/
		});
	}
	if(html.length>=3){
		html = html.substring(0,html.length-3);
	}
	$("marquee").html(html);
}

function initDashBord(data){
	var sdate = $(".J-SDATE").val();
	if(data.length>0 && sdate.length>0){
		if(sdate.length==10){
			sdate += " 00:00:00";
		}
		var limit;
		$.each(data,function(i){
			if(sdate == data[i]['SDATE']){
				
				/*
				limit = [{
		            from: data[i]['VALUE'] <= data[i]['SUCC_MIN'] ? data[i]['VALUE'] - Math.abs(data[i]['VALUE']-data[i]['SUCC_MIN']) :Math.abs(data[i]['SUCC_MIN']-(data[i]['VALUE']-data[i]['SUCC_MIN'])),
		            to: data[i]['SUCC_MIN'],
		            color: '#FE0007' // red
		        },
		        {
		            from: data[i]['SUCC_MIN'],
		            to: data[i]['SUCC_MAX'],
		            color: '#F9FE02' // yellow
		        },
		        {
		            from: data[i]['SUCC_MAX'],
		            to: 100,
		            color: '#35AA18' // green
		        }]; 
				if(data[i]['TYPE']==1){
					var serise = [{name: '评分',data: [data[i]['VALUE']]}];
					createChart(null, serise, limit, 6, "能力协商", "d0-chart-ternet");
				}
				if(data[i]['TYPE']==2){
					var serise = [{name: '评分',data: [data[i]['VALUE']]}];
					createChart(null, serise, limit, 6, "承载建立", "d0-chart-eps");
				}
				if(data[i]['TYPE']==3){
					var serise = [{name: '评分',data: [data[i]['VALUE']]}];
					createChart(null, serise, limit, 6, "数据传送", "d0-chart-transfer");
				}
				if(data[i]['TYPE']==4){
					var serise = [{name: '评分',data: [data[i]['VALUE']]}];
					createChart(null, serise, limit, 6, "业务完成率", "d0-chart-busrate");
				}
				*/
				//var min = data[i]['VALUE'] <= data[i]['SUCC_MIN'] ? data[i]['VALUE'] - Math.abs(data[i]['VALUE']-data[i]['SUCC_MIN']) :Math.abs(data[i]['SUCC_MIN']-(data[i]['VALUE']-data[i]['SUCC_MIN']));
//V2
				//				var min = data[i]['VALUE'] <= data[i]['SUCC_MIN'] ? Math.floor(data[i]['VALUE'] - Math.abs(data[i]['VALUE']-data[i]['SUCC_MIN'])) : Math.floor(data[i]['SUCC_MIN']);
//				if(min%5!=0){
//					min = min-(min%5);
//				}
//				
//				var center = Math.floor(data[i]['SUCC_MIN']);
//				var max = Math.floor(data[i]['SUCC_MAX']);
				
				var min = 70 -  Math.abs(data[i]['VALUE'] - 70);
				if(min%5!=0){
					min = min-(min%5);
				}
				
				var center = 70;
				var max = 85;
				var limit = {min:min,center:center,max:max};
				var serise = [data[i]['VALUE']];
				if(data[i]['TYPE']==1){
					createEcharts(0,{title:"能力协商",htmlId:"d0-chart-ternet",limit:limit,serise:serise});
				}
				if(data[i]['TYPE']==2){
					createEcharts(0,{title:"承载建立",htmlId:"d0-chart-eps",limit:limit,serise:serise});
				}
				if(data[i]['TYPE']==3){
					createEcharts(0,{title:"业务完成率",htmlId:"d0-chart-busrate",limit:limit,serise:serise});
				}
				if(data[i]['TYPE']==4){
					createEcharts(0,{title:"数据传送",htmlId:"d0-chart-transfer",limit:limit,serise:serise});
				}
			}
		});
	}
}

function init24hChart(data){
	var categories = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
	var seriesdata = [];
	if(data.length>0){
		var map = new HashMap();
		var values = [];
		var set = [];
		$.each(data,function(i){
			set.push(data[i]['TYPE']);
		});
		set = uniqueArray(set);
		$.each(set,function(i){
			values = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
			$.each(data,function(j){
				if(set[i] == data[j]['TYPE']){
					$.each(categories,function(z){
						if(data[j]['SDATE'].substring(11,13)==categories[z]){
							if(data[j]['VALUE']==0){
								values[z] = null;
							}else{
								values[z] = data[j]['VALUE'];
							}
						}
					});
				}
			});
			var mapKey;
			if(set[i]==1){
				mapKey = "能力协商";
			}
			if(set[i]==2){
				mapKey = "承载建立";
			}
			if(set[i]==3){
				mapKey = "业务完成率";
			}
			if(set[i]==4){
				mapKey = "网络切换";
			}
			map.put(mapKey, values);
		});
		if(!map.isEmpty()){
			//获取最大的个数
			var keys = map.keySet();
			var datas = [];
			$.each(keys,function(i){
				datas = map.get(keys[i]);
				seriesdata.push({name:keys[i],data:datas});
			});
		}
	}
	createChart(categories, seriesdata, "",1, "小时级指标概览", "d0-chart-b24h");
}

function initFlowTable(data){
	var headHtml = "";
	if(data && data.length>0){
		var headData = data[0];
		for(var key in headData){
			headHtml += "<th>"+key+"</th>";
		}
	}else{
		headHtml += '<th></th><th></th>';
	}
	$("#flow-data-table-head-trid").html(headHtml);
	if(dts1){
		dts1.fnClearTable(); //清空一下table
		dts1.fnDestroy(); //还原初始化了的datatable
	}
	createTable(data,"flow-data-table");
	dts1 = $('#flow-data-table').parent().dataTable({
		"paging": false,
		"info": false,
		"searching": false,
		"iDisplayLength":25,
		"ordering":true,
		"order": [
			[1, "desc"]
		],
		"columnDefs": [{
			"targets": [0],
			"visible": true,
		}]
	});
}

function initUserTable(data){
	createTable(data,"user-data-table");	
	if(data && data.length){
		var categories = ['当前用户数','当天用户数','峰值用户数','本地用户数','漫入用户数'/*,'漫出用户数'*/];
		var seriesdata = [];
		var tempsr = [];
		$.each(data,function(i){
			tempsr.push(data[i]['当前用户数']);
			tempsr.push(data[i]['当天用户数']);
			tempsr.push(data[i]['峰值用户数']);
			tempsr.push(data[i]['本地用户数']);
			tempsr.push(data[i]['漫入用户数']);
			//tempsr.push(data[i]['漫出用户数']);
		});
		seriesdata.push({name: '用户数',data: tempsr});
		createChart(categories, seriesdata, "", 0, "", "d0-chart-userct");
	}
}

function initMonthYear(data){
	var categories = [];
	var curr = [];
	var max = [];
	var local = [];
	var spred_in = [];
	var spred_out = [];
	if(data.length>0){
		$.each(data,function(i){
			categories.push(data[i]['日期']);
			if(data[i]['当前用户数']==0){
				curr.push(null);
			}else{
				curr.push(data[i]['当前用户数']);
			}
			if(data[i]['峰值用户数']==0){
				max.push(null);			
			}else{
				max.push(data[i]['峰值用户数']);
			}
			if(data[i]['本地用户数']==0){
				local.push(null);
			}else{
				local.push(data[i]['本地用户数']);
			}
			if(data[i]['漫入用户数']==0){
				spred_in.push(null);
			}else{
				spred_in.push(data[i]['漫入用户数']);
			}
			/*
			if(data[i]['漫出用户数']==0){
				spred_out.push(null);
			}else{
				spred_out.push(data[i]['漫出用户数']);
			}*/
		});
	}
	var seriesdata = [{
        name: '当前用户数',
        data: curr
    }, {
        name: '峰值用户数',
        data: max
    },{
        name: '本地用户数',
        data: local
    }, {
        name: '漫入用户数',
        data: spred_in
    }
    /*,
    {
        name: '漫出用户数',
        data: spred_out
    }*/]
	createChart(categories, seriesdata, "", 8, "", "d0-chart-userspr");
}