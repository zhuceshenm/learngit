package com.nsn.web.lte.ctc.ah.nbiot.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nsn.web.lte.db.DbDo;
import com.nsn.web.lte.db.Record;
import com.nsn.web.lte.db.SqlMap;
import com.nsn.web.lte.mvc.ReqContext;

public class PerspectAction {
	public String index(ReqContext rc) {
		return "nbiot-perspect.html";
	}
	
	/**
	 * 物联网用户数
	 * @param rc
	 * @return
	 */
	public Map<String,Object> getInternetUsers(ReqContext rc){
		//String v_sdate = rc.param("v_sdate");
		//Map<String, Object> p = new HashMap<>();
		//p.put("v_sdate", v_sdate);
		
		Map<String, Object> map = new HashMap<>();
		map = DbDo.findFirstCache("1d", SqlMap.getSql("internet_users"));
		
		return map;
	}
	
	/**
	 * 第一个模块
	 * @param rc
	 * @return
	 */
	public List<Record> getInitDashBoard(ReqContext rc){
		String v_sdate = rc.param("v_sdate");
		Map<String, Object> p = new HashMap<>();
		p.put("v_sdate", v_sdate);
		
		//Map<String, Object> map = new HashMap<>();
		//公告板
		List<Record>  list= DbDo.queryCache("1d", SqlMap.getSql("init_perspect_4gnb",p));
		//map.put("DASHBOARD", dashBoard4G);
		
		return list;
	}
	
	/**
	 * 第二个模块
	 * @param rc
	 * @return
	 */
	public Map<String, Object> getInitChartData(ReqContext rc){
		String v_sdate = rc.param("v_sdate");
		String network = rc.param("network");
		Map<String, Object> p = new HashMap<>();
		p.put("v_sdate", v_sdate);
		Map<String, Object> map = new HashMap<>();
		
		List<Record>  list1 = null;
		List<Record>  list2 = null;
		if(network.equals("4G")){
			list1= DbDo.queryCache("1d", SqlMap.getSql("init_chart_data1_4g",p));
			list2= DbDo.queryCache("1d", SqlMap.getSql("init_chart_data2_4g",p));
			
		}else if(network.equals("NB")){
			list1= DbDo.queryCache("1d", SqlMap.getSql("init_chart_data1_nb",p));
			list2= DbDo.queryCache("1d", SqlMap.getSql("init_chart_data2_nb",p));
		}
		map.put("us",list1);
		map.put("zd",list2);
		return map;
	}
	
	
	/**
	 * 行业排名
	 * @param rc
	 * @return
	 */
	public List<Record> getIndustryRank(ReqContext rc){
		String v_sdate = rc.param("v_sdate");
		String network = rc.param("network");
		String dir = rc.param("dir");
		Map<String, Object> p = new HashMap<>();
		p.put("v_sdate", v_sdate);
		p.put("type", "scene");
		
		
		List<Record>  list= null;
		if(network.equals("4G")){
			if("down".equals(dir)){
				p.put("down_up", "integration_rate");
				list = DbDo.queryCache("1d", SqlMap.getSql("industry_rank_4g",p));
			}else{
				p.put("down_up", "integration_rate desc");
				list = DbDo.queryCache("1d", SqlMap.getSql("industry_rank_4g",p));
			}
		}else if(network.equals("NB")){
			if("down".equals(dir)){
				p.put("rate", " rate asc");
				list = DbDo.queryCache("1d", SqlMap.getSql("all_rank_nb",p));
			}else{
				p.put("rate", "rate desc");
				list = DbDo.queryCache("1d", SqlMap.getSql("all_rank_nb",p));
			}
			
		}
		
		return list;
	}
	
	/**
	 * 集团排名
	 * @param rc
	 * @return
	 */
	public List<Record> getGroupRank(ReqContext rc){
		String v_sdate = rc.param("v_sdate");
		String network = rc.param("network");
		String dir = rc.param("dir");
		Map<String, Object> p = new HashMap<>();
		p.put("v_sdate", v_sdate);
		p.put("type", "custom");
		
		List<Record>  list= null;
		if(network.equals("4G")){
			if("down".equals(dir)){
				p.put("down_up", "integration_rate");
				list = DbDo.queryCache("1d", SqlMap.getSql("group_rank_4g",p));
			}else{
				p.put("down_up", "integration_rate desc");
				list = DbDo.queryCache("1d", SqlMap.getSql("group_rank_4g",p));
			}
		}else if(network.equals("NB")){
			if("down".equals(dir)){
				p.put("rate", " rate asc");
				list = DbDo.queryCache("1d", SqlMap.getSql("all_rank_nb",p));
			}else{
				p.put("rate", "rate desc");
				list = DbDo.queryCache("1d", SqlMap.getSql("all_rank_nb",p));
			}
		}
		
		return list;
	}
	
	
	/**
	 * 属地排名
	 * @param rc
	 * @return
	 */
	public List<Record> getTerrRank(ReqContext rc){
		String v_sdate = rc.param("v_sdate");
		String network = rc.param("network");
		String dir = rc.param("dir");
		Map<String, Object> p = new HashMap<>();
		p.put("v_sdate", v_sdate);
		p.put("type", "city");
		
		List<Record>  list= null;
		if(network.equals("4G")){
			if("down".equals(dir)){
				p.put("down_up", "integration_rate");
				list = DbDo.queryCache("1d", SqlMap.getSql("terr_rank_4g",p));
			}else{
				p.put("down_up", "integration_rate desc");
				list = DbDo.queryCache("1d", SqlMap.getSql("terr_rank_4g",p));
			}
			
		}else if(network.equals("NB")){
			if("down".equals(dir)){
				p.put("rate", " rate asc");
				list = DbDo.queryCache("1d", SqlMap.getSql("all_rank_nb",p));
			}else{
				p.put("rate", "rate desc");
				list = DbDo.queryCache("1d", SqlMap.getSql("all_rank_nb",p));
			}
		}
		
		return list;
	}
	
	/**
	 * 终端排名
	 * @param rc
	 * @return
	 */
	public List<Record> getTerminalRank(ReqContext rc){
		String v_sdate = rc.param("v_sdate");
		String network = rc.param("network");
		String dir = rc.param("dir");
		Map<String, Object> p = new HashMap<>();
		p.put("v_sdate", v_sdate);
		p.put("type", "tac");
		
		List<Record>  list= null;
		if(network.equals("4G")){
			if("down".equals(dir)){
				p.put("down_up", "integration_rate");
				list = DbDo.queryCache("1d", SqlMap.getSql("terminal_rank_4g",p));
			}else{
				p.put("down_up", "integration_rate desc");
				list = DbDo.queryCache("1d", SqlMap.getSql("terminal_rank_4g",p));
			}
			
		}else if(network.equals("NB")){
			if("down".equals(dir)){
				p.put("rate", " rate asc");
				list = DbDo.queryCache("1d", SqlMap.getSql("all_rank_nb",p));
			}else{
				p.put("rate", "rate desc");
				list = DbDo.queryCache("1d", SqlMap.getSql("all_rank_nb",p));
			}
		}
		
		return list;
	}
	
	/**
	 * 小区排名
	 * @param rc
	 * @return
	 */
	public List<Record> getQuartersRank(ReqContext rc){
		String v_sdate = rc.param("v_sdate");
		String network = rc.param("network");
		String dir = rc.param("dir");
		Map<String, Object> p = new HashMap<>();
		p.put("v_sdate", v_sdate);
		p.put("type", "eci");
		
		List<Record>  list= null;
		if(network.equals("4G")){
			if("down".equals(dir)){
				p.put("down_up", "attach_rate");
				list = DbDo.queryCache("1d", SqlMap.getSql("quarters_rank_4g",p));
			}else{
				p.put("down_up", "attach_rate desc");
				list = DbDo.queryCache("1d", SqlMap.getSql("quarters_rank_4g",p));
			}
			
		}else if(network.equals("NB")){
			if("down".equals(dir)){
				p.put("rate", " rate asc");
				list = DbDo.queryCache("1d", SqlMap.getSql("all_rank_nb",p));
			}else{
				p.put("rate", "rate desc");
				list = DbDo.queryCache("1d", SqlMap.getSql("all_rank_nb",p));
			}
		}
		
		return list;
	}
	
	/**
	 * 用户排名
	 * @param rc
	 * @return
	 */
	public List<Record> getUsersRank(ReqContext rc){
		String v_sdate = rc.param("v_sdate");
		String network = rc.param("network");
		String dir = rc.param("dir");
		Map<String, Object> p = new HashMap<>();
		p.put("v_sdate", v_sdate);
		p.put("type", "user");
		
		List<Record>  list= null;
		if(network.equals("4G")){
			if("down".equals(dir)){
				p.put("down_up", "attach_rate");
				list = DbDo.queryCache("1d", SqlMap.getSql("users_rank_4g",p));
			}else{
				p.put("down_up", "attach_rate desc");
				list = DbDo.queryCache("1d", SqlMap.getSql("users_rank_4g",p));
			}
			
		}else if(network.equals("NB")){
			if("down".equals(dir)){
				p.put("rate", " rate asc");
				list = DbDo.queryCache("1d", SqlMap.getSql("all_rank_nb",p));
			}else{
				p.put("rate", "rate desc");
				list = DbDo.queryCache("1d", SqlMap.getSql("all_rank_nb",p));
			}
		}
		
		return list;
	}
	
	
	
	
	
}
