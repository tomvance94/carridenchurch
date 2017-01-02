const express = require('express'),
	app = express(),
	Router = require('./lib/router'),
	hbs = require('hbs'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	registerHelpers = require('./lib/hbsHelpers/index'),
	config = require('./config/core.js'),
	contentful = require('contentful'),
	compression = require('compression'),
	NodeCache = require("node-cache");


const myCache = new NodeCache({stdTTL: 86400, checkperiod: 120});

var contentfulClient = contentful.createClient({
	space: 'hgsqrvkidnaa',
	accessToken: '4d37b49edb811e587377d27c008fe5ff52a022e1b3916078570f0c6319f27c5e'
});


app.use(compression());
app.use(session({secret: 'keyboard cat', cookie: {maxAge: null}, saveUninitialized: true, resave: true}));
// app.use(express.static('assets', {
// 	maxage: '7d',
// 	'Cache-Control': 'public'
// }));

app.use(express.static('assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
registerHelpers(hbs);

hbs.registerPartials("views/partials/");
app.set('view engine', 'hbs');

Router.defaults = {
	"contentful": contentfulClient,
	"config": config,
	"cache": myCache
};

app.get('/sitemap.xml', (req, res) => {
	res.sendFile(__dirname + '/sitemap.xml');
});
app.use('/', Router.router);

app.listen(3030, function () {
	console.log("Brodies Is live on 3030");
});
