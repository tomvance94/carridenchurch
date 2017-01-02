const AboutController = module.exports = {};
const marked = require('marked');

AboutController.load = function(params, callback) {

	let contentful = params.defaults.contentful;

	contentful.getEntries({'sys.id': '1m7XWT9BiMgqi8oaUSeC6e'}).then( page => {
		let fields = page.items[0].fields;

		callback(null, { page: {
			title: fields.title,
			primaryContent: marked(fields.primaryContent),
			secondaryTitle: fields.secondaryTitle,
			contacts: fields.contacts
		}});
	}).catch(err => {
		console.log(err);
	});
};
