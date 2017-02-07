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
	space: '70gp6c1vp3hf',
	accessToken: 'ef37a8331e3c798886bda863b82be51ab6769dc20ecd8217b5368f07a1e61028'
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

app.listen(9090, function () {
	console.log("Brodies Is live on 9090");
});
