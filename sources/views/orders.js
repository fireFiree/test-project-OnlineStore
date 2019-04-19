import {JetView} from "webix-jet";
import {orders} from "../models/orders";
import OrdersWindowView from "../views/orderWindow";

const overlayTemplate = `
<h1>
	Ooops....
	<br/>
	Seems that you haven't made any orders yet :(
</h1>
`;


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
					if (JSON.parse(localStorage.getItem("currUser")).isAdmin) {
						let item = this.getItem(id);
						this.$scope.win.show(item);
					}
				},
				"data->onStoreLoad": function () {
					this.adjustRowHeight();
				},
				onAfterLoad() {
					if (!this.data.order.length) {
						this.showOverlay(overlayTemplate);
					}
				}
			}
		};

		return ordersTable;
	}
	init(view) {
		webix.extend($$("orders:datatable"), webix.OverlayBox);
		webix.extend($$("orders:datatable"), webix.ProgressBar);
		$$("orders:datatable").showProgress({
			type: "icon"
		});

		setTimeout(() => {
			view.parse(
				currUser.isAdmin
					? orders
					: Object.values(orders.data.pull).filter(obj => obj.buyerEmail === currUser.email));

			$$("orders:datatable").hideProgress();
		}, 2000);

		const currUser = JSON.parse(localStorage.getItem("currUser"));


		this.win = this.ui(OrdersWindowView);
	}
}
