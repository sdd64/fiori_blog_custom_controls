sap.ui.define([
  "sap/ui/core/UIComponent"	
], function (UIComponent) {
	return UIComponent.extend("opensap.myapp.Component", {
		metadata : {
			manifest: "json"
		},
		init : function(){
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
		}
	});
});