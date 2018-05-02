package com.nsn.web.lte.ctc.ah.nbiot.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nsn.web.lte.db.DbDo;
import com.nsn.web.lte.db.Record;
import com.nsn.web.lte.db.SqlMap;
import com.nsn.web.lte.mvc.ReqContext;

public class GeneralAction {
	public String index(ReqContext rc) {
		return "general.html";
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
	 * 加载行业
	 * @param rc
	 * @return
	 */
	public List<Record> getIndustry(ReqContext rc){
		//String cityparam = rc.param("cityparam");
		//Map<String, Object> p = new HashMap<>();
		//p.put("cityparam", cityparam);
		
		return DbDo.queryCache("1d", "select DISTINCT c_scene_name from tas_master.cfg_scene_custom ");
	}
	
	/**
	 * 加载客户
	 * @param rc
	 * @return
	 */
	public List<Record> getCustomer(ReqContext rc){
		String scene = rc.param("scene");
		//Map<String, Object> p = new HashMap<>();
		//p.put("cityparam", cityparam);
		
		String sql = "select *from tas_master.cfg_scene_custom where c_scene_name='"+scene+"'";
		return DbDo.queryCache("1d", sql);
	}
	
	
	/**
	 * 仪表盘
	 * @param rc
	 * @return
	 */
	public Map<String, Object> getLoadClock(ReqContext rc){
		String sdate = rc.param("sdate");
		String _type = rc.param("_type");
		String cityparam = rc.param("cityparam");
		String _area = rc.param("_area");
		String scene = rc.param("scene");
		String custom = rc.param("custom");
		Map<String, Object> map = new HashMap<>();
		String sql1 = "";
		String sql2 = "";
		String sql3 = "";
		
		if(_type.equals("0")){
			
			if(_area.equals("0")||_area.equals("全市")){
				if(scene.equals("请选择")||"".equals(scene)||scene==null){
					sql1 = "select * from sqmdb.rpt_province_city_attach_pdn_pag_request_rate_d  where sdate = '"+sdate+"' and city = '"+cityparam+"'";
					sql2 = "select * from sqmdb.rpt_rrc_temp_rate_d where city = '"+cityparam+"'";
					sql3 = "select * from sqmdb.rpt_province_city_end_and_end_rate_d  where sdate = '"+sdate+"' and city = '"+cityparam+"'";
					
					Map<String, Object> m1 = DbDo.findFirst(sql1);
					Map<String, Object> m2 = DbDo.findFirst(sql2);
					Map<String, Object> m3 = DbDo.findFirst(sql3);
					
					map.put("ATTACH", (m1.get("attach_rate")==null||"".equals(m1.get("attach_rate")))?0:m1.get("attach_rate"));
					map.put("END_AND_END", (m3.get("end_and_end_rate")==null||"".equals(m3.get("end_and_end_rate")))?0:m3.get("end_and_end_rate"));
					map.put("RRC", (m2.get("rrc_rate")==null||"".equals(m2.get("rrc_rate")))?0:m2.get("rrc_rate"));
				}else{
					//地市 行业 
					if(custom.equals("请选择")||"".equals(custom)){
						//地市 行业
						sql1 = "select * from sqmdb.rpt_scene_end_rate_d where city='"+cityparam+"' and sdate='"+sdate+"' and c_scene_name='"+scene+"'";
						
					}else{
						//地市 行业  客户
						sql1 = "select *from sqmdb.rpt_custom_end_rate_d where city='"+cityparam+"' and c_custom_name='"+custom+"' and sdate='"+sdate+"'";
					}
					Map<String, Object> m1 = DbDo.findFirst(sql1);
					map.put("ATTACH", (m1.get("attach_rate")==null||"".equals(m1.get("attach_rate")))?0:m1.get("attach_rate"));
					map.put("END_AND_END", (m1.get("end_rate")==null||"".equals(m1.get("end_rate")))?0:m1.get("end_rate"));
					map.put("RRC", (m1.get("rrc_rate")==null||"".equals(m1.get("rrc_rate")))?0:m1.get("rrc_rate"));
					
				}
			}else{
				_area = _area.substring(0, 2);
				if(scene.equals("请选择")||"".equals(scene)){
					sql1 = "select *from  sqmdb.rpt_area_rrc_end_attach_d where city = '"+cityparam+"' and area like '"+_area+"%' and sdate='"+sdate+"'";
					Map<String, Object> m1 = DbDo.findFirst(sql1);
					
					map.put("ATTACH", (m1.get("attach_rate")==null||"".equals(m1.get("attach_rate")))?0:m1.get("attach_rate"));
					map.put("END_AND_END", (m1.get("end_and_end_rate")==null||"".equals(m1.get("end_and_end_rate")))?0:m1.get("end_and_end_rate"));
					map.put("RRC", (m1.get("rrc_rate")==null||"".equals(m1.get("rrc_rate")))?0:m1.get("rrc_rate"));
				}else{
					if(custom.equals("请选择")||"".equals(custom)){
						//区域 行业
						sql1 = "select end_rate end_and_end_rate,attach_rate,rrc_rate from sqmdb.rpt_city_area_scene_end_rate_d where city='"+cityparam+"' and area like '"+_area+"%' and c_scene_name='"+scene+"' and sdate='"+sdate+"'";
					}else{
						//区域 行业 客户
						sql1 = "select *from sqmdb.rpt_end_rate_custom_d where sdate='"+sdate+"' and city='"+cityparam+"' and area like '"+_area+"%' and c_custom_name='"+custom+"'";
					}
				}
				Map<String, Object> m1 = DbDo.findFirst(sql1);
				
				map.put("ATTACH", (m1.get("attach_rate")==null||"".equals(m1.get("attach_rate")))?0:m1.get("attach_rate"));
				map.put("END_AND_END", (m1.get("end_and_end_rate")==null||"".equals(m1.get("end_and_end_rate")))?0:m1.get("end_and_end_rate"));
				map.put("RRC", (m1.get("rrc_rate")==null||"".equals(m1.get("rrc_rate")))?0:m1.get("rrc_rate"));
			}
			
		}else if(_type.equals("1")){
			if(_area.equals("0")||_area.equals("全市")){
				if(scene.equals("请选择")||"".equals(scene)||scene==null){
					sql1 = "select * from sqmdb.rpt_province_city_kqi_rate_d  where sdate = '"+sdate+"' and city = '"+cityparam+"'";
					sql2 = "select * from sqmdb.rpt_province_city_internet_rate_d where sdate = '"+sdate+"' and city = '"+cityparam+"'";
				}else{
					if(custom.equals("请选择")||"".equals(custom)){
						
						sql1 = "select * from sqmdb.rpt_scene_kqi_rate where city='"+cityparam+"' and sdate='"+sdate+"' and c_scene_name='"+scene+"'";
						sql2 = "select * from sqmdb.rpt_scene_user_kqi_rate where city='"+cityparam+"' and sdate='"+sdate+"' and c_scene_name='"+scene+"'";
					}else{
						sql1 = "select kqi_rate rate from sqmdb.rpt_custom_kqi_rate_d where city='"+cityparam+"' and c_custom_name='"+custom+"' and sdate='"+sdate+"'";
						sql2 = "select user_rate rate from sqmdb.rpt_custom_user_rate_d where city='"+cityparam+"' and c_custom_name='"+custom+"' and sdate='"+sdate+"'";
					}
				}
			}else{
				_area = _area.substring(0, 2);
				if(scene.equals("请选择")||"".equals(scene)){
					
					sql1 = "select kqi_rate rate from sqmdb.rpt_area_kqi_rate_d  where city = '"+cityparam+"' and sdate = '"+sdate+"' and area like '"+_area+"%'";
					sql2 = "select user_rate rate from sqmdb.rpt_area_internet_rate_d  where city = '"+cityparam+"' and sdate = '"+sdate+"' and area like '"+_area+"%'";
				}else{
					if(custom.equals("请选择")||"".equals(custom)){
						
						sql1 = "select kqi_rate rate from sqmdb.rpt_city_area_scene_fell_rate_d where city='"+cityparam+"' and area like '"+_area+"%' and c_scene_name='"+scene+"' and sdate='"+sdate+"'";
						sql2 = "select user_rate rate from sqmdb.rpt_city_area_scene_user_rate_d where city='"+cityparam+"' and area like '"+_area+"%' and c_scene_name='"+scene+"' and sdate='"+sdate+"'";
					}else{
						sql1 = "select gz_rate rate from sqmdb.rpt_gz_rate_d where sdate='"+sdate+"' and city='"+cityparam+"' and area like '"+_area+"%' and c_custom_name='"+custom+"'";
						sql2 = "select user_rate rate from sqmdb.rpt_gz_user_rate_d where sdate='"+sdate+"' and city='"+cityparam+"' and area like '"+_area+"%' and c_custom_name='"+custom+"'";
					}
				}
			}
			Map<String, Object> m1 = DbDo.findFirst(sql1);
			Map<String, Object> m2 = DbDo.findFirst(sql2);
			
			map.put("RATE", (m1.get("rate")==null||"".equals(m1.get("rate")))?0:m1.get("rate"));
			map.put("USER_RATE", (m2.get("rate")==null||"".equals(m2.get("rate")))?0:m2.get("rate"));
		}else if(_type.equals("2")){
			
			if(_area.equals("0")||_area.equals("全市")){
				if(scene.equals("请选择")||"".equals(scene)||scene==null){
					sql1 = "select * from sqmdb.rpt_province_city_service_rate_d  where sdate = '"+sdate+"' and city = '"+cityparam+"'";
				}else{
					if(custom.equals("请选择")||"".equals(custom)){
						sql1 = "select * from sqmdb.rpt_scene_province_city_service_rate_d where city='"+cityparam+"' and c_scene_name='"+scene+"' and sdate='"+sdate+"'";
					}else{
						sql1 = "select *from sqmdb.rpt_custom_service_rate_d where city='"+cityparam+"' and c_custom_name='"+custom+"' and sdate='"+sdate+"'";
					}
				}
			}else{
				_area = _area.substring(0, 2);
				if(scene.equals("请选择")||"".equals(scene)){
					
					sql1 = "select * from sqmdb.rpt_area_up_down_rate  where city = '"+cityparam+"' and sdate = '"+sdate+"' and area like '"+_area+"%'";
				}else{
					if(custom.equals("请选择")||"".equals(custom)){
						
						sql1 = "select *from sqmdb.rpt_city_area_scene_service_rate_d where city='"+cityparam+"' and area like '"+_area+"%' and c_scene_name='"+scene+"' and sdate='"+sdate+"'";
					}else{
						sql1 = "select *from sqmdb.rpt_serivce_rate_custom_d where sdate='"+sdate+"' and city='"+cityparam+"' and area like '"+_area+"%' and c_custom_name='"+custom+"'";
					}
				}
			}
			Map<String, Object> m1 = DbDo.findFirst(sql1);
			
			map.put("UP", (m1.get("up_rate")==null||"".equals(m1.get("up_rate")))?0:m1.get("up_rate"));
			map.put("DOWN", (m1.get("down_rate")==null||"".equals(m1.get("down_rate")))?0:m1.get("down_rate"));
			map.put("UP_SERVICE", (m1.get("up_service_rate")==null||"".equals(m1.get("up_service_rate")))?0:m1.get("up_service_rate"));
			map.put("DOWN_SERVICE", (m1.get("down_service_rate")==null||"".equals(m1.get("down_service_rate")))?0:m1.get("down_service_rate"));
		}else{
			
			if(_area.equals("0")||_area.equals("全市")){
				if(scene.equals("请选择")||"".equals(scene)||scene==null){
					sql1 = "select * from sqmdb.rpt_province_city_attach_pdn_pag_request_rate_d  where sdate = '"+sdate+"' and city = '"+cityparam+"'";
					sql2 = "select * from sqmdb.rpt_province_city_tau_rate  where sdate = '"+sdate+"' and city = '"+cityparam+"'";
					
					Map<String, Object> m1 = DbDo.findFirst(sql1);
					Map<String, Object> m2 = DbDo.findFirst(sql2);
					
					map.put("PDN", (m1.get("pdn_rate")==null||"".equals(m1.get("pdn_rate")))?0:m1.get("pdn_rate"));
					map.put("TAU", (m2.get("tau_rate")==null||"".equals(m2.get("tau_rate")))?0:m2.get("tau_rate"));
					map.put("PAG", (m1.get("pag_rate")==null||"".equals(m1.get("pag_rate")))?0:m1.get("pag_rate"));
					map.put("REQUEST", (m1.get("request_rate")==null||"".equals(m1.get("request_rate")))?0:m1.get("request_rate"));
				}else{
					if(custom.equals("请选择")||"".equals(custom)){
						
						sql1 = "select * from sqmdb.rpt_scene_province_city_d where city='"+cityparam+"' and c_scene_name='"+scene+"' and sdate='"+sdate+"'";
						sql2 = "select * from sqmdb.rpt_scene_tau_rate_d where city='"+cityparam+"' and c_scene_name='"+scene+"' and sdate='"+sdate+"'";
						
						Map<String, Object> m1 = DbDo.findFirst(sql1);
						Map<String, Object> m2 = DbDo.findFirst(sql2);
						
						map.put("PDN", (m1.get("pdn_rate")==null||"".equals(m1.get("pdn_rate")))?0:m1.get("pdn_rate"));
						map.put("TAU", (m2.get("tau_rate")==null||"".equals(m2.get("tau_rate")))?0:m2.get("tau_rate"));
						map.put("PAG", (m1.get("pag_rate")==null||"".equals(m1.get("pag_rate")))?0:m1.get("pag_rate"));
						map.put("REQUEST", (m1.get("request_rate")==null||"".equals(m1.get("request_rate")))?0:m1.get("request_rate"));
					}else{
						sql1 = "select *from sqmdb.rpt_scene_kqi_rate_d where city='"+cityparam+"' and c_custom_name='"+custom+"' and sdate='"+sdate+"'";
						
						Map<String, Object> m1 = DbDo.findFirst(sql1);
						map.put("PDN", (m1.get("pdn_rate")==null||"".equals(m1.get("pdn_rate")))?0:m1.get("pdn_rate"));
						map.put("TAU", (m1.get("tau_rate")==null||"".equals(m1.get("tau_rate")))?0:m1.get("tau_rate"));
						map.put("PAG", (m1.get("pag_rate")==null||"".equals(m1.get("pag_rate")))?0:m1.get("pag_rate"));
						map.put("REQUEST", (m1.get("request_rate")==null||"".equals(m1.get("request_rate")))?0:m1.get("request_rate"));
					}
				}
			}else{
				
				_area = _area.substring(0, 2);
				if(scene.equals("请选择")||"".equals(scene)){
					
					sql1 = "select * from sqmdb.rpt_area_attach_pdn_pag_d where city = '"+cityparam+"' and area like '"+_area+"%' and sdate='"+sdate+"'";
					sql2 = "select * from sqmdb.rpt_area_tau_rate_d where city = '"+cityparam+"' and area like '"+_area+"%' and sdate='"+sdate+"'";
					
					Map<String, Object> m1 = DbDo.findFirst(sql1);
					Map<String, Object> m2 = DbDo.findFirst(sql2);
					
					map.put("PDN", (m1.get("pdn_rate")==null||"".equals(m1.get("pdn_rate")))?0:m1.get("pdn_rate"));
					map.put("TAU", (m2.get("tau_rate")==null||"".equals(m2.get("tau_rate")))?0:m2.get("tau_rate"));
					map.put("PAG", (m1.get("pag_rate")==null||"".equals(m1.get("pag_rate")))?0:m1.get("pag_rate"));
					map.put("REQUEST", (m1.get("request_rate")==null||"".equals(m1.get("request_rate")))?0:m1.get("request_rate"));
				}else{
					if(custom.equals("请选择")||"".equals(custom)){
						sql1 = "select *from sqmdb.rpt_city_area_scene_kqi_rate_d where city='"+cityparam+"' and area like '"+_area+"%' and c_scene_name='"+scene+"' and sdate='"+sdate+"'";
					}else{
						sql1 = "select *from sqmdb.rpt_kqi_rate_custom_d where sdate='"+sdate+"' and city='"+cityparam+"' and area like '"+_area+"%' and c_custom_name='"+custom+"'";
					}
					Map<String, Object> m1 = DbDo.findFirst(sql1);
					
					map.put("PDN", (m1.get("pdn_rate")==null||"".equals(m1.get("pdn_rate")))?0:m1.get("pdn_rate"));
					map.put("TAU", (m1.get("tau_rate")==null||"".equals(m1.get("tau_rate")))?0:m1.get("tau_rate"));
					map.put("PAG", (m1.get("pag_rate")==null||"".equals(m1.get("pag_rate")))?0:m1.get("pag_rate"));
					map.put("REQUEST", (m1.get("request_rate")==null||"".equals(m1.get("request_rate")))?0:m1.get("request_rate"));
				}
			}
			
		}
		return map;
	}
	
	/**
	 * 折线图
	 * @param rc
	 * @return
	 */
	public List<Record> getLloadChartsLine(ReqContext rc){
		String sdate = rc.param("sdate");
		String type_line = rc.param("type_line");
		String cityparam = rc.param("cityparam");
		String _area = rc.param("_area");
		String scene = rc.param("scene");
		String custom = rc.param("custom");
		
		//Map<String, Object> map = new HashMap<>();
		
		String sql1 = "";
		String sql2 = "";
		List<Record> list1 = null;
		if(type_line.equals("0")){
			if(_area.equals("0")||_area.equals("全市")){
				if(scene.equals("请选择")||"".equals(scene)){
					sql1 = "select * from sqmdb.rpt_h_table_h  where sdate = '"+sdate+"' and city = '"+cityparam+"' order by p_hour";
					sql2 = "select * from sqmdb.rpt_province_city_kqi_h  where sdate = '"+sdate+"' and city = '"+cityparam+"' order by p_hour";
					list1 = DbDo.query(sql1);
					List<Record> list2 = DbDo.query(sql2);
					//map.put("m1", list1);
					//map.put("m2", list2);
					for (int i = 0; i < list1.size(); i++) {
						list1.get(i).set("rate", null);
						for(int j = 0; j < list2.size(); j++){
							if(list1.get(i).get("p_hour").equals(list2.get(j).get("p_hour"))){
								list1.get(i).set("rate", list2.get(j).get("rate"));
								break;
							}
						}
					}
					
				}else{
					if(custom.equals("请选择")||"".equals(custom)){
						//行业维度
						if(cityparam.equals("全省")){
							//全省行业
							sql1 = "select end_rate end_and_end_rate,rate,attach_rate,rrc_rate,p_hour from sqmdb.rpt_scene_hour_end_rate_h where sdate='"+sdate+"' and c_scene_name='"+scene+"' order by p_hour";
							list1 = DbDo.query(sql1);
						}else{
							//地市行业
							sql1 = "select end_rate end_and_end_rate,rate,attach_rate,rrc_rate,p_hour from sqmdb.rpt_city_scene_hour_end_rate_h where city='"+cityparam+"' and c_scene_name='"+scene+"' and sdate='"+sdate+"' order by p_hour";
							list1 = DbDo.query(sql1);
						}
					}else{
						//客户维度
						/*if(cityparam.equals("全省")){
							//全省 客户
							
							list1 = DbDo.query(sql1);
						}else{
							//地市 客户
							//sql1 = "";
						}*/
						sql1 = "select end_rate end_and_end_rate,kqi_rate rate,attach_rate,rrc_rate,p_hour from sqmdb.rpt_custom_users_kqi_rate_h where sdate='"+sdate+"' and c_custom_name='"+custom+"' and city='"+cityparam+"' order by p_hour";
						list1 = DbDo.query(sql1);
					}
				}
			}else{
				_area = _area.substring(0, 2);
				if(scene.equals("请选择")||"".equals(scene)){
					sql1 = "select *from sqmdb.rpt_area_rrc_attach_end_rate_h where city='"+cityparam+"' and area like '"+_area+"%' and sdate='"+sdate+"' order by p_hour";
					sql2 = "select *from sqmdb.rpt_area_kqi_h where city='"+cityparam+"' and area like'"+_area+"%' and sdate='"+sdate+"' order by p_hour";
					list1 = DbDo.query(sql1);
					List<Record> list2 = DbDo.query(sql2);
					for (int i = 0; i < list1.size(); i++) {
						list1.get(i).set("rate", null);
						for(int j = 0; j < list2.size(); j++){
							if(list1.get(i).get("p_hour").equals(list2.get(j).get("p_hour"))){
								list1.get(i).set("rate", list2.get(j).get("rate"));
								break;
							}
						}
					}
				}else{
					if(custom.equals("请选择")||"".equals(custom)){
						//区域行业
						sql1 = "select end_rate end_and_end_rate,rate,attach_rate,rrc_rate,p_hour from sqmdb.rpt_city_area_scnen_left_h where city='"+cityparam+"' and c_scene_name='"+scene+"' and sdate='"+sdate+"' and area like '"+_area+"%' order by p_hour";
						list1 = DbDo.query(sql1);
					}else{
						//区域客户
						sql1 = "select end_rate end_and_end_rate,rate,attach_rate,rrc_rate,p_hour from sqmdb.rpt_h_custom_h where city='"+cityparam+"' and area like '"+_area+"%' and sdate='"+sdate+"' and  c_custom_name='"+custom+"' order by p_hour";
						list1 = DbDo.query(sql1);
					}
				}
				
				//map.put("m1", list1);
				//map.put("m2", list2);
			}
		}else{
			String sql = "";
			if(scene.equals("请选择")||"".equals(scene)||scene==null){
				if(_area.equals("0")||_area.equals("全市")){
					
					sql = "select *from  sqmdb.rpt_right_table_rate_d where sdate<=date'"+sdate+"' and sdate>=date'"+sdate+"' -interval'6 day' and city='"+cityparam+"' order by sdate";
				}else{
					
					sql = "select sdate,end_and_end_rate,kqi_rate rate,attach_rate,rrc_rate,users,flow from sqmdb.rpt_area_scene_rate_d where city='"+cityparam+"' and area like '"+_area.substring(0, 2)+"%' and sdate<=date'"+sdate+"' and sdate>=date'"+sdate+"' -interval'6 day' order by sdate";
				}
			}else{
					
				if(custom.equals("请选择")||"".equals(custom)){
					if(_area.equals("0")||_area.equals("全市")){
						
						sql = "select sdate,end_rate end_and_end_rate,rate,attach_rate,rrc_rate,uses users,flow from sqmdb.rpt_scene_table_d where city='"+cityparam+"' and c_scene_name='"+scene+"' and sdate<=date'"+sdate+"' and sdate>=date'"+sdate+"' -interval'6 day' order by sdate";
					}else{
						sql = "select sdate,end_rate end_and_end_rate,kqi_rate rate,attach_rate,rrc_rate,users,flow from sqmdb.rpt_city_area_scene_table_d where city='"+cityparam+"' and area like '"+_area.substring(0, 2)+"%' and c_scene_name='"+scene+"' and sdate<=date'"+sdate+"' and sdate>=date'"+sdate+"' -interval'6 day' order by sdate";
					}
				}else{
					if(_area.equals("0")||_area.equals("全市")){
						
						sql = "select sdate,end_rate end_and_end_rate,kqi_rate rate,attach_rate,rrc_rate,users,flow from sqmdb.rpt_right_user_date_d where city='"+cityparam+"' and sdate<=date'"+sdate+"' and sdate>=date'"+sdate+"' -interval'6 day' and c_custom_name='"+custom+"' order by sdate";
					}
				}
			}
			list1 = DbDo.query(sql);
		}
		
		return list1;
	}
	
	
	
	/**
	 * 地图加载
	 * @param rc
	 * @return
	 */
	public Map<String, Object> getLoadSenseMap(ReqContext rc){
		String sdate = rc.param("sdate");
		String cityparam = rc.param("cityparam");
		String mapType = rc.param("mapType");
		String scene = rc.param("scene");
		String custom = rc.param("custom");
		
		String sql1 = "";
		String sql2 = "select max(";
		if(scene.equals("请选择")||"".equals(scene)||scene==null){
			if(cityparam.equals("全省")){
				sql1 = "select *from  sqmdb.rpt_right_table_rate_d where sdate = '"+sdate+"' order by city='全省' desc";
			}else{
				sql1 = "select area city,end_and_end_rate,kqi_rate rate,attach_rate,rrc_rate,users,flow from sqmdb.rpt_area_scene_rate_d where city='"+cityparam+"' and sdate='"+sdate+"'";
			}
		}else{
			if(custom.equals("请选择")||"".equals(custom)){
				if(cityparam.equals("全省")){
					
					sql1 = "select city,end_rate end_and_end_rate,rate,attach_rate,rrc_rate,uses users,flow from sqmdb.rpt_scene_table_d where c_scene_name='"+scene+"' and sdate='"+sdate+"'";
				}else{
					sql1 = "select area city,end_rate end_and_end_rate,kqi_rate rate,attach_rate,rrc_rate,users,flow from sqmdb.rpt_city_area_scene_table_d where city='"+cityparam+"' and c_scene_name='"+scene+"' and sdate='"+sdate+"'";
				}
			}else{
				sql1 = "select city,end_rate end_and_end_rate,kqi_rate rate,attach_rate,rrc_rate,users,flow from sqmdb.rpt_right_user_date_d where sdate='"+sdate+"' and c_custom_name='"+custom+"'";
			}
			
		}
		List<Record> list = DbDo.query(sql1);
		
		switch (mapType) {
		case "0":
			if(scene.equals("请选择")||"".equals(scene)){
				sql2 += "end_and_end_rate),min(end_and_end_rate";
			}else{
				sql2 += "end_rate),min(end_rate";
			}
			break;
		case "1":
			if(!cityparam.equals("全省")||!custom.equals("请选择")||"".equals(custom)){
				sql2 += "kqi_rate),min(kqi_rate";
			}else{
				sql2 += "rate),min(rate";
			}
			break;
		case "2":
			if((custom.equals("请选择")||"".equals(custom))&&cityparam.equals("全省")&&!scene.equals("请选择")){
				sql2 += "uses),min(uses";
			}else{
				sql2 += "users),min(users";
			}
			break;
		default:
			sql2 += "flow),min(flow";
			break;
		}
		if(scene.equals("请选择")||"".equals(scene)||scene==null){
			if(cityparam.equals("全省")){
				sql2 += ") from sqmdb.rpt_right_table_rate_d where sdate = '"+sdate+"' and city!='全省'";
			}else{
				sql2 += ") from sqmdb.rpt_area_scene_rate_d where city='"+cityparam+"' and sdate='"+sdate+"'";
			}
		}else{
			if(custom.equals("请选择")||"".equals(custom)){
				if(cityparam.equals("全省")){
					
					sql2 += ") from sqmdb.rpt_scene_table_d where c_scene_name='"+scene+"' and sdate='"+sdate+"'";
				}else{
					sql2 += ") from sqmdb.rpt_city_area_scene_table_d where city='"+cityparam+"' and c_scene_name='"+scene+"' and sdate='"+sdate+"'";
				}
			}else{
				sql2 += ") from sqmdb.rpt_right_user_date_d where sdate='"+sdate+"' and c_custom_name='"+custom+"'";
			}
		}
		
		Map<String, Object> m = DbDo.findFirst(sql2);
		
		Map<String, Object> map = new HashMap<>();
			
		map.put("dtsj", list);
		map.put("sxx", m);
				
		return map;
	}
	
	/**
	 * 端到端图表
	 * @param rc
	 * @return
	 */
	public List<Record> getLoadTableEnd(ReqContext rc){
		
		String sdate = rc.param("sdate");
		String cityparam = rc.param("cityparam");
		String scene = rc.param("scene");
		String custom = rc.param("custom");
		
		String sql = "";
		if(scene.equals("请选择")||"".equals(scene)||scene==null){
			if(cityparam.equals("全省")){
				sql = "select city,end_and_end_rate,rate,attach_rate,rrc_rate,users,flow,servince_count from  sqmdb.rpt_right_table_rate_d where sdate = '"+sdate+"' and city!='' order by rn";
			}else{
				sql = "select area,end_and_end_rate,kqi_rate,attach_rate,rrc_rate,users,flow,servince_count from sqmdb.rpt_area_scene_rate_d where city='"+cityparam+"' and sdate='"+sdate+"' and area!='' order by users desc";
			}
		}else{
			if(custom.equals("请选择")||"".equals(custom)){
				if(cityparam.equals("全省")){
					
					sql = "select city,end_rate,rate,attach_rate,rrc_rate,uses,flow,servince_count from sqmdb.rpt_scene_table_d where c_scene_name='"+scene+"' and sdate='"+sdate+"' and city!=''";
				}else{
					sql = "select area,end_rate,kqi_rate,attach_rate,rrc_rate,users,flow,servince_count from sqmdb.rpt_city_area_scene_table_d where city='"+cityparam+"' and c_scene_name='"+scene+"' and sdate='"+sdate+"' and area!='' order by users desc";
				}
			}else{
				sql = "select city,end_rate,kqi_rate,attach_rate,rrc_rate,users,flow,servince_count from sqmdb.rpt_right_user_date_d where sdate='"+sdate+"' and c_custom_name='"+custom+"' and city!=''";
			}
		}
		List<Record> list = DbDo.query(sql);
		
		return list;
	}
	
	/**
	 * 行业图表
	 * @param rc
	 * @return
	 */
	public List<Record> getLoadIndustry(ReqContext rc){
		
		String sdate = rc.param("sdate");
		String cityparam = rc.param("cityparam");
		String _area = rc.param("_area");
		String scene = rc.param("scene");
		String custom = rc.param("custom");
		
		String sql = "";
		if(!scene.equals("请选择")&&!"".equals(scene)){
			if(custom.equals("请选择")||"".equals(custom)){
				
				if(_area.equals("0")||_area.equals("全市")){
					
					sql = "select c_custom_name,users,kqi_rate,attact_rate,up_flow,down_flow,servince_count from  sqmdb.rpt_custom_right_table_rate_d where city='"+cityparam+"' and c_scene_name='"+scene+"' and sdate=date'"+sdate+"' and c_custom_name!='' order by users desc";
				}else{
					sql = "select c_custom_name,users,gz_rate,attach_rate,up_flow,down_flow,servince_count from sqmdb.rpt_city_area_scene_show_d where city='"+cityparam+"' and area='"+_area+"' and c_scene_name='"+scene+"' and sdate=date'"+sdate+"' and c_custom_name!='' order by users desc";
				}
				
			}else{
				if(_area.equals("0")||_area.equals("全市")){
					
					sql = "select c_custom_name,users,kqi_rate,attact_rate,up_flow,down_flow,servince_count from sqmdb.rpt_custom_right_table_rate_d where sdate='"+sdate+"' and city='"+cityparam+"' and c_custom_name!='' and c_scene_name='"+scene+"' order by users desc"; 
				}
			}
			
		}else{
			if(_area.equals("0")||_area.equals("全市")){
				sql = "select c_scene_name,users,rate,attach_rate,up_flow,down_flow,servince_count from sqmdb.rpt_province_city_scene_d where city = '"+cityparam+"' and sdate = '"+sdate+"' and c_scene_name != '' order by users desc";
			}else{
				_area = _area.substring(0, 2);
				sql = "select c_scene_name,users,rate,attach_rate,up_flow,down_flow,servince_count from sqmdb.rpt_area_scene_d where sdate='"+sdate+"' and city='"+cityparam+"' and area like '"+_area+"%' and c_scene_name != '' order by users desc";
			}
		}
		List<Record> list = DbDo.query(sql);
		
		return list;
	}
	
}
