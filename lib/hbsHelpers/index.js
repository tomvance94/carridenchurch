module.exports = function(hbs) {
  require('./formatAddress').registerHelper(hbs);
  require('./formatPrice').registerHelper(hbs);
  require('./rowPrice').registerHelper(hbs);
  require('./generateUrl').registerHelper(hbs);
	require('./year').registerHelper(hbs);
  require('./marked').registerHelper(hbs);
  require('./moment').registerHelper(hbs);
};
