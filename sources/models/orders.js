export const orders = new webix.DataCollection({
    url:"sources/staticdata/orders.js",
    scheme: {
		$init(obj) {
			if (obj.OrderDate) { obj.OrderDate = webix.i18n.parseFormatDate(obj.OrderDate); }
		},
		$save(obj) {
			if (obj.OrderDate) { obj.OrderDate = webix.i18n.parseFormatStr(obj.OrderDate); }
		}
	}
});
