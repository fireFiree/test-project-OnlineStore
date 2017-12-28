export const phones = new webix.DataCollection({
	url: "http://localhost:3000/api/phones",
	save: "rest->http://localhost:3000/api/phones"
});
