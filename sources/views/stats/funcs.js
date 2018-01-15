import {transformData} from "./chart";

export function chartAdapt(scheme, value) {
	switch (scheme) {
		case "Orders statistics by days of the week":
			transformData("dayOfWeek");

			if (value === "pie") {
				$$("ordersChart").define("label", "#dayOfWeek#");
			}
			else {
				$$("ordersChart").define("label", "#count#");
				$$("ordersChart").define("xAxis", {template: "#dayOfWeek#"});
				$$("ordersChart").define("yValue", "#count#");
			}
			$$("ordersChart").define("type", value);
			$$("ordersChart").refresh();
			break;
		default:
			transformData("dayOfMonth");

			if (value === "pie") {
				$$("ordersChart").define("label", "#dayOfMonth#");
			}
			else {
				$$("ordersChart").define("label", "#count#");
				$$("ordersChart").define("xAxis", {template: "#dayOfMonth#"});
				$$("ordersChart").define("yValue", "#count#");
			}
			$$("ordersChart").define("type", value);
			$$("ordersChart").refresh();
	}
}

export function changeChartScheme(scheme, value) {
	if (scheme === "Orders statistics by days of the week") {
		chartAdapt(scheme, value);
	}
	else {
		debugger;
		chartAdapt(scheme, value);
	}
}
