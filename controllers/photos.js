const PhotosController = module.exports = {};
const marked = require('marked');

PhotosController.load = function(params, callback) {

	let contentful = params.defaults.contentful;

	contentful.getEntries({'sys.id': 'DhXSGn1gcKiuek8Auwky4'}).then( page => {
    console.log(page);
		let fields = page.items[0].fields;
		callback(null, { page: {
			title: fields.title,
			photos: fields.photos
		}});
	}).catch(err => {
		console.log(err);
	});
};
