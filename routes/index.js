exports.render = function(req, res) {
    if (req.session.user) {
        res.render("home");
    } else {
        res.render("index");
    }
};