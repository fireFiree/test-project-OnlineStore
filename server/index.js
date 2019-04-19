const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const phones = require("./phones");
const users = require("./users");
const orders = require("./orders");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(fileUpload());

app.all("/*", (req, res, next) => {
	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

app.use("/api/phones", phones);
app.use("/api/orders", orders);
app.use("/api/users", users);
/* app.use("/api/login", login); */

app.post("/upload", (req, res) => {
	if (!req.files) return res.send({status: "error"});
	console.log(req.files.upload);
	let reader = new FileReader();
	reader.onloadend = function () {
		res.send({status: "server", image: reader.result});
	};
	reader.readAsDataURL(req.files.upload);
});

app.listen(3000, () => {
	console.log("server is running");
});

