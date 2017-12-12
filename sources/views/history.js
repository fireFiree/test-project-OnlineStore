import {JetView} from "webix-jet";
import {history} from "models/history";

const bodyTmplt = {
	id: "statusDecline",
	view: "template",
	template: "<div class='declineReasonInfo'>#DeclineReason#</div>",
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
			{id: "Product", header: ["Product", {content: "textFilter"}], width: 300, sort: "string"},
			{id: "Amount", header: "Amount", sort: "int", width: 70},
			{id: "Address", header: "Address", sort: "string", width: 300},
			{id: "Delivery", header: "Delivery", sort: "string", width: 100},
			{id: "Payment", header: "Payment", sort: "string", width: 100},
			{id: "OrderDate", header: "Order Date", sort: "string", width: 100, format: webix.i18n.dateFormatStr},
			{id: "Status", header: "Status", sort: "string", width: 100}
		];

		const historyTable = {
			view: "datatable",
			id: "history:datatable",
			columns: clmns,
			rowHeight: 80,
			on: {
				onItemClick(id) {
					let item = this.getItem(id);
					this.$scope.win.show();
					$$("statusDecline").parse(item);
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
