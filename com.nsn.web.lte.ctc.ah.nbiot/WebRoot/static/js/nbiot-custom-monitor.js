var total;
//内容总数量为：
var totalCount;	
//每页加载数量为：
var loadCount=8;
//当前行业（模糊查询用）
var nowScenename="";
var nowSceneid="";

/**
 * 加载行业信息卡&加载默认的第一个行业下的客户信息卡
 * 初始化
 * @param sdate
 * @param network
 * @returns
 */
function initPageData(type,sdate, isknow, city, area,category, scene, custom, apn){
	var loading = layer.load(2);
	//nbiotfeaturesService.initDashboardData({"sdate":sdate}
	$.get("/nbiot/monitor/initDashboardData", {
		"sdate":sdate
		},function(data){
			//行业公告板
			var DASHBOARD=data.DASHBOARD;
			initDashBoard(DASHBOARD);
			var C_SCENEID=DASHBOARD[0].C_SCENEID;
			nowSceneid=C_SCENEID;
			//nbiotfeaturesService.initCustomByDashboard({"sdate":sdate,"C_SCENEID":C_SCENEID}
			$.get("/nbiot/monitor/initCustomByDashboard", {
				"sdate":sdate,
				"C_SCENEID":C_SCENEID
				},function(customdata){
					layer.close(loading);
					//客户公告板
					var CUSTOM=customdata.CUSTOM;
					initCustomDetails(CUSTOM,nowSceneid);
			});
	});
}

/**
 * 加载行业信息卡
 * @param DASHBOARD
 * @returns
 */
function initDashBoard(DASHBOARD){
	var iconInfo = {'交通物流':'fa-truck','金融':'fa-credit-card-alt','能源':'fa-leaf','工业':'fa-industry','安防':'fa-shield','穿戴':'fa-clock-o','市政':'fa-university','医疗':'fa-plus-square','车联网':'fa-car','其他':'fa-puzzle-piece'};

	var html = "";
	if(DASHBOARD && DASHBOARD.length>0){
		$.each(DASHBOARD,function(i){
			var $this = DASHBOARD[i];
			var C_SCENE_NAME=$this.C_SCENE_NAME;
			var C_SCENEID=$this.C_SCENEID;
			html+='<div class="dashpanel"><a href="javascript:void(0)" onclick="queryCustomMonitorOneData(\''+C_SCENE_NAME+'\',\''+C_SCENEID+'\')"><div><i class="fa '+iconInfo[$this.C_SCENE_NAME]+' fa-dash"></i><p>'+replaceNull($this.C_SCENE_NAME)+'</p></div><div><p><span class="dash-split">4G</span><span class="dash-split"><font class="dash-font">'+replaceNull(replaceFixed($this.USER_COUNTS_4G))+'</font>户</span><span class="dash-split"><font class="dash-font">'+replaceNull(replaceFixed($this.TRAFFIC_4G))+'</font>M</span></p><p><span class="dash-split">2G</span><span class="dash-split"><font class="dash-font">'+replaceNull(replaceFixed($this.USER_COUNTS_2G))+'</font>户</span><span class="dash-split"><font class="dash-font">'+replaceNull(replaceFixed($this.TRAFFIC_2G))+'</font>M</span></p><p><span class="dash-split">NB-IoT</span><span class="dash-split"><font class="dash-font">'+replaceNull(replaceFixed($this.USER_COUNTS_NB))+'</font>户</span><span class="dash-split"><font class="dash-font">'+replaceNull(replaceFixed($this.TRAFFIC_NB))+'</font>M</span></p></div></a></div>';
		});
	}
	html+='<div class="dashpanel"><div><i class="fa '+iconInfo['其他']+' fa-dash"></i><p>其他</p></div><div><p><span class="dash-split">4G</span><span class="dash-split"><font class="dash-font">-</font>户</span><span class="dash-split"><font class="dash-font">-</font>M</span></p><p><span class="dash-split">2G</span><span class="dash-split"><font class="dash-font">-</font>户</span><span class="dash-split"><font class="dash-font">-</font>M</span></p><p><span class="dash-split">NB-IoT</span><span class="dash-split"><font class="dash-font">-</font>户</span><span class="dash-split"><font class="dash-font">-</font>M</span></p></div></div>';
	$(".pers-top").html(html);
}

/**
 * 初始化分页&加载当前行业下客户信息的信息卡
 * @param ONEDASHBOARD
 * @returns
 */
function initCustomDetails(CUSTOM,nowSceneid){
	totalCount=CUSTOM.length;
	total = totalCount % loadCount == 0 ? totalCount / loadCount : Math.ceil(totalCount / loadCount) ;
	var html = "";
	var shu;
	if (8>CUSTOM.length) {
		shu=CUSTOM.length;
	} else {
		shu=8;
	}
	for (var i = 0; i < shu; i++) {
		html+='<div class="custom-details">';
		html+='<table style="background-color: #344E6F;color: white;">';
		html+='<tr>';
		html+='<td width="80" height="60"><i class="fa fa-leaf fa-dash" style="margin-left: 5px;"></i></td>';
		html+='<td width="205" height="60" colspan="2"><p style="font-size:12;">客户名称：<a style="color:white;" href="javascript:void(0)" onclick="jumpSense(\''+CUSTOM[i].C_CUSTOMID+'\',\''+nowSceneid+'\')">'+CUSTOM[i].C_CUSTOM_NAME+'</a></p><p style="font-size: 12;line-height: 26px;">网络：'+CUSTOM[i].C_NAME+'</p></td>';
		html+='<td width="40" height="60"><p style="color: #57ef57;font-size: 16;" align="center">'+CUSTOM[i].VALUE+'</p></td>';
		html+='</tr>';
		html+='<tr style="background-color:#284567;">';
		html+='<td width="275" height="100" colspan="2">';
		html+='<p style="line-height: 26px;font-size: 12;padding-left: 5px;">在网用户数</p>';
		html+='<p style="line-height: 26px;font-size: 12;padding-left: 5px;">业务请求次数</p>';
		html+='<p style="line-height: 26px;font-size: 12;padding-left: 5px;">数据流量</p>';
		html+='</td>';
		html+='<td width="50" height="100" colspan="2">';
		html+='<p style="line-height: 26px;font-size: 12;text-align:right;"><span style="color: #57ef57;">'+CUSTOM[i].CARD_COUNTS+'</span>个</p>';
		html+='<p style="line-height: 26px;font-size: 12;text-align:right;"><span style="color: #57ef57;">'+CUSTOM[i].BUSINESS_REQUESTS+'</span>次</p>';
		html+='<p style="line-height: 26px;font-size: 12;text-align:right;"><span style="color: #57ef57;">'+CUSTOM[i].TRAFFIC+'</span>MB</p>';
		html+='</td>';
		html+='</tr>';
		html+='</table>';
		html+='</div>';
	}
	$(".all-custom-details").html(html);
	
	$("#pagination3").pagination({
		currentPage: 1,
		totalPage: total,
		isShow: true,
		count: 7,
		homePageText: "首页",
		endPageText: "尾页",
		prevPageText: "上一页",
		nextPageText: "下一页",
		callback: function(current) {
			changePage(CUSTOM,current,nowSceneid);
		}
	});
}

/**
 * 分页查询
 * @param data1
 * @param current
 * @returns
 */
function changePage(CUSTOM,current,nowSceneid){
	var html = "";
	var shu;
	if (current*8>=CUSTOM.length) {
		shu=CUSTOM.length;
	} else {
		shu=current*8;
	}
	for (var i = (current-1)*8; i < shu; i++) {
		html+='<div class="custom-details">';
		html+='<table style="background-color: #344E6F;color: white;">';
		html+='<tr>';
		html+='<td width="80" height="60"><i class="fa fa-leaf fa-dash" style="margin-left: 5px;"></i></td>';
		html+='<td width="205" height="60" colspan="2"><p style="font-size: 12;">客户名称：<a style="color:white;" href="javascript:void(0)" onclick="jumpSense(\''+CUSTOM[i].C_CUSTOMID+'\',\''+nowSceneid+'\')">'+CUSTOM[i].C_CUSTOM_NAME+'</a></p><p style="font-size: 12;line-height: 26px;">网络：'+CUSTOM[i].C_NAME+'</p></td>';
		html+='<td width="40" height="60"><p style="color: #57ef57;font-size: 16;" align="center">'+CUSTOM[i].VALUE+'</p></td>';
		html+='</tr>';
		html+='<tr style="background-color:#284567;">';
		html+='<td width="275" height="100" colspan="2">';
		html+='<p style="line-height: 26px;font-size: 12;padding-left: 5px;">在网用户数</p>';
		html+='<p style="line-height: 26px;font-size: 12;padding-left: 5px;">业务请求次数</p>';
		html+='<p style="line-height: 26px;font-size: 12;padding-left: 5px;">数据流量</p>';
		html+='</td>';
		html+='<td width="50" height="100" colspan="2">';
		html+='<p style="line-height: 26px;font-size: 12;text-align:right;"><span style="color: #57ef57;">'+CUSTOM[i].CARD_COUNTS+'</span>个</p>';
		html+='<p style="line-height: 26px;font-size: 12;text-align:right;"><span style="color: #57ef57;">'+CUSTOM[i].BUSINESS_REQUESTS+'</span>次</p>';
		html+='<p style="line-height: 26px;font-size: 12;text-align:right;"><span style="color: #57ef57;">'+CUSTOM[i].TRAFFIC+'</span>MB</p>';
		html+='</td>';
		html+='</tr>';
		html+='</table>';
		html+='</div>';
	}
	$(".all-custom-details").html("");
	$(".all-custom-details").html(html);
}
/**
 * 点击行业信息卡动态改变客户信息卡
 * @param C_SCENE_NAME
 * @returns
 */
function queryCustomMonitorOneData(C_SCENE_NAME,C_SCENEID){
	var sdate = $(".J-SDATE").val();
	$("input[name=OneCustomer]").val("");
	nowSceneid=C_SCENEID;
	var loading = layer.load(2);
	//nbiotfeaturesService.initCustomByDashboard({"sdate":sdate,"C_SCENEID":C_SCENEID}
	$.get("/nbiot/monitor/initCustomByDashboard", {
		"sdate":sdate,
		"C_SCENEID":C_SCENEID
		},function(customdata){
			layer.close(loading);
			var CUSTOM=customdata.CUSTOM;
			initCustomDetails(CUSTOM,nowSceneid);
	});
}
/**
 * 当前行业下
 * 客户信息模糊查询
 * @returns
 */
function queryOneCustomer(){
	var C_CUSTOM_NAME=$("input[name=OneCustomer]").val();
	var sdate = $(".J-SDATE").val();
	//nbiotfeaturesService.queryOneCustomer({"sdate":sdate,"C_CUSTOM_NAME":C_CUSTOM_NAME,"C_SCENEID":nowSceneid}
	$.get("/nbiot/monitor/queryOneCustomer", {
		"sdate":sdate,
		"C_CUSTOM_NAME":C_CUSTOM_NAME,
		"C_SCENEID":nowSceneid
		},function(customdata){
			var CUSTOM=customdata.CUSTOM;
			initCustomDetails(CUSTOM,nowSceneid);
	});
}

function jumpSense(customid,nowSceneid){
	sdate_d = $("#startDatetimepicker_h").val();
	var sdate=sdate_d+" 10:00:00";
	window.open("nbiot-sense.html?sdate="+sdate+"&isknow=1&city=0&area=0&category=0&scene="+nowSceneid+"&custom="+customid+"","_blank");
}