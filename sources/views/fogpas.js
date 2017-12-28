import {JetView} from "webix-jet";

export default class LogInView extends JetView {
	config() {
		const view = {
			rows: [
				{gravity: 0.7},
				{
					id: "logInForm",
					view: "form",
					width: 700,
					height: 200,
					rows: [
						{
							view: "template",
							type: "header",
							template: "Reset password",
							borderless: true
						},
						{
							height: 10
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
							cols: [
								{gravity: 0.87},
								{
									view: "button",
									value: "Send password reset link"
								},
								{}
							]
						}
					],
					rules: {
						email: webix.rules.isEmail
					}
				},
				{}
			]
		};
		return view;
	}
}
