exports.uniqueFieldInsensitive = function(modelName, field) {
	return function(val, cb) {
		if (val && val.length) {
			if ( this.isNew ){
				app.mongoose.models[modelName].where(
                    field, new RegExp('^'+val+'$', 'i')
				).count(function(err,n) {
					cb( n < 1 );
				})
			} else {
				cb(true);
			}
		} else {
			cb(false);
		}
	}
}

exports.emailFormat = function(val) {
	return (/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i).test(val);
}

exports.cannotBeEmpty = function(val) {
	console.log('pass val is:', val);

	if (typeof val === 'string') {
		if (val.length ) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}
