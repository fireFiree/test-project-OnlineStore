import {JetView} from "webix-jet";
import {users} from "../models/users";
import authorize from "./exportFunc";
import LogInForm from "./logInForm";

export default class LogInView extends JetView {
	config() {
		const view = {
			rows: [
				{gravity: 0.7},
				LogInForm,
				{}
			]
		};
		return view;
	}

	register() {
		this.show("/top/registration");
	}

	init() {
		this.on(this.app, "onAuthentication", (val) => {
			this.authenticate(val);
		});
	}

	authenticate(val) {
		let userData = users.find(obj => obj.name === val.name && obj.password === val.password)[0];
		if (userData) {
			authorize.call(this, userData);
		}
		else {
			webix.alert({
				title: "Authentication error",
				type: "alert-error",
				text: "Wrong E-Mail or Password",
				callback: () => {
					$$("nameInput").focus();
				}
			});
		}
	}
}
