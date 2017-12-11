import {JetView} from "webix-jet";
import {categories} from "models/categories";


export default class TopView extends JetView {
	config() {
		const header = {
			cols: [
	 			{view: "template", template: "VarinShop!", type: "header", borderless: true},
				{view: "button", label: "Hi, varyas!", borderless: true},
				{view: "button", label: "Logout", borderless: true, width: 100},
				{view: "button", label: "History", borderless: true, width: 100},
				{view: "button", label: "Bag", borderless: true, width: 100}
			]
		};

		const tree = {view: "tree",
			id: "top:catalogTree",
			select: true,
			maxWidth: 400,
			on: {
				onItemClick: function(id){
					let item = this.getItem(id);
					this.$scope.app.callEvent("categoryFiltering", [item.value]);
				}
			}
		};

		const ui = {rows: [
			header,
			{cols: [tree, {$subview: true}]}
		]};

		return ui;
	}
	init() {
		$$("top:catalogTree").parse(categories);
	}
}
