const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// PHONES GET
app.get("/api/phones", function(req, res){
    const content = fs.readFileSync("phones.json", "utf8");
    const phones = JSON.parse(content);
    res.send(phones);
});

// PHONES POST
app.post("/api/phones", function (req, res) {

    if(!req.body) return res.sendStatus(400);

    const name = req.body.name;
    const price = req.body.price;

    const image = req.body.image;

    var phone = { "name":name, "price":price, "rating": 0, "image":image};
        
    let data = fs.readFileSync("phones.json", "utf8");
    let phones = JSON.parse(data);
        
    const id = Math.max.apply(Math, phones.map(function(o){ return o.id;}));
    phone.id = id + 1;
    phones.push(phone);
    data = JSON.stringify(phones);
    fs.writeFileSync("phones.json", data);
    res.send(phone);
});

// PHONES PUT
app.put("/api/phones/:id", function(req, res){

    if(!req.body) return res.sendStatus(400);
    
    const id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;
    const rating = req.body.rating;
    const image = req.body.image;
    
    const data = fs.readFileSync("phones.json", "utf8");
    let phones = JSON.parse(data);
    for(let i=0; i < phones.length; i++){

        if(phones[i].id == id){
            phone = phones[i];
            break;
        }
    }
    if(phone){
        phone.id = id;
        phone.name = name;
        phone.price = price;
        phone.image = image;
        phone.rating = rating;
        const data = JSON.stringify(phones);
        fs.writeFileSync("phones.json", data);
        res.send(phone);
    }
    else{
        res.status(404).send(phone);
    }
});

// PHONES DELETE
app.delete("/api/phones/:id", function(req, res){
        
    const id = req.params.id;
    let data = fs.readFileSync("phones.json", "utf8");
    let phones = JSON.parse(data);
    let index = -1;
    
    for(let i = 0; i < phones.length; i++){
        if(phones[i].id == id){
            index = i;
            break;
        }
    }
    if(index > -1){

        let phone = phones.splice(index, 1)[0];
        let data = JSON.stringify(phones);

        fs.writeFileSync("phones.json", data);
        res.send(phone);
    }
    else{
        res.status(404).send();
    }
});

app.listen(3000, function(){
    console.log("server is running");
});