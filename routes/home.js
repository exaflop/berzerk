exports.render = function(req, res) {
    res.locals.nick = req.session.user.nick;
    res.render("home");
};