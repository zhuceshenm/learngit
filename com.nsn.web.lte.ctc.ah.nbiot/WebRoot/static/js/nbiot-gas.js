var dts1;
var serise = [];
var categories = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];

$(function(){
	
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
				loadGasAnalysis();
				$("#cigisFrame").attr("src","esr?type=5");
			}
		}
	});
	$("#sdate").val(laydate.now(-1, "YYYY-MM-DD"));
	
	
	
	 $("#cigisFrame").attr("src","esr?type=5");
	 
	 
	 $('#scrolledTable').niceScroll({
			cursorcolor: "#ccc",//#CC0071 光标颜色
			cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
			touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
			cursorwidth: "5px", //像素光标的宽度
			cursorborder: "5", // 游标边框css定义
			cursorborderradius: "5px",//以像素为光标边界半径
			autohidemode: true //是否隐藏滚动条
		});
	 $('#scrolledTable1').niceScroll({
		 cursorcolor: "#ccc",//#CC0071 光标颜色
		 cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
		 touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
		 cursorwidth: "5px", //像素光标的宽度
		 cursorborder: "5", // 游标边框css定义
		 cursorborderradius: "5px",//以像素为光标边界半径
		 autohidemode: true //是否隐藏滚动条
	 });
	 
	 $("._ico_exp").click(function(){
		 var v_sdate = $("#sdate").val();
		 var loading = layer.msg('正在下载,请稍等...');
		 /*nbiotService.exportFile("1","NBIOT",function(data){
			 	layer.close(loading);
				window.open("../" + data, "_self");
		});*/
		 $.ajax({
				type: "POST",
				url:"/nbiot/gas/getExportFile",
				data:{
					"v_sdate":v_sdate
				},
				dataType:'json',
			    success: function(data) {
			    	layer.close(loading);
					//window.open("../" + data, "_self");
			    }
		});
	 });
	 
	 
	 loadGasAnalysis();
});


function loadGasAnalysis(){
	initTopFrom();
	initUserActive();//24小时用户活跃曲线
	initUpDownFlow();//24小时上下行流量
	initUseTerminal();//使用终端个数 饼图
	initResidential();
	initSuspected();//疑似故障终端
	initFourLineGraphs();
}


//上面的表格
function initTopFrom(){
	
	var v_sdate = $("#sdate").val();
	$.ajax({
		type: "POST",
		url:"/nbiot/gas/getInitTopFrom",
		data:{
			"v_sdate":v_sdate
		},
		dataType:'json',
	    success: function(data) {
	    	if(data){
	    		$("#subTable1-tbody").find("font").eq(0).html(data.hy_user);
				$("#subTable1-tbody").find("font").eq(1).html(data.all_user);
				$("#subTable1-tbody").find("font").eq(2).html(data.hy_rate);
	    	}
	    }
	});
}

//24小时用户活跃曲线
function initUserActive(){
	var v_sdate = $("#sdate").val();
	$.ajax({
		type: "POST",
		url:"/nbiot/gas/getInitUserActive",
		data:{
			"v_sdate":v_sdate,
		},
		dataType:'json',
	    success: function(data) {
	    	if(data&&data.length>0){
	    		var use24ChartSeries = [];
	    		var xAxis = [];
    			$.each(data, function(i) { 
    				xAxis[i] = data[i].p_hour;
    				use24ChartSeries[i] = data[i].hy_user;
    			});
    			serise = [{ 
    				name: '活跃用户数',
    				data: use24ChartSeries
    			}];
    			createChart(xAxis, serise, null, 1, "24h活跃用户情况", "d0-chart-01");
	    	}
	    }
	})
}


// 24小时 上 下行流量 
function initUpDownFlow(){
	var v_sdate = $("#sdate").val();
	$.ajax({
		type: "POST",
		url:"/nbiot/gas/getInitUpDownFlow",
		data:{
			"v_sdate":v_sdate,
		},
		dataType:'json',
		success: function(data) {
			if(data&&data.length>0){
				var flowChartSeries = [];
				var heartChartSeries = [];
				var xAxis = [];
				$.each(data, function(i) { 
					xAxis[i] = data[i].p_hour;
					flowChartSeries[i] = data[i].up_flow;
					heartChartSeries[i] = data[i].down_flow;
				});
				serise = [{
			        name: '上行流量',
			        yAxis:0,
			        data: flowChartSeries
			    },{
			        name: '下行流量',
			        yAxis:0,
			        color:'rgb(237, 86, 27)',
			        data: heartChartSeries
			    }];
				createChart(xAxis, serise, null, 0, "24h上下行流量指标变化(M)", "d0-chart-03");
			}
		}
	})
}


// 使用终端个数 饼图
function initUseTerminal(){
	var v_sdate = $("#sdate").val();
	$.ajax({
		type: "POST",
		url:"/nbiot/gas/getInitUseTerminal",
		data:{
			"v_sdate":v_sdate,
		},
		dataType:'json',
		success: function(data) {
			if(data&&data.length>0){
				//饼图
				var tempSeries = [];
				$.each(data, function(i) { 
					tempSeries.push([data[i].product,data[i].tac_use]);
				});
				serise = [{
			        type: 'pie',
			        name: '终端占比(%)',
			        data: tempSeries
			    }];
				createChart(null, serise, null, 4, "", "d0-chart-04");
			}
		}
	})
}


// 小区
function initResidential(){
	var v_sdate = $("#sdate").val();
	$.ajax({
		type: "POST",
		url:"/nbiot/gas/getInitResidential",
		data:{
			"v_sdate":v_sdate,
		},
		dataType:'json',
		success: function(data) {
			if(data&&data.length>0){
				var body = '';
				$.each(data,function(i) {
                    body += "<tr>";
                    $.each(data[i],function(k, v) {
                    		if(k=='eci'){
                    			body += "<td><a class='greenA' href='javascript:openGis(\"cigisFrame\","+data[i].longitude+","+data[i].latitude+");'>" + replaceNull(v) + "</td>";
                    		}else{
                    			if(k=='users'||k=='servince_count'){
                        			body += "<td>" + replaceNull(v) + "</td>";
                    			}
                    		}
                    });
                    body += "</tr>";
                });
				$("#nbiot-gas-subTable3-tbody").html(body);
			}
		}
	})
}

//疑似故障终端
function initSuspected(){
	var v_sdate = $("#sdate").val();
	$.ajax({
		type: "POST",
		url:"/nbiot/gas/getInitSuspected",
		data:{
			"v_sdate":v_sdate,
		},
		dataType:'json',
		success: function(data) {
			if(data&&data.length>0){
				var body = '';
				$.each(data,function(i) {
					body += "<tr>";
					$.each(data[i],function(k, v) {
						if(k=='imsi'||k=='eci'||k=='trouble_days'){
							//body += "<td><a class='greenA' href='javascript:openGis(\"cigisFrame\","+data[i].longitude+","+data[i].latitude+");'>" + replaceNull(v) + "</td>";
							body += "<td>" + replaceNull(v) + "</td>";
						}/*else{
							if(k=='users'||k=='servince_count'){
								body += "<td>" + replaceNull(v) + "</td>";
							}
						}*/
					});
					body += "</tr>";
				});
				$("#nbiot-gas-subTable4-tbody").html(body);
			}
		}
	})
}





//最后4张折线图
function initFourLineGraphs(){
	var v_sdate = $("#sdate").val();
	$.ajax({
		type: "POST",
		url:"/nbiot/gas/getInitFourLineGraphs",
		data:{
			"v_sdate":v_sdate,
		},
		dataType:'json',
		success: function(data) {
			if(data&&data.length>0){
				var attachSeries = [];
				var pagSeries = [];
				var upSeries = [];
				var downSeries = [];
	    		var xAxis = [];
    			$.each(data, function(i) { 
    				xAxis[i] = data[i].p_hour;
    				attachSeries[i] = data[i].attach_rate;
    				pagSeries[i] = data[i].pag_rate;
    				upSeries[i] = data[i].up_rate;
    				downSeries[i] = data[i].down_rate;
    			});
    			serise = [{ 
    				name: 'ATTACH成功率(%)',
    				data: attachSeries
    			}];
    			createChart(xAxis, serise, null, 1, "ATTACH成功率", "d0-chart-05");
    			
    			serise = [{ 
    				name: 'pag成功率(%)',
    				data: pagSeries
    			}];
    			createChart(xAxis, serise, null, 1, "pag成功率", "d0-chart-06");
    			
    			serise = [{ 
    				name: '上行成功率(%)',
    				data: upSeries
    			}];
    			createChart(xAxis, serise, null, 1, "上行成功率", "d0-chart-07");
    			
    			serise = [{ 
    				name: '下行成功率(%)',
    				data: downSeries
    			}];
    			createChart(xAxis, serise, null, 1, "下行成功率", "d0-chart-08");
			}
		}
	})
}






function initPageData(type,sdate, isknow, city, area,category, scene, custom, apn){
	var loading = layer.load();
	nbiotService.initGasData(sdate,function(data){
		layer.close(loading);
		var USE24_TABLE = data.USE24_TABLE;
		var USE24_CHART = data.USE24_CHART;
		var FLOW24_CHART = data.FLOW24_CHART;
		var UNLOCK24_TABLE = data.UNLOCK24_TABLE;
		var UNLOCK_CHART = data.UNLOCK_CHART;
		var TAC_CHART =data.TAC_CHART;
		var CI_TABLE = data.CI_TABLE;
		var APPR_CHART = data.APPR_CHART;
		var TCP_CHART = data.TCP_CHART;
		
		if(USE24_TABLE){
			$("#subTable1-tbody").find("font").eq(0).html(USE24_TABLE['IMSI_H']);
			$("#subTable1-tbody").find("font").eq(1).html(USE24_TABLE['IMSI_ALL']);
			$("#subTable1-tbody").find("font").eq(2).html(USE24_TABLE['ACTIVE_RATIO']);
		}
		
		if(UNLOCK24_TABLE){
			$("#subTable2-tbody").find("font").eq(0).html(UNLOCK24_TABLE['SMS_SUCC_CNT']);
			$("#subTable2-tbody").find("font").eq(1).html(UNLOCK24_TABLE['SMS_REQ_CNT']);
			$("#subTable2-tbody").find("font").eq(2).html(UNLOCK24_TABLE['SMS_RATIO']);
		}
		var use24ChartSeries = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];

		var unlockChartSeries = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		var flowChartSeries = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		var heartChartSeries = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		var attachSuccSeries = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
		var pdpSuccSeries = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
		var pagingSuccSeries = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
		var tcpSuccSeries = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
		
		if(USE24_CHART.length>0){
			$.each(USE24_CHART, function(i) { 
				$.each(categories,function(j){
					if(USE24_CHART[i]['SDATE']==categories[j]){
						if(USE24_CHART[i]['IMSI_H']!=0){
							use24ChartSeries[j] = USE24_CHART[i]['IMSI_H'];
						}
					}
				});
			});
		}
		serise = [{ 
	        name: '活跃用户数',
	        yAxis:0,
	        data: use24ChartSeries
	    }];
		createChart(categories, serise, null, 1, "24h活跃用户情况", "d0-chart-01");
		
		
		/*
		if(UNLOCK_CHART.length>0){
			$.each(UNLOCK_CHART, function(i) { 
				$.each(categories,function(j){
					if(UNLOCK_CHART[i]['SDATE']==categories[j]){
						unlockChartSeries[j] = UNLOCK_CHART[i]['SMS_RATIO'];
					}
				});
			});
		}
		serise = [{
	        name: '解锁成功率',
	        yAxis:0,
	        data: unlockChartSeries
	    }];
		createChart(categories, serise, null, 1, "24h车辆解锁成功率(%)", "d0-chart-02");
		*/
		//24h流量指标变化
		if(FLOW24_CHART.length>0){
			$.each(FLOW24_CHART, function(i) { 
				$.each(categories,function(j){
					if(FLOW24_CHART[i]['SDATE']==categories[j]){
						flowChartSeries[j] = FLOW24_CHART[i]['TCP_TRAFFIC_UL'];
						heartChartSeries[j] = FLOW24_CHART[i]['TCP_TRAFFIC_DL'];
					}
					if(FLOW24_CHART[i]['SDATE']==sdate.substring(13,11)){
						$("#subTable4-tbody").find("font").eq(0).html(FLOW24_CHART[i]['TCP_TRAFFIC_UL']);
						$("#subTable4-tbody").find("font").eq(1).html(FLOW24_CHART[i]['TCP_TRAFFIC_DL']);
					}
				});
			});
		}
		serise = [{
	        name: '上行流量',
	        yAxis:0,
	        data: flowChartSeries
	    },{
	        name: '下行流量',
	        yAxis:0,
	        color:'rgb(237, 86, 27)',
	        data: heartChartSeries
	    }];
		createChart(categories, serise, null, 0, "24h上下行流量指标变化(M)", "d0-chart-03");
		
		//饼图
		var tempSeries = [];
		if(TAC_CHART.length>0){
			$.each(TAC_CHART, function(i) { 
				tempSeries.push([TAC_CHART[i]['TAC'],TAC_CHART[i]['COUNTS']]);
			});
		}
		serise = [{
	        type: 'pie',
	        name: '终端占比(%)',
	        data: tempSeries
	    }];
		createChart(null, serise, null, 4, "", "d0-chart-04");
		
		//CI表格
		createTable(CI_TABLE,"nbiot-gas-subTable3-tbody");
		
		var c_attach='',c_pdp='',c_paging='',c_tcp='';
		if(APPR_CHART.length>0){
			$.each(APPR_CHART, function(i) { 
				$.each(categories,function(j){
					if(APPR_CHART[i]['SDATE']==categories[j]){
						if(APPR_CHART[i]['ATTACH_RATIO']!=0){
							attachSuccSeries[j] = APPR_CHART[i]['ATTACH_RATIO'];
						}
						if( APPR_CHART[i]['PDP_RATIO']!=0){
							pdpSuccSeries[j] = APPR_CHART[i]['PDP_RATIO'];
						}
						if( APPR_CHART[i]['PAGE_RATIO']!=0){
							pagingSuccSeries[j] = APPR_CHART[i]['PAGE_RATIO'];
						}
					}
					if(APPR_CHART[i]['SDATE'] == sdate.substring(13,11)){
						c_attach=APPR_CHART[i]['ATTACH_RATIO'];
						c_pdp=APPR_CHART[i]['PDP_RATIO'];
						c_paging=APPR_CHART[i]['PAGE_RATIO'];
					}
				});
			});
		}
		if(TCP_CHART.length>0){
			$.each(TCP_CHART, function(i) { 
				$.each(categories,function(j){
					if(TCP_CHART[i]['SDATE']==categories[j]){
						if(TCP_CHART[i]['TCP_RATIO']!=0){
							tcpSuccSeries[j] = TCP_CHART[i]['TCP_RATIO'];
						}
					}
					if(TCP_CHART[i]['SDATE'] == sdate.substring(13,11)){
						c_tcp=TCP_CHART[i]['TCP_RATIO'];
					}
				});
			});
		}
		serise = [{ 
	        name: 'ATTACH成功率(%)',
	        yAxis:0,
	        data: attachSuccSeries
	    }];
		createChart(categories, serise, null, 1, "当前ATTACH成功率:"+c_attach+"%", "d0-chart-05");
		
		serise = [{ 
	        name: 'PDP成功率(%)',
	        yAxis:0,
	        data: pdpSuccSeries
	    }];
		createChart(categories, serise, null, 1, "当前PDP成功率:"+c_pdp+"%", "d0-chart-06");
		
		serise = [{ 
	        name: 'PAGING成功率(%)',
	        yAxis:0,
	        data: pagingSuccSeries
	    }];
		createChart(categories, serise, null, 1, "当前PAGING成功率:"+c_paging+"%", "d0-chart-07");
		
		serise = [{ 
	        name: 'TCP成功率(%)',
	        yAxis:0,
	        data: tcpSuccSeries
	    }];
		createChart(categories, serise, null, 1, "当前TCP建立成功率:"+c_tcp+"%", "d0-chart-08");
	});
}

function createDataTableMobi(htmlId){
	if($('#'+htmlId).html()==""||$('#'+htmlId+' tbody').html()==""){
		return null;
	}
	var dts = $('#'+htmlId).dataTable({
		"paging": true,
		"info": false,
		"searching": false,
		"iDisplayLength":7,
		"ordering":true,
		"order": [
//			[1, "desc"]
		]
	});
	$("th").removeClass("sorting");
	$("th").removeClass("sorting_asc");
	$("th").removeClass("sorting_desc");
	return dts;
}

function initChartData(){
	
}
