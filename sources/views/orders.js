import {JetView} from "webix-jet";
import {orders} from "../models/orders";
import OrdersWindowView from "../views/orderWindow";

export default class OrdersView extends JetView {
	config() {
		const clmns = [
			{id: "id", header: "#", width: 40},
			{
				id: "options",
				name: "options",
				header: ["Product", {content: "textFilter"}],
				width: 170,
				sort: "string",
				template(item) {
					let out = "";
					if (typeof item.options !== "object") {
						item.options = JSON.parse(item.options);
					}
					item.options.forEach((elem) => {
						out += `<span class='prodInfo'>${elem.product} x ${elem.amount}</span>`;
					});
					return out;
				}
			},
			{id: "buyerName", header: ["BuyerName", {content: "textFilter"}], width: 120},
			{id: "buyerEmail", header: "BuyerEmail", fillspace: 2, minWidth: 100},
			{id: "address", header: "Address", sort: "string", fillspace: 2, minWidth: 100},
			{id: "delivery", header: "Delivery", sort: "string", width: 120},
			{id: "payment", header: "Payment", sort: "string", width: 100},
			{id: "orderDate", header: "Order Date", sort: "string", width: 120, format: webix.i18n.dateFormatStr},
			{id: "status", header: "Status", sort: "string", width: 100}
		];

		const ordersTable = {
			view: "datatable",
			id: "orders:datatable",
			columns: clmns,
			rowLineHeight: 29,
			fixedRowHeight: false,
			rowHeight: 29,
			autoWidth: true,
			on: {
				onItemClick(id) {
					let item = this.getItem(id);
					this.$scope.win.show(item);
				},
				"data->onStoreLoad": function(){
					this.adjustRowHeight();
				}
			}
		};

		return ordersTable;
	}
	init(view) {
		view.parse(orders);
		this.win = this.ui(OrdersWindowView);
	}
}
