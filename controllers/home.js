const HomeController = module.exports = {};
const _ = {
	sortBy: require('lodash.sortby')
}
const marked = require('marked');

HomeController.load = function(params, callback) {

	let contentful = params.defaults.contentful;

	contentful.getEntries({'sys.id': '2LR27hM1jGSSoCa4OM2K0c'}).then( page => {
		let fields = page.items[0].fields;

		callback(null, { page: {
			title: fields.title,
			primaryContent: fields.primaryContent,
			churchServices: fields.churchServices,
			specialServices: fields.specialServices
		}});
	}).catch(err => {
		console.log(err);
	});
};
