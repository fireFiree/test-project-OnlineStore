import {JetView} from "webix-jet";
import {validate} from "./unloggedUser";

export default class LogInForm extends JetView {
	config() {
		const logInBtn = {
			cols: [
				{
					view: "button",
					width: 100,
					label: "Log In",
					click() {
						if ($$("logInForm").validate()) {
							this.$scope.app.callEvent("onAuthentication", [$$("logInForm").getValues()]);
						}
					}
				}
			]
		};

		const rememCheckBox = {
			cols: [
				{gravity: 0.45},
				{
					view: "checkbox",
					labelRight: "Remember me",
					bottomPadding: 10
				},
				{}
			]
		};

		const forgotPass = {
			align: "right",
			view: "template",
			borderless: true,
			template: "<a href = '#!/unloggedUser/fogpas' >Forgot Your Password?</a>",
			css: "align-center"
		};

		const form = {
			id: "logInForm",
			view: "form",
			width: 700,
			height: 400,
			rows: [
				{
					view: "template",
					type: "header",
					template: "Log In",
					borderless: true
				},
				{
					height: 50
				},
				{
					id: "emailInput",
					type: "email",
					name: "email",
					view: "text",
					label: "<div class = 'name'><b>E-mail Address</b></div>",
					labelWidth: 200,
					bottomPadding: 15,
					width: 600,
					height: 40,
					invalidMessage: "Invalid E-Mail"
				},
				{
					id: "passwordInput",
					type: "password",
					name: "password",
					view: "text",
					label: "<div class = 'name'><b>Password</b></div>",
					labelWidth: 200,
					width: 600,
					height: 40,
					invalidMessage: "You can`t log in without filling this field"
				},
				{
					rows: [
						rememCheckBox,
						{
							cols: [
								{gravity: 0.55}, logInBtn, forgotPass
							]
						}
					]
				}
			],
			rules: {
				email: webix.rules.isEmail,
				password(value) { return validate(value); }
			}
		};

		return form;
	}
}
