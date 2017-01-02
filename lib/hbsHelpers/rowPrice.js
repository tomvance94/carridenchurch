
let _rowPrice = function(price, qty) {
  let total = price*qty;
  return "£"+total.toFixed(2);
};


let registerHelper = function(hbs) {
  hbs.registerHelper('rowPrice', function(price,qty) {
    return new hbs.SafeString(_rowPrice(price,qty));
  });
};


module.exports = {
  _rowPrice: _rowPrice,
  registerHelper: registerHelper
};
