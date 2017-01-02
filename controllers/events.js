EventsController = module.exports = {};

EventsController.load = function(params, callback){
  let contentful = params.defaults.contentful;

  contentful.getEntries({content_type: 'event'}).then( events => {    
    callback(null, {page: {events: events.items}});
  }).catch(err => {
    console.log(new Error(err));
  });

}
