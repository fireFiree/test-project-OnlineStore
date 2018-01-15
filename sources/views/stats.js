import {JetView} from "webix-jet";
import Chart from "./stats/chart";
import ToolBar from "./stats/toolBar";

export default class ChartView extends JetView {
	config() {
		const view = {
			rows: [
				ToolBar,
				Chart
			]
		};
		return view;
	}
}
