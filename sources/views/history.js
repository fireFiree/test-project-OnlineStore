import {JetView} from "webix-jet";
import {history} from "../models/history";

const bodyTmplt = {
	id: "statusDecline",
	view: "template",
	template: "<div class='declineReasonInfo'>#declineReason#</div>",
	name: "statusDecline"
};

const window = {
	view: "window",
	width: 300,
	height: 200,
	id: "statusDeclineWindow",
	position: "center",
	modal: true,
	head: {
		view: "toolbar",
		cols: [
			{view: "label", label: "Decline Reason"},
			{view: "icon", icon: "times", click() { $$("statusDeclineWindow").hide(); }}
		]
	},
	body: bodyTmplt
};


export default class HistoryView extends JetView {
	config() {
		const clmns = [
			{id: "product", header: ["Product", {content: "textFilter"}], fillspace: 3, sort: "string"},
			{id: "amount", header: "Amount", sort: "int", fillspace: 2},
			{id: "address", header: "Address", sort: "string", fillspace: 3},
			{id: "delivery", header: "Delivery", sort: "string", fillspace: 2},
			{id: "payment", header: "Payment", sort: "string", fillspace: 2},
			{id: "orderDate", header: "Order Date", sort: "string", fillspace: 2, format: webix.i18n.dateFormatStr},
			{id: "status", header: "Status", sort: "string", width: 100}
		];

		const historyTable = {
			view: "datatable",
			id: "history:datatable",
			columns: clmns,
			autowidth: true,
			rowHeight: 80,
			on: {
				onItemClick(id) {
					let item = this.getItem(id);
					if (item.status === "Declined") {
						this.$scope.win.show();
						$$("statusDecline").parse(item);
					}
				}
			}
		};

		return historyTable;
	}
	init(view) {
		view.parse(history);
		this.win = this.ui(window);

		this.on(this.app, "categoryFiltering", () => {
			this.show("../phones");
		});
	}
}
