import {JetView} from "webix-jet";
import {orders} from "../models/orders";
import {bag} from "../models/bag";

export default class CheckoutView extends JetView {
	config() {
		const elems = [
			{view: "text", label: "Your Name", name: "buyerName", placeholder: "Type Your Name", invalidMessage: "Your Name can't be Empty"},
			{view: "text", label: "Email", name: "buyerEmail", placeholder: "Type Your Email", invalidMessage: "Incorrect Email"},
			{view: "text", label: "Phone", name: "phone", placeholder: "Type Your Phone", invalidMessage: "Incorrect Phone"},
			{view: "richselect", label: "Delivery Type", name: "deliveryType", options: ["Courier", "Post", "Pickup"]},
			{view: "text", label: "Address", name: "address", placeholder: "Type Your Address", invalidMessage: "Delivery Address can't be Empty"},
			{view: "richselect", label: "Payment Type", name: "paymentType", options: ["Card", "Terminal", "Cash"]},
			{view: "button", value: "Checkout", click() { this.$scope.makeOrder(); }},
			{}
		];

		const rls = {
			buyerName: webix.rules.isNotEmpty,
			buyerEmail: webix.rules.isEmail,
			phone: webix.rules.isNotEmpty,
			address: webix.rules.isNotEmpty
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
	makeOrder() {
		this.saveForm();
		bag.clearAll();
		this.app.callEvent("OnBagChange");
		this.show("/top/orders");
	}
	saveForm() {
		let form = $$("checkout:form");
		if (form.validate()) {
			let item = form.getValues();
			let options = [];
			bag.data.each(
				(obj) => {
					options.push(
						{
							product: obj.name,
							amount: obj.amountCounter
						});
				}
			);
			item.options = options;
			let currDate = new Date();
			currDate = webix.Date.datePart(currDate);
			item.orderDate = currDate;
			item.status = "In Process";
			orders.add(item);
		}
	}
}
