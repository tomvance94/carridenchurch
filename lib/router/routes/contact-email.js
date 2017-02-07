const Router = require('../../router');

module.exports = Router.configure("default",{
	"view": "emails/contact",
	"controller": "contact",
	"function": "render"
});
