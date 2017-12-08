import "./styles/app.css";
import {JetApp} from "webix-jet";

webix.ready(() => {
	let app = new JetApp({
		id:			APPNAME,
		version:	VERSION,
		start:	"/top/phones"
	});
	app.render();

	app.attachEvent("app:error:resolve", (name, error) => {
		window.console.error(error);
	});
});
