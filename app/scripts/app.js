'use strict';

/**
 * Module Dependencies
 */
var $ = require('jquery');

var MainView = require('./view/MainView');

var mainView = new MainView();

// TODO: Separate the shame
// this workaround is just to avoid using 2 version of jquery
global.jQuery = $; // add to global
var bootstrap = require('bootstrap');
delete global.jQuery; // remove from global