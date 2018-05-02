function GetDate(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);
////    获取AddDayCount天后的日期 
//    var y = dd.getFullYear();
//    var m = dd.getMonth() + 1;
////    获取当前月份的日期 
//    var d = dd.getDate();
//    return y + "-" + m + "-" + d;
    return dd.format('yyyy-MM-dd');
//    return "2017-09-14 06:00:00";
}
var data4g;
var data2g;
var datanb;
var dts1,dts2;
var clickType="4G";
$(function(){
	reAutoHeight();
	$(window).resize(function(){
//		window.location.reload();
	});
	 $("._ico_exp").click(function(){
		 var type = $(this).attr("data");
		 if(type!=1){
			 sdate = $("#startDatetimepicker_h").val();
			 if(clickType=="4G"){
				 var loading = layer.msg('正在下载,请稍等...');
				 nbiotUserService.exportFile("4G_DETAIL","NBIOT",sdate,product,function(data){
					 	layer.close(loading);
						window.open("../" + data, "_self");
				});
			 }else if(clickType=="2G"){
				 var loading = layer.msg('正在下载,请稍等...');
				 nbiotUserService.exportFile("2G_DETAIL","NBIOT",sdate,product,function(data){
					 	layer.close(loading);
						window.open("../" + data, "_self");
				});
			 }
			 
		 }else{
			 sdate = $("#startDatetimepicker_h").val();
			 var loading = layer.msg('正在下载,请稍等...');
			 nbiotUserService.exportFile(clickType,"NBIOT",sdate,"",function(data){
				 	layer.close(loading);
					window.open("../" + data, "_self");
			}); 
		 }
		
	 });
	$('#moMainBodyCon').niceScroll({
		cursorcolor: "#ccc",//#CC0071 光标颜色
		cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
		touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
		cursorwidth: "5px", //像素光标的宽度
		cursorborder: "5", // 游标边框css定义
		cursorborderradius: "5px",//以像素为光标边界半径
		autohidemode: true //是否隐藏滚动条
	});
	
	var sdt=$("#startDatetimepicker_h").val();
	if(sdt==null || sdt ==""){
		var sdates=GetDate(-1); 
		$("#startDatetimepicker_h").val(sdates);
	}
$(".switch-tab-table").click(function(){
		$(".switch-tab-table").removeClass("active");
		$(this).addClass("active");
		var type = $(this).attr("data");
		//4G
		if(type=='0'){
			clickType = "4G";
			initTable("subTable1", "100%", ["终端型号","用户数","attach成功率","DNS成功率","TCP成功率","HTTP成功率","上行流量MB","下行流量MB","TCP无线时延ms","top排名"],
					["MS_PRODUCT","USER_COUNT","ATTACH_RATE","DNS_RATE","TCP_RATE","HTTP_RATE","TRAFFIC_UL","TRAFFIC_DL","TCP_MS","TOP_RANK"],data4g,function(a,b){
			     if("MS_PRODUCT"==b){
			     		return	'<a href="javascript:void(0)" onclick="initTabTable2(\'1\',\''+a['MS_PRODUCT']+'\');" class="greenA">'+a['MS_PRODUCT']+'</a>';
			     	} else{
			     		return a[b];
			     	}      	
			    });
		}
		//2G
		else if(type=='1'){
			clickType = "2G";
			initTable("subTable1", "100%", ["终端型号","用户数","pdp成功率","rau成功率","tcp成功率","上行流量MB","下行流量MB","TCP无线时延ms","top排名"],
					["MS_PRODUCT", "USER_COUNT", "PDP_RATE", "RAU_RATE", "TCP_RATE", "TRAFFIC_UL", "TRAFFIC_DL", "TCP_MS", "TOP_RANK"],data2g,function(a,b){
			     if("MS_PRODUCT"==b){
			     		return	'<a href="javascript:void(0)" onclick="initTabTable2(\'2\',\''+a['MS_PRODUCT']+'\');" class="greenA">'+a['MS_PRODUCT']+'</a>';
			     	} else{
			     		return a[b];
			     	}      	
			    });
		}
		//NB
		else if(type=='2'){
			initTable("subTable1", "100%", ["终端型号","用户数","attach成功率","DNS成功率","TCP成功率","HTTP成功率","上行流量MB","下行流量MB","TCP无线时延ms"],
					["MS_PRODUCT", "USER_COUNT", "ATTACH_RATE", "DNS_RATE", "TCP_RATE", "HTTP_RATE", "TRAFFIC_UL", "TRAFFIC_DL", "TCP_MS"],datanb,function(a,b){
			     if("MS_PRODUCT"==b){
			     		return	'<a href="javascript:void(0)" onclick="initTabTable2(\'3\',\''+a['MS_PRODUCT']+'\');" class="greenA">'+a['MS_PRODUCT']+'</a>';
			     	} else{
			     		return a[b];
			     	}      	
			    });
		}
		$("#subTable1").attr("data",type);
	});
});
function reAutoHeight() {
	$("#moMainBodyCon").height($(window).height()-65);
	var winH = $(window).height();
	$("#ConLeft").height($("#moMainBodyCon").height());
	$("#ConRight").height($("#moMainBodyCon").height());
}
function initPageData() {
	sdate = $("#startDatetimepicker_h").val();
	var loading = layer.load();
		nbiotUserService.initDataterminal(sdate,function(data){
			layer.close(loading);
			var total_user = data.V_IOT_TOTAL_USER;
			var user_cnt = data.V_IOT_DETAIL_USER_CNT;
			var user_traffic = data.V_IOT_DETAIL_USER_TRAFFIC;
			var user_req = data.V_IOT_DETAIL_USER_REQ;
			var term_4g_top = data.V_IOT_DETAIL_TERM_4G_TOP;
			var term_2g_top = data.V_IOT_DETAIL_TERM_2G_TOP;
			var term_nb_top = data.V_IOT_DETAIL_TERM_NB_TOP;
			var v_iot_detail_scene_top = data.V_IOT_DETAIL_SCENE_TOP;
			if(total_user){
				$("#label1").html(total_user['USER_CNT']);
				$("#label2").html(Math.round(total_user['TRAFFIC'])+'(MB)');
				$("#label3").html(Math.round(total_user['REQ_CNT']/10000)+"(万)");
			}else{
				$("#label1").html(0);
				$("#label2").html('0MB');
				$("#label3").html(0);
			}
			if(v_iot_detail_scene_top){
				var  st="";
				for(var i=0;i<v_iot_detail_scene_top.length;i++){
					st += "<tr>";
					
					st+="<td  style='background: #284567;border: 0px;line-height:33px;'>"+v_iot_detail_scene_top[i]["C_SCENE_NAME"]+"</td>";
					st+="<td  style='background: #284567;border: 0px;color: #ECA000;'><a href='javascript:void(0)'   onclick=\"initTabTable3(1,\'"+v_iot_detail_scene_top[i]["C_SCENE_NAME"]+"\')\"  class='greenB'  >"+v_iot_detail_scene_top[i]["TERMINAL_4G"]+"</a></td>";
					st+="<td   style='background: #284567;border: 0px;color: #ECA000;'><a href='javascript:void(0)'  onclick=\"initTabTable3(2,\'"+v_iot_detail_scene_top[i]["C_SCENE_NAME"]+"\')\" class='greenB'  >"+v_iot_detail_scene_top[i]["TERMINAL_2G"]+"</a></td>";
					st+="<td   style='background: #284567;border: 0px;color: #ECA000;'>"+v_iot_detail_scene_top[i]["TERMINAL_NB"]+"</td></tr>";
				}
				 $("#sub-tbody").html(st);
			}
			if(user_cnt){
				var categories=[];
				var seriesdata = [];
				var tempsr = [];
				var nbname="";
				var nbvalue=0;
				for(var i=0;i<user_cnt.length;i++){
					if(user_cnt[i]['TERM_TYPE']=="NB"){
						nbname = user_cnt[i]['TERM_TYPE'];
						nbvalue=user_cnt[i]['USER_CNT'];
					}else{
						categories.push(user_cnt[i]['TERM_TYPE']);
						tempsr.push(user_cnt[i]['USER_CNT']);
					}
					
				}
				if(nbname!=""){
					categories.push(nbname);
					tempsr.push(nbvalue);
				}
				seriesdata.push({name: '终端数',data: tempsr});
				createChart2(categories, seriesdata, 0, "终端数", "dmChart1","");
			}
			if(user_traffic){
				var categories=[];
				var seriesdata = [];
				var tempsr = [];
				var nbname="";
				var nbvalue=0;
				for(var i=0;i<user_traffic.length;i++){
					if(user_traffic[i]['TERM_TYPE']=="NB"){
						nbname = user_traffic[i]['TERM_TYPE'];
						nbvalue=Math.round(user_traffic[i]['TRAFFIC']);
					}else{
						categories.push(user_traffic[i]['TERM_TYPE']);
						tempsr.push(Math.round(user_traffic[i]['TRAFFIC']));
					}
				}
				if(nbname!=""){
					categories.push(nbname);
					tempsr.push(nbvalue);
				}
				seriesdata.push({name: '流量(MB)',data: tempsr});
				createChart2(categories, seriesdata, 0, "流量(MB)", "dmChart2","(MB)");
			}
			if(user_req){
				var categories=[];
				var seriesdata = [];
				var tempsr = [];
				var nbname="";
				var nbvalue=0;
				for(var i=0;i<user_req.length;i++){
					if(user_req[i]['TERM_TYPE']=="NB"){
						nbname = user_req[i]['TERM_TYPE'];
						nbvalue=Math.round(user_req[i]['REQ_CNT']/10000);
					}else{
						categories.push(user_req[i]['TERM_TYPE']);
						tempsr.push(Math.round(user_req[i]['REQ_CNT']/10000));
					}
				}
				if(nbname!=""){
					categories.push(nbname);
					tempsr.push(nbvalue);
				}
			
				seriesdata.push({name: '业务次数(万)',data: tempsr});
				createChart2(categories, seriesdata, 0, "业务次数(万)", "dmChart3","(万)");
			}
			if(term_4g_top){
				data4g=term_4g_top;
				initTable("subTable1", "100%", ["终端型号","用户数","attach成功率","DNS成功率","TCP成功率","HTTP成功率","上行流量MB","下行流量MB","TCP无线时延ms","top排名"],
					["MS_PRODUCT","USER_COUNT","ATTACH_RATE","DNS_RATE","TCP_RATE","HTTP_RATE","TRAFFIC_UL","TRAFFIC_DL","TCP_MS","TOP_RANK"],
						data4g,function(a,b){
					     if("MS_PRODUCT"==b){
				     		return	'<a href="javascript:void(0)" onclick="initTabTable2(\'1\',\''+a['MS_PRODUCT']+'\');" class="greenA">'+a['MS_PRODUCT']+'</a>';
				     	} else{
				     		return a[b];
				     	}      	
				    });
				var categories=[];
				var seriesdata = [];
				var tempsr = [];
				for(var i=0;i<term_4g_top.length;i++){
					categories.push(term_4g_top[i]['MS_PRODUCT']);
					tempsr.push(Math.round(term_4g_top[i]['USER_COUNT']/10000));
				}
				seriesdata.push({name: '4G Top 终端类型',data: tempsr});
				createChart2(categories, seriesdata, 1, "4G Top 终端类型(万)", "dmChart4","",function (that, e) {
	                initTabTable(1, e.point.category);
	            });
			}
			if(term_2g_top){
				data2g=term_2g_top;
				var categories=[];
				var seriesdata = [];
				var tempsr = [];
				for(var i=0;i<term_2g_top.length;i++){
					categories.push(term_2g_top[i]['MS_PRODUCT']);
					tempsr.push(Math.round(term_2g_top[i]['USER_COUNT']/10000));
				}
				seriesdata.push({name: '2G Top 终端类型',data: tempsr});
				createChart2(categories, seriesdata, 1, "2G Top 终端类型(万)", "dmChart5","",function (that, e) {
	                initTabTable(2, e.point.category);
	            });
			}
			if(term_nb_top){
				nb=term_nb_top;
				var categories=[];
				var seriesdata = [];
				var tempsr = [];
				for(var i=0;i<term_nb_top.length;i++){
					categories.push(term_nb_top[i]['MS_PRODUCT']);
					tempsr.push(Math.round(term_nb_top[i]['USER_COUNT']/10000));
				}
				seriesdata.push({name: 'NB Top 终端类型',data: tempsr});
				createChart2(categories, seriesdata, 1, "NB Top 终端类型", "dmChart6","",function (that, e) {
	                initTabTable(3, e.point.category);
	            });
			}
		});

}
function createChart2(category, serise,  type, title, htmlId,unit,seriesCallBack) {
	var charts = null;
	Highcharts.setOptions({  
	       colors: ['#058DC7', '#50B432', '#ED561B','#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']  
	});  
    // 柱状图
    if (type == 0) {
    		charts = $("#" + htmlId).highcharts({
            chart: {
                type: 'column',
                backgroundColor : 'rgba(0,0,0,0)'
            },
            title: {
                text: title,
                style:{
                    color:"#dddddd",
                    fontSize:'12px'
                }
            },
            xAxis: {
                categories: category,
                labels:{
	                	style:{
	                		"color":"#dddddd",
	                		fontSize: "12px",
	                		fontFamily: "微软雅黑",
	                	},
                }
            },
            yAxis: {
                min: 0,
                gridLineWidth: 0,
                labels : {
	                style : {
	                    color : '#dddddd'
	                },
	             //   format: '{value}'+unit
	            },
                title: {
                    text: ''
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                shared: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    dataLabels:{
                    	 enabled:true ,
                    	 allowOverlap: true,
                    	 color:"#dddddd"
                    }
                }
            },
            series: serise
        });
    }
 // 柱状图
    if (type == 1) {
    		charts = $("#" + htmlId).highcharts({
            chart: {
                type: 'bar',
                backgroundColor : 'rgba(0,0,0,0)'
            },
            title: {
                text: title,
                style:{
                    color:"#dddddd",
                    fontSize:'12px'
                }
            },
            xAxis: {
                categories: category,
                labels:{
	                	style:{
	                		"color":"#dddddd",
	                		fontSize: "12px",
	                		fontFamily: "微软雅黑",
	                	},
                }
            },
            yAxis: {
                min: 0,
                 gridLineWidth: 0,
                labels : {
	                style : {
	                    color : '#dddddd'
	                },
	                format: '{value}'+unit
	            },
                title: {
                    text: ''
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                shared: true
            },
            plotOptions: {
                bar: {
//                    pointPadding: 0.2,
                    borderWidth: 0
                },
                series : {
                    cursor : 'pointer',
                    marker : {
                        enabled : false,
                    },
                    events : {
                        click : function(e) {
                            if(seriesCallBack){
                                seriesCallBack(this,e)
                            }
                        }
                    }
                }
            },
            series: serise
        });
    }
    return charts;
}


//设置table数据方法
function initTable(id, fwidth, heads, headfilds, data, callback,scrollY,scrollX,linetable) {
	if(!scrollX){
		scrollX=true;
	}
	if(!linetable){
		linetable="tablesorter"
	}
  //1、设置表头
  var tableData = "";
  if (heads.length > 0) {
      tableData = "<thead><tr>";
      $.each(heads, function (i) {
          tableData += '<th>' + heads[i] + '</th>';
      });
      tableData = tableData + '</tr></thead>';
  }
  //2、设置表数据
  tableData = tableData + "<tbody>";
  if(data!=undefined){
  if (data.length > 0) {
      $("#" + id).html("");
      $.each(data, function (i) {
          var date = data[i].col1 + "";
          tableData += "<tr>";
          $.each(headfilds, function (j) {
              if(!callback || typeof callback == 'undefined' || callback == undefined) {
              	var valst=data[i][headfilds[j]];
              	tableData += "<td  align='left'>" +replaceNull(valst) + "</td>";
              } else {
                  var val = replaceNull(callback(data[i], headfilds[j]));
//                  console.log(val);
                  if (val != null) {
                      if(ChkNum(val)){
                  		tableData += "<td  align='left'>" +val + "</td>";
              		}else{
              			tableData += "<td  align='left'>" +val + "</td>";
              		}
                  } else {
                  	if(ChkNum(data[i][headfilds[j]])){
                  		tableData += "<td  align='left'>" +replaceNull(data[i][headfilds[j]]) + "</td>";
              		}else{
              			tableData += "<td  align='left'>" +replaceNull(data[i][headfilds[j]]) + "</td>";
              		}
                  }

              }

          });
          tableData += "</tr>";
      });
  }
  }
      tableData += "</tbody>";
 
      var width = "100%";
      if (fwidth) {
          width = fwidth;
      }
      $("#" + id).html("<table id='" + id + "Table' class='"+linetable+" tableLowTh' cellspacing='0' width='" + width + "' >" + tableData + "</table>");
      if(scrollY){
	        $('#' + id + 'Table').dataTable({
	        	"scrollY": scrollY,
//	            "scrollX": scrollX,
	            "deferRender":    true,
	            "scroller":       false,
	            "scrollCollapse": false,
	            "paging": false,
	            "info": false,
	            "searching": false,
	            "ordering": true, // 禁止排序
	            "order": []
	        });
      }else{
      	$('#' + id + 'Table').dataTable({
	            "scrollCollapse": true,
	            "paging": false,
	            "info": false,
	            "searching": false,
	            "ordering": true, // 禁止排序
	            "order": []
	        });
      }
}
function initTabTable(num, name) {
	sdate = $("#startDatetimepicker_h").val();
	var loading = layer.load(2);
	nbiotUserService.initDetail(sdate, name,num,function(data){
		initTable("detail-table", "100%", ["集团名称","行业名称","用户数"],
				["CUSTOM_NAME","SCENE_NAME","USER_COUNT"],data);
		layer.open({
            title: "终端型号:"+name,
            type: 1,
            area: ['50%', '40%'],
            skin: 'demo-class', //样式类名
            closeBtn: 1,
            shift: 2,
            shadeClose: true,
            content: $('#terminalDetail')
        });
		layer.close(loading);
	})
}
var  product = "";
function initTabTable2(num, name) {
	sdate = $("#startDatetimepicker_h").val();
	var loading = layer.load(2);
	product = name;
	nbiotUserService.initDetail(sdate, name,num,function(data){
		if(num=="1"){
			initTable("detail-table2", "100%", ["集团名称","行业名称","用户数","attach成功率","DNS成功率","TCP成功率","HTTP成功率","上行流量MB","下行流量MB","TCP无线时延ms"],
					["CUSTOM_NAME","SCENE_NAME","USER_COUNT","ATTACH_RATE","DNS_RATE","TCP_RATE","HTTP_RATE","TRAFFIC_UL","TRAFFIC_DL","TCP_MS"],data
				,function(a,b){
				    if("ATTACH_RATE"==b && a['ATTACH_RATE']<70){
			     		return	'<a href="javascript:void(0)" onclick="tabdetail(\'attach_rate\');" class="greenA">'+a['ATTACH_RATE']+'</a>';
			     	}else if("DNS_RATE"==b && a['DNS_RATE']<70 && a['DNS_RATE'] !=null){
			     		return	'<a href="javascript:void(0)" onclick="tabdetail(\'dns_rate\');" class="greenA">'+a['DNS_RATE']+'</a>';
			     	}else if("TCP_RATE"==b && a['TCP_RATE']<70 && a['TCP_RATE'] !=null){
			     		return	'<a href="javascript:void(0)" onclick="tabdetail(\'tcp_rate\');" class="greenA">'+a['TCP_RATE']+'</a>';
			     	}else if("HTTP_RATE"==b && a['HTTP_RATE']<70 && a['HTTP_RATE'] !=null){
			     		return	'<a href="javascript:void(0)" onclick="tabdetail(\'http_rate\');" class="greenA">'+a['HTTP_RATE']+'</a>';
			     	}else if("TRAFFIC_UL"==b && a['TRAFFIC_UL']==0 && a['TRAFFIC_UL'] !=null) {
			     		return	'<a href="javascript:void(0)" onclick="tabdetail(\'traffic_ul\');" class="greenA">'+a['TRAFFIC_UL']+'</a>';
			     	}else if("TRAFFIC_DL"==b && a['TRAFFIC_DL']==0 && a['TRAFFIC_DL'] !=null){
			     		return	'<a href="javascript:void(0)" onclick="tabdetail(\'traffic_dl\');" class="greenA">'+a['TRAFFIC_DL']+'</a>';
			     	}else if("TCP_MS"==b && a['TCP_MS']>100 && a['TCP_MS'] !=null){
			     		return	'<a href="javascript:void(0)" onclick="tabdetail(\'tcp_ms\');" class="greenA">'+a['TCP_MS']+'</a>';
			     	}  else{
			     		return a[b];
			     	}      	
	    	});

		}else if(num=="2"){
			initTable("detail-table2", "100%", ["集团名称","行业名称","用户数","pdp成功率","rau成功率","tcp成功率","上行流量MB","下行流量MB","TCP无线时延ms"],
					["CUSTOM_NAME","SCENE_NAME","USER_COUNT","PDP_RATE","RAU_RATE","TCP_RATE","TRAFFIC_UL","TRAFFIC_DL","TCP_MS"],data
					,function(a,b){
			   if("PDP_RATE"==b && a['PDP_RATE']<80 && a['PDP_RATE'] !=null){
		     		return	'<a href="javascript:void(0)" onclick="tabdetail(\'pdp_rate\');" class="greenA">'+a['PDP_RATE']+'</a>';
		     	}else if("RAU_RATE"==b && a['RAU_RATE']<80 && a['RAU_RATE'] !=null){
		     		return	'<a href="javascript:void(0)" onclick="tabdetail(\'rau_rate\');" class="greenA">'+a['RAU_RATE']+'</a>';
		     	}else if("TCP_RATE"==b && a['TCP_RATE']<70 && a['TCP_RATE'] !=null){
		     		return	'<a href="javascript:void(0)" onclick="tabdetail(\'tcp_rate\');" class="greenA">'+a['TCP_RATE']+'</a>';
		     	}else if("TRAFFIC_UL"==b && a['TRAFFIC_UL']==0 && a['TRAFFIC_UL'] !=null) {
		     		return	'<a href="javascript:void(0)" onclick="tabdetail(\'traffic_ul\');" class="greenA">'+a['TRAFFIC_UL']+'</a>';
		     	}else if("TRAFFIC_DL"==b && a['TRAFFIC_DL']==0 && a['TRAFFIC_DL'] !=null){
		     		return	'<a href="javascript:void(0)" onclick="tabdetail(\'traffic_dl\');" class="greenA">'+a['TRAFFIC_DL']+'</a>';
		     	}else if("TCP_MS"==b && a['TCP_MS']>100 && a['TCP_MS'] !=null){
		     		return	'<a href="javascript:void(0)" onclick="tabdetail(\'tcp_ms\');" class="greenA">'+a['TCP_MS']+'</a>';
		     	}  else{
		     		return a[b];
		     	}      	
    	});
		}else if(num=="3"){
			initTable("detail-table2", "100%", ["集团名称","行业名称","用户数","attach成功率","DNS成功率","TCP成功率","HTTP成功率",	"上行流量MB",	"下行流量MB"],
					[	"CUSTOM_NAME","SCENE_NAME","USER_COUNT","ATTACH_RATE","DNS_RATE","TCP_RATE","HTTP_RATE","TRAFFIC_UL","TRAFFIC_DL"],data);
		}
		layer.open({
            title: "终端型号:"+name,
            type: 1,
            area: ['80%', '40%'],
            skin: 'demo-class', //样式类名
            closeBtn: 1,
            shift: 2,
            shadeClose: true,
            content: $('#terminalDetail2')
        });
		layer.close(loading);
	})
}
function tabdetail(str){
	sdate = $("#startDatetimepicker_h").val();
	if(str=="attach_rate" || str =="pdp_rate"){
		window.open("nbiot-64-net.html?type=0&isknow=0&sdate="+sdate+" 10:00:00"); 
	}else if(str=="traffic_ul" || str =="traffic_dl"){
		window.open("nbiot-64-use.html?type=0&isknow=0&sdate="+sdate+" 10:00:00"); 
	}else if(str=="rau_rate") {
		window.open("nbiot-64-swi.html?type=0&isknow=0&sdate="+sdate+" 10:00:00"); 
	}else{
		window.open("nbiot-64-bus.html?type=0&isknow=0&sdate="+sdate+" 10:00:00"); 
	}
}

function initTabTable3(num, name) {
	var stn="";
	if(num==1){
		stn="4G"
	}else if(num==2){
		stn="2G"
	}
	sdate = $("#startDatetimepicker_h").val();
	var loading = layer.load(2);
//	product = name;
	nbiotUserService.initTerminalDetail(sdate, name,num,function(data){
		initTable("detail-table", "100%", ["行业名称","品牌","终端型号","用户数"],
				["SCENE_NAME","BRAND","PRODUCT","USER_COUNT"],data
		);
		layer.open({
            title: stn+"-行业名称:"+name,
            type: 1,
            area: ['70%', '50%'],
            skin: 'demo-class', //样式类名
            closeBtn: 1,
            shift: 2,
            shadeClose: true,
            content: $('#terminalDetail')
        });
		layer.close(loading);
	})
}