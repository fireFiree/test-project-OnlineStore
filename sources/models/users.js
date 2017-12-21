export const users = new webix.DataCollection({
    url:"http://localhost:3000/api/users",
	save:"rest->http://localhost:3000/api/users",
    scheme: {
		$init(obj) {
			if (obj.registrationDate) { obj.registrationDate = webix.i18n.parseFormatDate(obj.registrationDate); }
		},
		$save(obj) {
			if (obj.registrationDate) { obj.registrationDate = webix.i18n.parseFormatStr(obj.registrationDate); }
		}
	}
});

