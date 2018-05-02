package com.nsn.web.lte.ctc.ah.nbiot;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;

import com.nsn.logger.Logger;
import com.nsn.web.SystemMenu;
import com.nsn.web.SystemMenuPath;
import com.nsn.web.lte.DoSystem;
import com.nsn.web.lte.DoWebApplication;
import com.nsn.web.lte.DoWebModule;
import com.nsn.web.lte.ctc.ah.nbiot.action.EsrAction;
import com.nsn.web.lte.ctc.ah.nbiot.action.GasAction;
import com.nsn.web.lte.ctc.ah.nbiot.action.GeneralAction;
import com.nsn.web.lte.ctc.ah.nbiot.action.MonitorAction;
import com.nsn.web.lte.ctc.ah.nbiot.action.PerspectAction;
import com.nsn.web.lte.ctc.ah.nbiot.action.SenseAction;
import com.nsn.web.lte.ctc.ah.nbiot.action.TerminalAction;
import com.nsn.web.lte.db.DSType;
import com.nsn.web.lte.db.SqlMap;
import com.nsn.web.lte.mvc.Actions;

public class Activator implements BundleActivator {
	private Logger log = Logger.getLogger(this.getClass().getName());
	private final static String MODULE_ID = "nbiot_id";
	private final static String MODULE_NAME = "物联网端到端分析";
	public final static String ID = "/nbiot";
	@Override
	public void start(BundleContext context) throws Exception {
		DoWebApplication webapp = new DoWebApplication(DoSystem.getWebSystem(), context.getBundle(),
				this.getClass().getClassLoader());
		webapp.setContextPath(ID);
		//set actions list to base lte
		String sense_id = ID + "/sense";
		String perspect_id = ID + "/perspect";
		String monitor_id = ID + "/monitor";
		String general_id = ID + "/general";
		String terminal_id = ID + "/terminal";
		String gas_id = ID + "/gas";
		String esr_id = ID + "/esr";
		Actions.add(sense_id,SenseAction.class);
		Actions.add(perspect_id,PerspectAction.class);
		Actions.add(monitor_id,MonitorAction.class);
		Actions.add(general_id,GeneralAction.class);
		Actions.add(terminal_id,TerminalAction.class);
		Actions.add(gas_id,GasAction.class);
		Actions.add(esr_id,EsrAction.class);
		
		DoSystem.getWebSystem().addWebApplication(webapp);
		
		SqlMap.loadSql(this.getClass(),"sql_sense", DSType.DO_LTE);
		SqlMap.loadSql(this.getClass(),"sql_perspect", DSType.DO_LTE);
		SqlMap.loadSql(this.getClass(),"sql_monitor", DSType.DO_LTE);
		SqlMap.loadSql(this.getClass(),"sql_general", DSType.DO_LTE);
		// 三步一体感知
		SystemMenuPath root = new SystemMenuPath().menu(new SystemMenu().index(1).id(MODULE_ID).name(MODULE_NAME).clazz("glyphicon-globe"));
		
		final String senseName = "三步一体感知";
		SystemMenuPath sensePath = new SystemMenuPath(root.clone()).menu(new SystemMenu().id(sense_id).name(senseName).icon("fa-map"));
		DoWebModule senseModule = new DoWebModule(webapp,sense_id, senseName, sensePath).setModuleUrl(sense_id);
		webapp.addWebModule(senseModule);
		
		
		
		log.info("DO LTE Web perception STARTED!");
	}

	@Override
	public void stop(BundleContext arg0) throws Exception {
		log.info("DO LTE Web perception STOPPED.");
	}
}
