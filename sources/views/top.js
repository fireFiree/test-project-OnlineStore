import {JetView, plugins} from "webix-jet";


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
			url: "./models/phones.js"
		};


		const ui = {rows: [
			header,
			{cols: [tree, {$subview: true}]}
		]};

		return ui;
	}
	init() {
		this.use(plugins.Menu, "top:menu");
	}
}
