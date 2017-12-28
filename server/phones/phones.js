const fs = require("fs");

module.exports.getAll = function (req, res) {
	const content = fs.readFileSync("./phones/phones.json", "utf8");
	const phones = JSON.parse(content);
	res.send(phones);
};

module.exports.add = function (req, res) {
	if (!req.body) return res.sendStatus(400);


	console.log(req.body);
	const name = req.body.name;
	const price = req.body.price;
	const rating = req.body.rating;
	const image = req.body.image;

	let phone = {name: name, price: new Number(price), rating: new Number(rating), image: image};

	let data = fs.readFileSync("./phones/phones.json", "utf8");
	let phones = JSON.parse(data);

	const id = Math.max(...phones.map(o => o.id));
	phone.id = id + 1;
	phones.push(phone);
	data = JSON.stringify(phones);
	fs.writeFileSync("./phones/phones.json", data);
	res.send(phone);
};

module.exports.update = function (req, res) {
	if (!req.body) return res.sendStatus(400);

	const id = req.params.id;
	const name = req.body.name;
	const price = req.body.price;
	const rating = req.body.rating;
	const image = req.body.image;

	const data = fs.readFileSync("./phones/phones.json", "utf8");
	let phones = JSON.parse(data);
	for (let i = 0; i < phones.length; i++) {
		if (phones[i].id == id) {
			phone = phones[i];
			break;
		}
	}
	if (phone) {
		phone.id = new Number(id);
		phone.name = name;
		phone.price = new Number(price);
		phone.image = image;
		phone.rating = new Number(rating);
		const data = JSON.stringify(phones);
		fs.writeFileSync("./phones/phones.json", data);
		res.send(phone);
	}
	else {
		res.status(404).send(phone);
	}
};

module.exports.delete = function (req, res) {
	const id = req.params.id;
	let data = fs.readFileSync("./phones/phones.json", "utf8");
	let phones = JSON.parse(data);
	let index = -1;

	for (let i = 0; i < phones.length; i++) {
		if (phones[i].id == id) {
			index = i;
			break;
		}
	}
	if (index > -1) {
		let phone = phones.splice(index, 1)[0];
		let data = JSON.stringify(phones);

		fs.writeFileSync("./phones/phones.json", data);
		res.send(phone);
	}
	else {
		res.status(404).send();
	}
};
