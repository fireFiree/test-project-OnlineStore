import {JetView} from "webix-jet";
import {orders} from "models/orders";


export default class OrdersWindowView extends JetView {
	config() {
		const form = {
			view: "form",
			elements: [
				{view: "richselect",
					label: "Status",
					name: "status",
					options: ["In Process", "Declined"],
					on: {onChange() {
						if (this.getValue() === "Declined") {
							$$("declineReason").show();
						}
						else {
							$$("declineReason").hide();
						}
					}}},
				{view: "text", id: "declineReason", label: "Decline Reason", name: "declineReason", hidden: true, placeholder: "Type The Reason", invalidMessage: "Reason can't be Empty"},
				{view: "button", value: "Save", click() { this.$scope.saveForm(); }}
			],
			rules: {
				declineReason: webix.rules.isNotEmpty
			}

		};

		const window = {
			view: "window",
			width: 500,
			height: 400,
			id: "statuschange:form",
			position: "center",
			modal: true,
			head: {
				view: "toolbar",
				cols: [
					{view: "label", label: "Change Status", name: "header"},
					{view: "icon", icon: "times", click() { this.$scope.close(); }}
				]
			},
			body: form
		};

		return window;
	}

	show(obj) {
		this.getRoot().show();
		this.getRoot().queryView({view: "form"}).parse(obj);
	}

	close() {
		this.getRoot().hide();
	}

	saveForm() {
		let form = this.getRoot().queryView({view: "form"});

		if (form.validate()) {
			let item = form.getValues();
			orders.updateItem(item.id, item);
			this.getRoot().hide();
		}
	}
}
