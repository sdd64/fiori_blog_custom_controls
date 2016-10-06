sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
	"opensap/myapp/model/formatter"
], function(Controller, MessageToast, Filter, FilterOperator, JSONModel, formatter) {
	"use strict";

	return Controller.extend("opensap.myapp.controller.App", {
		formatter: formatter,

		onInit: function() {

		},

		_createEntryModel: function(sObjectPath) {
			var oData = this.getOwnerComponent().getModel().getData(sObjectPath);
			var oNewEntryModel = new JSONModel(oData);
			this.getView().setModel(oNewEntryModel, "entry");
			console.log(oData);
		},

		onSavePress: function() {
			var oNewEntryModel = this.getView().getModel("entry");
			var oNewEntryPayLoad = oNewEntryModel.getData();

			var mParameters = {
				success: this._handleSuccess,
				error: this._handleError
			};

			var oDataModel = this.getView().getModel();
			oDataModel.create("/ProductSet", oNewEntryPayLoad, mParameters);
		},

		onDelete: function() {
			var oView = this.getView();
			var oDataModel = oView.getModel();
			var oEntry = this.getView().getModel("entry");

			var mParameters = {
				// error, success, etc
			};

			var sObjectPath = oDataModel.createKey("ProductSet", {
				ProductID: oEntry.ProductID
			});
			var sPath = "/" + sObjectPath;

			oDataModel.remove(sPath, mParameters);
		},

		_handleSuccess: function(oData, response) {
			MessageToast.show(response.message);
			this.getRouter().navTo("master");
		},

		_handleError: function(oError) {
			MessageToast.show(oError.message);
		},

		onShowHello: function() {
			var oBundle = this.getView().getModel("i18n").getResourceBundle();
			var sRecipient = this.getView().getModel("helloPanel").getProperty("/recipient/name");
			var sMsg = oBundle.getText("helloMsg", [sRecipient]);
			MessageToast.show(sMsg);
		},

		onFilterProducts: function(oEvent) {
			var aFilter = [],
				sQuery = oEvent.getParameter("query"),
				// retrieve list control
				oList = this.getView().byId("productsList"),
				// get binding for aggregation 'items'
				oBinding = oList.getBinding("items");

			if (sQuery) {
				aFilter.push(new Filter("ProductID", FilterOperator.Contains, sQuery));
			}
			// apply filter. empty filter array removes the filter
			oBinding.filter(aFilter);

		},

		onItemSelected: function(oEvent) {
			var oSelectedItem = oEvent.getSource();
			var oContext = oSelectedItem.getBindingContext();
			var sPath = oContext.getPath();
			var oProductsDetailPanel = this.getView().byId("productDetailsPanel");

			oProductsDetailPanel.bindElement({
				path: sPath
			});
			this.getView().getModel("view").setProperty("/showPanel", true);
		},

		icons: {
			UP: "▲",
			DOWN: "▼",
			RIGHT: "►",
			LEFT: "◄"
		},

		_enhanceListGrouper: function(oEvent) {
			var oList = oEvent.getSource();
			var that = this;
			var oGrouper;
			var iCount = 0;
			var aItems = oList.getItems();
			for (var i = 0; i < aItems.length; i++) {
				if (that._isGrouper(aItems[i])) {
					oGrouper = aItems[i];
					oGrouper.aItems = [];
					oGrouper.open = true;
					oGrouper.attachBrowserEvent("click",
						that._handleGrouperClick, that);
					iCount = 0;
				} else {
					if (oGrouper) {
						oGrouper.aItems.push(aItems[i]);
						iCount++;
						oGrouper.setCount(iCount);
					}
				}
			}
		},

		getGroupHeader: function(oGroup) {
			var that = this;
			return new sap.m.GroupHeaderListItem({
				title: that.icons.DOWN + " "  + oGroup.key
			});
		},

		_isGrouper: function(oItem) {
			return oItem.getMetadata()._sClassName === "sap.m.GroupHeaderListItem";
		},

		_handleGrouperClick: function(oEvent) {
			var oGrouper = sap.ui.getCore().byId(oEvent.currentTarget.id);
			this._changeGrouperIcon(oGrouper);
			this._tooggleGrouperItems(oGrouper);
		},

		_changeGrouperIcon: function(oGrouper) {
			var sNewIcon;
			if (oGrouper.open) {
				oGrouper.open = false;
				sNewIcon = this.icons.RIGHT;
			} else {
				oGrouper.open = true;
				sNewIcon = this.icons.DOWN;
			}
			var sNewText = sNewIcon + oGrouper.getTitle().slice(1);
			oGrouper.setTitle(sNewText);
		},

		_tooggleGrouperItems: function(oGrouper) {
			var aItems = oGrouper.aItems;

			for (var i = 0; i < aItems.length; i++) {
				aItems[i].$().slideToggle();
			}
		},

		_formatState: function(sKey) {
			var oModel = ui.s2p.srm.sc.approve.util.Formatter.i18nBundle();
			var sState;

			switch (sKey) {
				case "ZEV_0S":
					sState = oModel.getText("FIRST_APPROVER");
					break;
				case "ZEV_1S":
					sState = oModel.getText("SECOND_APPROVER");
					break;
				case "ADHOC":
					sState = oModel.getText("ADHOC_APPROVER");
					break;
				default:
					sState = sKey;
					break;
			}
			return sState;
		}

	});
});