import {JetView} from "webix-jet";
import {clients} from "models/clients";

export default class ClientsInfoView extends JetView {
	config() {
		const rls = {
			Name: webix.rules.isNotEmpty,
			Email: webix.rules.isEmail
		};

		const clientsTable = {
			view: "datatable",
			id: "clientsTable",
			rowHeight: 60,
            select: true,
            //
            //why dones't it work??
            //
			editable: true,
			editaction: "dblclick",
			columns: [
				{id: "id",	header: "#", width: 60, sort: "int"},
				{id: "Name", header: ["Name", {content: "textFilter"}], sort: "string", width: 400},
				{id: "Email", header: ["Email", {content: "textFilter"}], sort: "string", width: 400},
				{id: "RegistrationDate", header: "Creating at", sort: "string", width: 250, format: webix.i18n.dateFormatStr}
			],
			rules: rls
		};

		return clientsTable;
	}
	init(view) {
		view.parse(clients);
	}
}
