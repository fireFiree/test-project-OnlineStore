import {JetView} from "webix-jet";
import {phones} from "../models/phones";

export default class AddProductView extends JetView {
	config() {
		const elems = [
			{view: "text", label: "Name", name: "name", placeholder: "Type Name", invalidMessage: "Your Name can't be Empty"},
			{view: "text", label: "Price", name: "price", placeholder: "Type Price", invalidMessage: "Incorrect Price"},
			{
				rows: [
					{template: "Preview", id: "preview"},
					{
						id: "imgUploader",
						view: "uploader",
						value: "Add Image",
						autosend: true,
						name: "img",
						upload: "http://localhost:3000/api/phones/upload",
						accept: "image/png, image/gif, image/jpg",
						on: {
							onBeforeFileAdd(file) {
								let reader = new FileReader();
								reader.onload = function (e) {
									let url = e.target.result;
									$$("preview").setHTML(`<div class='previewContainer'>
										<img class='preview' src='${url}'></img>
									</div>
									`);
								};
								reader.readAsDataURL(file.file);
								return true;
							}
						}
					}
				]},
			{gravity: 0.6},
			{view: "button", label: "Save Product", click() { this.$scope.saveForm(); }}
		];

		const rls = {
			name: webix.rules.isNotEmpty,
			price: webix.rules.isNumber
		};

		const form = {
			view: "form",
			id: "addproduct:form",
			elements: elems,
			rules: rls,
			autoWidth: true,
			elementsConfig: {
				labelWidth: 150
			}
		};

		return form;
	}
	
	saveForm() {
		let form = $$("addproduct:form");

		if (form.validate()) {
			let item = form.getValues();
			let uploader = $$("imgUploader");
			let fileId = uploader.files.getFirstId();
			let img = uploader.files.getItem(fileId).image;

			item.image = img;
			item.rating = 0;
			phones.add(item);
			webix.alert("New Product succesfully added!");
			this.show("./phones");
		}
	}
}
