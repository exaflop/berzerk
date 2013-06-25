var Schema = app.mongoose.Schema;
var Validations = require("./validations.js");
var Jshashes = require("jshashes");
var SHA2 = new Jshashes.SHA512();

function encodePassword(pass) {
    if (typeof pass === "string" && pass.length < 6) return "";

    return SHA2.b64_hmac(pass, "mySaltyString");
}

var UserSchema = new Schema({
    nick: {type: String, required: true, unique: true, trim: true},
    email: {type: String, required: true, unique: true, trim: true, lowercase: true},
    password: {type: String, set: encodePassword, required: true}
});

UserSchema.statics.classicLogin = function(login, pass, callback) {
	app.models.User
        .where("email", login)
        .where("password", encodePassword(pass))
        .findOne(callback);
}

UserSchema.path("nick").validate(Validations.uniqueFieldInsensitive("User", "nick"), "unique");
UserSchema.path("email").validate(Validations.uniqueFieldInsensitive("User", "email"), "unique");
UserSchema.path("email").validate(Validations.emailFormat, "format");
UserSchema.path("password").validate(Validations.cannotBeEmpty, "password");

UserSchema.plugin(app.mongoose.availablePlugins.timestamper);

app.mongoose.model("User", UserSchema);
