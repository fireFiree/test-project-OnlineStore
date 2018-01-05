const fs = require("fs");

const express = require("express");

const router = express.Router();

router.get("/", getAll);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", remove);

function getAll(req, res) {
	const content = fs.readFileSync("./orders/orders.json", "utf8");
	const orders = JSON.parse(content);
	res.send(orders);
}

function add(req, res) {
	if (!req.body) return res.sendStatus(400);

	const address = req.body.address || "";
	const delivery = req.body.delivery || "On The Way";
	const payment = req.body.payment || "Card";
	const status = req.body.status || "In Process";
	const declineReason = req.body.declineReason || "";
	const orderDate = req.body.orderDate || (new Date()).toString();
	const buyerName = req.body.buyerName || "";
	const buyerEmail = req.body.buyerEmail || "";
	const options = req.body.options || "";


	let order = {address,
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
	let id = orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 1;

	order.id = id;
	orders.push(order);
	fs.writeFileSync("./orders/orders.json", JSON.stringify(orders));
	res.send(order);
}

function update(req, res) {
	if (!req.body) return res.sendStatus(400);

	const id = req.params.id;
	const address = req.body.address || "";
	const delivery = req.body.delivery || "On The Way";
	const payment = req.body.payment || "Card";
	const status = req.body.status || "In Process";
	const declineReason = req.body.declineReason || "";
	const orderDate = req.body.orderDate || (new Date()).toString();
	const buyerName = req.body.buyerName || "";
	const buyerEmail = req.body.buyerEmail || "";
	const options = req.body.options || "";

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
		order.address = address;
		order.delivery = delivery;
		order.payment = payment;
		order.status = status;
		order.declineReason = declineReason;
		order.orderDate = orderDate;
		order.buyerName = buyerName;
		order.buyerEmail = buyerEmail;
		order.options = options;

		fs.writeFileSync("./orders/orders.json", JSON.stringify(orders));
		res.send(order);
	}
	else {
		res.status(404).send(order);
	}
}

function remove(req, res) {
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

		fs.writeFileSync("./orders/orders.json", JSON.stringify(orders));
		res.send(order);
	}
	else {
		res.status(404).send();
	}
}


module.exports = router;
