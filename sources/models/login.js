export default new webix.DataCollection({
	url: "http://localhost:3000/api/login",
	save: "rest->http://localhost:3000/api/login",
	scheme: {
		/* $init(obj) {
			if (obj.orderDate) { obj.orderDate = webix.i18n.parseFormatDate(obj.orderDate); }
		},
		$save(obj) {
			if (obj.orderDate) { obj.orderDate = webix.i18n.parseFormatStr(obj.orderDate); }
			if (obj.options) { obj.options = JSON.stringify(obj.options); }
		} */
	}
});
