import {JetApp} from "webix-jet";
import "./styles/app.css";

webix.ready(() => {
	webix.i18n.parseFormat = "%d-%m-%Y";
	webix.i18n.setLocale();
	let app = new JetApp({
		id:	APPNAME,
		version: VERSION,
		start:	"/top/phones"
	});
	app.render();

	app.attachEvent("app:error:resolve", (name, error) => {
		window.console.error(error);
	});
});
