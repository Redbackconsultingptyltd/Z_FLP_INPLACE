sap.ui.jsview("z_flp_inplace.view.Inplace", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf controller.Inplace
	 */
	getControllerName: function() {
		return "z_flp_inplace.controller.Inplace";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away.
	 * @memberOf controller.Inplace
	 */
	createContent: function(oController) {
		var oPage = new sap.m.Page("inplacePage",{
//			title: "{i18n>title}",
			showHeader: false,
			enableScrolling: false,
			content: [
				new sap.ui.core.HTML({
					id: this.createId("inplace_content"),
					preferDOM: true,
					content:""
				})
			]
		});

		var app = new sap.m.App("inplaceApp", {
//			initialPage: "oPage"
		});
		app.addPage(oPage);
		return app;
	}

});