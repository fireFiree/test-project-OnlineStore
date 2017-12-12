export const clients = new webix.DataCollection({
    url:"sources/staticdata/clients.js",
    scheme: {
		$init(obj) {
			if (obj.RegistrationDate) { obj.RegistrationDate = webix.i18n.parseFormatDate(obj.RegistrationDate); }
		},
		$save(obj) {
			if (obj.RegistrationDate) { obj.RegistrationDate = webix.i18n.parseFormatStr(obj.RegistrationDate); }
		}
	}
});
