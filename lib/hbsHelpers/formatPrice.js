
let _formatPrice = function(price) {
	if(price === 0){ return 'FREE'; }
  return "£"+price.toFixed(2);
};


let registerHelper = function(hbs) {
  hbs.registerHelper('formatPrice', function(price) {
    return new hbs.SafeString(_formatPrice(price));
  });
};


module.exports = {
  _formatPrice: _formatPrice,
  registerHelper: registerHelper
};
