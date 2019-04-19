import {JetView} from "webix-jet";
import {users} from "../models/users";
import RegistrationForm from "./registrationForm";
import authorize from "./exportFunc";

export default class LogInView extends JetView {
	config() {
		const view = {
			rows: [
				{gravity: 0.7},
				RegistrationForm,
				{}
			]
		};
		return view;
	}

	init() {
		this.on(this.app, "onRegistration", (val) => {
			this.register(val);
		});
	}

	register(val) {
		let userData = users.find(obj => obj.email === val.email || obj.name === val.name);
		if (userData.length) {
			webix.alert({
				title: "Error",
				type: "alert-error",
				text: "User already exists",
				callback: () => {
					$$("emailInput").focus();
				}
			});
		}
		else {
			this.userDataPOST(val);
		}
	}

	userDataPOST(value) {
		let currDate = new Date();
		currDate = webix.Date.datePart(currDate);
		value.registrationDate = currDate;
		users.add(value);
		authorize.call(this, Object.assign({isAdmin: false}, value));
	}
}
