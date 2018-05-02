var cfg = {
		tile:{
			type:'file',
			url:'/home/gpadmin/do/maps/'
		},
	    map: {
	        center: [31.86939, 117.28455],
	        zoom: 5,
	        maxZoom: 14,
	        miniMapControl: true
	    },
	    layers: [{
	        url: '/tile?lyrs=m&x={x}&y={y}&z={z}',
	        subdomains: [],
	        name: '地图',
	        type: 'tile',
	        show: true,
	        isBaseLayer: true
	    }, {
	        url: '/tile?lyrs=s&x={x}&y={y}&z={z}',
	        subdomains: [],
	        name: '卫星',
	        type: 'tile',
	        show: false,
	        isBaseLayer: true
	    }],
	    heatMapCfg: {
	        // 0.0058 radius should be small ONLY if scaleRadius is true (or small radius is intended)
	        "radius": 0.019,
	        "maxOpacity": 0.5,
	        // scales the radius based on map zoom
	        "scaleRadius": true,
	        // if set to false the heatmap uses the global maximum for colorization
	        // if activated: uses the data maximum within the current map boundaries
	        //   (there will always be a red spot with useLocalExtremas true)
	        "useLocalExtrema": false,
	        // which field name in your data represents the latitude - default "lat"
	        latField: 'lat',
	        // which field name in your data represents the longitude - default "lng"
	        lngField: 'lng',
	        // which field name in your data represents the data value - default "value"
	        valueField: 'rate'
	    }
}
