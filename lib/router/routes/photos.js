const Router = require('../../router');

module.exports = Router.configure("default",{
  "view": "photos",
  "controller": "photos",
  "function": "load",
	"meta": {
  	"title": " | Parish Church of Scotland",
		"description": "Carriden parish church website",
		"keywords": "carriden, parish, church , boness",
		"og": {
  		"image": ""
		}
	}
});
