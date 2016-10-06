sap.ui.define(['sap/m/GroupHeaderListItem'],
	function(GroupHeaderListItem) {
		"use strict";

		var CollapseableGroupHeaderListItem = GroupHeaderListItem.extend("lib.custom.CollapseableGroupHeaderListItem", {
			renderer: {}
		});

		return CollapseableGroupHeaderListItem;
	}, /* bExport= */ true);