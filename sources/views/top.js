import {JetView} from "webix-jet";
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
				{css: "blueButton", view: "button", type: "icon", icon: "area-chart ", id: "stats", label: "Statistics", borderless: true, width: 100, click() { this.$scope.showStats(); }},
				{css: "blueButton", view: "button", type: "icon", icon: "sign-out", id: "logout", label: "Logout", borderless: true, width: 100, click() { this.$scope.logOut(); }},
				{css: "blueButton", view: "button", type: "icon", icon: "history ", id: "history", label: "History", borderless: true, width: 100, click() { this.$scope.showHistory(); }},
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
		const categoryTree = {
			view: "tree",
			id: "top:categoryTree",
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
					cols: [{rows: [categoryTree, adminMenu]}, {$subview: true}]
				}
			]};
		return ui;
	}
	init() {
		$$("top:categoryTree").parse(categories);

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
		if (bag.getFirstId()) { this.show("./bag"); }
		else {
			webix.message({
				text: "Your bag is empty",
				type: "error",
				expire: 1000,
				id: "emptyBagMessage"
			});
		}
	}
	logOut() {
		this.show("../unloggedUser/logIn");
	}
	showHistory() {
		this.show("./orders");
	}
	showStats() {
		this.show("./stats");
	}
}
