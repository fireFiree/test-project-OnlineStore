export const history = new webix.DataCollection({
    url:"sources/staticdata/history.js",
    scheme: {
		$init(obj) {
			if (obj.OrderDate) { obj.OrderDate = webix.i18n.parseFormatDate(obj.OrderDate); }
		},
		$save(obj) {
			if (obj.OrderDate) { obj.OrderDate = webix.i18n.parseFormatStr(obj.OrderDate); }
		}
	}
});
