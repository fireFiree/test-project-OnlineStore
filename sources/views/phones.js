import {JetView} from "webix-jet";
import {phones} from "../models/phones";
import {bag} from "../models/bag";
import PhoneWindowView from "../views/phoneWindow";
import "../components/activeDatatable";

function phoneImage(obj) {
	return `<div class= 'small-phoneImageContainer'><img class='small-phoneImage' src='${obj.image}'/></div>`;
}

export default class PhonesView extends JetView {
	config() {
		const phonesTable = {
			view: "activeDatatable",
			id: "phonesTable",
			select: true,
			rowHeight: 80,
			activeContent: {
				amountCounter: {
					id: "counter",
					view: "counter",
					step: 1,
					value: 0,
					width: 120,
					max: 100
				}
			},
			columns: [
				{id: "image",	header: "Image", template: phoneImage, width: 150},
				{id: "name", 	header: ["Name", {content: "textFilter"}], sort: "string", maxWidth: 200, fillspace: true},
				{id: "price", 	header: "Price", sort: "int"},
				{id: "rating",	header: "Rating", sort: "int"},
				{
					header: "Amount",
					template: "<div class = 'amoCounter'>{common.amountCounter()}</div>",
					width: 150
				},
				{id: "Buy", header: "Buy", template: "<div class = 'shopCartIco'><span style='font-size:30px' class='webix_icon fa-shopping-basket'></span></div>"}
			],
			on: {
				onItemDblClick(id) {
					let item = this.getItem(id);
					this.$scope.win.show(item);
				},
				onAfterFilter() {
					this.blockEvent("onAfterFilter");
					this.$scope.app.callEvent("categoryFiltering");
					this.unblockEvent("onAfterFilter");
				}
			},
			onClick: {
				"fa-shopping-basket": function (ev, id) {
					this.$scope.addToBag(ev, id);
					this.$scope.refreshBadge();
				}
			}
		};
		return phonesTable;
	}

	refreshBadge() {
		let amo = 0;
		bag.data.each(
			(obj) => {
				amo += obj.amountCounter;
			}
		);
		$$("bag").define("badge", amo);
		$$("bag").refresh();
	}

	init(view) {
		view.parse(phones);
		this.win = this.ui(PhoneWindowView);


		let table = $$("phonesTable");
		this.on(this.app, "categoryFiltering", () => {
			table.filterByAll();
		});
	}

	addToBag(ev, id) {
		let item = $$("phonesTable").getItem(id);
		// crutch
		if (typeof item.amountCounter == "undefined") {
			item.amountCounter = 0;
		}

		if (!bag.exists(item.id) && item.amountCounter !== 0) {
			item.sum = item.amountCounter * item.price;
			bag.add(webix.copy(item));
			$$("counter").setValue(0);
		}
		else if (item.amountCounter !== 0) {
			let dataItem = bag.getItem(id);
			dataItem.amountCounter += item.amountCounter;
			dataItem.sum = dataItem.amountCounter * dataItem.price;
			$$("counter").setValue(0);
		}
		else {
			webix.alert({
				title: "Warning",
				type: "alert-warning",
				text: "The amount of items you are trying to add to your bag is zero"
			});
		}
		return item.amountCounter;
	}
}
