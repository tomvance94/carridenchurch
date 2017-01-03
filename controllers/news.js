const NewsController = module.exports = {};
const marked = require('marked');

NewsController.load = function(params, callback) {

	let contentful = params.defaults.contentful;

	contentful.getEntries({'sys.id': '1DcIYrGfty4CMoYisK6QSm'}).then( page => {
		let fields = page.items[0].fields;

    NewsController.getPosts(params, function(err, posts) {
      callback(null, { page: {
        title: fields.title,
        posts: posts
      }});
    });
	}).catch(err => {
		console.log(new Error(err));
	});

};


NewsController.getPosts = function(params, callback) {
  let contentful = params.defaults.contentful;

  contentful.getEntries({'content_type': 'newsPost'}).then( page => {
		page.items.sort( (a, b) => {
			let aDate = new Date(a.fields.postedDate);
			let bDate = new Date(b.fields.postedDate);
			if(aDate > bDate) return -1;
			if(aDate < bDate) return 1;

			return 0;
		});
    callback(null, page.items);
  }).catch( err => {
    console.log(new Error(err));
  });

};

NewsController.post = function(params, callback) {
  let contentful = params.defaults.contentful;

  contentful.getEntries({'content_type': 'newsPost','fields.urlName': params.post}).then( page => {
    let fields = page.items[0].fields;
    callback(null, {page: {
      title: fields.postTitle,
      date: fields.postedDate,
      content: marked(fields.content),
			audio: fields.recording
    }});
  }).catch(err => {
    console.log(new Error(err));
  });

}
