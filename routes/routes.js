var home = require("./home.js");
var index = require("./index.js");
var auth = require('./auth.js');

app.get("/", index.render);
app.get("/users", auth.requireLogin, home.render);

app.post('/auth/classic-login',  auth.classicLogin);