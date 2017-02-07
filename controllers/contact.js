const ContactController = module.exports = {};
const marked = require('marked');
const http = require('http');
const MailController = require('./mail');
const qs = require('qs');

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

ContactController.send = function(params, callback) {
	let query = qs.stringify(params.req.body);

	let contentful = params.defaults.contentful;
	contentful.getEntries({'sys.id': '7kTydJOUVOS4YkgUm22yyy'}).then( page => {
		let fields = page.items[0].fields;

		var options = {
			host: 'localhost',
			port: '9090',
			path: '/email/contact?' + query
		};

		http.get(options, function (res) {
			let body = '';
			res.on('data', function (d) {
				body += d;
			});

			res.on('end', function () {
				MailController.send('carridenchurch@gmail.com', query.email, 'Contact Form', body);
				callback(null, {
					page: {
						contacts: fields.contacts
					},
					message: true
				});
			});
		});
	}).catch(err => {
		console.log(err);
	});
};


ContactController.render = function (params, callback) {
	params.query.query = qs.stringify(params.query);
	callback(null, {data: params.query});
};
