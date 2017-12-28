import {JetView} from "webix-jet";
import {users} from "../models/users";

export default class ClientsInfoView extends JetView {
	config() {
		const rls = {
			name: webix.rules.isNotEmpty,
			email: webix.rules.isEmail
		};

		const clientsTable = {
			view: "datatable",
			id: "clientsTable",
			rowHeight: 60,
			select: true,
			editable: true,
			editaction: "dblclick",
			columns: [
				{id: "id",	header: "#", width: 60, sort: "int"},
				{id: "name", header: ["Name", {content: "textFilter"}], editor: "text", sort: "string", width: 370},
				{id: "email", header: ["Email", {content: "textFilter"}], editor: "text", sort: "string", width: 370},
				{id: "registrationDate", header: "Creating at", editor: "date", sort: "string", width: 300, format: webix.i18n.dateFormatStr}
			],
			rules: rls
		};

		return clientsTable;
	}
	init(view) {
		view.parse(users);
	}
}
