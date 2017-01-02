
let _generateUrl = function(name) {
  return name
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;
};


let registerHelper = function(hbs) {
  hbs.registerHelper('generateUrl', function(name) {
    return new hbs.SafeString(_generateUrl(name));
  });
};


module.exports = {
  _generateUrl: _generateUrl,
  registerHelper: registerHelper
};
