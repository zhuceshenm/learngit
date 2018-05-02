$(function(){
	//window.location.href = window.location.href.split("?")[0]+"?type="+type+"&isknow="+isknow+"&city="+city+"&area="+area+"&category="+category+"&sdate="+sdate+"&scene="+scene+"&custom="+custom;
		reAutoHeight();
		$(window).resize(function(){
//			window.location.reload();
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
});

	function reAutoHeight() {
		$("#moMainBodyCon").height($(window).height()-45);
		var winH = $(window).height();
		$("#ConLeft").height($("#moMainBodyCon").height());
		$("#ConRight").height($("#moMainBodyCon").height());
	}


var Gsdate = '';
var Gcity = '';
var GsceneId = '';
var GcustomId = '';
//初始化查询条件
$(function() {
	//二级下拉菜单
	$("ul.dropLayer > li").mouseenter(function(){
		$(this).children("dl.subMenu").fadeIn(0, function(){
			//<!--[if IE 6]> $("dl.subMenu").bgiframe();<![endif]-->
			if(navigator.userAgent.indexOf("MSIE 6.0") > 0){
				$("dl.subMenu").bgiframe();
			}
			$(this).bind("mouseleave", function(){
				$(this).unbind("mouseleave"); $(this).fadeOut(0);
			});
		});
		$(this).children("a").addClass("selA");
		$("ul.dropLayer > li").not($(this)).children("dl.subMenu").fadeOut(0);
		$("ul.dropLayer > li").not($(this)).children("a").removeClass("selA");
		$(this).mouseleave(function(){
			$("dl.subMenu").fadeOut(0);
			$(this).children("a").removeClass("selA");
		});
	});
	$("ul.dropLayer > li a").click(function(){ $("dl.subMenu").fadeOut(0);});
	
	Gsdate = replaceNull(GetQueryString("sdate"))=="-"?$(".J-SDATE").val():GetQueryString("sdate");
	var Gisknow = replaceNull(GetQueryString("isknow"))=="-"?$(".J-ISKNOW").val():GetQueryString("isknow");
	Gcity = replaceNull(GetQueryString("city"))=="-"?$("#city option:selected").text():GetQueryString("city");
	var Garea = replaceNull(GetQueryString("area"))=="-"?$(".J-AREA").val():GetQueryString("area");
	var Gcategory = replaceNull(GetQueryString("category"))=="-"?$(".J-CATEGORY").val():GetQueryString("category");
	GsceneId = GetQueryString("scene");
	GcustomId = GetQueryString("custom");
	if(replaceNull(Garea)=="-" || replaceNull(GsceneId)=="-" || replaceNull(GcustomId)=="-"){
		window.location.href = window.location.href.split("?")[0]+"?sdate="+Gsdate+"&isknow="+Gisknow+"&city=0&area=0&category=0&scene=0&custom=0";
		return;
	}
	if(Gisknow=='0'){
		$(".J-SCENE").hide();
		$(".J-SCENE").prev().hide();
		$(".J-CUSTOM").hide();
		$(".J-CUSTOM").prev().hide();
		$(".J-APN").hide();
		$(".J-APN").prev().hide();
		$(".J-CATEGORY").show();
		$(".J-CATEGORY").prev().show();
	}else{
		$(".J-SCENE").show();
		$(".J-SCENE").prev().show();
		$(".J-CUSTOM").show();
		$(".J-CUSTOM").prev().show();
		$(".J-APN").show();
		$(".J-APN").prev().show();
		$(".J-CATEGORY").hide();
		$(".J-CATEGORY").prev().hide();
	}
	 loadData();
});

/**
 * 初始化菜单，如果是sub子菜单，则显示六元五阶的菜单
 * 
 * @param isSub
 */
function initTopMenu() {
	//完整功能
	//var content = '<div id="menuNavWrap"><div class="NOClogoOut"><div class="moLogo">上海移动-物联网端到端分析&nbsp;&nbsp;&nbsp;&nbsp;</div></div><ul class="dropLayer"><li id="system_menu0"><a href="#" class=""><img src="nbiot/styles/icons/layer01.png">智能分类</a><dl class="subMenu dropAlignL" style="display:none"><dd><a href="javascript:openWindow(\'特征聚类\',\'nbiot-userclass.html\',\'_blank\')">特征聚类</a></dd><dd><a href="javascript:openWindow(\'深度匹配\',\'nbiot-userfeatures.html\',\'_blank\')">深度匹配</a></dd></dl></li><li id="system_menu1"><a href="#" class=""><img src="nbiot/styles/icons/layer02.png">感知体系</a><dl class="subMenu dropAlignL" style="display:none"><dd><a href="javascript:openWindow(\'三步一体\',\'nbiot-sense.html\',\'_blank\')">三步一体</a></dd><dd><a href="javascript:openWindow(\'异常监控\',\'nbiot-error.html\',\'_blank\')">异常监控</a></dd></dl></li><li id="system_menu2"><a href="#" class=""><img src="nbiot/styles/icons/layer03.png">智能运维</a><dl class="subMenu dropAlignL" style="display:none"><dd><a href="javascript:openWindow(\'网络接入\',\'nbiot-64-net.html\',\'_blank\')">网络接入</a></dd><dd><a href="javascript:openWindow(\'业务接入\',\'nbiot-64-bus.html\',\'_blank\')">业务接入</a></dd><dd><a href="javascript:openWindow(\'网络切换\',\'nbiot-64-swi.html\',\'_blank\')">网络切换</a></dd><dd><a href="javascript:openWindow(\'业务使用\',\'nbiot-64-use.html\',\'_blank\')">业务使用</a></dd><dd><a href="javascript:openWindow(\'承载建立\',\'nbiot-64-eps.html\',\'_blank\')">承载建立</a></dd><dd><a href="javascript:openWindow(\'质差派单\',\'nbiot-64-counter.html\',\'_blank\')">质差派单</a></dd></dl></li><li id="system_menu3"><a href="#" class=""><img src="nbiot/styles/icons/layer04.png">热点应用</a><dl class="subMenu dropAlignL" style="display:none"><dd><a href="javascript:openWindow(\'摩拜单车\',\'nbiot-mobi.html\',\'_blank\')">摩拜单车</a></dd><dd><a href="javascript:openWindow(\'安吉星\',\'nbiot-otar.html\',\'_blank\')">安吉星</a></dd><dd><a href="javascript:openWindow(\'松江燃气\',\'nbiot-gas.html\',\'_blank\')">松江燃气</a></dd></dl></li><li id="system_menu4"><a href="#" class=""><img src="nbiot/styles/icons/layer06.png">终端分析</a><dl class="subMenu dropAlignL" style="display:none"><dd><a href="javascript:openWindow(\'终端分析\',\'nbiot-terminal.html\',\'_blank\')">终端分析</a></dd></dl></li><li id="system_menu5"><a href="#" class=""><img src="nbiot/styles/icons/layer03.png">监控视图</a><dl class="subMenu dropAlignL" style="display:none"><dd><a href="javascript:openWindow(\'监控视图\',\'nbiot-perspect.html\',\'_blank\')">监控视图</a></dd></dl></li><li id="system_menu6"><a href="#" class=""><img src="nbiot/styles/icons/layer05.png">系统管理</a><dl class="subMenu dropAlignL" style="display:none"><dd><a href="javascript:openWindow(\'门限管理\',\'nbiot-limit.html\',\'_blank\')">门限管理</a></dd><dd><a href="javascript:openWindow(\'行业管理\',\'nbiot-scene.html\',\'_blank\')">行业管理</a></dd><dd><a href="javascript:openWindow(\'客户管理\',\'nbiot-custom.html\',\'_blank\')">客户管理</a></dd><dd><a href="javascript:openWindow(\'日志管理\',\'sysLogList.html\',\'_blank\')">日志管理</a></dd></dl></li></ul></div>';
	//隐藏了智能分类功能
	//var content = '<div id="menuNavWrap"><div class="NOClogoOut"><div class="moLogo">上海移动-物联网端到端分析&nbsp;&nbsp;&nbsp;&nbsp;</div></div><ul class="dropLayer"><li id="system_menu1"><a href="#" class=""><img src="static/img/icons/layer02.png">感知体系</a><dl class="subMenu dropAlignL" style="display:none"><dd><a href="javascript:openWindow(\'三步一体\',\'nbiot-sense.html\',\'_blank\')">三步一体</a></dd><dd><a href="javascript:openWindow(\'异常监控\',\'nbiot-error.html\',\'_blank\')">异常监控</a></dd></dl></li><li id="system_menu2"><a href="#" class=""><img src="static/img/icons/layer03.png">智能运维</a><dl class="subMenu dropAlignL" style="display:none"><dd><a href="javascript:openWindow(\'网络接入\',\'nbiot-64-net.html\',\'_blank\')">网络接入</a></dd><dd><a href="javascript:openWindow(\'业务接入\',\'nbiot-64-bus.html\',\'_blank\')">业务接入</a></dd><dd><a href="javascript:openWindow(\'网络切换\',\'nbiot-64-swi.html\',\'_blank\')">网络切换</a></dd><dd><a href="javascript:openWindow(\'业务使用\',\'nbiot-64-use.html\',\'_blank\')">业务使用</a></dd><dd><a href="javascript:openWindow(\'承载建立\',\'nbiot-64-eps.html\',\'_blank\')">承载建立</a></dd><dd><a href="javascript:openWindow(\'质差派单\',\'nbiot-64-counter.html\',\'_blank\')">质差派单</a></dd></dl></li><li id="system_menu3"><a href="#" class=""><img src="static/img/icons/layer04.png">热点应用</a><dl class="subMenu dropAlignL" style="display:none"><dd><a href="javascript:openWindow(\'摩拜单车\',\'nbiot-mobi.html\',\'_blank\')">摩拜单车</a></dd><dd><a href="javascript:openWindow(\'安吉星\',\'nbiot-otar.html\',\'_blank\')">安吉星</a></dd><dd><a href="javascript:openWindow(\'松江燃气\',\'nbiot-gas.html\',\'_blank\')">松江燃气</a></dd></dl></li><li id="system_menu4"><a href="#" class=""><img src="static/img/icons/layer06.png">终端分析</a><dl class="subMenu dropAlignL" style="display:none"><dd><a href="javascript:openWindow(\'终端分析\',\'nbiot-terminal.html\',\'_blank\')">终端分析</a></dd></dl></li><li id="system_menu5"><a href="#" class=""><img src="static/img/icons/layer03.png">监控视图</a><dl class="subMenu dropAlignL" style="display:none"><dd><a href="javascript:openWindow(\'总体监控\',\'perspect\',\'_blank\')">总体监控</a></dd><dd><a href="javascript:openWindow(\'客户监控\',\'monitor\',\'_blank\')">客户监控</a></dd></dl></li><li id="system_menu6"><a href="#" class=""><img src="static/img/icons/layer05.png">系统管理</a><dl class="subMenu dropAlignL" style="display:none"><dd><a href="javascript:openWindow(\'权重管理\',\'nbiot-weight.html\',\'_blank\')">权重管理</a></dd><dd><a href="javascript:openWindow(\'门限管理\',\'nbiot-limit.html\',\'_blank\')">门限管理</a></dd><dd><a href="javascript:openWindow(\'行业管理\',\'nbiot-scene.html\',\'_blank\')">行业管理</a></dd><dd><a href="javascript:openWindow(\'客户管理\',\'nbiot-custom.html\',\'_blank\')">客户管理</a></dd><dd><a href="javascript:openWindow(\'日志管理\',\'sysLogList.html\',\'_blank\')">日志管理</a></dd></dl></li></ul></div>';
	var content = '<div id="menuNavWrap"><div class="NOClogoOut"><div class="moLogo">安徽电信-端到端分析&nbsp;&nbsp;&nbsp;&nbsp;</div></div><ul class="dropLayer"><li id="system_menu1"><a href="#" class=""><img src="static/img/icons/layer02.png">感知体系</a><dl class="subMenu dropAlignL" style="display:none"><dd><a href="javascript:openWindow(\'4G端到端感知\',\'sense\',\'_blank\')">4G端到端感知</a></dd><dd><a href="javascript:openWindow(\'NB端到端感知\',\'general\',\'_blank\')">NB端到端感知</a></dd></dl></li><li id="system_menu3"><a href="#" class=""><img src="static/img/icons/layer04.png">热点应用</a><dl class="subMenu dropAlignL" style="display:none"><dd><a href="javascript:openWindow(\'煤气管道\',\'gas\',\'_blank\')">煤气管道</a></dd></dl></li><li id="system_menu4"><a href="#" class=""><img src="static/img/icons/layer06.png">终端分析</a><dl class="subMenu dropAlignL" style="display:none"><dd><a href="javascript:openWindow(\'终端分析\',\'terminal\',\'_blank\')">终端分析</a></dd></dl></li><li id="system_menu5"><a href="#" class=""><img src="static/img/icons/layer03.png">监控视图</a><dl class="subMenu dropAlignL" style="display:none"><dd><a href="javascript:openWindow(\'总体监控\',\'perspect\',\'_blank\')">总体监控</a></dd><dd><a href="javascript:openWindow(\'客户监控\',\'monitor\',\'_blank\')">客户监控</a></dd></dl></li></ul></div>';
	document.write(content);
}
function initTopQuery(title) {
	//TODO 临时版本
	//document.write('<a id="dimension">'+title+'</a><label>日期</label><input type="text" id="startDatetimepicker_h" class="J-SDATE" value="'+GetDate(-1)+'" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd HH:00:00\',onpicked:function(){initQueryInfo(-1);}})" /><label style="display:none;">行业属性</label><select  style="display:none;" onchange="initQueryInfo(0);" class="J-ISKNOW"><option value="1">行业分类</option><option value="0">机器分类</option></select><label style="display:none;">地区</label><select  style="display:none;" onchange="initQueryInfo(1);" style="width: 145px;" class="J-AREA"></select><label style="display:none;">分类</label><select  style="display:none;" onchange="initQueryInfo(2);" style="width: 145px;" class="J-CATEGORY"><option value="0">请选择</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select><label>行业</label><select onchange="initQueryInfo(2);" style="width: 145px;" class="J-SCENE"></select><span style="display:none;"><label>客户</label><select onchange="initQueryInfo(3);" id="u44_input" class="J-CUSTOM"></select><label>APN</label><select onchange="initQueryInfo(4);" class="J-APN"></select></span>');
	//完整版本
	//document.write('<a id="dimension">'+title+'</a><label>日期</label><input type="text" id="startDatetimepicker_h" class="J-SDATE" value="'+GetDate(-1)+'" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd HH:00:00\',onpicked:function(){initQueryInfo(-1);}})" /><label>属性</label><select  onchange="initQueryInfo(0);" class="J-ISKNOW"><option value="1">行业分类</option><option value="0">机器分类</option></select><label>地区</label><select  onchange="initQueryInfo(1);" style="width: 145px;" class="J-AREA"></select><label>分类</label><select  onchange="initQueryInfo(2);" style="width: 145px;" class="J-CATEGORY"><option value="0">请选择</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select><label>行业</label><select onchange="initQueryInfo(2);" style="width: 145px;" class="J-SCENE"></select><span><label>客户</label><select onchange="initQueryInfo(3);" id="u44_input" class="J-CUSTOM"></select><label>APN</label><select onchange="initQueryInfo(4);" class="J-APN"></select></span>');
	//隐藏了地区和APN
	//document.write('<a id="dimension">'+title+'</a><label>日期</label><input type="text" id="startDatetimepicker_h" class="J-SDATE" value="'+GetDate(-1)+'" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd HH:00:00\',onpicked:function(){initQueryInfo(-1);}})" /><label>属性</label><select  onchange="initQueryInfo(0);" class="J-ISKNOW"><option value="1">行业分类</option><option value="0">机器分类</option></select><label style="display:none;">地区</label><select   style="display:none;" onchange="initQueryInfo(1);" style="width: 145px;" class="J-AREA"></select><label>分类</label><select  onchange="initQueryInfo(2);" style="width: 145px;" class="J-CATEGORY"><option value="0">请选择</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select><label>行业</label><select onchange="initQueryInfo(2);" style="width: 145px;" class="J-SCENE"></select><span><label>客户</label><select onchange="initQueryInfo(3);" id="u44_input" class="J-CUSTOM" disabled style="border:1px solid #8a8a8a;color:#8a8a8a"></select></span>');
	//隐藏了未知分类10-12
	document.write('<a id="dimension">'+title+'</a><label>日期</label><input type="text" id="startDatetimepicker_h" class="J-SDATE" value="'+GetDate(-1)+'" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd HH:00:00\',onpicked:function(){initQueryInfo(-1);}})" /><label>属性</label><select  onchange="initQueryInfo(0);" class="J-ISKNOW"><option value="1">行业分类</option><option value="0">机器分类</option></select><label style="display:none;">地区</label><select   style="display:none;" onchange="initQueryInfo(1);" style="width: 145px;" class="J-AREA"></select><label>分类</label><select  onchange="initQueryInfo(2);" style="width: 145px;" class="J-CATEGORY"><option value="0">请选择</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><label>行业</label><select onchange="initQueryInfo(2);" style="width: 145px;" class="J-SCENE"></select><span><label>客户</label><select onchange="initQueryInfo(3);" id="u44_input" class="J-CUSTOM" disabled style="border:1px solid #8a8a8a;color:#8a8a8a"></select></span>');
}




//专题专用
function initTopQueryForSpatil(title){
	if(title=="质差派单"){
		document.write('<a id="dimension" style="margin-right:2%">'+title+'</a>');
	}else if(title=="摩拜单车分析"||title=="松江燃气分析"||title=="异常分析"||title=="异常分析2"){
		document.write('<a id="dimension" style="margin-right:2%">'+title+'</a><label>日期</label><input type="text" id="startDatetimepicker_h" class="J-SDATE" value="'+GetDate(-1)+'" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd HH:00:00\',onpicked:function(){initQueryInfo(-1);}})"/>');
	}else if(title=="总体监控"){
		document.write('<a id="dimension" style="margin-right:2%">'+title+'</a><label>日期</label><input type="text" id="startDatetimepicker_h" class="J-SDATE" value="'+GetDate(-1)+'" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd HH:00:00\',onpicked:function(){initQueryInfo(-1);}})"/>');
	}else if(title=="客户监控"){
		document.write('<a id="dimension" style="margin-right:2%">'+title+'</a><label>日期</label><input type="text" id="startDatetimepicker_h" class="J-SDATE" value="'+GetDayDate(-1)+'" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd\',onpicked:function(){initQueryInfo(-1);}})"/>');
	}else{
		document.write('<a id="dimension" style="margin-right:2%">'+title+'</a><label>日期</label><input type="text" id="startDatetimepicker_h" class="J-SDATE" value="'+GetDate(-1)+'" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd HH:00:00\',onpicked:function(){initQueryInfo(-1);}})"/><label>省市</label><select onchange="initQueryInfo(1);" style="width: 145px;" class="J-CITY"><option value="上海">上海</option><option value="全国">全国</option></select>');
	}
}
var CounterData;
//详单样式数据
function getDetailContent(detailData,type,neName){
	if(type==0){
		return '<div><img class="_ico_exp" data="1" src="static/img/excel.png" /><table class="tablesorter tableLowTh" id="64-detail-table">'+detailData+'</table></div>';
	}else{
		var html = detailData['HTML'];
		//派单只排无线
		if(neName=='ENB_NENAME'){
			CounterData = detailData;
			delete CounterData["HTML"];
			return '<div id="loading-cause-detail"><div class="loading-cause-detail-s1"><div style="width:60%"><p style="margin-top:12%">故障原因代码:<span>'+replaceNull(detailData['S1AP_RESPONSE_CODE'])+'</span></p><p>故障原因解释:<span>'+replaceNull(detailData['S1AP_DESC'])+'</span></p></div><div style="width:40%"><table class="tablesorter tableLowTh" id="loading-cause-table"><thead><tr><th>网元名称</th><th>错误次数</th></tr></thead><tbody>'+replaceNull(html)+'</tbody></table></div></div><div class="loading-cause-detail-s2"><p>排查故障建议:<span>'+replaceNull(detailData['SCENE_DESC'])+'</span></p></div><div class="loading-cause-detail-s3"><a href="javascript:createCounter();" class="greenA" style="margin-right:20px;line-height: 10px;">生成工单</a><a href="nbiot-64-counter.html" class="greenA" style="margin-right:20px;line-height: 10px;">查看工单</a></div></div>';
		}else{
			return '<div id="loading-cause-detail"><div class="loading-cause-detail-s1"><div style="width:60%"><p style="margin-top:12%">故障原因代码:<span>'+replaceNull(detailData['S1AP_RESPONSE_CODE'])+'</span></p><p>故障原因解释:<span>'+replaceNull(detailData['S1AP_DESC'])+'</span></p></div><div style="width:40%"><table class="tablesorter tableLowTh" id="loading-cause-table"><thead><tr><th>网元名称</th><th>错误次数</th></tr></thead><tbody>'+replaceNull(html)+'</tbody></table></div></div><div class="loading-cause-detail-s2"><p>排查故障建议:<span>'+replaceNull(detailData['SCENE_DESC'])+'</span></p></div><div class="loading-cause-detail-s3"><a href="javascript:;" class="greenA" style="margin-right:20px;line-height: 10px;    text-decoration: none!important;color: gray!important;">生成工单</a></div></div>';
		}
	}
}

function createCounter(){
	var sdate = $(".J-SDATE").val();
	var isknow = $(".J-ISKNOW").val();
	var area = $(".J-AREA").val();
	var category = $(".J-AREA").val();
	var scene = $(".J-SCENE").val();
	var custom = $(".J-CUSTOM").val();
	/*nbiotService.createCounter(func_index,CounterData['FAILURE_CAUSE'],CounterData['PROCEDURE_TYPE'],sdate,isknow,area,category,scene,custom,function(data) {
        layer.alert(data.ERROR_INFO);
    });*/
	
	$.get("/nbiot/public/createCounter", {
		"func_index":func_index,
		"reqCause":CounterData['FAILURE_CAUSE'],
		"procedureType":CounterData['PROCEDURE_TYPE'],
		"sdate":sdate,
		"isknow":isknow,
		"area":area,
		"category":category,
		"scene":scene,
		"custom":custom
		},
		function(data){
			layer.alert(data.ERROR_INFO);
		},
	"json");
}

/**
 * 左边TOP EPC ENB SGW等下钻
 * @param neName 网元标识
 * @param neValue 网元值
 */
function initTopNeDetail(neName,neValue){
	if(func_index==null||func_index==4){
		return;
	}
	var sdate = $(".J-SDATE").val();
	var isknow = $(".J-ISKNOW").val();
	var city = $(".J-CITY").val();
	var area = $(".J-AREA").val();
	var category = $(".J-AREA").val();
	var scene = $(".J-SCENE").val();
	var custom = $(".J-CUSTOM").val();
	var loading = layer.load(2);
	//nbiotService.initTopNeDetail(func_index,neName,neValue,sdate,isknow, area,category, scene, custom,
	$.get("/nbiot/public/initTopNeDetail", {
		"func_index":func_index,
		"neName":neName,
		"neValue":neValue,
		"sdate":sdate,
		"isknow":isknow,
		"area":area,
		"category":category,
		"scene":scene,
		"custom":custom
		},function(data){
			layer.close(loading);
			if(data==null || data.length==0){
				layer.msg("暂无数据");
				return;
			}
			var head = "<thead><tr>";
			var body = "<tbody>";
			$.each(data, function(i) {
				body += "<tr>";
				$.each(data[i], function(k, v) {
					if (i == 0) {
	//					if(k!='FAILURE_CAUSE'){
	//					}
						head += "<th>" + k + "</th>";
					}
					if(k=='错误原因值'){
						body += "<td><a href='javascript:initCauseDetail(\""+neName+"\",\""+data[i]['FAILURE_CAUSE']+"\",\""+data[i]['PROCEDURE_TYPE']+"\");' class='greenA'>" + replaceNull(v) + "</a></td>";
					}else if(k=='失败次数'){
						var NENM,NEVN;
						if(data[i]['MME IP']){
							NENM = "MME_IP";
							NEVN = data[i]['MME IP'];
						}else if(data[i]['ENB IP']){
							NENM = "ENB_IP";
							NEVN = data[i]['ENB IP'];
						}else if(data[i]['SGW IP']){
							NENM = "SGW_IP";
							NEVN = data[i]['SGW IP'];
						}else if(data[i]['APP_IP_DOT']){
							NENM = "APP_IP_DOT";
							NEVN = data[i]['APP_IP_DOT'];
						}
						body += "<td><a href='javascript:initFailCount(\""+NENM+"\",\""+NEVN+"\",\""+data[i]['FAILURE_CAUSE']+"\",\""+data[i]['PROCEDURE_TYPE']+"\");' class='greenA'>" + replaceNull(v) + "</a></td>";
					} else{
						//cause用来下钻不用显示
	//					if(k!='FAILURE_CAUSE'){
	//					}
						body += '<td>'+replaceNull(v)+'</td>';
					}
				});
				body += '</tr>';
			});
			head += "</tr></thead>";
			body += "</tbody>";
			layer.open({
				title: false, //不显示标题
				type: 1,
				area: ['90%', '70%'],
				skin: 'demo-class', //样式类名
				closeBtn: 1,
				shift: 2,
				shadeClose: true,
				content: getDetailContent(head+body,0,neName)
			});
			layer.close(loading);
	});
}

/**
 * 错误原因值下钻 弹出定界TOP网元
 * @param htmlId
 * @param neName
 * @param reqCause
 */
function initCauseDetail(neName,reqCause,procedureType){
	if(func_index==null||func_index==4){
		return;
	}
	var sdate = $(".J-SDATE").val();
	var isknow = $(".J-ISKNOW").val();
	var city = $(".J-CITY").val();
	var area = $(".J-AREA").val();
	var category = $(".J-AREA").val();
	var scene = $(".J-SCENE").val();
	var custom = $(".J-CUSTOM").val();
	var loading = layer.load(2);
	var html="";
	//nbiotService.initCauseDetail(func_index,neName,reqCause,procedureType,sdate,isknow,area,category,scene,custom,
	$.get("/nbiot/public/initCauseDetail", {
		"func_index":func_index,
		"neName":neName,
		"reqCause":reqCause,
		"procedureType":procedureType,
		"sdate":sdate,
		"isknow":isknow,
		"area":area,
		"category":category,
		"scene":scene,
		"custom":custom
		},function(data){
		layer.close(loading);
		if(data==null || data.length==0){
			layer.msg("暂无数据");
			return;
		}
		var detailData = data[0];
		$.each(data,function(i){
			if(i<=2){
				html+="<tr>";
				$.each(data[i],function(k,v){
					if(k=='COUNTS'){
						var NEMN,NEVN;
						if(data[i]['MME_IP']){
							NEMN = "MME_IP";
							NEVN = data[i]['MME_IP'];
						}else if(data[i]['ENB_IP']){
							NEMN = "ENB_IP";
							NEVN = data[i]['ENB_IP'];
						}else if(data[i]['SGW_IP']){
							NEMN = "SGW_IP";
							NEVN = data[i]['SGW_IP'];
						}else if(data[i]['APP_IP_DOT']){
							NEMN = "APP_IP_DOT";
							NEVN = data[i]['APP_IP_DOT'];
						}else if(data[i]['TAC_ID']){
							NEMN = "TAC_ID";
							NEVN = data[i]['TAC_ID'];
						}
						html+="<td><a href='javascript:initFailCount(\""+NEMN+"\",\""+NEVN+"\",\""+data[i]['FAILURE_CAUSE']+"\",\""+data[i]['PROCEDURE_TYPE']+"\");' class='greenA'>" + replaceNull(v) + "</a></td>";
					}else{
						if(k=='ENB_NENAME' || k=='MME_NENAME' || k=='SGW_NENAME' || k=='TAC_ID' || k=='APP_IP_DOT'){
							html+="<td>"+replaceNull(v)+"</td>";
						}
					}
				});
				html+="</tr>";
			}
		});
		layer.close(loading);
		$("#loading-cause-table tbody").html(html);
		if(html)
		detailData['HTML'] = html;
		layer.open({
			title: false, //不显示标题
			type: 1,
			area: ['auto', 'auto'],
			skin: 'demo-class', //样式类名
			closeBtn: 1,
			shift: 2,
			shadeClose: true,
			content: getDetailContent(detailData,1,neName)
		});
	});
}

/**
 * 失败次数下钻
 * @param target
 * @param requestCause
 */
function initFailCount(neName,neValue,reqCause,procedureType){
	var sdate = $(".J-SDATE").val();
	var city = $(".J-CITY").val();
	var isknow = $(".J-ISKNOW").val();
	var area = $(".J-AREA").val();
	var category = $(".J-CATEGORY").val();
	var scene = $(".J-SCENE").val();
	var custom = $(".J-CUSTOM").val();
	var loading = layer.load(2);
	//nbiotService.initFailCount(func_index,neName,neValue,reqCause,procedureType,sdate,city,isknow,area,category,scene,custom,
	$.get("/nbiot/public/initFailCount", {
		"func_index":func_index,
		"neName":neName,
		"neValue":neValue,
		"reqCause":reqCause,
		"procedureType":procedureType,
		"sdate":sdate,
		"city":city,
		"isknow":isknow,
		"area":area,
		"category":category,
		"scene":scene,
		"custom":custom
		},function(data){
		layer.close(loading);
		if(data==null || data.length==0){
			layer.msg("暂无数据");
			return;
		}
		var html = "";
		var head = "<thead><tr>";
		var body = "<tbody>";
		$.each(data, function(i) {
			body += "<tr>";
			$.each(data[i], function(k, v) {
				if (i == 0) {
					head += "<th>" + k + "</th>";
				}
				if(k=='IMSI' || k=='MSISDN'){
					body += '<td>'+setxxxxnumber(v)+'</td>';
				}else{
					body += '<td>'+replaceNull(v)+'</td>';
				}
			});
			body += '<td><a href="javascript:queryMt(\''+data[i].SDATE+'\',\''+data[i].IMSI+'\');" class="greenA">信令回溯</a></td></tr>';
		});
		head += "<th>&nbsp;</th></tr></thead>";
		body += "</tbody>";
		layer.open({
			title: false, //不显示标题
			type: 1,
			area: ['90%', '70%'],
			skin: 'demo-class', //样式类名
			closeBtn: 1,
			shift: 2,
			shadeClose: true,
			content: getDetailContent(head+body,0,neName)
		});
	
	});
}

/**
 * 饼图下钻
 * @param target
 * @param htmlId
 * @param cause
 */
function initPieClick(htmlId,cause,procedureType){
	var neName;
	if(htmlId=="nbiot-core-sprd"){
		neName = "MME_NENAME";
	}
	else if(htmlId=="nbiot-wireless-sprd"){
		neName = "ENB_NENAME";
	}
	else if(htmlId=="nbiot-userter-sprd"){
		neName = "TAC_ID";
	}
	else if(htmlId=="nbiot-transfer-sprd"){
		neName = "APP_IP_DOT";
	}
	else{
		return;
	}
	initCauseDetail(neName,cause,procedureType);
}

function queryMt(sdate,imsi){
	var end = calcuTime(sdate,'+',3)
	window.open("http://10.221.244.146:8080/extjs/mt.jsp?imsi="+imsi+"&msisdn=&st="+sdate+"&end="+end,"_blank"); 
}

/**
 * type -1 时间切换 0 是否已知 1区域切换 2行业切换 3客户切换 4 APN切换
 * @param changeType
 */
function initQueryInfo(type) {
    var sdate = $(".J-SDATE").val();
    var isknow = $(".J-ISKNOW").val();
    var city = $(".J-CITY").val();
    var area = $(".J-AREA").val();
    var category = $(".J-CATEGORY").val();
    var scene = $(".J-SCENE").val();
    var custom = $(".J-CUSTOM").val();
    if(type==4){
    		custom = $(".J-APN").val();
    }
    window.location.href = window.location.href.split("?")[0]+"?type="+type+"&isknow="+isknow+"&city="+city+"&area="+area+"&category="+category+"&sdate="+sdate+"&scene="+scene+"&custom="+custom;
}

function loadData(){
	$("#subTable1").attr("data",0);
	$(".switch-tab-table").eq(0).addClass("active");
	var type = GetQueryString("type"); //0
	var isknow=GetQueryString("isknow");//1
    var sdate = GetQueryString("sdate");//2
    //var sdate = $(".J-SDATE").val();//2
    var city = GetQueryString("city");//3
    var area = GetQueryString("area");//4
    var category = GetQueryString("category");//5
    var scene = GetQueryString("scene");//6
    var custom = GetQueryString("custom");//7
    var apn = $(".J-APN").val();//7
    $(".J-SDATE").val(sdate);
    $(".J-ISKNOW").val(isknow);
    $(".J-CITY").val(city);
    if((scene == undefined || scene == "undefined") && (custom == undefined || custom == "undefined")){
	    	scene = 0;
	    	custom = 0;
    }
    //nbiotService.initQueryInfo(type,category,scene,custom,apn
    $.get("/nbiot/sense/initQueryInfo", {
		"type":type,
		"category":category,
		"scene":scene,
		"custom":custom,
		"apn":apn
		},function(data) {
    		var area_list = data.AREA_LIST
    		var sce_list = data.SCENE_LIST;
        var cus_list = data.CUSTOM_LIST;
        var options = "<option value='0'>请选择</option>";
        var clazz = "";
        if (area_list && area_list.length > 0) {
            $.each(area_list,function(i) {
                if (area == area_list[i]['AREA']) {
                    clazz = "selected";
                } else {
                    clazz = "";
                }
                options += "<option value='" + area_list[i]['AREA'] + "' " + clazz + ">" + area_list[i]['AREA'] + "</option>";
            });
        }
        $(".J-AREA").html(options);
        
        //category
        $(".J-CATEGORY").val(category);
        
        options = "<option value='0'>请选择</option>";
        clazz = "";
        if (sce_list && sce_list.length > 0) {
            $.each(sce_list,function(i) {
                if (scene == sce_list[i]['C_SCENEID']) {
                    clazz = "selected";
                } else {
                    clazz = "";
                }
                options += "<option value='" + sce_list[i]['C_SCENEID'] + "' " + clazz + ">" + sce_list[i]['C_SCENE_NAME'] + "</option>";
            });
        }
        $(".J-SCENE").html(options);
        options = "<option value='0'>请选择</option>",
        clazz = "";
        if (cus_list && cus_list.length > 0) {
            $.each(cus_list,function(i) {
                if (custom == cus_list[i]['C_CUSTOMID']) {
                    clazz = "selected";
                } else {
                    clazz = "";
                }
                options += "<option value='" + cus_list[i]['C_CUSTOMID'] + "' " + clazz + ">" + cus_list[i]['C_CUSTOM_NAME'] + "</option>";
            });
        }
        $(".J-CUSTOM").html(options);
        options = "<option value='0'>请选择</option>",
        clazz = "";
        if (cus_list && cus_list.length > 0) {
            $.each(cus_list,function(i) {
                if (custom == cus_list[i]['C_CUSTOMID']) {
                    clazz = "selected";
                } else {
                    clazz = "";
                }
                options += "<option value='" + cus_list[i]['C_CUSTOMID'] + "' " + clazz + ">" + cus_list[i]['C_CUSTOM_APN'] + "</option>";
            });
        }
        $(".J-APN").html(options);
        if(scene!='0' && scene!='undefined' && scene!=''){
        		$(".J-CUSTOM").removeAttr("disabled");
        		$(".J-CUSTOM").css({'color':'#f5f5f5','border':'1px solid #ccc'});
        }
        //initPageData(type,sdate, isknow, city, area,category, scene, custom, apn);
    },"json");
}

function clearDataTable(target){
	if(target){
		target.fnClearTable(); //清空一下table
		target.fnDestroy(); //还原初始化了的datatable
	}
}

function createDataTable(htmlId){
	if($('#'+htmlId).html()==""||$('#'+htmlId+' tbody').html()==""){
		return null;
	}
	var dts = $('#'+htmlId).dataTable({
		"paging": false,
		"info": false,
		"searching": false,
		"iDisplayLength":25,
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

function createTable(data, htmlId) {
	$("#"+htmlId).html("");
    if (data != null && data.length > 0) {
    	if(htmlId == 'sense-detail-table' || htmlId == 'sense-scene-detail-table'){
    		var head = "<thead><tr>";
    		var body = "<tbody>";
    		var paramScene,paramCustom;
			$.each(data, function(i) {
				body += "<tr>";
				$.each(data[i], function(k, v) {
					if (i == 0) {
						head += "<th>" + k + "</th>";
					}
					if(k=='行业编号'){
						paramScene = v;
					}
					if(k=='集团编号'){
						paramCustom = v;
					}
					if(k=='物联网行业'){
						//TODO 临时版本
						body += "<td><a href='javascript:initSubDetail(\""+paramScene+"\");' class='greenA'>" + replaceNull(v) + "</a></td>";
//						body += "<td>" + replaceNull(v) + "</td>";
					}else if(k=='状况'){
						if(v=='优'){
							body += '<td><font color="#46FD0D">'+replaceNull(v)+'</font></td>';
						}else
						if(v=='良'){
							body += '<td><font color="#F9EB32">'+replaceNull(v)+'</font></td>';
						}else
						if(v=='差'){
							body += '<td><font color="#F90A1E">'+replaceNull(v)+'</font></td>';
						}else{
							body += '<td>'+replaceNull(v)+'</td>';
						}
					}else{
						body += '<td>'+replaceNull(v)+'</td>';
					}
				});
				paramScene = paramScene==null?"0":paramScene;
				paramCustom = paramCustom==null?"0":paramCustom;
				
				var drill = "";
				if(parentType=='0'){
					drill = '<td><a href="javascript:;" onclick="window.open(\'nbiot-64-bus.html?sdate='+$(".J-SDATE").val()+'&isknow='+$(".J-ISKNOW").val()+'&area='+$(".J-AREA").val()+'&scene='+paramScene+'&custom='+paramCustom+'\',\'_blank\')" class="greenA">分析</a></td>';
				}
				if(parentType=='1'){
					drill = '<td><a href="javascript:;" onclick="window.open(\'nbiot-64-net.html?sdate='+$(".J-SDATE").val()+'&isknow='+$(".J-ISKNOW").val()+'&area='+$(".J-AREA").val()+'&scene='+paramScene+'&custom='+paramCustom+'\',\'_blank\')" class="greenA">分析</a></td>';
				}
				if(parentType=='2'){
					drill = '<td><a href="javascript:;" onclick="window.open(\'nbiot-64-eps.html?sdate='+$(".J-SDATE").val()+'&isknow='+$(".J-ISKNOW").val()+'&area='+$(".J-AREA").val()+'&scene='+paramScene+'&custom='+paramCustom+'\',\'_blank\')" class="greenA">分析</a></td>';
				}
				if(parentType=='3'){
					drill = '<td><a href="javascript:;" onclick="window.open(\'nbiot-64-swi.html?sdate='+$(".J-SDATE").val()+'&isknow='+$(".J-ISKNOW").val()+'&area='+$(".J-AREA").val()+'&scene='+paramScene+'&custom='+paramCustom+'\',\'_blank\')" class="greenA">分析</a></td>';
				}
				body += drill+'</tr>';
			});
    		head += "<th>&nbsp;</th></tr><</thead>";
    		body += "</tbody>";
    		$("#" + htmlId).html(head + body);
    	}else{
    		var body = "";
            if (htmlId == "subTable2-tbody") {
                var map = getHashTable(data,'TYPE',htmlId);
                var $keys = map.keySet();
                var NENM;
                $.each($keys,function(i) {
                    var $values = map.get($keys[i]);
                    $.each($values,function(j) {
                        body += "<tr>";
                        var $d = $values[j];
                        $.each($d,function(k, v) {
                            if ((k == 'TYPE' || k=='TYPE_PER') && j == 0) {
                            	 if(k=='TYPE_PER'){
                            		 body += "<td rowspan=" + $values.length + ">" + replaceNull(v) + "%</td>";
                            	 }else{
                            		 body += "<td rowspan=" + $values.length + ">" + replaceNull(v) + "</td>";
                            	 }
                                
                            } else if (k != 'TYPE' && k!='TYPE_PER') {
	                            	if(k=='S1AP_RESPONSE_CODE' && $d['TYPE']!="传输"){
	                            		if($d['TYPE']=='核心网' || $d['TYPE']=='应用服务器问题'){
	                            			NENM = 'MME_NENAME';
	                            		}
	                            		if($d['TYPE']=='无线'){
	                            			NENM = 'ENB_NENAME';
	                            		}
	                            		if($d['TYPE']=='用户及终端'){
	                            			NENM = 'TAC_ID';
	                            		}
	                            		if($d['TYPE']=='应用服务端'){
	                            			NENM = 'APP_IP_DOT';
	                            		}
	                            		body += "<td><a href='javascript:initCauseDetail(\""+NENM+"\",\""+$d['FAILURE_CAUSE']+"\",\""+$d['PROCEDURE_TYPE']+"\");' class='greenA'>" + replaceNull(v) + "</a></td>";
	                            	}
	                            	else if(k=='CT' && $d['TYPE']!="传输"){
	                            		body += "<td><a href='javascript:initFailCount(\"\",\"\",\""+$d['FAILURE_CAUSE']+"\",\""+$d['PROCEDURE_TYPE']+"\");' class='greenA'>" + replaceNull(v) + "</a></td>";
	                            	}
	                            	else{
	                            		if(k!='FAILURE_CAUSE' && k!='PROCEDURE_TYPE'){
	                            			if(k=='PER'){
				                        	 	body += "<td>" + replaceNull(v) + "%</td>";
				                         }else{
				                        	 	body += "<td>" + replaceNull(v) + "</td>";
				                         }
	                            		}
	                            	}
                            }
                        });
                        body += "</tr>";
                    });
                });
            }else if(htmlId == "nbiot-mobi-subTable3-tbody"||htmlId == "nbiot-gas-subTable3-tbody"){
                $.each(data,function(i) {
                    body += "<tr>";
                    $.each(data[i],function(k, v) {
                    		if(k=='WIRELESSNAME'){
                    			body += "<td><a class='greenA' href='javascript:openGis(\"cigisFrame\","+data[i].LONGITUDE+","+data[i].LATITUDE+");'>" + replaceNull(v) + "</td>";
//                    			body += "<td><a class='greenA' href='javascript:openGis(\"cigisFrame\",121.430411,30.803041);'>" + replaceNull(v) + "</td>";
                    		}else{
                    			if(k!='LONGITUDE' && k!='LATITUDE'){
                        			body += "<td>" + replaceNull(v) + "</td>";
                    			}
                    		}
                    });
                    body += "</tr>";
                });
            } else {
                $.each(data,function(i) {
                    body += "<tr>";
                    $.each(data[i],function(k, v) {
                    	//k=="SGW_NENAME"
                    	if(k=="SGW_NENAME"){
                    		body += "<td style='text-align:left'>" + replaceNull(v) + "</td>";
                    	}
                    	else if((k=='ENB_NENAME' || k=="MME_NENAME" || k=="APP_IP_DOT") && func_index!=4){
                    		body += "<td style='text-align:left'><a href='javascript:initTopNeDetail(\""+k+"\",\""+v+"\");' class='greenA'>" + replaceNull(v) + "</a></td>";
                    	}else{
                    		//k=="SGW_NENAME"
                    		if(k=='ENB_NENAME' || k=="MME_NENAME" || k=="APP_IP_DOT"){
                    			body += "<td style='text-align:left'>" + replaceNull(v) + "</td>";
                    		}else{
                    			if(k=='SGW_NENAME' || (k=='ENB_NENAME' && func_index==4) || (k=='SGW_NENAME' && func_index==4)){
                        			body += "<td style='text-align:left'>" + replaceNull(v) + "</td>";
                    			}else{
                    				//body += "<td style='text-align:right'>" + replaceNull(v) + "</td>";
                    				if(htmlId=='nbiot-otar-category-table' && k=='业务类型'){
                    					body += "<td style='text-align:left'>" + replaceNull(v) + "</td>";
                    				}else{
                    					body += "<td>" + replaceNull(v) + "</td>";
                    				}
                    			}
                    		}
                    	}
                    });
                    body += "</tr>";
                });
            }
            $("#" + htmlId).html(body);
    	}
    }
}
/**
 * 创建echarts图表
 * @param type
 * @param options
 * @returns
 */

function createEcharts(type,options){
	var option = [];
	var myChart = echarts.init(document.getElementById(options.htmlId));
	//仪表盘
	if(type==0){
		 option = {
			    tooltip : {
			        formatter: "{a} <br/>{c}"
			    },
			    toolbox: {
			        show : false,
			        feature : {
			            mark : {show: true},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    series : [
			        {
			            name:options.title,
			            type:'gauge',
			            min:options.limit.min,
			            max:100,
			            splitNumber:5,
//			            calculable:true,
			            radius: '80%',
			            axisLine: {            // 坐标轴线
			                lineStyle: {       // 属性lineStyle控制线条样式
			                    //color: [[Math.floor(options.limit.min)/100, '#d7e5f3'],[Math.floor(options.limit.center)/100, '#ff4500'],[Math.floor(options.limit.max)/100, '#1e90ff'],[1.00, 'lime']],
//			                	   color: [[(100-options.limit.center+(Math.abs(options.serise[0]-options.limit.min)))/100, '#ff4500'],[(options.limit.max-(Math.abs(options.serise[0]-options.limit.min)))/100, '#1e90ff'],[1.00, 'lime']],
			                	   color: [[(options.limit.center-options.limit.min)/(100-options.limit.min), '#ff4500'],[(options.limit.max-options.limit.min)/(100-options.limit.min), '#1e90ff'],[1.00, 'lime']],
//			                	   color: [[0.7, '#ff4500'],[0.85, '#1e90ff'],[1.00, 'lime']],
			                	 	width: 4,
			                    shadowColor : '#f5f5f5', //默认透明
			                    shadowBlur: 20
			                }
			            },
			            axisLabel: {            // 坐标轴小标记
			                textStyle: {       // 属性lineStyle控制线条样式
			                    //fontWeight: 'bolder',
			                    color: '#f5f5f5',
			                    shadowColor : '#f5f5f5', //默认透明
			                    shadowBlur: 10
			                }
			            },
			            axisTick: {            // 坐标轴小标记
			                length :10,        // 属性length控制线长
			                lineStyle: {       // 属性lineStyle控制线条样式
			                    color: 'auto',
			                    shadowColor : '#f5f5f5', //默认透明
			                    shadowBlur: 20
			                }
			            },
			            splitLine: {           // 分隔线
			                length :13,         // 属性length控制线长
			                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
			                    width:2,
			                    color: '#f5f5f5',
			                    shadowColor : '#f5f5f5', //默认透明
			                    shadowBlur: 10
			                }
			            },
			            pointer: {           // 分隔线
			                shadowColor : '#f5f5f5', //默认透明
			                shadowBlur: 5
			            },
			            title : {
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    fontSize: 12,
			                    color: '#f5f5f5',
			                    shadowColor : '#f5f5f5', //默认透明
			                    shadowBlur: 10
			                }
			            },
			            detail : {
			                /*backgroundColor: 'rgba(30,144,255,0.1)',
			                //borderWidth: 1,
			                borderColor: '#f5f5f5',
			                fontSize:13,
			                shadowColor : '#f5f5f5', //默认透明
			                shadowBlur: 5,*/
			                //offsetCenter: [0, '70%'],       // x, y，单位px
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                	fontSize:24
			                }
			            },
			            data:options.serise
			        }
			    ]
			};
	}
	
	// 环形图
	if(type==1){
		option = {
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			    		show:false,
			        orient : 'vertical',
			        x : 'left'
			    },
			    calculable : false,
			    color: ['#008db4','#53b52e','#ef581f','#dce301','#24c8e1','#65e473','#ff954e','#ffee60','#4F94CD'],
		            series : [
			        {
			            name:options.seriesName,
			            type:'pie',
			            radius : [30, 50],
			            data:options.seriesData
			        }
			    ]
			};
			                    
	}
	//面积图
	if(type==2){
		option = {
			    title : {
			        text: '',
			        subtext: '纯属虚构'
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['意向','预购','成交']
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : ['周一','周二','周三','周四','周五','周六','周日']
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : [
			        {
			            name:'成交',
			            type:'line',
			            smooth:true,
			            itemStyle: {normal: {areaStyle: {type: 'default'}}},
			            data:[10, 12, 21, 54, 260, 830, 710]
			        },
			        {
			            name:'预购',
			            type:'line',
			            smooth:true,
			            itemStyle: {normal: {areaStyle: {type: 'default'}}},
			            data:[30, 182, 434, 791, 390, 30, 10]
			        },
			        {
			            name:'意向',
			            type:'line',
			            smooth:true,
			            itemStyle: {normal: {areaStyle: {type: 'default'}}},
			            data:[1320, 1132, 601, 234, 120, 90, 20]
			        }
			    ]
			};
	}
	
	//柱状图
	if(type==3){
		option = {
			    title : {
			        text: '',
			        subtext: '纯属虚构'
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['蒸发量','降水量']
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            magicType : {show: true, type: ['line', 'bar']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : [
			        {
			            name:'蒸发量',
			            type:'bar',
			            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
			            markPoint : {
			                data : [
			                    {type : 'max', name: '最大值'},
			                    {type : 'min', name: '最小值'}
			                ]
			            },
			            markLine : {
			                data : [
			                    {type : 'average', name: '平均值'}
			                ]
			            }
			        },
			        {
			            name:'降水量',
			            type:'bar',
			            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
			            markPoint : {
			                data : [
			                    {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
			                    {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
			                ]
			            },
			            markLine : {
			                data : [
			                    {type : 'average', name : '平均值'}
			                ]
			            }
			        }
			    ]
			};
			                    
	}
	
	//饼图
	if(type==4){
		option = {
			    tooltip: {
			        trigger: 'item',
			        formatter: "{a} <br/>{b}: {c} ({d}%)"
			    },
			    color: options.colors,
			    legend: {
			        type: 'scroll',
			        backgroundColor: 'rgb(87, 115, 148)',
			        bottom: 0,
			        data: options.legendData,
			        textStyle:{
			        		color : '#f5f5f5'
			        }
			    },
			    series: [
			        {
			            name:options.seriesName,
			            type:'pie',
			            radius: ['40%', '60%'],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: true,
			                    position: 'center',
			                    textStyle: {
			                        fontSize: '16',
			                        fontWeight: 'bold',
			                        color:'#ECA000;'
			                    },
			                    formatter:function(){
			                    		return options.centerText
			                    }
			                },
			                emphasis: {
			                    show: false,
			                    textStyle: {
			                        fontSize: '16',
			                        fontWeight: 'bold'
			                    }
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data:options.seriesData
			        }
			    ]
			};

	}
	
    myChart.setOption(option);
}

/**
 * 加载创建图表
 * @param category 横轴
 * @param serise 数值
 * @param limit 门限
 * @param type  类型 0 柱状图 1 线图 4 饼图 6 仪表盘 7多柱状图 8面积图 9双Y轴曲线图
 * @param htmlId 绑定DIV的ID
 */
function createChart(category, serise, limit, type, title, htmlId) {
	var charts = null;
	Highcharts.setOptions({  
	       colors: ['#008db4','#53b52e','#ef581f','#dce301','#24c8e1','#65e473','#ff954e','#ffee60','#4F94CD']
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
            credits: {
                enabled: false //去log
            },
            xAxis: {
            		tickInterval : htmlId=='d0-chart-userct'||htmlId.indexOf("nbiot-otar-wifi")>-1||htmlId.indexOf("nbiot-otar-self")>-1?1:2,
                categories: category,
                labels:{
	                	style:{
	                		"color":"#dddddd",
	                		fontSize: "12px",
	                		fontFamily: "微软雅黑",
	                	},
                }
            },
            yAxis:	[{
                min: 0,
                max:htmlId=='d0-chart-02'||htmlId=='d0-chart-05'||htmlId=='d0-chart-06'||htmlId=='d0-chart-07'||htmlId=='d0-chart-08' ? 100:null,
                gridLineWidth: 0,
                labels : {
	                style : {
	                    color : '#dddddd'
	                }
	            },
                title: {
                    text: ''
                }
            },{
                min: 0,
                gridLineWidth: 0,
                labels : {
	                style : {
	                    color : '#dddddd'
	                }
	            },
                title: {
                    text: ''
                },
                opposite: true
            }],
            legend: {
                enabled: htmlId == 'nbiot-otar-self-uservisits' ? true : false,
                align: "center",//程度标的目标地位
                verticalAlign: "bottom",//垂直标的目标地位
                itemStyle:{
	                	color:'#f5f5f5'
                	}
            },
            tooltip: {
                shared: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: serise
        });
    }
    // 线图
    if (type == 1) {
    		var enabledLegend = true;
    		if(htmlId=='d0-chart-05'||htmlId=='d0-chart-06'||htmlId=='d0-chart-07'||htmlId=='d0-chart-08'){
    			enabledLegend = false;
    		}
    		charts = $("#" + htmlId).highcharts({
            chart: {
            	type:'spline',
                backgroundColor: 'rgba(0,0,0,0)'
            },
            title: {
                text: title,
                style:{
                    color:"#dddddd",
                    fontSize:'12px'
                }
            },
            plotOptions: {
            	spline: {
                    borderColor: "",
                    shadow: true,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 0,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            xAxis: {
                 tickInterval : 2,
                labels: {
                    style: {
                        color: '#dddddd'
                    }
                },
                categories: category
            },
            yAxis: {
                min: htmlId=='d0-chart-b24h' ? 20:0,
                	//max: title.indexOf('率') > -1 ? 100:null,
                max:htmlId=='d0-chart-01' ? null:100,
                labels: {
                    style: {
                        color: '#dddddd'
                    }
                },
                gridLineWidth: 1,
                gridLineColor: '#7b5b15',//'#143865',
                title: {
                    text: null
                }
            },
            credits: {
                enabled: false //去log
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            legend: {
            		enabled: enabledLegend,
                borderWidth: 0,
                itemStyle: {
                	color:"#dddddd",
                	fontSize: "10px",
                    fontFamily: "微软雅黑",
                }
            },
            series: serise
        });
    }
    // 饼图
    if (type == 4) {
    		charts = $("#" + htmlId).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: true,
                borderColor: "",
                backgroundColor : 'rgba(0,0,0,0)',
                shadow:htmlId=='d0-chart-04'  || htmlId.indexOf("nbiot-dashbord-")>-1 || htmlId.indexOf("nbiot-otar-self-")>-1 ? false:true
            },
            title: {
                text: title,
                style: {
                    color: '#dddddd',
                    fontFamily: "微软雅黑",
                    fontSize: '12px'
                }
                
            },
            tooltip: {
                headerFormat: '{series.name}<br>',
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
            },
            credits: {
                enabled: false //去log
            },
            plotOptions: {
                pie: {
                		borderWidth:0,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
//                        formatter: function() {
//                           if (this.percentage > 4) return this.point.name;
//                        },
//                        color: 'white'
                    },
                    showInLegend: htmlId=='d0-chart-04' || htmlId.indexOf("nbiot-dashbord-")>-1||htmlId.indexOf("nbiot-otar-self-")>-1?true :false, 
                    events:{  
                        click: function(e) {  
                        	var causeVal = e.point.name;
                        	initPieClick(htmlId,causeVal.split("_")[0],causeVal.split("_")[1]);
                        }  
                    },
                    labels : {
    	                style : {
    	                    color : '#dddddd'
    	                }
    	            }
                }
            },
            legend: {
                align:  'right',
                verticalAlign:'middle',
                layout: 'vertical',
                borderWidth: 0,
                margin: 0,
                padding: 0,
                squareSymbol: false,
                symbolWidth: 7,
                itemStyle: {
                	color:"#dddddd",
                	fontSize: "10px",
                fontFamily: "微软雅黑"
                },
                y: 5
            },
            series: serise
        });
    }
    //扇形图
    if(type==5){
    		charts = $("#" + htmlId).highcharts({
	            chart: {
	            	plotBackgroundColor: null,
	                plotBorderWidth: null,
	                plotShadow: true,
	                borderColor: "",
	                backgroundColor : 'rgba(0,0,0,0)',
	            },
	            title: {
	                text: title,
	                style: {
	                    color: '#dddddd',
	                    fontFamily: "微软雅黑",
	                    fontSize: '12px'
	                }
	            },
	            tooltip: {
	                headerFormat: '{series.name}<br>',
	                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
	            },
	            plotOptions: {
	                pie: {
	                    dataLabels: {
	                        enabled: true,
	                        distance: -50,
	                        style: {
	                            fontWeight: 'bold',
	                            color: 'white',
	                            textShadow: '0px 1px 2px black'
	                        }
	                    },
	                    startAngle: -90,
	                    endAngle: 90,
	                    center: ['50%', '75%']
	                }
	            },
	            series: serise
	        });
    }
    // 仪表盘图
    if (type == 6) {
    		charts = $("#" + htmlId).highcharts({
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                spacing: [0, 0, 0, 0],
                backgroundColor: 'rgba(0,0,0,0)'
            },
            title: {
                text: title,
                y: 12,
                style: {
                	color: '#dddddd',
                    fontSize: "14px",
                    fontFamily: "微软雅黑"
                }
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                size:htmlId.indexOf('nbiot-dashbord')!=-1 ? 115 : 90,
                background: [{
                    backgroundColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [[0, '#dddddd'], [1, '#333']]
                    },
                    borderWidth: 0,
                    outerRadius: '110%'
                },
                {
                    backgroundColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [[0, '#333'], [1, '#dddddd']]
                    },
                    borderWidth: 1,
                    outerRadius: '100%'
                },
                {
                    // default background
                },
                {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '100%',
                    innerRadius: '100%'
                }]
            },
            yAxis: {
                min: Math.ceil(limit[0].from),
                max: 100,
                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',
                tickPixelInterval: 30,
                tickWidth: 1,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: ''
                },
                plotBands: limit
            },
            series: serise
        });
    }
    //多柱状图
    if (type == 7) {
    		charts = $("#" + htmlId).highcharts({
            chart: {
                type: 'column',
                backgroundColor : 'rgba(0,0,0,0)',
            },
            title: {
                text: title,
                style: {
                	color: '#dddddd',
                    fontSize: "14px",
                    fontFamily: "微软雅黑"
                }
            },
            xAxis: {
                categories: category,
                crosshair: true,
                gridLineWidth: 0,
                labels:{
                	style:{
                		"fontSize": "10px",
                		"color":"#dddddd",
                		fontSize: "12px",
                		fontFamily: "微软雅黑",
                	}
                }
                
            },
            yAxis: {
                min: 0,
                max: 100,
                gridLineWidth: 0,
                title: {
                    text: ''
                }
            	
            },
            tooltip: {
                pointFormat: '<span>{series.name}</span>: <b>{point.y}</b><br/>',
                shared: true
            },
            legend:{
            		enabled:htmlId=='nbiot-perspect-trafficup'?false:true
			},
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: serise
        });
    }
    //面积图
    if (type == 8) {
    		charts = $("#" + htmlId).highcharts({
            chart: {
                type: 'areaspline',
                backgroundColor : 'rgba(0,0,0,0)'
            },
            title: {
                text: title,
                style: {
                	color: '#dddddd',
                	fontSize: "14px",
                    fontFamily: "微软雅黑",
                }
            },
            xAxis: {
            	tickInterval: 2,
            	labels: {
                    style: {
                        color: '#dddddd'
                    }
                },
                categories: category
            },
            yAxis: {
            	min:htmlId=='d0-chart-b24h'?50:null,
            	max:htmlId=='d0-chart-b24h'?100:null,
            	gridLineWidth: 0,
            	labels: {
                    style: {
                        color: '#dddddd'
                     }
                },		
                title: {
                    text: ''
                }
            },
            tooltip: {
                shared: false
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.3,
                    marker:{
                    	enabled:false,
                    	radius:1
                    }
                }
            },
            legend: {
            		enabled:htmlId=='nbiot-perspect-usercounts'?false:true,
            		borderWidth: 0,
                itemStyle: {
                	color:"#dddddd",
                	fontSize: "10px",
                    fontFamily: "微软雅黑",
                }
            },
            series: serise
        });
    }
    //双Y轴曲线图
    if (type == 9) {
    		charts = $("#" + htmlId).highcharts({
            chart: {
                type: 'spline',
                backgroundColor : 'rgba(0,0,0,0)',
            },
            title: {
                text: title,
                style: {
                    color: '#dddddd'
                }
            },
            xAxis: {
                tickInterval: 2,
                labels: {
                    style: {
                        color: '#dddddd'
                    }
                },
                categories: category
            },
            yAxis: [{
                min: 0,
                max: 100,
                gridLineWidth: 0,
                title: {
                    text: ''
                },
                labels: {
                    style: {
                        color: '#dddddd'
                    },
                    formatter: function() {
                        return this.value;
                    }
                }
            },
            {
                min: 0,
                gridLineWidth: 0,
                title: {
                    text: ''
                },
                labels: {
                	style: {
                        color: '#dddddd'
                    },
                    formatter: function() {
                        return this.value;
                    }
                },
                opposite: true
            }],
            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: false
                    }
                }
            },
            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical',
                borderWidth: 0,
                margin: 0,
                padding: 0,
                squareSymbol: false,
                symbolWidth: 7,
                itemStyle: {
                	color:"#dddddd",
                	fontSize: "10px",
                    fontFamily: "微软雅黑",
                }
//                y: 20
            },
            series: serise
        });
    }
    
    // 基本折线图
    if (type == 10) {
    		var enabledLegend = true;
    		if(htmlId=='d0-chart-05'||htmlId=='d0-chart-06'||htmlId=='d0-chart-07'||htmlId=='d0-chart-08'){
    			enabledLegend = false;
    		}
    		charts = $("#" + htmlId).highcharts({
            chart: {
//            	type:'spline',
                backgroundColor: 'rgba(0,0,0,0)'
            },
            title: {
                text: title,
                style:{
                    color:"#dddddd",
                    fontSize:'12px'
                }
            },
            plotOptions: {
            	spline: {
                    borderColor: "",
                    shadow: true,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 0,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            xAxis: {
                 tickInterval : 2,
                labels: {
                    style: {
                        color: '#dddddd'
                    }
                },
                categories: category
            },
            yAxis: {
                min: htmlId=='d0-chart-b24h' ? 20:0,
                	max: title.indexOf('率') > -1 ? 100:null,
                labels: {
                    style: {
                        color: '#dddddd'
                    }
                },
                gridLineWidth: 1,
                gridLineColor: '#7b5b15',//'#143865',
                title: {
                    text: null
                }
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            legend: {
            		enabled: enabledLegend,
                borderWidth: 0,
                itemStyle: {
                	color:"#dddddd",
                	fontSize: "10px",
                    fontFamily: "微软雅黑",
                }
            },
            series: serise
        });
    }
    
    
    // 堆叠柱状图
    if (type == 11) {
    	 	color: ['#008db4','#53b52e','#ef581f','#dce301','#24c8e1','#65e473','#ff954e','#ffee60'],
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
            		tickInterval : htmlId=='d0-chart-userct'||htmlId.indexOf("nbiot-otar-wifi")>-1?1:2,
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
                max:htmlId=='d0-chart-02'||htmlId=='d0-chart-05'||htmlId=='d0-chart-06'||htmlId=='d0-chart-07'||htmlId=='d0-chart-08' ? 100:null,
                gridLineWidth: 0,
                labels : {
	                style : {
	                    color : '#dddddd'
	                }
	            },
                title: {
                    text: ''
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                shared: false
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    stacking: 'percent'
                }
            },
            series: serise
        });
    }
    
    
    return charts;
}


function openGis(iframeId,lon,lat){
	document.getElementById(iframeId).contentWindow.centerAndZoom(lon,lat);
}

function getHashTable(data,column,htmlId) {
    var map = new HashMap();
    var values = [];
    var set = [];
    $.each(data,
    function(i) {
        set.push(data[i][column]);
    });
    set = uniqueArray(set);
    $.each(set,
    function(i) {
        values = [];
        $.each(data,
        function(j) {
            if (set[i] == data[j][column]) {
                values.push(data[j]);
            }
        });
        map.put(set[i], values);
    });
    return map;
}

/**
 * 自定义HashMap
 */
function HashMap() {
    // 定义长度
    var length = 0;
    // 创建一个对象
    var obj = new Object();

    /**
	 * 判断Map是否为空
	 */
    this.isEmpty = function() {
        return length == 0;
    };

    /**
	 * 判断对象中是否包含给定Key
	 */
    this.containsKey = function(key) {
        return (key in obj);
    };

    /**
	 * 判断对象中是否包含给定的Value
	 */
    this.containsValue = function(value) {
        for (var key in obj) {
            if (obj[key] == value) {
                return true;
            }
        }
        return false;
    };

    /**
	 * 向map中添加数据
	 */
    this.put = function(key, value) {
        if (!this.containsKey(key)) {
            length++;
        }
        obj[key] = value;
    };

    /**
	 * 根据给定的Key获得Value
	 */
    this.get = function(key) {
        return this.containsKey(key) ? obj[key] : null;
    };

    /**
	 * 根据给定的Key删除一个值
	 */
    this.remove = function(key) {
        if (this.containsKey(key) && (delete obj[key])) {
            length--;
        }
    };

    /**
	 * 获得Map中的所有Value
	 */
    this.values = function() {
        var _values = new Array();
        for (var key in obj) {
            _values.push(obj[key]);
        }
        return _values;
    };

    /**
	 * 获得Map中的所有Key
	 */
    this.keySet = function() {
        var _keys = new Array();
        for (var key in obj) {
            _keys.push(key);
        }
        return _keys;
    };

    /**
	 * 获得Map的长度
	 */
    this.size = function() {
        return length;
    };

    /**
	 * 清空Map
	 */
    this.clear = function() {
        length = 0;
        obj = new Object();
    };
}

/**
 * 时间加减
 * @param x yyyy-mm-dd hh24:mi:ss 时间
 * @param s 加还是减 + / -
 * @param b 回溯时间
 * @returns
 */
function calcuTime(x, s, b) {
    if(x == null || x == "" || x=="null"){ 
        return x;
    }
    //var x = "2010-09-28 14:25:26"; 
    var time = new Date(x.replace("-", "/"));
    //var b = 15; //分钟数 
    var seconds = time.getSeconds();
    if (s == "-") {
    	seconds = seconds - b
    } else if (s == "+") {
    	seconds = seconds + b
    }
    return new Date(time.setSeconds(seconds, time.getSeconds(), 0)).format("yyyy-MM-dd HH:mm:ss");
}

/**
 * 数组去重复
 * 
 * @param array
 * @returns {Array}
 */
function uniqueArray(array) {
    var n = [];
    for (var i = 0; i < array.length; i++) {
        if (n.indexOf(array[i]) == -1) n.push(array[i]);
    }
    return n;
}

function replaceNull(value) {
    if (value == null || value == "null" || value=="NaN" || value=="undefined") {
        value = "-";
    }
    if(!isNaN(value)){
	    	value+="";
	    	if(value.split(".")!=null && value.split(".").length==2){
	    		var ian = value.split(".")[1];
	    		if(ian.length<2){
	    			value = value.split(".")[0]+"."+ian+"0";
	    		}
	    	}
    }
    return value;
}

function replaceFixed(value){
	if(!isNaN(value)){
		value = parseFloat(value).toFixed(2);
	}
	return value;
}

function GetDate(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);
////    获取AddDayCount天后的日期 
//    var y = dd.getFullYear();
//    var m = dd.getMonth() + 1;
////    获取当前月份的日期 
//    var d = dd.getDate();
//    return y + "-" + m + "-" + d;
    return dd.format('yyyy-MM-dd')+" 10:00:00";
//    return "2017-09-14 06:00:00";
}

function GetDayDate(AddDayCount) {
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

function GetDateByDay(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);
    return dd.format('yyyy-MM-dd');
}

/** 
 * 对Date的扩展，将 Date 转化为指定格式的String 
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符 
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 * eg: 
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04 
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18 
 */
Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}