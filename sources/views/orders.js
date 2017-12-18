import {JetView} from "webix-jet";
import {orders} from "models/orders";
import OrdersWindowView from "views/orderWindow"


export default class OrdersView extends JetView {
	config() {
		const clmns = [
			{id: "id", header: "#", width: 40},
			{id: "product", header: ["Product", {content: "textFilter"}], width: 250, sort: "string"},
			{id: "amount", header: "Amount", sort: "int", width: 70},
			{id: "buyerName", header: ["BuyerName", {content: "textFilter"}], width: 120},
			{id: "buyerEmail", header: "BuyerEmail", width: 100},
			{id: "address", header: "Address", sort: "string", width: 200},
			{id: "delivery", header: "Delivery", sort: "string", width: 80},
			{id: "payment", header: "Payment", sort: "string", width: 80},
			{id: "orderDate", header: "Order Date", sort: "string", width: 80, format: webix.i18n.dateFormatStr},
			{id: "status", header: "Status", sort: "string", width: 80}
		];

		const ordersTable = {
			view: "datatable",
			id: "orders:datatable",
			columns: clmns,
			rowHeight: 80,
			on: {
				onItemClick(id) {
					let item = this.getItem(id);
					this.$scope.win.show(item);
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
