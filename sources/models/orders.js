export const orders = new webix.DataCollection({
    url:"sources/staticdata/orders.js",
    scheme: {
		$init(obj) {
			if (obj.orderDate) { obj.orderDate = webix.i18n.parseFormatDate(obj.orderDate); }
		},
		$save(obj) {
			if (obj.orderDate) { obj.orderDate = webix.i18n.parseFormatStr(obj.orderDate); }
		}
	}
});
