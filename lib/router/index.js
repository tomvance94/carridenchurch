const Router = module.exports = {};

const qs = require('qs');
const _ = {
	isEmpty: require('lodash.isempty'),
	clone: require('lodash.clone'),
	merge: require('lodash.merge'),
	assign: require('lodash.assign')
};
const async = require('async');

Router.routes = require('../routes');

Router.configure = function (parent, route) {
	if (!parent) return _.merge({}, {}, route);

	// $FlowFixMe
	let parentRoute = require('./routes/' + parent);
	return _.merge({}, parentRoute, route);
};

Router._findParameterRoute = function (requestUrl, callback) {
	let url = requestUrl.split('/');
	let params = {};

	url.shift();

	let clonedRoutes = _.clone(Router.routes);
	for (let route in Router.routes) {
		let potentialPath = route.split('/');
		potentialPath.shift();

		if (potentialPath.length === url.length) {
			// Only check paths with the correct number of leaves
			for (let leaf in potentialPath) {
				// $FlowFixMe
				if (url[leaf] !== potentialPath[leaf]) {
					// $FlowFixMe
					if (potentialPath[leaf].indexOf(':') === -1) {
						delete clonedRoutes[route];
					} else {
						// $FlowFixMe
						params[potentialPath[leaf].replace(':', '')] = url[leaf];
					}
				}
			}
		} else {
			delete clonedRoutes[route];
		}
	}

	if (!_.isEmpty(clonedRoutes)) {
		let path = Router.routes[Object.keys(clonedRoutes)[0]];
		callback(null, { route: path, params: params });
	} else {		
		callback({ status: 404, page: '/404' }, null);
	}
};

Router.fetchController = function (path) {
	return require('../../controllers/' + path);
};

Router.fetchConfig = function (route) {
	return require('./routes/' + route);
};

Router.loadPreControllers = function (list) {
	let preControllers = [];
	if(list && list.length){
		list.map( function (controller) {
			preControllers.push( require ('../../controllers/preControllers/' + controller));
		});
	}
	return preControllers;
};

Router.render = function (route, req, res, params) {
	// $FlowFixMe
	let config = Router.fetchConfig(route);
	// $FlowFixMe
	let controller = Router.fetchController(config.controller);
	let method = req.method.toLowerCase();
	//TODO This needs to be refactored in each of the routes to have method object
	let runFunc;
	if(config.methods){
		runFunc = config.methods[method];
	}else{
		runFunc = config.function;
	}

	// Run the preControllers
	let preControllers = Router.loadPreControllers(config.preControllers);
	preControllers.unshift(function (callback) { 
		params.defaults.contentful.getAsset('6tWNR3Kw9OO6g0ACkeQ0eK')
		.then((asset) => {
			params.assets = {}
			params.assets.profile = asset.fields.file.url;
			callback(null, params); 
		})
    .catch(console.error)		
	});
	async.waterfall(preControllers, function (err, preControllerParams) {
		controller[runFunc](preControllerParams, function (err, result) {
			if (err) res.redirect(501, '/501?err=' + err);
			result.params = params;
			result.params.meta = result.meta || config.meta;
			let ms = 86400000;
			if(!config.noCache){
				res.setHeader('Cache-Control', 'public');
				res.setHeader('maxage', ms*7);
			}
			res.render(config.view, result);
		});

	});

};

Router.router = function (req, res, next) {
	let params = {};
	let url = req.url.split('?'); // Remove the query parameters;
	let route = Router.routes[url[0]]; // Find an exact match for this route

	params.defaults = Router.defaults;
	params.req = req;
	params.res = res;
	params.query = qs.parse(url[1]);

	if (!route) {
		// No match was found check to see if this router has a parameter (e.g /products/:product_id)
		Router._findParameterRoute(url[0], (err, result) => {
			if(err){
				res.status(err.status).render('404');
			}else {
				route = result.route;
				params = _.assign({}, params, result.params);
				Router.render(route, req, res, params);
			}
		});
	} else {
		Router.render(route, req, res, params);
	}
};
