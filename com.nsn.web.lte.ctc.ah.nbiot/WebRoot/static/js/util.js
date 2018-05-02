﻿
//dwr.engine.setTimeout(180000);
//注册全局异常
/*dwr.engine.setErrorHandler(errHandler);
var serverLogin = "../login.html";

//全局异常
function errHandler(msg, exception) {
	try {
		Ext.MessageBox.hide();
	} catch (e) {}
	if (msg.toString() != null && msg.toString() != '') {
		if (msg.toString() == '-10000' || msg.toString() == 'invalid_session') {
			window.location.href = serverLogin; //login_action
		} else if (msg.toString().indexOf("code: 0x80004005") != -1) {
			Ext.example.msg('提示', '服务器关闭，请与管理员联系。');
			return false;
		} else if (msg == 'Timeout') {
			Ext.example.msg('提示', '数据库或远程连接超时，请稍后再试。');
			return false;
		} else if (msg.toString().indexOf("MySQLSyntaxErrorException: Table") != -1) {
			Ext.example.msg('提示', '数据库没有这张表。\r\n' + msg);//数据库没有这张表。
			return false;
		} else {
			alert(msg);
			return false;
		}
	} else {
		Ext.example.msg('提示', '后台程序空指针异常');
		return false;
	}
}*/



function insertRowByArray(tabid,listdata){
	var table = document.getElementById(tabid);
	if(listdata!=null && listdata.length>0){
		var columnnum = listdata[0].length;
		for(var i=0;i<listdata.length;i++){
			 var x=table.insertRow(1+i);
			for(var j=0;j<columnnum;j++){
				var y=x.insertCell(j);
				y.innerHTML=listdata[i][j];
			}
		}
	}
 }
	
function insertRowByJson(tabid,listdata,rownum){
	var table = document.getElementById(tabid);
	if(listdata!=null && listdata.length>0){
		var columnnum = 0; var columnArray = [];
		for(var key in listdata[0]) {
			columnnum++ ;
			columnArray.push(key);
		}
			
		for(var i=0;i<listdata.length;i++){
			 var x=table.insertRow(rownum+i); //deleteRow
			 if(i%2==0) x.className = "oddTr evenTr";
			 else x.className = "oddTr";
			 //x.className = "oddTr evenTr hoverTr";
			for(var j=0;j<columnnum;j++){
				var da = listdata[i][columnArray[j]];
				if((da==null || da=="" || da=="null" || da==undefined) && (da!='0' || da!=0)) da = " - ";
				da = da.toString();
				
				if(j==0 || (j==2 && tabid=="networkEndToEnd_dslxqpm")) {
					var y = document.createElement("th");
					y.align = "left";
					x.insertBefore(y,null); 
					da = "&nbsp;&nbsp;&nbsp;&nbsp;"+da;
				}
				else {
					var y=x.insertCell(j);
					if(da.indexOf(".")!=-1){
						var arr = da.split(".");
						if(arr[1].length==1) da = da+"0";
						y.align = "right";
					}
					
					else{
						if(!ChkNum(da)){
							if(da==" - "){
								y.align = "right";
							}else{
								da = "&nbsp;&nbsp;"+da;
								y.align = "left";
							}
						}
						else {
							if(da.length>11){
								da = "&nbsp;&nbsp;"+da;
								y.align = "left";
							}else{
								y.align = "right";
							}
						}
					}
					
				}
				y.innerHTML=da;
			}
		}
	}
}

/****************
 * 合并第一列
 * @param tabid
 * @param listdata
 * @param rownum
 */
function insertRowByJson2(tabid,listdata,rownum){
	var table = document.getElementById(tabid);
	if(listdata!=null && listdata.length>0){
		var columnnum = 0; var columnArray = [];
		for(var key in listdata[0]) {
			columnnum++ ;
			columnArray.push(key);
		}
		
		var map = new Object();
		for(var i=0;i<listdata.length;i++){
			var curcolumn = listdata[i][columnArray[0]];
			 if(map[curcolumn]==undefined){
				 map[curcolumn] = 1;
			 }else{
				 map[curcolumn] = parseInt(map[curcolumn])+1;
			 }
		}
		
		var cotitle = "";
		for(var i=0;i<listdata.length;i++){
			 var x=table.insertRow(rownum+i);
			 if(i%2==0) x.className = "oddTr evenTr";
			 else x.className = "oddTr";
			 var curcolumn = listdata[i][columnArray[0]]+"";
			 for(var j=0;j<columnnum;j++){
				var da = listdata[i][columnArray[j]];
				if((da==null || da=="" || da=="null" || da==undefined) && (da!='0' || da!=0)) da = " - ";
				da = da.toString();
					
				if(j==0){
					 if(cotitle!=curcolumn){
						 var y = document.createElement("th");
						 y.rowSpan = map[curcolumn];
						cotitle = curcolumn;
						y.innerHTML="&nbsp;&nbsp;"+da;
						x.insertBefore(y,null); 
					}
				}else{
					var y = document.createElement("td");
					if(da.indexOf(".")!=-1){
						var arr = da.split(".");
						if(arr[1].length==1) da = da+"0";
						y.align = "right";
					}
					
					else{
						if(!ChkNum(da)){
							if(da==" - "){
								y.align = "right";
							}else{
								da = "&nbsp;&nbsp;"+da;
								y.align = "left";
							}
						}
						else {
							if(da.length>11){
								da = "&nbsp;&nbsp;"+da;
								y.align = "left";
							}else{
								y.align = "right";
							}
						}
					} 
					y.innerHTML=da;
					x.appendChild(y);
				}
				
			}
		}
	}
}
 

//校验是否全是数字
var ChkNum = function(str) {
	var patrn = /^\d+$/;
	return patrn.test(str);
};

/** * 检查是否包含汉字 ** */
function isInChinese(str) {
	return (str.length != str.replace(/[^\x00-\xff]/g, "").length);
}

///////////////////点击健康值打开的页面//////////////////
function OpenWin4Health(){
	var width_ = screen.availWidth - 210;
	var height_ = screen.availHeight-240;
	var top = (screen.availHeight - height_)/2;
	var left = (screen.availWidth - width_)/2;
	var url_ = basePath + "itemMonitorAction_goToHealthPage.action?menuId=itemScore";
	win = window.open(url_,'',"height="+height_+",width="+width_+",top="+top+",left="+left+",toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no, status=no");
}
//获取参数的函数
function getpara() {
	var url = document.URL;
	var para = "";
	var result = {};
	if (url.lastIndexOf("?") > 0) {
		para = url.substring(url.lastIndexOf("?") + 1, url.length);
		var arr = para.split("&");
		for (var i = 0; i < arr.length; i++) {
			var param = arr[i].split("=");
			result[param[0]] = param[1];
		}
	}
	return result;
}
///////////////////树级联多选////////////////////////
   //判断是否有子结点被选中
    var childHasChecked = function(node){
        var childNodes = node.childNodes;
        if(childNodes || childNodes.length>0){
	        for(var i=0;i<childNodes.length;i++){
	            if(childNodes[i].getUI().checkbox.checked) return true;
	        }
        }
        return false;
    }
    
    function getElementByClassName(cls,elm) {  
    	var arrCls =[];  
    	var seeElm = !mtLibs.IsNull(elm) ? elm : '*';  
    	var rexCls = new RegExp('(^|\\\\s)' + cls + '(\\\\s|$)','i');  
    	var lisElm = document.getElementsByTagName(seeElm);  
    	for (var i=0; i<lisElm.length; i++ ) {  
    	    var evaCls = lisElm[i].className;  
    	    if(evaCls.length > 0 && (evaCls == cls || rexCls.test(evaCls))) {  
    	      arrCls.push(lisElm[i]);  
    	    }  
    	}  
    	return arrCls;  
    }

    //级联选中父节点
    var parentCheck = function(node ,checked){
        var checkbox = node.getUI().checkbox;
        if(typeof checkbox == 'undefined') return false;
        if(!(checked ^ checkbox.checked)) return false;
        if(!checked && childHasChecked(node)) return false;
        checkbox.checked = checked;
        node.attributes.checked = checked;
        node.getUI().checkbox.indeterminate = checked; //半选中状态
        node.getOwnerTree().fireEvent('check', node, checked);
        var parentNode = node.parentNode;
        if( parentNode !== null){
            parentCheck(parentNode,checked);
        }
    };
    
    //增加checkchange监听
   var checkchangeall = function(node, checked) {
        var parentNode = node.parentNode;
        if(parentNode !== null){   
            parentCheck(parentNode,checked);   
        }
       node.expand();
       node.attributes.checked = checked;     
       node.eachChild(function(child){     
             child.ui.toggleCheck(checked);    
             child.attributes.checked = checked;     
             child.fireEvent('checkchange', child, checked);
       });     
    }
/////////////////////级联多选树///////////////////////////////////
    

////////////////////级联单选树///////////////////////////////////
    //获取所有的node
    var getNodes = function(node){
        var startNode = node.getOwnerTree().getRootNode();
        var r = [];
        var f = function(){
            r.push(this);
        };
        startNode.cascade(f);
        return r;
    };
	//真对单选进行处理
    var nodeAllRadioChange = function(node){
        var nodes = getNodes(node);
        if(nodes && nodes.length>0){
            for(var i=0,len=nodes.length;i<len;i++){
                if(nodes[i].id!=node.id){
                    if(nodes[i].getUI().checkbox){
                        nodes[i].getUI().checkbox.checked = false;
                    }
                }
            }
        }
    };
    //weightTreePanel.on("checkchange",nodeAllRadioChange);
    //var b = tree.getChecked(); b[0].id
////////////////////级联单选树///////////////////////////////////
    
    
    
function panelMask(panel,mesage){
	//var portlet = item.ownerCt.ownerCt.ownerCt.ownerCt;
    panel.getEl().mask(mesage+'...');
    //setTimeout("com.mainPanel.getEl().unmask();",3000);
}

function panelUNMask(panel){
    panel.getEl().unmask();
}

/*******************
 * 带参数传递的sttimeout
JTimeout(show_date_time, 1000, 
new Date(eval("new " + eval(currTime).source)), 
new Date(eval("new " + eval(sysTime).source)));
第一个参数为你要运行的函数，
第二个参数为延迟，后面可以跟任意多个参数
 * @param {} funcName
 * @param {} time
 * @return {}
 */
function JTimeout(funcName, time) {
    var args = [];
    for (var i = 2; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    return window.setTimeout(function() {
        funcName.apply(this, args);
    }, time);
}

function JsonToStr(obj) {
	var arr = [];
	var fmt = function(s) {
		if (typeof s == 'object' && s != null)
			return JsonToStr(s);
		return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
	}
	for (var i in obj)
		arr.push("'" + i + "':" + fmt(obj[i]));
	return '{' + arr.join(',') + '}';
}

function getFlexObject(file, flashvars, id, flexid) {
	var swfVersionStr = "10.0.0";
	var xiSwfUrlStr = "/swf/playerProductInstall.swf";
	var params = {};
	params.quality = "high";
	params.bgcolor = "#ebf4ff";
	params.allowscriptaccess = "sameDomain";
	params.allowfullscreen = "true";
	params.wmode = "Opaque";
	var attributes = {};
	attributes.id = flexid;
	attributes.name = flexid;
	attributes.align = "middle";
	swfobject.embedSWF(file, id, "100%", "100%", swfVersionStr, xiSwfUrlStr,
			flashvars, params, attributes);
	swfobject.createCSS("#" + id, "display:block;text-align:left;");
	return swfobject;
}

function getFlexObject2(file, flashvars, id, flexid, _width, _height) {
	var swfVersionStr = "10.0.0";
	var xiSwfUrlStr = "/swf/playerProductInstall.swf";
	var params = {};
	params.quality = "high";
	params.bgcolor = "#ebf4ff";
	params.allowscriptaccess = "sameDomain";
	params.allowfullscreen = "true";
	params.wmode = "Opaque";
	var attributes = {};
	attributes.id = flexid;
	attributes.name = flexid;
	attributes.align = "middle";
	swfobject.embedSWF(file, id, _width, _height, swfVersionStr, xiSwfUrlStr,
			flashvars, params, attributes);
	swfobject.createCSS("#" + id, "display:block;text-align:center;");
	return swfobject;
}

function getHtmlObject(id,swfLocation,params,_width,_height){
	var html = '<object id=\"'+id+'\" allowScriptAccess=\"always\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" ' +
		'codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0\" ' +
		'width=\"'+_width+'\" height=\"'+_height+'\"><param name=\"movie\" value=\"'+swfLocation+'\" />' +
		'<param name=\"wmode\" value=\"Opaque\" /><param name=\"quality\" value=\"high\" />' +
		'<param name=\"flashvars\" value=\"'+params+'\" />'+
		'<param name=\"allowFullScreen\" value=\"true\" />'+
		'<embed src=\"'+swfLocation+'\" allowScriptAccess=\"always\" allowFullScreen=\"true\" wmode=\"Opaque\" quality=\"high\" ' +
		'FlashVars=\"'+params+'\" '+
		'pluginspage=\"http://www.macromedia.com/go/getflashplayer\" ' +
		'type=\"application/x-shockwave-flash\" width=\"'+_width+'\" height=\"'+_height+'\">' +
		'</embed></object>';
	return html;	
}

function getHtmlObject1(id,swfLocation,params,_width,_height){
	var html = '<object id=\"'+id+'\" width=\"'+_width+'\" height=\"'+_height+'\" ' +
		'type=\"application/x-shockwave-flash\" data=\"'+swfLocation+'" style=\"visibility:visible;\" >' +
			'<param name=\"flashvars\" value=\"'+params+'\" />'+
			'<param name=\"allowFullScreen\" value=\"true\" />'+
		'</object>';
	return html;	
}


Array.prototype.removeItem = function(dx) {
	if (isNaN(dx) || dx > this.length) {
		return false;
	}
	for (var i = 0, n = 0; i < this.length; i++) {
		if (this[i] != this[dx]) {
			this[n++] = this[i]
		}
	}
	this.length -= 1
};

Date.prototype.formatString = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
	};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, 
		(this.getFullYear() + "").substr(4- RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1
			? o[k]
			: ("00" + o[k]).substr(("" + o[k]).length));
	return format;
}

function getPanelMainId(mainFrame,name){
	var tabPanel = Ext.getCmp(mainFrame);
	var item = tabPanel.getComponent(0);
	var _name = item.name;
	if(_name==name){
		return 1;
	}else{
		return 0;
	}
}

// 点击菜单创建主panel
function createPanel(panelName, mainFrame) {
	if (Ext.isIE) {
		CollectGarbage();
	}
	var tabPanel = Ext.getCmp(mainFrame);
	var exist = false;
	for (var i = 0; i < tabPanel.items.length; i++) {
		var item = tabPanel.getComponent(i);
		if (item.id != panelName) {
			tabPanel.remove(item);
			item.destroy();
			item = null;
			delete item;
		} else {
			exist = true;
			tabPanel.activate(item.id);
		}
	}
	if (!exist) {
		var createPanelString = 'new ' + panelName;
		var panel = eval(createPanelString);
		panel.id = panelName;
		// panel.closable = true;
		tabPanel.add(panel);
		tabPanel.activate(panelName);
	}
};

// 更新创建tabPanel组件
function createPanel2(panelName, mainFrame) {
	if (Ext.isIE) {
		CollectGarbage();
	}
	var tabPanel = Ext.getCmp(mainFrame);
	for (var i = 0; i < tabPanel.items.length; i++) {
		var item = tabPanel.getComponent(i);
		tabPanel.remove(item);
		item.destroy();
		item = null;
		delete item;
	}
	var createPanelString = 'new ' + panelName;
	var panel = eval(createPanelString);
	panel.id = panelName;
	tabPanel.add(panel);
	tabPanel.activate(panelName);
	treePanel.doLayout();
};

// 更新创建panel组件
function createPanelItem(panelName, mainFrame) {
	if (Ext.isIE) {
		CollectGarbage();
	}
	var tabPanel = Ext.getCmp(mainFrame);
	for (var i = 0; i < tabPanel.items.length; i++) {
		var item = tabPanel.getComponent(i);
		tabPanel.remove(item);
		item.destroy();
		item = null;
		delete item;
	}
	var createPanelString = 'new ' + panelName;
	var panel = eval(createPanelString);
	panel.id = panelName;
	tabPanel.add(panel);
	tabPanel.doLayout();
};

function createPanelItemClass(panelName, panel, mainFrame, panelHeight) {
	if (Ext.isIE) {
		CollectGarbage();
	}
	var tabPanel = Ext.getCmp(mainFrame);
	for (var i = 0; i < tabPanel.items.length; i++) {
		var item = tabPanel.getComponent(i);
		tabPanel.remove(item);
		item.destroy();
		item = null;
		delete item;
	}
	try{
		panel.id = panelName;
	}catch(e){}
	tabPanel.add(panel);
	if(typeof panelHeight == 'undefined'){
		tabPanel.setHeight(Ext.lib.Dom.getViewHeight()-129);
	}else if(panelHeight == 'auto'){
		//什么都不做
	}else{
		tabPanel.setHeight(panelHeight);
	}
	
	tabPanel.doLayout();
};

function createPanelIndexClass(index, panel, mainFrame) {
	if (Ext.isIE) {
		CollectGarbage();
	}
	var tabPanel = Ext.getCmp(mainFrame);
	var item = tabPanel.getComponent(index);
	tabPanel.remove(item);
	item.destroy();
	item = null;
	delete item;
	tabPanel.insert(index, panel);
	tabPanel.doLayout();
};

function createPanelItemOneClass(panel, mainFrame) {
	if (Ext.isIE) {
		CollectGarbage();
	}
	var tabPanel = Ext.getCmp(mainFrame);
	var item = tabPanel.getComponent(tabPanel.items.length - 1);
	tabPanel.remove(item);
	item.destroy();
	item = null;
	delete item;
	panel.id = 'new_panel_id'+Math.random();
	tabPanel.add(panel);
	tabPanel.doLayout();
};


// 克隆对象数据方法
function clone(myObj) {
	if (typeof(myObj) != 'object')
		return myObj;
	if (myObj == null)
		return myObj;
	var myNewObj = new Object();
	for (var i in myObj)
		myNewObj[i] = clone(myObj[i]);
	return myNewObj;
}

function cloneArray(array) {
	var arr = new Array();
	for (i = 0; i < array.length; i++) {
		arr[i] = clone(array[i]);
	}
	return arr;
}

function toHTML(str){
	if(str=='' || str=="" || str==null){
		return '';
	}
     var RexStr = /&lt;|&gt;|&quot;|&#39;|\\&|\\%|\\\\/g 
     if(str=='' || str=="" || str==null){
		return '';
	 }
     str = str.replace(RexStr, 
         function(MatchStr){ 
             switch(MatchStr){ 
                 case "&lt;": 
                     return "<"; 
                     break; 
                 case "&gt;": 
                     return ">"; 
                     break; 
                 case "&quot;": 
                     return "\""; 
                     break; 
                 case "&#39;": 
                     return "'"; 
                     break; 
                 case "\\&": 
                     return "\&"; 
                     break;
                 case "\\%": 
                     return "\%"; 
                     break; 
                 case "\\\\": 
                     return "\\"; 
                     break; 
                 default : 
                     break; 
             } 
         } 
     ) 
     return str; 
}

function toTXT(str){
	
	if(str=='' || str=="" || str==null){
		return '';
	}
	str = trimForRN2(str);
     var RexStr = /\<|\>|\"|\'|\&|\%|\\/g 
     str = trimForRN2(str);
     if(str=='' || str=="" || str==null){
		return '';
	 }
     str = str.replace(RexStr, 
         function(MatchStr){ 
             switch(MatchStr){ 
                 case "<": 
                     return "&lt;"; 
                     break; 
                 case ">": 
                     return "&gt;"; 
                     break; 
                 case "\"": 
                     return "&quot;"; 
                     break; 
                 case "\'": 
                     return "&#39;"; 
                     break; 
                 case "\&": 
                     return "\\&"; 
                     break;
                 case "\%": 
                     return "\\%"; 
                     break; 
                  case "\\": 
                     return "\\\\"; 
                     break; 
                 default : 
                     break; 
             } 
         } 
     ) 
     return str; 
}


function toQuery(str){
	
	if(str=='' || str=="" || str==null){
		return '';
	}
	str = trimForRN2(str);
     var RexStr = /\<|\>|\"|\'|\&|\%|\\/g 
     str = trimForRN2(str);
     if(str=='' || str=="" || str==null){
		return '';
	 }
     str = str.replace(RexStr, 
         function(MatchStr){ 
             switch(MatchStr){ 
                 case "<": 
                     return "&lt;"; 
                     break; 
                 case ">": 
                     return "&gt;"; 
                     break; 
                 case "\"": 
                     return "&quot;"; 
                     break; 
                 case "\'": 
                     return "&#39;"; 
                     break; 
                 case "\&": 
                     return "\\&"; 
                     break;
                 case "\%": 
                     return "\\%"; 
                     break; 
                  case "\\": 
                     return "\\\\\\\\"; 
                     break; 
                 default : 
                     break; 
             } 
         } 
     ) 
     return str; 
}

function trimForRN2(str) {
	if (str == null || str == '' || typeof(str) != 'string') {
		return '';
	}
	var Start = 0; // 截取字符串的开始位子
	var End = 0; // 截取字符串的结束位子
	var bol = true;
	for (i = 0; i < str.length; i++) {
		if (bol == true)
			Start = i;
		if (str.charCodeAt(i) != 32 && str.charCodeAt(i) != 10
				&& str.charCodeAt(i) != 13) {
			End = i + 1;
			bol = false;
		}
	}
	if (End == 0 && str.length > 0) {
		return '';
	}
	return str.substring(Start, End);
}

// 动态载入js及css文件
function loadjscssfile(filename, filetype) {
	var fileref;
	if (filetype == "js") { // 判断文件类型
		fileref = document.createElement('script');// 创建标签
		fileref.setAttribute("type", "text/javascript");
		// 定义属性type的值为text/javascript
		fileref.setAttribute("src", filename);// 文件的地址
	} else if (filetype == "css") { // 判断文件类型
		fileref = document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", filename);
	}
	if (typeof fileref != "undefined")
		document.getElementsByTagName("head")[0].appendChild(fileref);
	return 1;
}

function loadMenuPanel(filename, filetype, link) {
	if (filetype == "js") { // 判断文件类型
		for (i = 0; i < filename.length; i++) {
			var file = filename[i];
			var fileref = document.createElement('script');// 创建标签
			fileref.setAttribute("type", "text/javascript");// 定义属性type的值为text/javascript
			fileref.setAttribute("src", file);// 文件的地址
			document.getElementsByTagName("head")[0].appendChild(fileref);
		}
	} else if (filetype == "css") { // 判断文件类型
		for (i = 0; i < filename.length; i++) {
			var file = filename[i];
			var fileref = document.createElement("link");
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", file);
			document.getElementsByTagName("head")[0].appendChild(fileref);
		}
	}
	return 1;
}

function getPreDate() {
	var lastday = new Date();
	lastday.setTime(lastday.getTime() - 24 * 3600 * 1000);
	return lastday;
}

function getNextTime(datetime,num) {
	var lastday = new Date(datetime);
	lastday.setTime(lastday.getTime() + (1000*num));
	return getSetDate(lastday)+" "+lastday.toLocaleTimeString();
}

function getTowDateDay(date1,date2){
	var d1 = new Date(date1).getTime();
	var d2 = new Date(date2).getTime();
	return (d2-d1)/24/3600/1000;
}

function getNextDate(num) {
	var lastday = new Date();
	lastday.setTime(lastday.getTime() + (24 * 3600 * 1000*num));
	// menu.getNextDate(function(data){if(data!=null && data!="") lastday = new
	// Date(data);});
	return lastday;
}

function getNextMonthStringDate(num) {
	var today = new Date();

	var day = today.getDate();
	var month = today.getMonth() + 1 + num;
	var year = today.getFullYear();
	month = month < 10 ? "0" + month : month;// 如果小于10即显示为09月
	var date = year + "-" + month;
	
	return date;
}

function getNextMonthStringDateByStringDate(stringDate,num) {
	var today = new Date(stringDate.replace(/-/g,"/"));

	var day = today.getDate();
	var month = today.getMonth() + 1 + num;
	var year = today.getFullYear();
	month = month < 10 ? "0" + month : month;// 如果小于10即显示为09月
	var date = year + "-" + month;
	
	return date;
}

function getNextWeekStringDate(num) {
	var today = new Date();
	today.setTime(today.getTime() + (7 * 24 * 3600 * 1000*num));
	
	var currentWeek = today.getDay();
	if ( currentWeek == 0 ) {
   		currentWeek = 7;
    }
    var monday  = new Date(today.getTime() - (currentWeek-1)*24*60*60*1000); //星期一
    var tuesday  = new Date(today.getTime() - (currentWeek-2)*24*60*60*1000); //星期二
	var wednesday = new Date(today.getTime() - (currentWeek-3)*24*60*60*1000); //星期三
	var thursday = new Date(today.getTime() - (currentWeek-4)*24*60*60*1000); //星期四
	var friday  = new Date(today.getTime() - (currentWeek-5)*24*60*60*1000); //星期五
	var saturday = new Date(today.getTime() - (currentWeek-6)*24*60*60*1000); //星期六
	var sunday  = new Date(today.getTime() - (currentWeek-7)*24*60*60*1000);   //星期日
 
	var date = getSetDate(monday)+"--"+getSetDate(sunday);
	
	return date;
}

function getNextStringDate(num) {
	var today = new Date();
	today.setTime(today.getTime() + (24 * 3600 * 1000*num));

	var day = today.getDate();
	var month = today.getMonth() + 1;
	var year = today.getFullYear();
	var hours = today.getHours();
	var minute = today.getMinutes();
	month = month < 10 ? "0" + month : month;// 如果小于10即显示为09月
	day = day < 10 ? "0" + day : day;// 如果小于10即显示为09日
	var zt_Month = today.getMonth() * 1 + 1;
	var zt_date = today.getDate();
	zt_Month = zt_Month < 10 ? "0" + zt_Month : zt_Month;
	zt_date = zt_date < 10 ? "0" + zt_date : zt_date;
	var date = year + "-" + month + "-" + day;
	
	return date;
}

function getNextStringDateByStringDate(stringDate,num) {
	var today = new Date(stringDate.replace(/-/g,"/"));
	today.setTime(today.getTime() + (24 * 3600 * 1000*num));

	var day = today.getDate();
	var month = today.getMonth() + 1;
	var year = today.getFullYear();
	var hours = today.getHours();
	var minute = today.getMinutes();
	month = month < 10 ? "0" + month : month;// 如果小于10即显示为09月
	day = day < 10 ? "0" + day : day;// 如果小于10即显示为09日
	var date = year + "-" + month + "-" + day;
	
	return date;
}

function getNextHourStringDate(num) {
	var today = new Date();
	today.setTime(today.getTime() + (3600 * 1000*num));

	var day = today.getDate();
	var month = today.getMonth() + 1;
	var year = today.getFullYear();
	var hours = today.getHours();
	var minute = today.getMinutes();
	month = month < 10 ? "0" + month : month;// 如果小于10即显示为09月
	day = day < 10 ? "0" + day : day;// 如果小于10即显示为09日
	hours = hours < 10 ? "0" + hours : hours;
	var date = year + "-" + month + "-" + day + " " + hours + ":00:00";
	
	return date;
}

function getNextMinuteStringForDate(today,num) {
	today.setTime(today.getTime() + (60 * 1000 * num));

	var day = today.getDate();
	var month = today.getMonth() + 1;
	var year = today.getFullYear();
	var hours = today.getHours();
	var minute = today.getMinutes();
	month = month < 10 ? "0" + month : month;// 如果小于10即显示为09月
	day = day < 10 ? "0" + day : day;// 如果小于10即显示为09日
	hours = hours < 10 ? "0" + hours : hours;
	minute = minute < 10 ? "0" + minute : minute;
	var date = year + "-" + month + "-" + day + " " + hours + ":" + minute + ":00";
	
	return date;
}

function getSetDate(today){
	var day = today.getDate();
	var month = today.getMonth() + 1;
	var year = today.getFullYear();
	var hours = today.getHours();
	var minute = today.getMinutes();
	month = month < 10 ? "0" + month : month;// 如果小于10即显示为09月
	day = day < 10 ? "0" + day : day;// 如果小于10即显示为09日
	var date = year + "-" + month + "-" + day;
	
	return date;
}

function getSetDateHour(today){
	var date = "";
	try{
		var day = today.getDate();
		var month = today.getMonth() + 1;
		var year = today.getFullYear();
		var hours = today.getHours().toString();
		if(hours.length==1) hours = "0"+hours;
		var minute = today.getMinutes();
		month = month < 10 ? "0" + month : month;// 如果小于10即显示为09月
		day = day < 10 ? "0" + day : day;// 如果小于10即显示为09日
		var zt_Month = today.getMonth() * 1 + 1;
		var zt_date = today.getDate();
		zt_Month = zt_Month < 10 ? "0" + zt_Month : zt_Month;
		zt_date = zt_date < 10 ? "0" + zt_date : zt_date;
		date = year + "-" + month + "-" + day +" "+hours;
	}catch(e){
		date = today;
	}
	
	return date;
}


function getSysDate() {
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth() + 1;
	var year = today.getFullYear();
	var hours = today.getHours();
	var minute = today.getMinutes();
	month = month < 10 ? "0" + month : month;// 如果小于10即显示为09月
	day = day < 10 ? "0" + day : day;// 如果小于10即显示为09日
	var zt_Month = today.getMonth() * 1 + 1;
	var zt_date = today.getDate();
	zt_Month = zt_Month < 10 ? "0" + zt_Month : zt_Month;
	zt_date = zt_date < 10 ? "0" + zt_date : zt_date;
	var date = year + "-" + month + "-" + day;
	return date;
}

function GetColor() {
	var len = random_color.length;             //获取颜色值的数目
   var num = Math.random();            //random()产生一个0~1之间的随机数。round（x）对x四舍五入取整数.
   var t = Math.round(num*(len-1))+1;  //获取一个随机数
	return random_color[t];
}

function GetColor2() {
	var r = Math.floor(Math.random() * 255).toString(16);
	var g = Math.floor(Math.random() * 255).toString(16);
	var b = Math.floor(Math.random() * 255).toString(16);
	r = r.length == 1 ? "0" + r : r;
	g = g.length == 1 ? "0" + g : g;
	b = b.length == 1 ? "0" + b : b;
	return "#" + r + g + b;
}

var getRandomColor = function(){
  return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6);
}

function isEmpty(value) {
	value = value.replace(/[ ]/g, '');
	if (value.length < 1) {
		return true;
	}
	return false;
}


//通过移动小数点 扩大倍数 将科学计数法转换成整数
function scienceNum(value) {
	if (!isEmpty(value)) {
		var num = 0;
		if ((num = value.indexOf('E')) != -1
				|| (num = value.indexOf('e')) != -1) {
			var doubleStr = value.substring(0, num);
			var eStr = value.substring(num + 1, value.length);
			eStr = parseInt(eStr);
			var doubleStrList = doubleStr.split('.');
			var doubleStr1 = doubleStrList[0];
			var doubleStr2 = doubleStrList[1];

			if (doubleStr2.length > eStr) {
				var nums = doubleStr2.substring(0, eStr);
				var nume = doubleStr2.substring(eStr, doubleStr2.length);
				doubleStr = doubleStr1 + nums + '.' + nume;
			} else if (doubleStr2.length < eStr) {
				var indexNum = eStr - doubleStr2.length;
				// 用0补齐
				var str = '';
				for (var i = 0; i < indexNum; i++) {
					str += '0';
				}
				doubleStr = doubleStr1 + doubleStr2 + str;
			} else {
				doubleStr = doubleStr1 + doubleStr2;
			}
			value = doubleStr;
			// 千分位
		}
	}
	return value;
}


function getcurTime(){    
      var hours, minutes, seconds, ap;                                                       
      var intHours, intMinutes, intSeconds;   
      var today,javatime;                                                                                                     
      today = new Date();                                                                                                            
      intHours = today.getHours();                                                       
      intMinutes = today.getMinutes();                                                       
      intSeconds = today.getSeconds(); 
      if((intMinutes+"").length<2){
      	intMinutes = "0"+intMinutes;
      }
      
      if(intHours==0){                                                       
            hours = "12:";                                                       
            ap = " AM";                                                       
      }else if(intHours < 12){                                                         
            hours = intHours+":";                                                       
            ap = " AM";                                                       
      }else if(intHours == 12){                                                       
            hours = "12:";                                                       
            ap = " PM";                                                       
      }else{                                                       
            intHours = intHours - 12                                                       
            hours = intHours + ":";                                                       
            ap = " PM";                                                       
      }                                               
       minutes = intMinutes;                                                                                                                                                                                                            
      timeString = hours+minutes+ap;                                                       
      return  timeString;                                                  
  }

  /** * 检查是否为数 ** */
isNumber = function(s) {
	s.trim();
	return (s.search(/^[+-]?[0-9.]*$/) >= 0);
};

isIP = function(v) {
	return /^(\+?[1-9][0-9]?|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
			.test(v);
};

function $$(id){
	return document.getElementById(id);
}

var request =
{
	QueryString : function(val)
	{
		var uri = window.location.search;
		var re = new RegExp("" +val+ "=([^&?]*)", "ig");
		return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
	}
};


function openWindow(url){
	var width_ = screen.availWidth - 10;
	var height_ = screen.availHeight-40;
    window.open(url,"","height="+height_+",width="+width_+",top=0,left=0,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no, status=no");
}

var StringTrim = function(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
};


/********************
 * 获取全局4个时间 控制时间按钮颜色
 */
var dayNumber = 7;
var toNumSta = -1;
$(function(){
	try{
		if(toNums != null){
			toNumSta = toNums;
		}
	}catch(e){}
	try{
		$$('cdate').innerHTML = curDate;
		if(toNum==toNumSta){
			try{
				$$('d2').className = "button gray";
			}catch(e){}
			
		}
		if(toNum==(toNumSta-dayNumber)){
			try{
			$$('d1').className = "button gray";
			}catch(e){}
		}
		
	}catch(e){}
	
});

function gotoPage(date,url){
	if((toNum+date)>=(toNumSta-dayNumber) && (toNum+date)<=toNumSta) {
		window.location = url+"?date="+getNextStringDate(toNum+date)+"&toNum="+(toNum+date);
	}
	else if((toNum+date)>toNumSta){
		alert("当前已经是最新数据");
	}
	else if((toNum+date)<(toNumSta-dayNumber)){
		alert("当前已经是最久数据");
	}
}

function gotoPage23G(date,type,url){
	if((toNum+date)>=(toNumSta-dayNumber) && (toNum+date)<=toNumSta) {
		window.location = url+"?date="+getNextStringDate(toNum+date)+"&netType="+type+"&toNum="+(toNum+date);
	}
	else if((toNum+date)>toNumSta){
		alert("当前已经是最新数据");
	}
	else if((toNum+date)<(toNumSta-dayNumber)){
		alert("当前已经是最久数据");
	}
}

function gotoPageByConditions(date,url,conditions){
	if((toNum+date)>=(toNumSta-dayNumber) && (toNum+date)<=toNumSta) {
		window.location = url+"?date="+getNextStringDate(toNum+date)+"&toNum="+(toNum+date)+conditions;
	}
	else if((toNum+date)>toNumSta){
		alert("当前已经是最新数据");
	}
	else if((toNum+date)<(toNumSta-dayNumber)){
		alert("当前已经是最久数据");
	}
}

/**
 * 动态同步加载JS
 * yangdongsheng 2014/09/27
 * @param {} url
 */
function loadJs(url){
		$.ajax({
				type : "get",
				url : url,
				async : false,
				success : function(data) {
					var myHead = document.getElementsByTagName("head").item(0);
					var myScript = document.createElement("script");
					myScript.language = "javascript";
					myScript.type = "text/javascript";
					//myScript.id = id;
					try {
						//IE8以及以下不支持这种方式，需要通过text属性来设置
						myScript.appendChild(document.createTextNode(data));
					} catch (ex) {
						myScript.text = data;
					}
					myHead.appendChild(myScript);
				}
			});
}

function GetQueryString(name)
{
	
	//return decodeURIComponent(request.QueryString(name));
	var Request = new Object();
	Request = GetRequest();
	
	return decodeURIComponent(Request[name]);
}

function GetRequest() {

	   var url = location.search; //获取url中含"?"符后的字串

	   var theRequest = new Object();

	   if (url.indexOf("?") != -1) {

	      var str = url.substr(1);

	      strs = str.split("&");

	      for(var i = 0; i < strs.length; i ++) {

	         theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);

	      }

	   }

	   return theRequest;

}




function getStrWidth(str,fontSize){
	var span = document.getElementById("__getwidth");  
    if (span == null) {  
        span = document.createElement("span");  
        span.id = "__getwidth";  
        document.body.appendChild(span);  
        span.style.visibility = "hidden";  
        span.style.whiteSpace = "nowrap";  
    }  
    span.innerText = str;  
    span.style.fontSize = fontSize + "px";  
  
    return span.offsetWidth;
}
function insertUserLog(descriptions){
	//userinfoService.insertUserLog(descriptions);
}

function openWindow(descriptions,url,target){
	insertUserLog(descriptions);
	window.open(url,target);
}

function setxxxxnumber(obj){
	if(obj==null){
		return "";
	}
	obj=obj+"";
	if(obj.length==13){
		return obj.substr(0,5)+'****'+obj.substr(9,13);
	}else if(obj.length==15){
		return obj.substr(0,5)+'****'+obj.substr(9,15);
	}else if(obj.length>=4){
		return obj.substr(0,obj.length-4)+'****';
	}else if(obj.length==4){
		return '****';
	}else{
		return obj;
	}
}
