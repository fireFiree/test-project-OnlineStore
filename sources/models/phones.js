export const phones = new webix.DataCollection({
	url:"http://localhost:3000/api/phones",
	save:"rest->http://localhost:3000/api/phones",
	scheme: {
		$init(obj) {
			if (!obj.rating) { obj.rating = 0 }
		}
	}
});
