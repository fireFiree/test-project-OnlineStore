import {JetView} from "webix-jet";


function bodyTemplate(obj) {
	if (obj === undefined) {
		return;
	}
	let html = `<div class='big-phoneImageContainer'><img class='big-phoneImage' src='${obj.Image}'>`;
	html += `<span class='phoneInfo'><b>Name</b>:\t${obj.Name}</span>`;
	html += `<span class='phoneInfo'><b>Price</b>:\t${obj.Price}</span>`;
	html += `<span class='phoneInfo'><b>Rating</b>:\t${obj.Rating}$</span>`;
	html += "</div>";
	return html;
}

export default class PhoneWindowView extends JetView {
	config() {
		const windowTemplate = {view: "template",
			template: bodyTemplate,
			name: "body"
		};

		const window = {view: "window",
			width: 500,
			height: 400,
			id: "phoneWindow",
			position: "center",
			modal: true,
			head: {view: "template",
				template: "<span class='webix_icon fa-times'></span>",
				onClick: {
					"fa-times": () => { this.close(); }
				}
			},
			body: windowTemplate
		};

		return window;
	}
	init() {}

	show(obj) {
		this.getRoot().show();
		this.getRoot().queryView({name: "body"}).setValues(obj);
	}
	close() {
		this.getRoot().hide();
	}
}
