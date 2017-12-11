import {JetView} from "webix-jet";


function bodyTemplate(obj) {
	if (obj === undefined) {
		return;
	}
	let html = `<div class='big-phoneImageContainer'>
			<img class='big-phoneImage' src='${obj.Image}'>
		</div>
		<div class='phoneDescription'>
			<span class='phoneInfo'><b>Name</b>:${obj.Name}</span>
			<span class='phoneInfo'><b>Price</b>:${obj.Price}</span>
			<span class='phoneInfo'><b>Rating</b>:${obj.Rating}$</span>
		</div>`;
	return html;
}

export default class PhoneWindowView extends JetView {
	config() {
		const windowTemplate = {
			view: "template",
			template: bodyTemplate,
			name: "body"
		};

		const window = {
			view: "window",
			width: 500,
			height: 400,
			id: "phoneWindow",
			position: "center",
			modal: true,
			head: {
				view: "toolbar",
				cols: [
					{view: "label", label: "#Name#", name: "header"},
					{view: "icon", icon: "times", click() { this.$scope.close(); }}
				]
			},
			body: windowTemplate
		};

		return window;
	}

	show(obj) {
		this.getRoot().show();
		this.getRoot().queryView({name: "body"}).setValues(obj);
		this.getRoot().queryView({name: "header"}).setValue(obj.Name);
	}
	
	close() {
		this.getRoot().hide();
	}
}
