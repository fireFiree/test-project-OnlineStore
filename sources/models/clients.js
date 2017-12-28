export const clients = new webix.DataCollection({
	url: "sources/staticdata/clients.js",
	scheme: {
		$init(obj) {
			if (obj.registrationDate) { obj.registrationDate = webix.i18n.parseFormatDate(obj.registrationDate); }
		},
		$save(obj) {
			if (obj.registrationDate) { obj.registrationDate = webix.i18n.parseFormatStr(obj.registrationDate); }
		}
	}
});
