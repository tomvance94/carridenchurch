let moment = require('moment');

let _moment = function(string) {
  return moment(string).format('dddd Do MMMM YYYY');
};


let registerHelper = function(hbs) {
  hbs.registerHelper('moment', function(string) {
    return new hbs.SafeString(_moment(string));
  });
};


module.exports = {
  _moment: _moment,
  registerHelper: registerHelper
};
