L.Volte = L.Class.extend({
  /**
   * 初始化方法
   *
   * @param {echarts} ec
   * @private
   */
  initialize: function(div, kpis) {
    try {
      var me = this;
      //var cfg = N.GIS_CFG;
      cfg.map.zoom = 12;
      me.nsnMap = L.nsnMap(div, cfg);
      me.map = me.nsnMap.getMap();
      me.heatmapLayer = L.heatmapOverlay(cfg.heatMapCfg);
      me.nsnMap.addOverlay({
        name: '热点图',
        layer: me.heatmapLayer,
        show: true
      });
      me.markerCluster = new L.MarkerClusterGroup();
      me.nsnMap.addOverlay({
        layer: me.markerCluster,
        name: '扇区图层',
        show: true
      });
      me.loadingControl = L.Control.loading();
      me.map.addControl(me.loadingControl);
      var attrs = [];
      attrs.push('<b>KPI内容选择项：</b>');
      attrs.push('<select id="gis_kpi" style="width:120px">');
      for (var i = 0, kpi; kpi = kpis[i]; i++) {
        if(i == 0){
          attrs.push('<option value ="' + kpi + '" selected=true>' + kpi + '</option>');
        }else{
          attrs.push('<option value ="' + kpi + '">' + kpi + '</option>');
        }
      }
      attrs.push("</select>");
      var infoControl = L.control({
        position: 'topright'
      });
      infoControl.onAdd = function(map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update(attrs);
        return this._div;
      };
      infoControl.update = function(attrs) {
        if ($.isArray(attrs)) {
          this._div.innerHTML = attrs.join('<br>');
        } else {
          this._div.innerHTML = attrs;
        }
      };
      infoControl.addTo(me.map);
      $('#gis_kpi').on("change", function(e) {
        me.kpi = $(this).val();
        me.loadingControl.showIndicator();
        me.loadCells(me.cells);
      });
    } catch (err) {
      alert(err);
    }
  },
  setKpi: function(kpi) {
    this.kpi = kpi;
    $('#gis_kpi').val(kpi);
  },
  loadCells: function(cells) {
    try {
      var me = this;
      me.cells = cells;
      me.markerCluster.clearLayers();
      if (cells && cells.length > 0) {
        var pts = [],max=0,min=1000000;
        for (var i = 0, cell; cell = cells[i++];) {
          if (!cell.LONGITUDE || !cell.LATITUDE) {
            continue;
          }
          var lonLat = GPS.gcj_encrypt(parseFloat(cell.LATITUDE), parseFloat(cell.LONGITUDE));
          var m = L.marker(lonLat);
          var cont = me.buildContent(cell);
          m.bindPopup(cont.join(''), { offset: [2, -28], maxWidth: 800 });
          me.markerCluster.addLayer(m);
          if(me.kpi){
            var rate = cell[me.kpi];
            max = Math.max(max,rate);
            min = Math.min(min,rate);
            if(me.kpi == 'MOS'){
              rate = 4 - rate;
            }else if(me.kpi == '接通率' || me.kpi == 'ESRVCC成功率' ){
              rate = 100 - rate;
            }
            pts.push({
              lat: lonLat.lat,
              lng: lonLat.lon,
              rate: rate
            });
          }
        }
        if(me.kpi){
          if(me.kpi == 'MOS'){
            max = 4;
          }else if(me.kpi == '接通率' || me.kpi == 'ESRVCC成功率' ){
            max = 100;
            min = 40;
          }else if(me.kpi == '呼叫建立时延'){
            max = 8000;
          }else if(me.kpi == 'ESRVCC时延'){
            max = 3000;
          }
          var testData = {
            max: max,
            min: min,
            data: pts
          };
          me.heatmapLayer.setData(testData);
        }
        //this.map.fitBounds(this.markerCluster.getBounds());
      }
      this.loadingControl.hideIndicator();
    } catch (err) {
      me.loadingControl.hideIndicator();
      alert('业务聚合数据异常，无法渲染！');
    }
  },
  buildContent: function(data) {
    var cont = [];
    if (data) {
      cont.push("<table class='marker-properties'><th>KPI指标</th><th>KPI值</th><th>KPI指标</th><th>KPI值</th>");
      var i = 1;
      for(var k in data){
        if(i%2==1){
          cont.push("<tr>");
        }
        cont.push("<td>"+k+"</td><td>"+data[k]+"</td>");
        if(i%2==0){
          cont.push("</tr>");
        }
        i++;
      }
      cont.push("</table>");
    }
    return cont;
  }
});
L.volte = function(div, opts) {
  return new L.Volte(div, opts);
};
var GPS = {
  PI: 3.14159265358979324,
  x_pi: 3.14159265358979324 * 3000.0 / 180.0,
  delta: function(lat, lon) {
    // Krasovsky 1940
    //
    // a = 6378245.0, 1/f = 298.3
    // b = a * (1 - f)
    // ee = (a^2 - b^2) / a^2;
    var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
    var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
    var dLat = this.transformLat(lon - 105.0, lat - 35.0);
    var dLon = this.transformLon(lon - 105.0, lat - 35.0);
    var radLat = lat / 180.0 * this.PI;
    var magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
    return { 'lat': dLat, 'lon': dLon };
  },

  //WGS-84 to GCJ-02
  gcj_encrypt: function(wgsLat, wgsLon) {
    if (this.outOfChina(wgsLat, wgsLon)) {
      return { 'lat': wgsLat, 'lon': wgsLon };
    }
    var d = this.delta(wgsLat, wgsLon);
    return { 'lat': wgsLat + d.lat, 'lon': wgsLon + d.lon };
  },
  outOfChina: function(lat, lon) {
    if (lon < 72.004 || lon > 137.8347) {
      return true;
    }
    if (lat < 0.8293 || lat > 55.8271) {
      return true;
    }
    return false;
  },
  transformLat: function(x, y) {
    var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
    return ret;
  },
  transformLon: function(x, y) {
    var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
    return ret;
  }
};
