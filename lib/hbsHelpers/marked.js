let marked = require('marked');

let _marked = function(string) {
  return marked(string);
};


let registerHelper = function(hbs) {
  hbs.registerHelper('marked', function(string) {
    return new hbs.SafeString(_marked(string));
  });
};


module.exports = {
  _marked: _marked,
  registerHelper: registerHelper
};
