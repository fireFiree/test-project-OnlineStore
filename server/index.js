const express = require("express");
const bodyParser = require("body-parser");

const phones = require("./phones/phones.js");
const users = require("./users/users.js")
const orders = require("./orders/orders.js")

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// PHONES
app.get("/api/phones", phones.getAll);
app.post("/api/phones", phones.add); 
app.put("/api/phones/:id", phones.update);
app.delete("/api/phones/:id", phones.delete);

//USERS
app.get("/api/users", users.getAll);
app.post("/api/users", users.add); 
app.put("/api/users/:id", users.update);
app.delete("/api/users/:id", users.delete);

//ORDERS DONT WORK YET
app.get("/api/orders", orders.getAll);
app.post("/api/orders", orders.add); 
app.put("/api/orders/:id", orders.update);
app.delete("/api/orders/:id", orders.delete);

app.listen(3000, function(){
    console.log("server is running");
});