
let _formatAddress = function(address) {
  return `<p>
            ${address.f_name} ${address.s_name} <br>
            ${address.address_1} ${address.address_2} <br>
            ${address.city} <br>
            ${address.postcode} <br>
            ${address.country}
          </p>`;
};

let registerHelper = function(hbs) {
  hbs.registerHelper('formatAddress', function(address) {
    return new hbs.SafeString(_formatAddress(address));
  });
};


module.exports = {
  _formatAddress: _formatAddress,
  registerHelper: registerHelper
};
