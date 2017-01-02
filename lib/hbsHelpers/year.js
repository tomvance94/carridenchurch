
let _year = function() {
	return new Date().getFullYear();
};

let registerHelper = function(hbs) {
	hbs.registerHelper('year', function() {
		return new hbs.SafeString(_year());
	});
};


module.exports = {
	_year: _year,
	registerHelper: registerHelper
};
