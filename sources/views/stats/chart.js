import {JetView} from "webix-jet";
import {orders} from "../../models/orders";

function getDayName(num) {
	switch (num) {
		case 0:
			return "Sunday";
		case 1:
			return "Monday";
		case 2:
			return "Tuesday";
		case 3:
			return "Wednesday";
		case 4:
			return "Thursday";
		case 5:
			return "Friday";
		default:
			return "Saturday";
	}
}

export function transformData(scheme) {
	let local = [];
	orders.data.each(
		(obj) => {
			let key;
			switch (scheme) {
				case "dayOfMonth":
					key = local.findIndex(element => element.dayOfMonth === `${obj.orderDate.getDate()}.${obj.orderDate.getMonth() + 1}`);
					break;
				default:
					key = local.findIndex(element => element.dayOfWeek === getDayName(obj.orderDate.getDay()));
			}
			if (key !== -1) {
				local[key].count += 1;
			}
			else {
				local.push({
					id: webix.uid(),
					dayOfWeek: getDayName(obj.orderDate.getDay()),
					dayOfMonth: `${obj.orderDate.getDate()}.${obj.orderDate.getMonth() + 1}`,
					count: 1
				});
			}
		}
	);
	$$("ordersChart").refresh();
	$$("ordersChart").clearAll();
	$$("ordersChart").parse(local);
}

export default class Chart extends JetView {
	config() {
		const chart = {
			view: "chart",
			type: "bar",
			id: "ordersChart",
			value: "#count#",
			label: "#count#",
			data: [],
			animate: {
				type: "flip",
				subtype: "vertical"
			},
			barWidth: 100,
			radius: 0,
			xAxis: {
				template: "#dayOfWeek#"
			},
			yAxis: {
			}
		};
		return chart;
	}
	init() {
		orders.waitData
			.then(() => {
				transformData("dayOfWeek");
			});
	}
}
