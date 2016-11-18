'use strict';

var indexController = require('./indexController');

module.exports = function(app) {
	app.get('/', indexController.index);
};
