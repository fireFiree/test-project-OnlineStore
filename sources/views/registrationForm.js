import {JetView} from "webix-jet";
import {validate} from "./unloggedUser";

export default class RegistrationForm extends JetView {
	config() {
		const form = {
			id: "regForm",
			view: "form",
			width: 800,
			height: 450,
			header: "Register",
			rows: [
				{
					view: "template",
					type: "header",
					template: "Register",
					bottomPadding: 0,
					borderless: true
				},
				{
					height: 40
				},
				{
					name: "name",
					attributes: {
						maxlength: 20,
						required: "true",
						title: "Maximum name length: 20 symbols"
					},
					view: "text",
					label: "<div class = 'name'><b>Name</b></div>",
					labelWidth: 250,
					bottomPadding: 15,
					width: 700,
					height: 40,
					invalidMessage: "Empty name field is not allowed"
				},
				{
					id: "emailInput",
					name: "email",
					attributes: {
						maxlength: 20,
						required: "true",
						title: "This field is necessary to fill"
					},
					type: "email",
					view: "text",
					label: "<div class = 'name'><b>E-Mail Address</b></div>",
					labelWidth: 250,
					bottomPadding: 15,
					width: 700,
					height: 40,
					invalidMessage: "Invalid E-Mail"
				},
				{
					id: "passwordInput",
					name: "password",
					type: "password",
					view: "text",
					label: "<div class = 'name'><b>Password</b></div>",
					labelWidth: 250,
					bottomPadding: 15,
					width: 700,
					height: 40,
					invalidMessage: "Empty password field is not allowed",
					on: {
						onTimedKeyPress() {
							let len = $$("passwordInput").getValue().length;
							if (len < 5) {
								webix.message("malovato");
							}
							else if (len < 10) {
								webix.message("vse esche malo");
							}
							else {
								$$("regBtn").enable();
								webix.message("vot teper horosh");
							}
						}
					}
				},
				{
					name: "confPass",
					type: "password",
					view: "text",
					label: "<div class = 'name'><b>Confirm Password</b></div>",
					labelWidth: 250,
					bottomPadding: 15,
					width: 700,
					height: 40,
					invalidMessage: "Password wasn`t confirmed"
				},
				{
					cols: [
						{gravity: 0.6},
						{
							view: "button",
							id: "regBtn",
							width: 100,
							label: "Register",
							click() {
								if ($$("regForm").validate()) {
									this.$scope.app.callEvent("onRegistration", [$$("regForm").getValues()]);
								}
							}
						},
						{}
					]
				}
			],
			rules: {
				name(value) { return validate(value); },
				email: webix.rules.isEmail,
				password(value) { return validate(value); },
				confPass(value) { return value === $$("passwordInput").getValue(); }
			}
		};
		return form;
	}

	init() {
		$$("regBtn").disable();
	}
}
