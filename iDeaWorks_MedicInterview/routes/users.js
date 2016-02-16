/*************
 * Includes
 *************/
  var express = require('express');
  var router = express.Router();

/*************
 * Routing
 *************/
  /* GET users listing. */
  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

/*************
 * Export
 *************/
  module.exports = router;
