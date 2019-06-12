sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("z_flp_inplace.controller.Inplace", {

		getMyComponent: function() {
			"use strict";
			var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
			return sap.ui.component(sComponentId);
		},

		onAfterRendering: function() {

			var oHashChanger = new sap.ui.core.routing.HashChanger();
			var currentHash = oHashChanger.getHash();
			var hashArray = currentHash.split("-");
			var sapApplication;
			//          jQuery.sap.getUriParameters().get("appname") - Does not handle encoding when using the FLP		    
			if (!hashArray[1]) {
				sapApplication = jQuery.sap.getUriParameters().get("application");
			} else {
				sapApplication = this.getMyComponent().getComponentData().startupParameters.application[0];
			}
			var sOperation = "/WebApplicationSet('" + sapApplication + "')";
			var oView = this.getView();
			var oModel = oView.getModel();

			oModel.read(sOperation, null, null, true, function(oData, oResponse) {
				var webApplication = oData;
				var Scheme, Host, Domain, Port, Path, Query, embeddedURL;
				Scheme = webApplication.Scheme;
				Host = webApplication.Host;
				Domain = webApplication.Domain;
				Port = webApplication.Port;
				Path = webApplication.Path;
				Query = webApplication.Query;
				embeddedURL = Scheme + Host + Domain + Port + Path + Query;

				var htmlElement = oView.byId("iframeContent");
				var htmlGeneration = "<iframe id='sapUI' src='"+embeddedURL+"' width='100%' height='100%' seamless></iframe>";
				htmlElement.setContent(htmlGeneration);		
				// var html = new sap.ui.core.HTML({
				// 	preferDOM: true,
				// 	content: "<iframe id='sapUI' src='" + embeddedURL + "' width='100%' height='100%' seamless></iframe>"
				// });
				// iframe.destroyItems();
				// iframe.addItem(html);

				// var iframeHTMLsection = oView.byId("inplace_content");
				// var htmlGeneration = "<iframe id='sapUI' src='"+embeddedURL+"' seamless></iframe>";

				// iframeHTMLsection.destroyItems();
				// iframe.addItem(html);
				// iframeHTMLsection.addItem(htmlGeneration);
				// iframeHTMLsection.setContent(htmlGeneration);				
			});
		}

	});

});