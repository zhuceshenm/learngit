package com.nsn.web.lte.ctc.ah.nbiot.action;

import java.util.List;
import java.util.Map;

import com.nsn.web.lte.db.DbDo;
import com.nsn.web.lte.db.Record;
import com.nsn.web.lte.mvc.ReqContext;

public class GasAction {

	//private Logger log = Logger.getLogger(this.getClass().getName());
	
	public String index(ReqContext rc) {
		return "nbiot-gas.html";
	}
	
	/**
	 * 顶部表格
	 */
	public Map<String,Object> getInitTopFrom(ReqContext rc){
		String v_sdate = rc.param("v_sdate");
		//Map<String, Object> p = new HashMap<>();
		//p.put("cityparam", cityparam);
		String sql = "select * from sqmdb.rpt_hot_user_d where sdate='"+v_sdate+"'";
		Map<String, Object> map = DbDo.findFirstCache("1d", sql);
		return map;
	}
	
	/**
	 * 24小时用户活跃曲线
	 */
	public List<Record> getInitUserActive(ReqContext rc){
		String v_sdate = rc.param("v_sdate");
		//Map<String, Object> p = new HashMap<>();
		//p.put("cityparam", cityparam);
		String sql = "select * from sqmdb.rpt_hot_user_h where sdate='"+v_sdate+"' order by p_hour";
		List<Record> list = DbDo.queryCache("1d", sql);
		return list;
	}
	
	/**
	 * 24小时 上 下行流量 
	 */
	public List<Record> getInitUpDownFlow(ReqContext rc){
		String v_sdate = rc.param("v_sdate");
		//Map<String, Object> p = new HashMap<>();
		//p.put("cityparam", cityparam);
		String sql = "select * from sqmdb.rpt_hot_up_down_flow_h where sdate='"+v_sdate+"' order by p_hour";
		List<Record> list = DbDo.queryCache("1d", sql);
		return list;
	}
	
	
	/**
	 * 使用终端个数 饼图
	 */
	public List<Record> getInitUseTerminal(ReqContext rc){
		String v_sdate = rc.param("v_sdate");
		//Map<String, Object> p = new HashMap<>();
		//p.put("cityparam", cityparam);
		String sql = "select * from sqmdb.rpt_use_tac_num_d where sdate='"+v_sdate+"'";
		List<Record> list = DbDo.queryCache("1d", sql);
		return list;
	}
	
	
	/**
	 * 小区
	 */
	public List<Record> getInitResidential(ReqContext rc){
		String v_sdate = rc.param("v_sdate");
		//Map<String, Object> p = new HashMap<>();
		//p.put("cityparam", cityparam);
		String sql = "select t1.*,t2.longitude,t2.latitude from sqmdb.rpt_ci_users_servince_count_d t1 left join tas_master.p_netconf t2 on t1.eci=t2.cell_id and t1.sdate='"+v_sdate+"'";
		List<Record> list = DbDo.queryCache("1d", sql);
		return list;
	}
	
	/**
	 * 地图
	 */
	public List<Record> getGisData(ReqContext rc){
		String v_sdate = rc.param("v_sdate");
		//Map<String, Object> p = new HashMap<>();
		//p.put("cityparam", cityparam);
		String sql = "select t1.*,t2.wirelessname,t2.longitude,t2.latitude from sqmdb.rpt_ci_users_servince_count_d t1 left join tas_master.p_netconf t2 on t1.eci=t2.cell_id and t1.sdate='"+v_sdate+"'";
		List<Record> list = DbDo.queryCache("1d", sql);
		return list;
	}
	
	/**
	 * 疑似故障终端
	 */
	public List<Record> getInitSuspected(ReqContext rc){
		String v_sdate = rc.param("v_sdate");
		//Map<String, Object> p = new HashMap<>();
		//p.put("cityparam", cityparam);
		String sql = "select * from sqmdb.f_nb_iot_gas_day where sdate='"+v_sdate+"' order by trouble_days desc";
		List<Record> list = DbDo.queryCache("1d", sql);
		return list;
	}
	
	/**
	 * 最后4张图
	 */
	public List<Record> getInitFourLineGraphs(ReqContext rc){
		String v_sdate = rc.param("v_sdate");
		//Map<String, Object> p = new HashMap<>();
		//p.put("cityparam", cityparam);
		String sql = "select *from sqmdb.rpt_hot_hour_index_d where sdate='"+v_sdate+"' order by p_hour";
		List<Record> list = DbDo.queryCache("1d", sql);
		return list;
	}
}
