sap.ui.define(['sap/m/List', 'sap/m/GroupHeaderListItem'],
	function(List, GroupHeaderListItem) {
		"use strict";

		var CollapseableList = List.extend("lib.custom.CollapseableList", {
			renderer: {}
		});

		CollapseableList.prototype.onAfterRendering = function() {
			CollapseableList.prototype._enhanceListGrouper(this);
		};

		CollapseableList.prototype.icons = {
				UP: "▲",
				DOWN: "▼",
				RIGHT: "►",
				LEFT: "◄"
		};
		
		CollapseableList.prototype.addItemGroup = function(oGroup, oHeader, bSuppressInvalidate) {
			var sIconDown = CollapseableList.prototype.icons.DOWN;
			oHeader = oHeader || new GroupHeaderListItem({
				title: sIconDown + " " + oGroup.key
			});
	
			oHeader._bGroupHeader = true;
			this.addAggregation("items", oHeader, bSuppressInvalidate);
			return oHeader;
		};		
		
		
		CollapseableList.prototype._enhanceListGrouper = function(oParaList) {
				var oList = oParaList;
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
			};

			CollapseableList.prototype._isGrouper = function(oItem) {
				return oItem.getMetadata()._sClassName === "sap.m.GroupHeaderListItem";
			};

			CollapseableList.prototype._handleGrouperClick = function(oEvent) {
				var oGrouper = sap.ui.getCore().byId(oEvent.currentTarget.id);
				this._changeGrouperIcon(oGrouper);
				this._tooggleGrouperItems(oGrouper);
			};

			CollapseableList.prototype._changeGrouperIcon = function(oGrouper) {
				var sNewIcon;
				if (oGrouper.open) {
					oGrouper.open = false;
					sNewIcon = CollapseableList.prototype.icons.RIGHT;
				} else {
					oGrouper.open = true;
					sNewIcon = CollapseableList.prototype.icons.DOWN;
				}
				var sNewText = sNewIcon + oGrouper.getTitle().slice(1);
				oGrouper.setTitle(sNewText);
			};

			CollapseableList.prototype._tooggleGrouperItems = function(oGrouper) {
				var aItems = oGrouper.aItems;

				for (var i = 0; i < aItems.length; i++) {
					aItems[i].$().slideToggle();
				}
			};

			return CollapseableList;
	}, /* bExport= */ true);