var network = '4G';
$(function() {
	$(".nbiot-tab-span").live('click', function() {
		$(this).prev().removeClass("nth-span-active");
		$(this).next().removeClass("nth-span-active");
		$(this).addClass("nth-span-active");
	});

	// 用户量
	/*$(".nbiot-pers-usercount-tab").live('click', function() {
		var loading = layer.load(2);
		// 1
		var data = $(this).attr("data");
		// top - bottom
		var dir = $(this).attr("dir");
		var sdate = $(".J-SDATE").val();
		// 4G - 2G -NB
		network = $(".layui-tab-title .layui-this").attr("network");
		//nbiotService.initPerspectTabData(sdate, data, dir, network
		$.get("/nbiot/perspect/initPerspectTabData", {
			"sdate":sdate,
			"data":data,
			"dir":dir,
			"network":network
			}, function(res) {
				initTabData(data, res);
				layer.close(loading);
		});
	});*/

	// 数据流量增长量
	/*$(".nbiot-pers-wifi-tab").live('click', function() {
		var loading = layer.load(2);
		// 2
		var data = $(this).attr("data");
		// top - bottom
		var dir = $(this).attr("dir");
		var sdate = $(".J-SDATE").val();
		// 4G - 2G -NB
		var network = $(".layui-tab-title .layui-this").attr("network");
		//nbiotService.initPerspectTabData(sdate, data, dir, network
		$.get("/nbiot/perspect/initPerspectTabData", {
			"sdate":sdate,
			"data":data,
			"dir":dir,
			"network":network
			}, function(res) {
				initTabData(data, res);
				layer.close(loading);
		});
	});*/

	// 性能排名切换
	$(".nbiot-pers-order-tab").live('click', function() {
		//var loading = layer.load(2);
		// 3 - 4 -5 -6 -7
		var data = $(this).attr("data");
		// top - bottom
		var dir = $(this).attr("dir");
		//var sdate = $(".J-SDATE").val();
		// 4G - 2G -NB
		//var network = $(".layui-tab-title .layui-this").attr("network");
		//nbiotService.initPerspectTabData(sdate, data, dir, network
		/*$.get("/nbiot/perspect/initPerspectTabData", {
			"sdate":sdate,
			"data":data,
			"dir":dir,
			"network":network
			}, function(res) {
				initTabData(data, res);
				layer.close(loading);
		});*/
		switch (data) {
			case "1":
				initIndustryRank(dir);//行业排名
				
				break;
			case "2":
				initGroupRank(dir);//集团排名
				
				break;
			case "3":
				initTerrRank(dir);//属地排名
				
				break;
			case "4":
				initTerminalRank(dir);//终端排名
				
				break;
			case "5":
				initQuartersRank(dir);//小区排名
				
				break;
			case "6":
				initUsersRank(dir);//用户数排名
				break;
		}
	});

	$(".nbiot-pers-viewtype-tab").live('click', function() {

		$(".nbiot-pers-viewtype-tab").removeClass("layui-this");
		$(this).addClass("layui-this");
		//var loading = layer.load(2);
		//var sdate = $(".J-SDATE").val();
		network = $(".layui-tab-title .layui-this").attr("network");

		if (network == '3G') {
			layer.close(loading);
			$(".nbiot-pers-viewtype-tab").removeClass("layui-this");
			layer.alert("建设中,敬请期待...");
			return;
		}
		
		//layer.close(loading);
		// 图表
		//initChartData(data);
		// 指标性能排行
		//initPersData(data);
		
		initChartData();
		initIndustryRank("up");//行业排名
		initGroupRank("up");//集团排名
		initTerrRank("up");//属地排名
		initTerminalRank("up");//终端排名
		initQuartersRank("up");//小区排名
		initUsersRank("up");//用户数排名
		
	});

	
	//时间控件
	laydate({
		elem: '#sdate', 
		istime: false, 
		format: 'YYYY-MM-DD',
		choose : function(date) { // 选择好日期的回调
			if(date>laydate.now(0)){
				layer.msg(laydate.now(0)+" 已是最新数据！");
				$("#sdate").val(laydate.now(0));
			}else{
				loadIndicators();
			}
		}
	});
	$("#sdate").val(laydate.now(-1, "YYYY-MM-DD"));
	
	
	loadIndicators();
});


//加载页面
function loadIndicators(){
	internetUsers();//物联网用户数
	initDashBoard();//公告板
	initChartData();
	initIndustryRank("up");//行业排名
	initGroupRank("up");//集团排名
	initTerrRank("up");//属地排名
	initTerminalRank("up");//终端排名
	initQuartersRank("up");//小区排名
	initUsersRank("up");//用户数排名
}


//物联网用户数
function internetUsers(){
	$("#internet_users").html("");
	var v_sdate = $("#sdate").val();
	
	$.ajax({
		type: "POST",
		url:"/nbiot/perspect/getInternetUsers",
		data:{
			"v_sdate":v_sdate,
		},
		dataType:'json',
	    success: function(data) {
	    	$("#internet_users").html(data.count);
	    }
	});
}


//公告板
function initDashBoard() {
	$(".pers-top").html("");
	var v_sdate = $("#sdate").val();
	
	/*var iconInfo = {
			'交通物流' : 'fa-truck',
			'金融' : 'fa-credit-card-alt',
			'能源' : 'fa-leaf',
			'工业' : 'fa-industry',
			'安防' : 'fa-shield',
			'穿戴' : 'fa-clock-o',
			'市政' : 'fa-university',
			'医疗' : 'fa-plus-square',
			'车联网' : 'fa-car',
			'预留' : 'fa-puzzle-piece'
		};*/
	
	var _iconInfo = [
		'fa-truck',
		'fa-credit-card-alt',
		'fa-leaf',
		'fa-industry',
		'fa-shield',
		'fa-clock-o',
		'fa-university',
		'fa-plus-square',
		'fa-car',
		'fa-puzzle-piece'
	];
	
	$.ajax({
		type: "POST",
		url:"/nbiot/perspect/getInitDashBoard",
		data:{
			"v_sdate":v_sdate,
		},
		dataType:'json',
	    success: function(data) {
	    	var html = "";
	    	//var DASHBOARD_4G = data.DASHBOARD_4G;
	    	if (data && data.length > 0) {
	    		$.each(data, function(i) {
	    			var $this = data[i];
	    				
	    			html += '<div class="dashpanel"><div><i class="fa ' + _iconInfo[i] + ' fa-dash"></i><p>' + replaceNull($this.c_scene_name) + '</p></div><div><p><span class="dash-split">4G</span><span class="dash-split"><font class="dash-font">' + replaceNull($this.user_count_4g) + '</font>户</span><span class="dash-split"><font class="dash-font">' + replaceNull(replaceFixed($this.traffic_4g)) + '</font>M</span></p><p><span class="dash-split">3G</span><span class="dash-split"><font class="dash-font">-</font>户</span><span class="dash-split"><font class="dash-font">-</font>M</span></p><p><span class="dash-split">NB-IoT</span><span class="dash-split"><font class="dash-font">' + replaceNull($this.user_count_nb) + '</font>户</span><span class="dash-split"><font class="dash-font">' + replaceNull(replaceFixed($this.traffic_nb)) + '</font>M</span></p></div></div>';
	    		});
	    	}
	    	//html += '<div class="dashpanel"><div><i class="fa ' + iconInfo['预留'] + ' fa-dash"></i><p>预留</p></div><div><p><span class="dash-split">4G</span><span class="dash-split"><font class="dash-font">-</font>户</span><span class="dash-split"><font class="dash-font">-</font>M</span></p><p><span class="dash-split">2G</span><span class="dash-split"><font class="dash-font">-</font>户</span><span class="dash-split"><font class="dash-font">-</font>M</span></p><p><span class="dash-split">NB-IoT</span><span class="dash-split"><font class="dash-font">-</font>户</span><span class="dash-split"><font class="dash-font">-</font>M</span></p></div></div>';
	    	$(".pers-top").html(html);
	    }
	});
}

var colors = [
	'#008db4',
	'#53b52e',
	'#ef581f',
	'#dce301',
	'#24c8e1',
	'#65e473',
	'#ff954e',
	'#ffee60',
	'#4F94CD'
]

function initChartData() {
	
//	$("#nbiot-perspect-traffic-total").html("");
//	$("#nbiot-perspect-customcount").html("");
//	
//	$("#nbiot-perspect-traffic-total").html("");
//	$("#nbiot-perspect-traffic").html("");
//	
//	$("#nbiot-perspect-servrequest-total").html("");
//	$("#nbiot-perspect-servrequest").html("");
//	
//	$("#nbiot-perspect-averageservice-total").html("");
//	$("#nbiot-perspect-averageservice").html("");
//	
//	$("#nbiot-perspect-terminal-total").html("");
//	$("#nbiot-perspect-terminal").html("");
	
	
	var v_sdate = $("#sdate").val();
	
	$.ajax({
		type: "POST",
		url:"/nbiot/perspect/getInitChartData",
		data:{
			"v_sdate":v_sdate,
			"network":network
		},
		dataType:'json',
	    success: function(data) {
	    	var _thisColors = [];
	    	// 客户量
	    	//var CUSTOM = data.CUSTOM;
	    	var totalCount = 0;
	    	var legendData = [];

	    	var seriesData = [];
	    	if (data.us && data.us.length > 0) {
	    		$.each(data.us, function(i) {
	    			var $this = data.us[i];
	    				totalCount += parseFloat($this.user_count);
	    				legendData.push($this.c_scene_name);
	    				_thisColors.push(colors[i]);
	    				seriesData.push({
	    					value : $this.user_count,
	    					name : $this.c_scene_name
	    				});
	    		});
	    	}
	    	$("#nbiot-perspect-customcount-total").text(totalCount);
	    	createEcharts(4, {
	    		htmlId : "nbiot-perspect-customcount",
	    		seriseName : '客户量占比',
	    		centerText:totalCount,//环形图中间文字
	    		seriesData : seriesData,
	    		legendData : legendData,
	    		colors:_thisColors
	    	});
	    	seriesData = [];
	    	legendData = [];
	    	_thisColors = [];
	    	totalCount = 0;
	    	
	    	// 流量
			//var TRAFFIC = data.TRAFFIC;
			if (data.us && data.us.length > 0) {
				$.each(data.us, function(i) {
					var $this = data.us[i];
						
						totalCount += parseFloat($this.traffic);
						legendData.push($this.c_scene_name);
						_thisColors.push(colors[i]);
						seriesData.push({
							value : $this.traffic,
							name : $this.c_scene_name
						});
				});
			}
			$("#nbiot-perspect-traffic-total").text(totalCount.toFixed(2));
			createEcharts(4, {
				htmlId : "nbiot-perspect-traffic",
				centerText:totalCount.toFixed(2),//环形图中间文字
				seriseName : '流量占比',
				seriesData : seriesData,
				legendData : legendData,
				colors:_thisColors
			});
			seriesData = [];
			totalCount = 0;
			legendData = [];
			_thisColors = [];
			
			// 业务请求次数
			//var REQUEST = data.REQUEST;
			if (data.us && data.us.length > 0) {
				$.each(data.us, function(i) {
					var $this = data.us[i];
						
						totalCount += parseFloat($this.business_requests);
						legendData.push($this.c_scene_name);
						_thisColors.push(colors[i]);
						seriesData.push({
							value : $this.business_requests,
							name : $this.c_scene_name
						});
				});
			}
			$("#nbiot-perspect-servrequest-total").text(totalCount);
			createEcharts(4, {
				htmlId : "nbiot-perspect-servrequest",
				seriseName : '请求次数占比',
				centerText:totalCount,//环形图中间文字
				seriesData : seriesData,
				legendData : legendData,
				colors:_thisColors
			});
			legendData = [];
			seriesData = [];
			_thisColors = [];
			totalCount = 0;
			
			// 平均每用户业务流量
			if (data.us && data.us.length > 0) {
				$.each(data.us, function(i) {
					var $this = data.us[i];
						
						totalCount += parseFloat($this.user_traffic);
						legendData.push($this.c_scene_name);
						_thisColors.push(colors[i]);
						seriesData.push({
							value : $this.user_traffic,
							name : $this.c_scene_name
						});
				});
			}
			$("#nbiot-perspect-averageservice-total").text(totalCount.toFixed(2));
			createEcharts(4, {
				htmlId : "nbiot-perspect-averageservice",
				seriseName : '平均每用户业务流量占比',
				centerText:totalCount.toFixed(2),//环形图中间文字
				seriesData : seriesData,
				legendData : legendData,
				colors:_thisColors
			});
			legendData = [];
			seriesData = [];
			_thisColors = [];
			totalCount = 0;
			
			// 终端类型占比
			if (data.zd && data.zd.length > 0) {
				$.each(data.zd, function(i) {
					var $this = data.zd[i];
						
						totalCount += parseFloat($this.count);
						legendData.push($this.c_scene_name);
						_thisColors.push(colors[i]);
						seriesData.push({
							value : $this.count,
							name : $this.c_scene_name
						});
				});
			}
			$("#nbiot-perspect-terminal-total").text(totalCount);
			createEcharts(4, {
				htmlId : "nbiot-perspect-terminal",
				seriseName : '终端类型占比',
				centerText:totalCount,//环形图中间文字
				seriesData : seriesData,
				legendData : legendData,
				colors:_thisColors
			});
			legendData = [];
			seriesData = [];
			_thisColors = [];
			totalCount = 0;
	    }
	});
}



//行业排名
function initIndustryRank(dir){
	
	$("#nbiot-perspect-table-scene").html("<p>" + $("#nbiot-perspect-table-scene").find("p").eq(0).html() + "</p>");
	
	var v_sdate = $("#sdate").val();
	
	$.ajax({
		type: "POST",
		url:"/nbiot/perspect/getIndustryRank",
		data:{
			"v_sdate":v_sdate,
			"network":network,
			"dir":dir
		},
		dataType:'json',
	    success: function(data) {
	    	var html = "<p>" + $("#nbiot-perspect-table-scene").find("p").eq(0).html() + "</p>";
	    	//var PERS_SCENE = data.PERS_SCENE;
	    	if (data && data.length > 0) {
	    		$.each(data, function(i) {
	    			var $this = data[i];
	    			var index = i + 1;
	    			var forward = 'javascript:;';
	    			if(network=='4G'){
	    				
	    				forward = "sense?type=0&isknow=1&city=0&area=0&category=0&sdate="+$('.J-SDATE').val()+"&scene="+$this.type_name+"&custom=0";
	    			}else if(network=='NB'){
	    				forward = "general?type=0&isknow=1&city=0&area=0&category=0&sdate="+$('.J-SDATE').val()+"&scene="+$this.type_name+"&custom=0";
	    			}
	    			html += '<p><span class="span span-left"><label class="label_num label_num_' + index + '">' + index + '</label><a class="greenA" href="'+forward+'">' + replaceNull($this.type_name) + '</a></span><span class="span span-center"><span class="outer-process"><span class="inner-process inner-process-' + index + '" style="width:' + $this.rate + '%"></span></span></span><span class="span span-right">' + replaceNull($this.rate) + '%</span></p>';
	    		});
	    	}
	    	$("#nbiot-perspect-table-scene").html(html);
	    }
	})
}

	
//集团排名
function initGroupRank(dir){
	
	$("#nbiot-perspect-table-custom").html("<p>" + $("#nbiot-perspect-table-custom").find("p").eq(0).html() + "</p>");
	
	var v_sdate = $("#sdate").val();
	
	$.ajax({
		type: "POST",
		url:"/nbiot/perspect/getGroupRank",
		data:{
			"v_sdate":v_sdate,
			"network":network,
			"dir":dir
		},
		dataType:'json',
	    success: function(data) {
	    	html = "<p>" + $("#nbiot-perspect-table-custom").find("p").eq(0).html() + "</p>";
	    	//var PERS_CUSTOM = data.PERS_CUSTOM;
	    	if (data && data.length > 0) {
	    		$.each(data, function(i) {
	    			var $this = data[i];
	    			var index = i + 1;
	    			var forward = 'javascript:;';
	    			if(network=='4G'){
	    				
	    				forward = "sense?type=0&isknow=1&city=0&area=0&category=0&sdate="+$('.J-SDATE').val()+"&scene="+$this.c_scene_name+"&custom="+$this.type_name;
	    			}else if(network=='NB'){
	    				//forward = "general?type=0&isknow=1&city=0&area=0&category=0&sdate="+$('.J-SDATE').val()+"&scene="+$this.c_scene_name+"&custom="+$this.type_name;
	    			}
	    			html += '<p><span class="span span-left"><label class="label_num label_num_' + index + '">' + index + '</label><a class="greenA" href="'+forward+'">' + replaceNull($this.type_name) + '</a></span><span class="span span-center"><span class="outer-process"><span class="inner-process inner-process-' + index + '" style="width:' + $this.rate + '%"></span></span></span><span class="span span-right">' + replaceNull($this.rate) + '%</span></p>';
	    		});
	    	}
	    	$("#nbiot-perspect-table-custom").html(html);
	    }
	})
}
	
//属地排名
function initTerrRank(dir){
	
	$("#nbiot-perspect-table-tai").html("<p>" + $("#nbiot-perspect-table-tai").find("p").eq(0).html() + "</p>");
	
	var v_sdate = $("#sdate").val();
	
	$.ajax({
		type: "POST",
		url:"/nbiot/perspect/getTerrRank",
		data:{
			"v_sdate":v_sdate,
			"network":network,
			"dir":dir
		},
		dataType:'json',
		success: function(data) {
			html = "<p>" + $("#nbiot-perspect-table-tai").find("p").eq(0).html() + "</p>";
			if (data && data.length > 0) {
				$.each(data, function(i) {
					var $this = data[i];
					var index = i + 1;
					//html += '<p><span class="span span-left"><label class="label_num label_num_' + index + '">' + index + '</label>' + replaceNull($this.type_name) + '</span><span class="span span-center"><span class="outer-process"><span class="inner-process inner-process-' + index + '" style="width:' + $this.rate + '%"></span></span></span><span class="span span-right">' + replaceNull($this.rate) + '%</span></p>';
					var forward = 'javascript:;';
	    			if(network=='4G'){
	    				
	    				forward = "sense?type=0&isknow=1&city="+$this.type_name+"&area=0&category=0&sdate="+$('.J-SDATE').val()+"&scene=0&custom=0";
	    			}else if(network=='NB'){
	    				forward = "general?type=0&isknow=1&city="+$this.type_name+"&area=0&category=0&sdate="+$('.J-SDATE').val()+"&scene=0&custom=0";
	    			}
	    			html += '<p><span class="span span-left"><label class="label_num label_num_' + index + '">' + index + '</label><a class="greenA" href="'+forward+'">' + replaceNull($this.type_name) + '</a></span><span class="span span-center"><span class="outer-process"><span class="inner-process inner-process-' + index + '" style="width:' + $this.rate + '%"></span></span></span><span class="span span-right">' + replaceNull($this.rate) + '%</span></p>';
				});
			}
			$("#nbiot-perspect-table-tai").html(html);
		}
	})
}

//终端排名
function initTerminalRank(dir){
	
	$("#nbiot-perspect-table-tac").html("<p>" + $("#nbiot-perspect-table-tac").find("p").eq(0).html() + "</p>");
	
	var v_sdate = $("#sdate").val();
	
	$.ajax({
		type: "POST",
		url:"/nbiot/perspect/getTerminalRank",
		data:{
			"v_sdate":v_sdate,
			"network":network,
			"dir":dir
		},
		dataType:'json',
		success: function(data) {
			html = "<p>" + $("#nbiot-perspect-table-tac").find("p").eq(0).html() + "</p>";
			if (data && data.length > 0) {
				$.each(data, function(i) {
					var $this = data[i];
					var index = i + 1;
					html += '<p><span class="span span-left"><label class="label_num label_num_' + index + '">' + index + '</label>' + replaceNull($this.type_name) + '</span><span class="span span-center"><span class="outer-process"><span class="inner-process inner-process-' + index + '" style="width:' + $this.rate + '%"></span></span></span><span class="span span-right">' + replaceNull($this.rate) + '%</span></p>';
				});
			}
			$("#nbiot-perspect-table-tac").html(html);
		}
	})
}

//小区排名
function initQuartersRank(dir){
	
	$("#nbiot-perspect-table-mme").html("<p>" + $("#nbiot-perspect-table-mme").find("p").eq(0).html() + "</p>");
	
	var v_sdate = $("#sdate").val();
	
	$.ajax({
		type: "POST",
		url:"/nbiot/perspect/getQuartersRank",
		data:{
			"v_sdate":v_sdate,
			"network":network,
			"dir":dir
		},
		dataType:'json',
		success: function(data) {
			html = "<p>" + $("#nbiot-perspect-table-mme").find("p").eq(0).html() + "</p>";
			if (data && data.length > 0) {
				$.each(data, function(i) {
					var $this = data[i];
					var index = i + 1;
					//var forward = "nbiot-64-net.html?sdate="+$('.J-SDATE').val()+"&isknow=1&city=0&area=0&category=0&scene=0&custom=0";
					html += '<p><span class="span span-left"><label class="label_num label_num_' + index + '">' + index + '</label>' + replaceNull($this.type_name) + '</span><span class="span span-center"><span class="outer-process"><span class="inner-process inner-process-' + index + '" style="width:' + $this.rate + '%"></span></span></span><span class="span span-right">' + replaceNull($this.rate) + '%</span></p>';
				
				});
			}
			$("#nbiot-perspect-table-mme").html(html);
		}
	})
}


//用户排名
function initUsersRank(dir){
	
	$("#nbiot-perspect-table-user").html("<p>" + $("#nbiot-perspect-table-user").find("p").eq(0).html() + "</p>");
	
	var loading = layer.load(2);
	var v_sdate = $("#sdate").val();
	
	$.ajax({
		type: "POST",
		url:"/nbiot/perspect/getUsersRank",
		data:{
			"v_sdate":v_sdate,
			"network":network,
			"dir":dir
		},
		dataType:'json',
		success: function(data) {
			html = "<p>" + $("#nbiot-perspect-table-user").find("p").eq(0).html() + "</p>";
			if (data && data.length > 0) {
				$.each(data, function(i) {
					var $this = data[i];
					var index = i + 1;
					//var forward = "nbiot-64-net.html?sdate="+$('.J-SDATE').val()+"&isknow=1&city=0&area=0&category=0&scene=0&custom=0";
					html += '<p><span class="span span-left"><label class="label_num label_num_' + index + '">' + index + '</label>' + replaceNull($this.type_name) + '</span><span class="span span-center"><span class="outer-process"><span class="inner-process inner-process-' + index + '" style="width:' + $this.rate + '%"></span></span></span><span class="span span-right">' + replaceNull($this.rate) + '%</span></p>';
				
				});
			}
			$("#nbiot-perspect-table-user").html(html);
			
			setTimeout(layer.close(loading),3000);
		}
	})
}




/*function dashBoardData(data){
	switch (data) {
	case '交通物流':
		
		break;
	case '金融':
		
		break;
	case '能源':
		
		break;
	case '工业':
		
		break;
	case '安防':
		
		break;
	case '穿戴':
		
		break;
	case '市政':
		
		break;
	case '医疗':
		
		break;
	case '车联网':
		
		break;
	case '预留':
		
		break;

	default:
		break;
	}
}*/




































/*var colors = {
		交通物流:'#008db4',
		金融:'#53b52e',
		能源:'#ef581f',
		工业:'#dce301',
		安防:'#24c8e1',
		穿戴:'#65e473',
		市政:'#ff954e',
		医疗:'#ffee60',
		车联网:'#4F94CD'
}*/
var colors = [
		'#008db4',
		'#53b52e',
		'#ef581f',
		'#dce301',
		'#24c8e1',
		'#65e473',
		'#ff954e',
		'#ffee60',
		'#4F94CD'
]

function initTabData(index, data) {
	switch (index) {
		// 用户量
		case '1' :
			initUserCountChart(data);
			break;
		// 数据也增长量
		case '2' :
			initWifiDataChart(data);
			break;
		// 行业排名
		case '3' :
			html = "<p>" + $("#nbiot-perspect-table-scene").find("p").eq(0).html() + "</p>";
			var PERS_SCENE = data.PERS_SCENE;
			if (PERS_SCENE && PERS_SCENE.length > 0) {
				$.each(PERS_SCENE, function(i) {
					var $this = PERS_SCENE[i];
					var index = i + 1;
					var forward = "sense?type=0&isknow=1&city=0&area=0&category=0&sdate="+$('.J-SDATE').val()+"&scene="+$this.C_SCENEID+"&custom=0";
					html += '<p><span class="span span-left"><label class="label_num label_num_' + index + '">' + index + '</label><a class="greenA" href="'+forward+'">' + replaceNull($this.C_SCENE_NAME) + '</a></span><span class="span span-center"><span class="outer-process"><span class="inner-process inner-process-' + index + '" style="width:' + $this.VALUE + '%"></span></span></span><span class="span span-right">' + $this.VALUE + '%</span></p>';
				});
			}
			$("#nbiot-perspect-table-scene").html(html);
			break;
		// 客户排名
		case '4' :
			html = "<p>" + $("#nbiot-perspect-table-custom").find("p").eq(0).html() + "</p>";
			var PERS_CUSTOM = data.PERS_CUSTOM;
			if (PERS_CUSTOM && PERS_CUSTOM.length > 0) {
				$.each(PERS_CUSTOM, function(i) {
					var $this = PERS_CUSTOM[i];
					var index = i + 1;
					var forward = "sense?type=0&isknow=1&city=0&area=0&category=0&sdate="+$('.J-SDATE').val()+"&scene="+$this.C_SCENEID+"&custom="+$this.C_CUSTOMID;
					html += '<p><span class="span span-left"><label class="label_num label_num_' + index + '">' + index + '</label><a class="greenA" href="'+forward+'">' + replaceNull($this.C_CUSTOM_NAME) + '</a></span><span class="span span-center"><span class="outer-process"><span class="inner-process inner-process-' + index + '" style="width:' + $this.VALUE + '%"></span></span></span><span class="span span-right">' + $this.VALUE + '%</span></p>';
				});
			}
			$("#nbiot-perspect-table-custom").html(html);
			break;

		// 属地排名
		case '5' :
			html = "<p>" + $("#nbiot-perspect-table-tai").find("p").eq(0).html() + "</p>";
			var PERS_TAI = data.PERS_TAI;
			if (PERS_TAI && PERS_TAI.length > 0) {
				$.each(PERS_TAI, function(i) {
					var $this = PERS_TAI[i];
					var index = i + 1;
					html += '<p><span class="span span-left"><label class="label_num label_num_' + index + '">' + index + '</label>' + replaceNull($this.AREA3) + '</span><span class="span span-center"><span class="outer-process"><span class="inner-process inner-process-' + index + '" style="width:' + $this.VALUE + '%"></span></span></span><span class="span span-right">' + $this.VALUE + '%</span></p>';
				});
			}
			$("#nbiot-perspect-table-tai").html(html);

			break;
		// 终端排名
		case '6' :
			html = "<p>" + $("#nbiot-perspect-table-tac").find("p").eq(0).html() + "</p>";
			var PERS_TAC = data.PERS_TAC;
			if (PERS_TAC && PERS_TAC.length > 0) {
				$.each(PERS_TAC, function(i) {
					var $this = PERS_TAC[i];
					var index = i + 1;
					html += '<p><span class="span span-left"><label class="label_num label_num_' + index + '">' + index + '</label>' + replaceNull($this.PRODUCT) + '</span><span class="span span-center"><span class="outer-process"><span class="inner-process inner-process-' + index + '" style="width:100%"></span></span></span><span class="span span-right">' + $this.USER_COUNTS + '</span></p>';
				});
			}
			$("#nbiot-perspect-table-tac").html(html);
			break;
		// 网元排名
		case '7' :
			html = "<p>" + $("#nbiot-perspect-table-mme").find("p").eq(0).html() + "</p>";
			var PERS_MME = data.PERS_MME;
			if (PERS_MME && PERS_MME.length > 0) {
				$.each(PERS_MME, function(i) {
					var $this = PERS_MME[i];
					var index = i + 1;
					var forward = "nbiot-64-net.html?sdate="+$('.J-SDATE').val()+"&isknow=1&city=0&area=0&category=0&scene=0&custom=0";
					html += '<p><span class="span span-left"><label class="label_num label_num_' + index + '">' + index + '</label><a class="greenA" href="'+forward+'">' + replaceNull($this.NET_NENAME) + '</a></span><span class="span span-center"><span class="outer-process"><span class="inner-process inner-process-' + index + '" style="width:' + $this.VALUE + '%"></span></span></span><span class="span span-right">' + $this.VALUE + '%</span></p>';
				});
			}
			$("#nbiot-perspect-table-mme").html(html);
			break;
		default :
			break;
	}
}

function initUserCountChart(data) {
	// 用户量
	var USERCOUNT = data.USERCOUNT;
	if (USERCOUNT && USERCOUNT.length > 0) {
		var map = new HashMap();
		var seriesdata = [];
		var values = [];
		var set = [];
		var categories = [];
		$.each(USERCOUNT, function(i) {
			set.push(USERCOUNT[i]['C_SCENE_NAME']);
			categories.push(USERCOUNT[i]['DATE_DF']);
		});
		set = uniqueArray(set);
		categories = uniqueArray(categories);
		$.each(set, function(i) {
			values = [];
			if (categories.length > 0) {
				$.each(categories, function(x) {
					values.push(null);
				});
			}
			$.each(USERCOUNT, function(j) {
				if (set[i] == USERCOUNT[j]['C_SCENE_NAME']) {
					$.each(categories, function(z) {
						if (USERCOUNT[j]['DATE_DF'] == categories[z]) {
							values[z] = USERCOUNT[j]['USER_COUNTS'];
						}
					});
				}
			});
			map.put(set[i], values);
		});
		if (!map.isEmpty()) {
			// 获取最大的个数
			var keys = map.keySet();
			var datas = [];
			$.each(keys, function(i) {
				datas = map.get(keys[i]);
				seriesdata.push({
					name : keys[i],
					color:colors[keys[i]],
					data : datas
				});
			});
		}
		createChart(categories, seriesdata, [], 11, '', 'nbiot-perspect-usercounts');
	}
}

function initWifiDataChart(data) {
	var WIFI_DATA = data.WIFI_DATA;
	if (WIFI_DATA && WIFI_DATA.length > 0) {
		var map = new HashMap();
		var seriesdata = [];
		var values = [];
		var set = [];
		var categories = [];
		$.each(WIFI_DATA, function(i) {
			set.push(WIFI_DATA[i]['C_SCENE_NAME']);
			categories.push(WIFI_DATA[i]['DATE_DF']);
		});
		set = uniqueArray(set);
		categories = uniqueArray(categories);
		$.each(set, function(i) {
			values = [];
			if (categories.length > 0) {
				$.each(categories, function(x) {
					values.push(null);
				});
			}
			$.each(WIFI_DATA, function(j) {
				if (set[i] == WIFI_DATA[j]['C_SCENE_NAME']) {
					$.each(categories, function(z) {
						if (WIFI_DATA[j]['DATE_DF'] == categories[z]) {
							values[z] = WIFI_DATA[j]['TRAFFIC'];
						}
					});
				}
			});
			map.put(set[i], values);
		});
		if (!map.isEmpty()) {
			// 获取最大的个数
			var keys = map.keySet();
			var datas = [];
			$.each(keys, function(i) {
				datas = map.get(keys[i]);
				seriesdata.push({
					name : keys[i],
					data : datas
				});
			});
		}
		createChart(categories, seriesdata, [], 11, '', 'nbiot-perspect-trafficup');
	}
}

function rcolor() {
	// return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
	return ['#B51C44', '#0093A8', '#CE4B27', '#009600', '#A300AA', '#5B3AB6', '#E88A05', '#3498DB', '#A300AA', '#E88A05', '#5B3AB6', '#3498DB', '#FF7F50'];
}

function initData(sdate, network) {
	var loading = layer.load(2);
	//nbiotService.initPerspectData(sdate, network
	$.get("/nbiot/perspect/initPerspectData", {
		"sdate":sdate,
		"network":network
		}, function(data) {
			layer.close(loading);
			// 公告板
			initDashBoard(data);
			// 图表
			initChartData(data);
			// 指标性能排行
			initPersData(data);
	});
}



/*function initPageData(type, sdate, isknow, city, area, category, scene, custom, apn) {
	// TODO -- 在网用户数
	var onlineUser = 2452227;
	var thisDay = parseInt(sdate.substring(5, 10).replace(/-/, ""));
	onlineUser += thisDay*10;
	$(".online_user").text(toThousands(onlineUser));
	initData(sdate, '4G');
}*/

/*function initDashBoard(data) {
	var iconInfo = {
		'交通物流' : 'fa-truck',
		'金融' : 'fa-credit-card-alt',
		'能源' : 'fa-leaf',
		'工业' : 'fa-industry',
		'安防' : 'fa-shield',
		'穿戴' : 'fa-clock-o',
		'市政' : 'fa-university',
		'医疗' : 'fa-plus-square',
		'车联网' : 'fa-car',
		'预留' : 'fa-puzzle-piece'
	};
	var html = "";
	var DASHBOARD = data.DASHBOARD;
	if (DASHBOARD && DASHBOARD.length > 0) {
		$.each(DASHBOARD, function(i) {
			var $this = DASHBOARD[i];
			// html+='<div class="dashpanel"><div><i class="fa
			// '+iconInfo[$this.C_SCENE_NAME]+'
			// fa-dash"></i><p>'+replaceNull($this.C_SCENE_NAME)+'</p></div><div><p><span
			// class="dash-split">4G</span><span class="dash-split"><font
			// class="dash-font">'+replaceNull(replaceFixed($this.USER_COUNTS_4G))+'</font>户</span><span
			// class="dash-split"><font
			// class="dash-font">'+replaceNull(replaceFixed($this.TRAFFIC_4G))+'</font>M</span></p><p><span
			// class="dash-split">2G</span><span class="dash-split"><font
			// class="dash-font">'+replaceNull(replaceFixed($this.USER_COUNTS_2G))+'</font>户</span><span
			// class="dash-split"><font
			// class="dash-font">'+replaceNull(replaceFixed($this.TRAFFIC_2G))+'</font>M</span></p><p><span
			// class="dash-split">NB-IoT</span><span class="dash-split"><font
			// class="dash-font">'+replaceNull(replaceFixed($this.USER_COUNTS_NB))+'</font>户</span><span
			// class="dash-split"><font
			// class="dash-font">'+replaceNull(replaceFixed($this.TRAFFIC_NB))+'</font>M</span></p></div></div>';
			html += '<div class="dashpanel"><div><i class="fa ' + iconInfo[$this.C_SCENE_NAME] + ' fa-dash"></i><p>' + replaceNull($this.C_SCENE_NAME) + '</p></div><div><p><span class="dash-split">4G</span><span class="dash-split"><font class="dash-font">' + replaceNull(replaceFixed($this.USER_COUNTS_4G)) + '</font>户</span><span class="dash-split"><font class="dash-font">' + replaceNull(replaceFixed($this.TRAFFIC_4G)) + '</font>M</span></p><p><span class="dash-split">2G</span><span class="dash-split"><font class="dash-font">' + replaceNull(replaceFixed($this.USER_COUNTS_2G)) + '</font>户</span><span class="dash-split"><font class="dash-font">' + replaceNull(replaceFixed($this.TRAFFIC_2G)) + '</font>M</span></p><p><span class="dash-split">NB-IoT</span><span class="dash-split"><font class="dash-font">-</font>户</span><span class="dash-split"><font class="dash-font">-</font>M</span></p></div></div>';
		});
	}
	html += '<div class="dashpanel"><div><i class="fa ' + iconInfo['预留'] + ' fa-dash"></i><p>预留</p></div><div><p><span class="dash-split">4G</span><span class="dash-split"><font class="dash-font">-</font>户</span><span class="dash-split"><font class="dash-font">-</font>M</span></p><p><span class="dash-split">2G</span><span class="dash-split"><font class="dash-font">-</font>户</span><span class="dash-split"><font class="dash-font">-</font>M</span></p><p><span class="dash-split">NB-IoT</span><span class="dash-split"><font class="dash-font">-</font>户</span><span class="dash-split"><font class="dash-font">-</font>M</span></p></div></div>';
	$(".pers-top").html(html);
	// var $dashpanel = $(".dashpanel");
	// if($dashpanel.length>0){
	// $.each($dashpanel,function(i){
	// // $($dashpanel[i]).css({"background":rcolor()[i]});
	// $($dashpanel[i]).css({"background":"rgb(2, 41, 84)"});
	// });
	// }
}*/
/*function initChartData(data) {
	
	var _thisColors = [];
	
	// 客户量
	var CUSTOM = data.CUSTOM;
	var totalCount = 0;
	var legendData = [];

	var seriesData = [];
	if (CUSTOM && CUSTOM.length > 0) {
		$.each(CUSTOM, function(i) {
			var $this = CUSTOM[i];
			totalCount += parseFloat($this.USER_COUNTS);
			legendData.push($this.C_SCENE_NAME);
			_thisColors.push(colors[$this.C_SCENE_NAME]);
			seriesData.push({
				value : $this.RATIO,
				name : $this.C_SCENE_NAME
			});
		});
	}
	$("#nbiot-perspect-customcount-total").text(totalCount);
	createEcharts(4, {
		htmlId : "nbiot-perspect-customcount",
		seriseName : '客户量占比',
		centerText:totalCount,//环形图中间文字
		seriesData : seriesData,
		legendData : legendData,
		colors:_thisColors
	});
	seriesData = [];
	legendData = [];
	_thisColors = [];
	totalCount = 0;
	// 流量
	var TRAFFIC = data.TRAFFIC;
	if (TRAFFIC && TRAFFIC.length > 0) {
		$.each(TRAFFIC, function(i) {
			var $this = TRAFFIC[i];
			totalCount += parseFloat($this.TRAFFIC);
			legendData.push($this.C_SCENE_NAME);
			_thisColors.push(colors[$this.C_SCENE_NAME]);
			seriesData.push({
				value : $this.RATIO,
				name : $this.C_SCENE_NAME
			});
		});
	}
	$("#nbiot-perspect-traffic-total").text(totalCount.toFixed(2));
	createEcharts(4, {
		htmlId : "nbiot-perspect-traffic",
		centerText:totalCount.toFixed(2),//环形图中间文字
		seriseName : '流量占比',
		seriesData : seriesData,
		legendData : legendData,
		colors:_thisColors
	});
	seriesData = [];
	totalCount = 0;
	legendData = [];
	_thisColors = [];
	// 业务请求次数
	var REQUEST = data.REQUEST;
	if (REQUEST && REQUEST.length > 0) {
		$.each(REQUEST, function(i) {
			var $this = REQUEST[i];
			totalCount += parseFloat($this.BUSINESS_REQUESTS);
			legendData.push($this.C_SCENE_NAME);
			_thisColors.push(colors[$this.C_SCENE_NAME]);
			seriesData.push({
				value : $this.RATIO,
				name : $this.C_SCENE_NAME
			});
		});
	}
	$("#nbiot-perspect-servrequest-total").text(totalCount);
	createEcharts(4, {
		htmlId : "nbiot-perspect-servrequest",
		seriseName : '请求次数占比',
		centerText:totalCount,//环形图中间文字
		seriesData : seriesData,
		legendData : legendData,
		colors:_thisColors
	});
	legendData = [];
	seriesData = [];
	_thisColors = [];
	totalCount = 0;

	// 用户量
	initUserCountChart(data);

	// 数据业务增长量
	initWifiDataChart(data);
}*/

function initPersData(data) {
	var html = "<p>" + $("#nbiot-perspect-table-scene").find("p").eq(0).html() + "</p>";
	var PERS_SCENE = data.PERS_SCENE;
	if (PERS_SCENE && PERS_SCENE.length > 0) {
		$.each(PERS_SCENE, function(i) {
			var $this = PERS_SCENE[i];
			var index = i + 1;
			var forward = "nbiot-sense.html?type=0&isknow=1&city=0&area=0&category=0&sdate="+$('.J-SDATE').val()+"&scene="+$this.C_SCENEID+"&custom=0";
			html += '<p><span class="span span-left"><label class="label_num label_num_' + index + '">' + index + '</label><a class="greenA" href="'+forward+'">' + replaceNull($this.C_SCENE_NAME) + '</a></span><span class="span span-center"><span class="outer-process"><span class="inner-process inner-process-' + index + '" style="width:' + $this.VALUE + '%"></span></span></span><span class="span span-right">' + replaceNull($this.VALUE) + '%</span></p>';
		});
	}
	$("#nbiot-perspect-table-scene").html(html);

	html = "<p>" + $("#nbiot-perspect-table-custom").find("p").eq(0).html() + "</p>";
	var PERS_CUSTOM = data.PERS_CUSTOM;
	if (PERS_CUSTOM && PERS_CUSTOM.length > 0) {
		$.each(PERS_CUSTOM, function(i) {
			var $this = PERS_CUSTOM[i];
			var index = i + 1;
			var forward = "nbiot-sense.html?type=0&isknow=1&city=0&area=0&category=0&sdate="+$('.J-SDATE').val()+"&scene="+$this.C_SCENEID+"&custom="+$this.C_CUSTOMID;
			html += '<p><span class="span span-left"><label class="label_num label_num_' + index + '">' + index + '</label><a class="greenA" href="'+forward+'">' + replaceNull($this.C_CUSTOM_NAME) + '</a></span><span class="span span-center"><span class="outer-process"><span class="inner-process inner-process-' + index + '" style="width:' + $this.VALUE + '%"></span></span></span><span class="span span-right">' + replaceNull($this.VALUE) + '%</span></p>';
		});
	}
	$("#nbiot-perspect-table-custom").html(html);

	html = "<p>" + $("#nbiot-perspect-table-tai").find("p").eq(0).html() + "</p>";
	var PERS_TAI = data.PERS_TAI;
	if (PERS_TAI && PERS_TAI.length > 0) {
		$.each(PERS_TAI, function(i) {
			var $this = PERS_TAI[i];
			var index = i + 1;
			html += '<p><span class="span span-left"><label class="label_num label_num_' + index + '">' + index + '</label>' + replaceNull($this.AREA3) + '</span><span class="span span-center"><span class="outer-process"><span class="inner-process inner-process-' + index + '" style="width:' + $this.VALUE + '%"></span></span></span><span class="span span-right">' + replaceNull($this.VALUE) + '%</span></p>';
		});
	}
	$("#nbiot-perspect-table-tai").html(html);

	html = "<p>" + $("#nbiot-perspect-table-tac").find("p").eq(0).html() + "</p>";
	var PERS_TAC = data.PERS_TAC;
	if (PERS_TAC && PERS_TAC.length > 0) {
		$.each(PERS_TAC, function(i) {
			var $this = PERS_TAC[i];
			var index = i + 1;
			html += '<p><span class="span span-left"><label class="label_num label_num_' + index + '">' + index + '</label>' + replaceNull($this.PRODUCT) + '</span><span class="span span-center"><span class="outer-process"><span class="inner-process inner-process-' + index + '" style="width:100%"></span></span></span><span class="span span-right">' + replaceNull($this.USER_COUNTS) + '</span></p>';
		});
	}
	$("#nbiot-perspect-table-tac").html(html);

	html = "<p>" + $("#nbiot-perspect-table-mme").find("p").eq(0).html() + "</p>";
	var PERS_MME = data.PERS_MME;
	if (PERS_MME && PERS_MME.length > 0) {
		$.each(PERS_MME, function(i) {
			var $this = PERS_MME[i];
			var index = i + 1;
			var forward = "nbiot-64-net.html?sdate="+$('.J-SDATE').val()+"&isknow=1&city=0&area=0&category=0&scene=0&custom=0";
			html += '<p><span class="span span-left"><label class="label_num label_num_' + index + '">' + index + '</label><a class="greenA" href="'+forward+'">' + replaceNull($this.NET_NENAME) + '</a></span><span class="span span-center"><span class="outer-process"><span class="inner-process inner-process-' + index + '" style="width:' + $this.VALUE + '%"></span></span></span><span class="span span-right">' + replaceNull($this.VALUE) + '%</span></p>';
		
		});
	}
	$("#nbiot-perspect-table-mme").html(html);
}

function toThousands(num) {
	var result = [], counter = 0;
	num = (num || 0).toString().split('');
	for (var i = num.length - 1; i >= 0; i--) {
		counter++;
		result.unshift(num[i]);
		if (!(counter % 3) && i != 0) {
			result.unshift(',');
		}
	}
	return result.join('');
}