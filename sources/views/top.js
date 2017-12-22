import {JetView, plugins} from "webix-jet";
import {categories} from "../models/categories";
import {bag} from "../models/bag";

export default class TopView extends JetView {
	config() {
		const header = {
			id: "header",
			view: "toolbar",
			height: 50,
			css: {background: "#3498db"},
			elements: [
				{view: "template", template: "<a route='/top/phones'>VarinShop</a>", type: "header", borderless: true},
				{view: "template", template: "Hi, varyas!", type: "header", borderless: true},
				{css: "blueButton", view: "button", type: "icon", icon: "", id: "logout", label: "Logout", borderless: true, width: 100, click() { this.$scope.logOut(); }},
				{css: "blueButton", view: "button", type: "icon", icon: "", id: "history", label: "History", borderless: true, width: 100, click() { this.$scope.showHistory(); }},
				{css: "blueButton", view: "button", type: "icon", icon: "shopping-bag", id: "bag", label: "Bag", borderless: true, width: 100, click() { this.$scope.showBag(); }}
			]
		};
		let adminMenu = {
			view: "list",
			id: "top:menu",
			layout: "y",
			template: "<span class='webix_icon fa-#icon#'></span> #value# ",
			data: [
				{value: "Users", 		id: "clientsInfo", 	icon: "users"},
				{value: "Orders",		id: "orders",		icon: "archive"},
				{value: "Add Product", 	id: "addProduct", 	icon: "cart-plus"}
			],
			on: {
				onItemClick: function (id) {
					let item = this.getItem(id);
					this.$scope.show(`./${item.id}`);
				}
			}
		};
		const tree = {
			view: "tree",
			id: "top:catalogTree",
			select: true,
			maxWidth: 400,
			on: {
				onAfterSelect: function () {
					this.$scope.app.callEvent("categoryFiltering");
				}
			}
		};

		const ui = {
			rows: [
				header,
				{
					cols: [{rows: [tree, adminMenu]}, {$subview: true}]
				}
			]};
		return ui;
	}
	init() {
		$$("top:catalogTree").parse(categories);

		this.on(this.app, "onBagChange", () => {
			this.refreshBadge();
		});
	}
	refreshBadge() {
		let amo = 0;
		bag.data.each(
			(obj) => {
				amo += obj.amountCounter;
			}
		);
		$$("bag").define("badge", amo);
		$$("bag").refresh();
	}
	showBag() {
		this.show("./bag");
	}
	logOut() {
		this.show("../unloggedUser/logIn");
	}
	showHistory() {
		this.show("./orders");
	}
}
