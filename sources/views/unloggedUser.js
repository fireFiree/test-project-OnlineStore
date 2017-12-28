import {JetView} from "webix-jet";

export function validate(title) {
	return title.trim() !== "";
}

export default class TopView extends JetView {
	config() {
		const header = {
			id: "logOutHeader",
			view: "toolbar",
			height: 50,
			css: {background: "white!important"},
			elements: [
				{view: "template", template: "VarinShop", type: "header", borderless: true, css: {background: "white!important"}},
				{view: "button", type: "htmlbutton", css: "whiteButton", id: "logIn", label: '<span class = "text">Log In</span>', width: 100, click() { this.$scope.logIn(); }},
				{view: "button", type: "htmlbutton", css: "whiteButton", id: "register", label: '<span class = "text">Register</span>', width: 100, click() { this.$scope.registration(); }}
			]
		};

		const view = {
			rows: [
				header,
				{
					id: "container",
					css: {background: "white"},
					cols: [
						{},
						{$subview: true},
						{}
					]
				}
			]
		};
		return view;
	}

	logIn() {
		this.show("./logIn");
	}

	registration() {
		this.show("./registration");
	}
}
