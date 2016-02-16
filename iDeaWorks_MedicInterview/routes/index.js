/*************
 * Includes
 *************/
  var express = require('express');
  var router = express.Router();

/*************
 * Routing
 *************/
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'iDeaWorks Medic Interview Homework' });
  });

/*************
 * Export
 *************/
  module.exports = router;
