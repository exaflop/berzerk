var express = require("express");
GLOBAL.app = express();

app.configure(function() {
    app.set("port", process.env.PORT || 3000);

    app.set("view engine", "jade");
    app.set("views", __dirname + "/views");

    app.use(express.favicon(__dirname + "/public/images/dice.png"));
    app.use(express.logger("dev"));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser("your secret here"));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(__dirname + "/public"));
});

app.configure("development", function() {
    var oConfig = require("fs").readFileSync(__dirname + "/config/development.json", "utf8");
    app.config = JSON.parse(oConfig);
    app.use(express.errorHandler());
});

require("./routes/routes.js");
require("./models/models.js");

app.listen(process.env.PORT, function() {
    console.log("Express server listening on " + process.env.IP + ":" + process.env.PORT);
});