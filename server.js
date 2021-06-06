const express = require("express");
const app = express();
const fs = require("fs");
const port = process.env.PORT || "3000";

app.get("/users", function (req, res) {
    fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
        res.setHeader("Content-Type", "application/json");
        res.send(data);
    });
});

app.get("/users/:id", function (req, res) {
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        const users = JSON.parse(data);
        let user = null;
        for (let key in users) {
            if (users[key].id === req.params.id) {
                user = users[key];
                break;
            }
        }
        res.setHeader("Content-Type", "application/json");
        res.send(user);
    });
});

app.listen(port, function () {
    console.log("Server is up and running at http://localhost:%s", port);
});
