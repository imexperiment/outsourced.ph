'use strict';

/**
 * Module Dependencies
 */
var Backbone = require('backbone');
var _ = require('underscore');
var Util = require('./util/Util');

var AppEvent = { };

_.extend(AppEvent, Backbone.Events);

AppEvent.trigger = function(evt) {
    var args = Util.sliceArgs(arguments);

    console.debug('AppEvent Triggered:', evt);

    var evts = evt.split(':');

    for (var idx = 0, len = evts.length - 1; idx < len; idx++) {
        var evtArgs = args.slice(1);
        evtArgs.unshift(evts.slice(0, idx + 1).join(':'));

        Backbone.Events.trigger.apply(this, evtArgs);
    }

    return Backbone.Events.trigger.apply(this, args);
};

/**
 * Expose Constructor `AppEvent`
 */
global.AppEvent = module.exports = AppEvent;