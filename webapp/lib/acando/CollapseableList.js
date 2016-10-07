sap.ui.define(['sap/m/List', './CollapseableGroupHeaderListItem'],
	function(List, CollapseableGroupHeaderListItem) {
		"use strict";

		var CollapseableList = List.extend("lib.acando.CollapseableList", {
			renderer: {}
		});

		CollapseableList.prototype.onAfterRendering = function() {
			CollapseableList.prototype._enhanceListGrouper(this);
		};

		CollapseableList.prototype.addItemGroup = function(oGroup, oHeader, bSuppressInvalidate) {
			oHeader = new CollapseableGroupHeaderListItem({
				title: oGroup.key
			});
	
			oHeader._bGroupHeader = true;
			this.addAggregation("items", oHeader, bSuppressInvalidate);
			return oHeader;
		};		
		
		
		CollapseableList.prototype._enhanceListGrouper = function(oParaList) {
				var oList = oParaList;
				var that = this;
				var oGrouper;
				var aItems = oList.getItems();
				for (var i = 0; i < aItems.length; i++) {
					if (that._isGrouper(aItems[i])) {
						oGrouper = aItems[i];
					} else {
						oGrouper.addGroupedItem(aItems[i]);
					}
				}
			};

			CollapseableList.prototype._isGrouper = function(oItem) {
				return oItem.getMetadata()._sClassName === "lib.acando.CollapseableGroupHeaderListItem";
			};

			return CollapseableList;
	}, /* bExport= */ true);