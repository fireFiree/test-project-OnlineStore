import {JetView} from "webix-jet";
import {bag} from "../models/bag";

function phoneImage(obj) {
	return `<div class= 'small-phoneImageContainer'><img class='small-phoneImage' src='${obj.image}'/></div>`;
}

export default class BagView extends JetView {
	config() {
		const bagTable = {
			view: "datatable",
			id: "bagTable",
			select: true,
			rowHeight: 80,
			columns: [
				{id: "image",	header: "Image", template: phoneImage, width: 150},
				{id: "name", 	header: "Name", sort: "string", fillspace: true},
				{id: "amountCounter", header: "Amount", sort: "int"},
				{id: "price", 	header: "Price", sort: "int"},
				{id: "sum",	header: "Sum", sort: "int"},
				{id: "remove", header: "", template: "<div class = 'trashIcon'><span class = 'webix_icon fa-trash-o'></span></div>", width: 60}
			],
			onClick: {
				"fa-trash-o": function (ev, id) {
					bag.remove(id);
					this.$scope.app.callEvent("onTotalChange");
					this.$scope.app.callEvent("onBagChange");
				}
			}
		};

		const orderButton = {
			view: "button",
			value: "Make Order",
			width: 120,
			click() {
				this.$scope.show("../checkout");
			}
		};

		const bagView = {
			rows: [
				bagTable,
				{
					height: 50,
					cols: [
						{
							view: "template",
							template: "<div class = 'Total'>Total</div>"
						},
						{
							width: 160,
							id: "total",
							view: "template",
							template: function (value) {
								return value;
							}
						}
					]
				},
				{
					css: {background: "white"},
					cols: [
						orderButton,
						{}
					]
				}
			]
		};
		return bagView;
	}

	init() {
		const table = $$("bagTable");
		table.parse(bag);
		if (!$$("bagTable").count()) {
			webix.alert({
				title: "Error",
				type: "alert-error",
				text: "Your bag is empty.",
				callback: () => {
					this.show("/top/phones");
				}
			});
		}

		this.on(this.app, "onTotalChange", () => {
			let sum = 0;
			table.eachRow((row) => {
				sum += table.getItem(row).sum;
			});
			$$("total").setHTML(sum || 0);
		});

		this.app.callEvent("onTotalChange");
	}
}
