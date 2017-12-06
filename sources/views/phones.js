import {JetView} from "webix-jet";
import {phones} from "models/phones";
import PhoneWindowView from "views/phoneWindow";
import "../components/activeDatatable.js";

function phoneImage(obj) {
	return `<div class= 'small-phoneImageContainer'><img class='small-phoneImage' src='${obj.Image}'/></div>`;
}

export default class PhonesView extends JetView {
	config() {

		const phonesTable = {view: "activeDatatable",
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
				{id: "Image",	header: "Image", template: phoneImage, width: 150},
				{id: "Name", 	header: ["Name", {content: "textFilter"}], sort: "string", maxWidth: 200, fillspace: true},
				{id: "Price", 	header: "Price", sort: "int"},
				{id: "Rating",	header: "Rating", sort: "int"},
				{id: "Amount",
					header: "Amount",
					template: "{common.amountCounter()}"},
				{id: "Buy",		header: "Buy", template: "<span style='font-size:30px' class='webix_icon fa-cart-plus'></span>"}
			],
			on: {
				onItemDblClick: function(id){
					alert(id);
					var item = this.getItem(id);
					this.$scope.win.show(item);

				}
			}
		};

		return phonesTable;
	}
	init() {
		$$("phonesTable").parse(phones);
		this.win = this.ui(PhoneWindowView);

		this.win.show();
	}

}
