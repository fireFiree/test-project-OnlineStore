import {JetView} from "webix-jet";
import {chartAdapt, changeChartScheme} from "./funcs";

export default class ToolBar extends JetView {
	config() {
		const toolBar = {
			view: "toolbar",
			elements: [
				{
					id: "richSelectType",
					view: "richselect",
					label: "Chart type",
					value: "bar",
					options: {
						body: {
							id: "comboType",
							data: [
								"bar",
								"pie",
								"line"
							],
							on: {
								onItemClick(value) {
									chartAdapt($$("richSelectDataType").getValue(), value);
								}
							}
						}
					}
				},
				{
					id: "richSelectDataType",
					view: "richselect",
					labelWidth: 80,
					label: "Group by",
					value: "Orders statistics by days of the week",
					options: {
						body: {
							id: "comboScheme",
							data: [
								"Orders statistics by days of the week",
								"Orders statistics by date of month"
							],
							on: {
								onItemClick(value) {
									changeChartScheme(value, $$("richSelectType").getValue());
								}
							}
						}
					}
				}
			]
		};
		return toolBar;
	}
}
