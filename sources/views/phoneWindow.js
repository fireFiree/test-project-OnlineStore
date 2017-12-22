import {JetView} from "webix-jet";
import {phones} from "models/phones";


function bodyTemplate(obj) {
	if (obj === undefined) {
		return;
	}
	let html = `<div class='big-phoneImageContainer'>
			<img class='big-phoneImage' src='${obj.image}'>
		</div>
		<div class='phoneDescription'>
			<span class='phoneInfo'><b>Name</b>:${obj.name}</span>
			<span class='phoneInfo'><b>Price</b>:${obj.price}$</span>
			<span class='phoneInfo'>
				<b>Rating</b>:${obj.rating} 	<span class='webix_icon fa-star-o mediumSpan'></span>
			</span>
		</div>`;
	return html;
}

export default class PhoneWindowView extends JetView {
	config() {
		const windowTemplate = {
			view: "template",
			template: bodyTemplate,
			name: "body",
			onClick: {
				"fa-star-o": function (id) {
					let item = this.getValues();
					item.rating += 1;
					phones.updateItem(item.id, item);
					this.$scope.getRoot().queryView({name: "body"}).refresh();
				}
			}
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
					{view: "label", label: "#name#", name: "header"},
					{view: "icon", icon: "times", click() { this.$scope.close(); }}
				]
			},
			body: windowTemplate
		};

		return window;
	}

	show(obj) {
		this.getRoot().show();
		this.getRoot().queryView({name: "body"}).parse(obj);
		this.getRoot().queryView({name: "header"}).setValue(obj.name);
	}

	close() {
		this.getRoot().hide();
	}
}
