sap.ui.define(['sap/m/GroupHeaderListItem'],
	function(GroupHeaderListItem) {
		"use strict";

		var CollapseableGroupHeaderListItem = GroupHeaderListItem.extend("lib.acando.CollapseableGroupHeaderListItem", {
			metadata: {
				events: {},
				properties: {
					open: {
						type: "boolean",
						group: "Appearance",
						defaultValue: true
					}
				},
				associations: {
					groupedItems: {
						type: "sap.m.ListItemBase",
						multiple: true,
						singularName: "groupedItem"
					}
				}
			},
			renderer: {
				renderLIContent: function(rm, oLI) {
					var sTextDir = oLI.getTitleTextDirection();
					rm.write("<span class='sapMGHLITitle'");

					if (sTextDir !== sap.ui.core.TextDirection.Inherit) {
						rm.writeAttribute("dir", sTextDir.toLowerCase());
					}

					rm.write(">");
					
					rm.writeEscaped( oLI.getIcon() + " " +   oLI.getTitle());
					rm.write("</span>");
		
					var iCount;
					var aGroupedItems = oLI.getGroupedItems();
					if (aGroupedItems) {
						iCount = aGroupedItems.length;
					}
					
					if (iCount) {
						rm.write("<span class='sapMGHLICounter'>");
						rm.writeEscaped(" (" + iCount + ")");
						rm.write("</span>");
					}
				}
			}
		});

		CollapseableGroupHeaderListItem.prototype.getIcon = function() {
			return this.getOpen() ? "▼" : "►";
		};

		CollapseableGroupHeaderListItem.prototype.onclick = function() {
			this._toggleGrouperState();
			this._toggleGrouperItems();
		};

		CollapseableGroupHeaderListItem.prototype._toggleGrouperItems = function() {
			var aItems = this.getGroupedItems();
			var oCore = sap.ui.getCore();

			for (var i = 0; i < aItems.length; i++) {
				var oItem = oCore.byId(aItems[i]);
				oItem.$().slideToggle();
			}
		};

		CollapseableGroupHeaderListItem.prototype._toggleGrouperState = function() {
			var bNewState = !this.getOpen();
			this.setOpen(bNewState);
		};

		return CollapseableGroupHeaderListItem;
	}, /* bExport= */ true);