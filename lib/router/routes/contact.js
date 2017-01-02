const Router = require('../../router');

module.exports = Router.configure("default",{
  "view": "contact",
  "controller": "contact",
  "methods": {
    "get": "load",
    "post": "send"
  },
	"meta": {
  	"title": " | Parish Church of Scotland",
		"description": "Carriden parish church website",
		"keywords": "carriden, parish, church , boness",
		"og": {
  		"image": ""
		}
	}
});
