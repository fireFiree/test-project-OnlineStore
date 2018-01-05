import {JetView} from "webix-jet";
import {users} from "../models/users";

export default class ClientsInfoView extends JetView {
	config() {
		const rls = {
			name: webix.rules.isNotEmpty,
			email: webix.rules.isEmail
		};

		const clientsForm = {
			view: "form",
			id: "clientsInfo:form",
			maxWidth: 400,
			elementsConfig: {
				labelWidth: 130
			},
			elements: [
        		{template: "User's Form", type: "section"},
        		{view: "text", label: "Name", name: "name", invalidMessage: "Name can't be Empty!"},
        		{view: "text", label: "Email", name: "email", invalidMessage: "Email should be Email!"},
				{view: "datepicker", label: "Registration Date", name: "registrationDate", format: webix.i18n.dateFormatStr},
				{view: "checkbox", labelRight: "Admin", name: "isAdmin", checkValue: true, uncheckedValue: false},
       			{cols: [
					{view: "button", value: "Save", type: "form", click() { this.$scope.saveForm(); }},
					{view: "button", value: "Clear", click() { this.$scope.clearForm(); }}
				]},
				{}
			],
			on: {
				onValues: function () {
					this.clearValidation();
				}
			},
			rules: rls
		};

		const clientsTable = {
			view: "datatable",
			id: "clientsTable",
			rowHeight: 60,
			select: true,
			columns: [
				{id: "name", header: ["Name", {content: "textFilter"}], editor: "text", sort: "string", width: 370},
				{id: "email", header: ["Email", {content: "textFilter"}], editor: "text", sort: "string", width: 370}
			],
			rules: rls
		};

		return {cols: [clientsTable, clientsForm]};
	}
	init(view) {
		let table = view.queryView({view: "datatable"});
		table.parse(users);
		let form = $$("clientsInfo:form");

		form.bind(table);
	}

	saveForm() {
		let form = $$("clientsInfo:form");
		if (form.validate()) {
			let item = form.getValues();
			if (item.id == undefined) {
				webix.alert("You can't add new users here!");
			}
			else {
				users.updateItem(item.id, item);
			}

			this.clearForm();
		}
	}
	clearForm() {
		let form = $$("clientsInfo:form");
		form.clear();
		form.clearValidation();
	}
}
