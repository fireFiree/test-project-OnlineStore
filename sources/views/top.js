import {JetView} from "webix-jet";
import {categories} from "../models/categories";

export default class TopView extends JetView {
	config() {
		const header = {
			id: "header",
			view: "toolbar",
			height: 50,
			css: {background: "#3498db"},
			elements: [
				{view: "template", template: "VarinShop", type: "header", borderless: true},
				{view: "template", template: "Hi, varyas!", type: "header", borderless: true},
				{css: "blueButton", view: "button", type: "icon", icon: "", id: "logout", label: "Logout", borderless: true, width: 100, click() { this.$scope.logOut(); }},
				{css: "blueButton", view: "button", type: "icon", icon: "", id: "history", label: "History", borderless: true, width: 100, click() { this.$scope.showHistory(); }},
				{css: "blueButton", view: "button", type: "icon", icon: "shopping-bag", id: "bag", label: "Bag", borderless: true, width: 100, click() { this.$scope.showBag(); }}
			]
		};

		const tree = {
			view: "tree",
			id: "top:catalogTree",
			select: true,
			maxWidth: 400,
			on: {
				onItemClick(id) {
					let item = this.getItem(id);
					this.$scope.app.callEvent("categoryFiltering", [item.value]);
				}
			}
		};

		const ui = {
			rows: [
				header,
				{
					cols: [tree, {$subview: true}]
				}
			]};
		return ui;
	}
	init() {
		$$("top:catalogTree").parse(categories);
	}
	showBag() {
		this.show("./bag");
	}
	logOut() {
		this.show("/unloggedUser/logIn");
	}
	showHistory() {
		this.show("./orders");
	}
}
