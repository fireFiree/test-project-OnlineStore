const fs = require("fs");

const express = require("express");

const router = express.Router();

const serverConfig = require("../serverConfig.js");

const FILE_PATH = `${serverConfig.SERVER_PATH}phones/phones.json`;

router.get("/", getAll);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", remove);
router.post("/upload", upload);

function getAll(req, res) {
	const content = fs.readFileSync(FILE_PATH, "utf8");
	const phones = JSON.parse(content);
	res.send(phones);
}

function add(req, res) {
	if (!req.body) return res.sendStatus(400);

	const name = req.body.name || "";
	const price = req.body.price || 0;
	const rating = req.body.rating || 0;
	const image = req.body.image || "";

	let phone = {name, price: new Number(price), rating: new Number(rating), image};

	let data = fs.readFileSync(FILE_PATH, "utf8");
	let phones = JSON.parse(data);
	let id = phones.length ? Math.max(...phones.map(o => o.id)) + 1 : 1;

	phone.id = id;
	phones.push(phone);

	fs.writeFileSync(FILE_PATH, JSON.stringify(phones));
	res.send(phone);
}

function update(req, res) {
	if (!req.body) return res.sendStatus(400);

	const id = req.params.id;
	const name = req.body.name || "";
	const price = req.body.price || 0;
	const rating = req.body.rating || 0;
	const image = req.body.image || "";

	const data = fs.readFileSync(FILE_PATH, "utf8");
	let phones = JSON.parse(data);
	let phone;
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
		fs.writeFileSync(FILE_PATH, JSON.stringify(phones));
		res.send(phone);
	}
	else {
		res.status(404).send(phone);
	}
}

function remove(req, res) {
	const id = req.params.id;
	let data = fs.readFileSync(FILE_PATH, "utf8");
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

		fs.writeFileSync(FILE_PATH, JSON.stringify(phones));
		res.send(phone);
	}
	else {
		res.status(404).send();
	}
}
function upload(req, res) {
	if (!req.files) return res.send({status: "error"});

	const file = req.files.upload;

	res.send({status: "server", image: `data:${file.mimetype};base64,${file.data.toString("base64")} `});
}

module.exports = router;
