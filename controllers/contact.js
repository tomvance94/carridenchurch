const ContactController = module.exports = {};
const marked = require('marked');

ContactController.load = function(params, callback) {

	let contentful = params.defaults.contentful;

	contentful.getEntries({'sys.id': '7kTydJOUVOS4YkgUm22yyy'}).then( page => {
		let fields = page.items[0].fields;

		callback(null, { page: {
			contacts: fields.contacts
		}});
	}).catch(err => {
		console.log(err);
	});
};
