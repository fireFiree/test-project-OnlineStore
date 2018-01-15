import {JetView} from "webix-jet";

function checkSecurityLevel() {
	let len = $$("passwordInput").getValue().length;
	if (len < 5) {
		return ["red", "battery-empty"];
	}
	else if (len < 10) {
		return ["orange", "battery-half"];
	}
	return ["green", "battery-full"];
}

function displaySecurityLevel() {
	let ico = checkSecurityLevel();
	$$("passSecurityLevel").setHTML(`<span style='font-size:25px;
	color: ${ico[0]}' class='webix_icon fa-${ico[1]}'></span>`);
}

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
					required: true,
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
					required: true,
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
					required: true,
					invalidMessage: "Empty password field is not allowed",
					on: {
						onTimedKeyPress: displaySecurityLevel
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
					invalidMessage: "Password wasn`t confirmed",
					required: true
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
								$$("regForm").clearValidation();
								if ($$("regForm").validate()) {
									this.$scope.app.callEvent("onRegistration", [$$("regForm").getValues()]);
								}
							}
						},
						{
							view: "template",
							id: "passSecurityLevel",
							borderless: true
						}
					]
				}
			],
			rules: {
				name(value) { return value.trim() !== ""; },
				email(value) { return webix.rules.isEmail(value); },
				password(value) { return value.trim() !== ""; },
				confPass(value) { return value === $$("passwordInput").getValue(); }
			}
		};
		return form;
	}
}
