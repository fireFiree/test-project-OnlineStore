const fs = require("fs");

module.exports.getAll = function (req, res) {
	const content = fs.readFileSync("./orders/orders.json", "utf8");
	const orders = JSON.parse(content);
	res.send(orders);
};

module.exports.add = function (req, res) {
	if (!req.body) return res.sendStatus(400);

	const product = req.body.product || "";
	const address = req.body.address || "";
	const delivery = req.body.delivery || "";
	const payment = req.body.payment || "";
	const status = req.body.status || "";
	const declineReason = req.body.declineReason || "";
	const orderDate = req.body.orderDate || "";
	const buyerName = req.body.buyerName || "";
	const buyerEmail = req.body.buyerEmail || "";
	const options = req.body.options || "";

	let order = {
		product,
		address,
		delivery,
		payment,
		status,
		declineReason,
		orderDate,
		buyerEmail,
		buyerName,
		options
	};

	let data = fs.readFileSync("./orders/orders.json", "utf8");
	let orders = JSON.parse(data);

	const id = Math.max(...orders.map(o => o.id));
	id === -Infinity ? order.id = 1 : order.id = id + 1;
	orders.push(order);
	data = JSON.stringify(orders);
	fs.writeFileSync("./orders/orders.json", data);
	res.send(order);
};

module.exports.update = function (req, res) {
	if (!req.body) return res.sendStatus(400);

	const id = req.params.id;
	const product = req.body.product;
	const address = req.body.address;
	const delivery = req.body.delivery;
	const payment = req.body.payment;
	const status = req.body.status;
	const declineReason = req.body.declineReason || "";
	const orderDate = req.body.orderDate;
	const buyerName = req.body.buyerName;
	const buyerEmail = req.body.buyerEmail;

	const data = fs.readFileSync("./orders/orders.json", "utf8");
	let orders = JSON.parse(data);
	let order;
	for (let i = 0; i < orders.length; i++) {
		if (orders[i].id == id) {
			order = orders[i];
			break;
		}
	}
	if (order) {
		order.id = new Number(id);
		order.product = product;
		order.address = address;
		order.delivery = delivery;
		order.payment = payment;
		order.status = status;
		order.declineReason = declineReason;
		order.orderDate = orderDate;
		order.buyerName = buyerName;
		order.buyerEmail = buyerEmail;

		const data = JSON.stringify(orders);
		fs.writeFileSync("./orders/orders.json", data);
		res.send(order);
	}
	else {
		res.status(404).send(order);
	}
};

module.exports.delete = function (req, res) {
	const id = req.params.id;
	let data = fs.readFileSync("./orders/orders.json", "utf8");
	let orders = JSON.parse(data);
	let index = -1;

	for (let i = 0; i < orders.length; i++) {
		if (orders[i].id == id) {
			index = i;
			break;
		}
	}
	if (index > -1) {
		let order = orders.splice(index, 1)[0];
		let data = JSON.stringify(orders);

		fs.writeFileSync("./orders/orders.json", data);
		res.send(order);
	}
	else {
		res.status(404).send();
	}
};
