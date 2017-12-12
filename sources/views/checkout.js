import {JetView} from "webix-jet";

export default class CheckoutView extends JetView {
	config() {
		const elems = [
			{view: "text", label: "Your Name", name: "Name", placeholder: "Type Your Name", invalidMessage: "Your Name can't be Empty"},
			{view: "text", label: "Email", name: "Email", placeholder: "Type Your Email", invalidMessage: "Incorrect Email"},
			{view: "text", label: "Phone", name: "Phone", placeholder: "Type Your Phone", invalidMessage: "Incorrect Phone"},
			{view: "richselect", label: "Delivery Type", name: "DeliveryType"},
			{view: "text", label: "Address", name: "Address", placeholder: "Type Your Address", invalidMessage: "Delivery Address can't be Empty"},
			{view: "richselect", label: "Payment Type", name: "PaymentType"},
			{view: "button", value: "Checkout", click() { this.$scope.saveForm(); }},
			{}
		];

		const rls = {
			Name: webix.rules.isNotEmpty,
			Email: webix.rules.isEmail,
			Phone: webix.rules.isNotEmpty,
			Address: webix.rules.isNotEmpty
		};

		const form = {
			view: "form",
			id: "checkout:form",
			elements: elems,
			rules: rls,
			elementsConfig: {
				labelWidth: 150
			}
		};

		return form;
	}
	init() {
		this.on(this.app, "categoryFiltering", () => {
			this.show("../phones");
		});
	}

	saveForm() {
		let form = $$("checkout:form");
		if (form.validate()) {
			webix.message("EZ");
		}
		else {
			webix.message("LOSER");
		}
	}
}
