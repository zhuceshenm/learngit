package com.nsn.web.lte.ctc.ah.nbiot.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nsn.web.lte.db.DbDo;
import com.nsn.web.lte.db.Record;
import com.nsn.web.lte.db.SqlMap;
import com.nsn.web.lte.mvc.ReqContext;

public class SenseAction {

	
	public String index(ReqContext rc) {
		return "nbiot-sense.html";
	}
	
	/**
	 * 加载区域
	 * @param rc
	 * @return
	 */
	public List<Record> getCities(ReqContext rc){
		//String module = rc.param("module");
		String cityparam = rc.param("cityparam");
		Map<String, Object> p = new HashMap<>();
		p.put("cityparam", cityparam);
		
		return DbDo.queryCache("1d", SqlMap.getSql("getcities_nbiot", p));
	}
	
	/**
	 * 仪表盘
	 * @return
	 */
	public Map<String, Object> getSenseClock(ReqContext rc){
		String _type = rc.param("_type");
		String v_data_type = rc.param("v_data_type");
		String v_sdate = rc.param("v_sdate");
		String v_scity = rc.param("v_scity");
		
		String v_area = rc.param("v_area");
		String v_c_scene_name = rc.param("v_c_scene_name");
		String v_c_custom_name = rc.param("v_c_custom_name");
		
		Map<String, Object> p = new HashMap<>();
		p.put("v_data_type", v_data_type);
		p.put("v_sdate", v_sdate);
		p.put("v_scity", v_scity);
		p.put("v_area", v_area);
		p.put("v_c_scene_name", v_c_scene_name);
		p.put("v_c_custom_name", v_c_custom_name);
		
		
		Map<String, Object> map = new HashMap<>();
		
		switch (_type) {
		case "0":
			map = DbDo.findFirstCache("1d", SqlMap.getSql("clock_dial_sense1",p));
			break;
		case "1":
			map = DbDo.findFirstCache("1d", SqlMap.getSql("clock_dial_sense2",p));
			break;

		default:
			map = DbDo.findFirstCache("1d", SqlMap.getSql("clock_dial_sense3",p));
			break;
		}
		return map;
	}
	
	/**
	 * 折线图
	 * @return
	 */
	public List<Record> getLloadChartsLine(ReqContext rc){
		String type_line = rc.param("type_line");
		String v_data_type = rc.param("v_data_type");
		String v_sdate = rc.param("v_sdate");
		String v_scity = rc.param("v_scity");
		
		String v_area = rc.param("v_area");
		String v_c_scene_name = rc.param("v_c_scene_name");
		String v_c_custom_name = rc.param("v_c_custom_name");
		
		Map<String, Object> p = new HashMap<>();
		p.put("v_data_type", v_data_type);
		p.put("v_sdate", v_sdate);
		p.put("v_scity", v_scity);
		p.put("v_area", v_area);
		p.put("v_c_scene_name", v_c_scene_name);
		p.put("v_c_custom_name", v_c_custom_name);
		
		
		List<Record> list = null;
		
		switch (type_line) {
		case "0":
			list = DbDo.queryCache("1d", SqlMap.getSql("chartsLineHour",p));
			break;
			
		default:
			list = DbDo.queryCache("1d", SqlMap.getSql("chartsLineDay",p));
			break;
		}
		return list;
	}
	
	
	/**
	 * 地图
	 * @return
	 */
	public Map<String, Object> getLoadSenseMap(ReqContext rc){
		String mapType = rc.param("mapType");
		String v_data_type = rc.param("v_data_type");
		String v_sdate = rc.param("v_sdate");
		String v_scity = rc.param("v_scity");
		
		String v_area = rc.param("v_area");
		String v_c_scene_name = rc.param("v_c_scene_name");
		String v_c_custom_name = rc.param("v_c_custom_name");
		
		Map<String, Object> p = new HashMap<>();
		p.put("v_data_type", v_data_type);
		p.put("v_sdate", v_sdate);
		p.put("v_scity", v_scity);
		p.put("v_area", v_area);
		p.put("v_c_scene_name", v_c_scene_name);
		p.put("v_c_custom_name", v_c_custom_name);
		
		List<Record> list = DbDo.queryCache("1d", SqlMap.getSql("chartsMap",p));
		
		Map<String, Object> map = new HashMap<>();
		Map<String, Object> mm = new HashMap<>();
		String sql = "select max(";
		
		switch (mapType) {
		case "0":
			sql += "integration_rate),min(integration_rate";
			break;
		case "1":
			sql += "qoe_rate),min(qoe_rate";
			break;
		case "2":
			sql += "attach_rate),min(attach_rate";
			break;
		case "3":
			sql += "traffic_ul + traffic_dl),min(traffic_ul + traffic_dl";
			break;

		default:
			sql += "user_count),min(user_count";
			break;
		}
		sql += ") from tas_master.v_rpt_4g_iot_data_user_report where sdate = '"+v_sdate+"' and data_type = '"+v_data_type+"' and (('"+v_scity+"' = '全省' and scity <> '全省' and area = '全市') or('"+v_scity+"' <> '全省' and scity = '"+v_scity+"' and area <> '全市')) and scity <> '' and area <> '' and c_scene_name = '"+v_c_scene_name+"' and c_custom_name = '"+v_c_custom_name+"'";
		mm = DbDo.findFirstCache("1d", sql);
		map.put("dtsj", list);
		map.put("sxx", mm);
		return map;
	}
	
	
	/**
	 * 端到端表
	 * @return
	 */
	public List<Record> getLoadTableEnd(ReqContext rc){
		String v_data_type = rc.param("v_data_type");
		String v_sdate = rc.param("v_sdate");
		String v_scity = rc.param("v_scity");
		
		String v_area = rc.param("v_area");
		String v_c_scene_name = rc.param("v_c_scene_name");
		String v_c_custom_name = rc.param("v_c_custom_name");
		
		Map<String, Object> p = new HashMap<>();
		p.put("v_data_type", v_data_type);
		p.put("v_sdate", v_sdate);
		p.put("v_scity", v_scity);
		p.put("v_area", v_area);
		p.put("v_c_scene_name", v_c_scene_name);
		p.put("v_c_custom_name", v_c_custom_name);
		
		List<Record> list = DbDo.queryCache("1d", SqlMap.getSql("end_and_end_pm",p));
		return list;
	}
	
	
	/**
	 * 行业表
	 * @return
	 */
	public List<Record> getIndustry(ReqContext rc){
		String v_data_type = rc.param("v_data_type");
		String v_sdate = rc.param("v_sdate");
		String v_scity = rc.param("v_scity");
		
		String v_area = rc.param("v_area");
		String v_c_scene_name = rc.param("v_c_scene_name");
		String v_c_custom_name = rc.param("v_c_custom_name");
		
		Map<String, Object> p = new HashMap<>();
		p.put("v_data_type", v_data_type);
		p.put("v_sdate", v_sdate);
		p.put("v_scity", v_scity);
		p.put("v_area", v_area);
		p.put("v_c_scene_name", v_c_scene_name);
		p.put("v_c_custom_name", v_c_custom_name);
		
		List<Record> list = DbDo.queryCache("1d", SqlMap.getSql("industry_b",p));
		return list;
	}
	
	
	/**
	 * 加载下拉框行业
	 * @param rc
	 * @return
	 */
	public List<Record> getIndustrySelect(ReqContext rc){
		
		return DbDo.queryCache("1d", "select DISTINCT c_scene_name from tas_master.v_cfg_d_user_details");
	}
	
	/**
	 * 客户下拉框加载
	 * @param rc
	 * @return
	 */
	public List<Record> getCustomer(ReqContext rc){
		String v_c_scene_name = rc.param("v_c_scene_name");
		return DbDo.queryCache("1d", "select DISTINCT c_custom_name from tas_master.v_cfg_d_user_details where c_scene_name='"+v_c_scene_name+"'");
	}
}
