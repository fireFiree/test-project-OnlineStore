const fs = require("fs");

module.exports.getAll = function(req, res){
    const content = fs.readFileSync("./users/users.json", "utf8");
    const users = JSON.parse(content);
    res.send(users);
}

module.exports.add = function(req, res){
    if(!req.body) return res.sendStatus(400);
    
    const name = req.body.name;
    const email = req.body.email;
    const registationDate = req.body.registationDate;

    var user = { "name":name, "email": email, "registationDate": registationDate, isAdmin: "false"};
        
    let data = fs.readFileSync("./users/users.json", "utf8");
    let users = JSON.parse(data);
        
    const id = Math.max.apply(Math, users.map(function(o){ return o.id;}));
    user.id = id + 1;
    users.push(user);
    data = JSON.stringify(users);
    fs.writeFileSync("./users/users.json", data);
    res.send(user);
}

module.exports.update = function(req, res){
    if(!req.body) return res.sendStatus(400);
    
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const registationDate = req.body.registationDate;
    
    const data = fs.readFileSync("./users/users.json", "utf8");
    let users = JSON.parse(data);
    for(let i=0; i < users.length; i++){

        if(users[i].id == id){
            user = users[i];
            break;
        }
    }
    if(user){
        user.id = new Number(id);
        user.name = name;
        user.email = email;
        user.registationDate = registationDate;

        const data = JSON.stringify(users);
        fs.writeFileSync("./users/users.json", data);
        res.send(user);
    }
    else{
        res.status(404).send(user);
    }
}

module.exports.delete = function(req, res){
    const id = req.params.id;
    let data = fs.readFileSync("./users/users.json", "utf8");
    let users = JSON.parse(data);
    let index = -1;
    
    for(let i = 0; i < users.length; i++){
        if(users[i].id == id){
            index = i;
            break;
        }
    }
    if(index > -1){

        let user = users.splice(index, 1)[0];
        let data = JSON.stringify(users);

        fs.writeFileSync("./users/users.json", data);
        res.send(user);
    }
    else{
        res.status(404).send();
    }
}
