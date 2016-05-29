'use strict';

/**
 * Module dependencies
 */
var feedsPolicy = require('../policies/feeds.server.policy'),
  feeds = require('../controllers/feeds.server.controller');

module.exports = function(app) {
  // Feeds Routes
  app.route('/api/feeds').all(feedsPolicy.isAllowed)
    .get(feeds.list)
    .post(feeds.create);

  app.route('/api/feeds/:feedId').all(feedsPolicy.isAllowed)
    .get(feeds.read)
    .put(feeds.update)
    .delete(feeds.delete);

    app.route('/api/feeds/activities/like/:feedId').all(feedsPolicy.isAllowed)
    .post(feeds.like);
    
     app.route('/api/feeds/activities/comment/:feedId')
    .post(feeds.comment);

  // Finish by binding the Feed middleware
  app.param('feedId', feeds.feedByID);
};
