sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"z_flp_inplace/model/models"
], function(UIComponent, Device, models) {
	"use strict";
	return UIComponent.extend("z_flp_inplace.Component", {
		metadata: {
			"version": "1.0.0",
			"rootView": {
				viewName: "z_flp_inplace.view.Inplace",
				type: sap.ui.core.mvc.ViewType.XML
			},
			"dependencies": {
				"libs": [
					"sap.ui.core",
					"sap.m",
					"sap.ui.layout"
				]
			},
			"config": {
				"i18nBundle": "z_flp_inplace.i18n.i18n",
				"icon": "",
				"favIcon": "",
				"phone": "",
				"phone@2": "",
				"tablet": "",
				"tablet@2": "",
				"fullWidth": true,
				"serviceConfig": {
					"name": "Z_FLP_INPLACE_NAVIGATION_SRV",
					"serviceUrl": "/sap/opu/odata/sap/Z_FLP_INPLACE_NAVIGATION_SRV/"
				}
			}
		},
		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this method, the resource and application models are set.
		 * @public
		 * @override
		 */
		init: function() {
			var mConfig = this.getMetadata().getConfig();
			// set the i18n model
			this.setModel(models.createResourceModel(mConfig.i18nBundle), "i18n");
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			//			Tweak
			var sServiceUrl = mConfig.serviceConfig.serviceUrl;
			var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
			this.setModel(oModel);
			this.zSapApp = sap.ushell.services.AppConfiguration.getCurrentAppliction(); //this is used again in exit below to remove the title
		},
		exit: function() {
			var e = sap.ushell.services.AppConfiguration.getMetadata(this.zSapApp);
			e.title = "";
		}
	});
});