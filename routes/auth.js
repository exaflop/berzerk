exports.requireLogin = function(req, res, next) {
     if (req.session.auth && req.session.auth.loggedIn) {
        res.locals.nick = req.session.user.nick;
        next();
    } else {
        res.redirect("/");
    }
}

exports.classicLogin = function(req, res, next) {
    if (!req.body) {
		console.log('why u login nobody?');
		return res.redirect('/?nobodyLogin');
	}

	app.models.User.classicLogin(req.body.email, req.body.pass, function(err, user) {
        if (err) {
			return showFieldError(req, res, "signIn", err);
		} else {
			if (user) {
				req.session.user = {
                    provider: "signup",
                    id: user.get("id"),
                    nick: user.get("nick")
				}
				req.session.auth = {
					signup: {},
					loggedIn: true,
					userId: user.get("id")
				}

                res.redirect("/users");
			} else {
				return showFieldError(req, res, "signIn");
			}
		}
	})
};

exports.classicSignup = function(req, res, next) {
	if (!req.body) {
		console.log('why u signup nobody?');
		return res.redirect('/?nobodySignup');
	}

	var user = new app.models.User();

	user.set('nick', req.body.nick);
	user.set('email', req.body.email);
	user.set('password', req.body.pass);
	user.set('providers', ['signup:'+user.get('email')]);
	user.set('profiles', [{ _name: 'signup'}]);

	user.save(function(err) {
		if (err) {
            res.locals.user = user;
            return showFieldError(req, res, 'signUp', err);
		} else {
            req.session.user = {
                provider: 'signup',
                id: user.get('id'),
                nick: user.get('nick')
			}
            req.session.auth = {
                signup: {},
                loggedIn: true,
                userId: user.get('id')
			}
		}
	})
};

function showFieldError(req, res, mode, err) {
    switch (mode) {
        case "signIn":
            res.locals.errors = "Login/Mot de passe incorrect";
        break;
    }
	
	res.render('index');
}