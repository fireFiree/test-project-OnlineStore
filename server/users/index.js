const fs = require("fs");

const express = require("express");

const router = express.Router();

router.get("/", getAll);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", remove);

function getAll(req, res) {
	const content = fs.readFileSync("./users/users.json", "utf8");
	const users = JSON.parse(content);
	res.send(users);
}

function add(req, res) {
	if (!req.body) return res.sendStatus(400);

	const name = req.body.name || "";
	const email = req.body.email || "";
	const registationDate = req.body.registationDate || new Date();
	const password = req.body.password || "";

	let user = {name,
		email,
		registationDate,
		password,
		isAdmin: "false"
	};

	let data = fs.readFileSync("./users/users.json", "utf8");
	let users = JSON.parse(data);
	let id = users.length ? Math.max(...users.map(o => o.id)) + 1 : 1;

	user.id = id;
	users.push(user);
	fs.writeFileSync("./users/users.json", JSON.stringify(users));
	res.send(user);
}

function update(req, res) {
	if (!req.body) return res.sendStatus(400);

	const id = req.params.id;
	const name = req.body.name || "";
	const email = req.body.email || "";
	const registrationDate = req.body.registrationDate || new Date();
	const password = req.body.password || "";

	const data = fs.readFileSync("./users/users.json", "utf8");
	let users = JSON.parse(data);
	let user;
	for (let i = 0; i < users.length; i++) {
		if (users[i].id == id) {
			user = users[i];
			break;
		}
	}
	if (user) {
		user.id = new Number(id);
		user.name = name;
		user.email = email;
		user.registrationDate = registrationDate;
		user.password = password;

		fs.writeFileSync("./users/users.json", JSON.stringify(users));
		res.send(user);
	}
	else {
		res.status(404).send(user);
	}
}

function remove(req, res) {
	const id = req.params.id;
	let data = fs.readFileSync("./users/users.json", "utf8");
	let users = JSON.parse(data);
	let index = -1;

	for (let i = 0; i < users.length; i++) {
		if (users[i].id == id) {
			index = i;
			break;
		}
	}
	if (index > -1) {
		let user = users.splice(index, 1)[0];

		fs.writeFileSync("./users/users.json", JSON.stringify(users));
		res.send(user);
	}
	else {
		res.status(404).send();
	}
}


module.exports = router;
