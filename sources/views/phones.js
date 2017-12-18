import {JetView} from "webix-jet";
import {phones} from "models/phones";
import PhoneWindowView from "views/phoneWindow";
import "../components/activeDatatable.js";

function phoneImage(obj) {
	return `<div class= 'small-phoneImageContainer'><img class='small-phoneImage' src='${obj.image}'/></div>`;
}

export default class PhonesView extends JetView {
	config() {
		const phonesTable = {
			view: "activeDatatable",
			id: "phonesTable",
			rowHeight: 80,
			activeContent: {
				amountCounter: {
					view: "counter",
					step: 1,
					value: 0
				}
			},
			columns: [
				{id: "image",	header: "Image", template: phoneImage, width: 150},
				{id: "name", 	header: ["Name", {content: "textFilter"}], sort: "string", maxWidth: 200, fillspace: true},
				{id: "price", 	header: "Price", sort: "int"},
				{id: "rating",	header: "Rating", sort: "int"},
				{id: "amount",	header: "Amount", template: "{common.amountCounter()}"},
				{
					id: "Buy",
					header: "Buy",
					template: "<span class='webix_icon fa-cart-plus bigSpan'></span>"
				}
			],
			on: {
				onItemDblClick(id) {
					let item = this.getItem(id);
					this.$scope.win.show(item);
				}
			}
		};

		return phonesTable;
	}
	init(view) {
		view.parse(phones);
		
		this.win = this.ui(PhoneWindowView);

		this.on(this.app, "categoryFiltering", (value) => {
			let table = $$("phonesTable");

			if (value !== "Phones") {
				table.filter("#name#", value);
			}
			else {
				table.filter(() => true);
			}
		});
	}
}
