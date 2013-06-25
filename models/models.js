app.mongoose = require("mongoose");

app.mongoose.set("debug", true);
app.mongoose.availablePlugins = require('../lib/mongoose-plugins');
app.mongoose.connect(app.config.mongodb_url);
app.models = app.mongoose.models;

module.exports = app.models;

require('./user.js');