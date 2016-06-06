'use strict';

/**
 * Module Dependencies
 */

var Util = { };

/**
 * RegExp Patterns
 */
Util.PATTERNS = {
    PERSON_NAME_CLEANUP : /[^A-Za-z0-9_]/gi,
    PERSON_NAME : /^[a-zA-Z ]+$/
};

/**
 * Slice the arguments.
 * 
 * @param {Arguments} args
 * @returns {Array}
 */
Util.sliceArgs = function(args) {
    var newArgs = [];

    for (var idx = 0; idx < args.length; ++idx) {
        newArgs[idx] = args[idx];
    }

    return newArgs;
};

/**
 * Returns true if the specific string is a valid person's name.
 * 
 * @param {String} name
 * @returns {Boolean}
 */
Util.isPersonName = function(name) {
    name = name.replace(Util.PATTERNS.PERSON_NAME_CLEANUP, '');

    return Util.PATTERNS.PERSON_NAME.test(name);
};

/**
 * Returns true if str is not empty.
 * 
 * @param {String} str
 * @returns {Boolean}
 */
Util.isNotEmpty = function(str) {
    return str.trim().length !== 0;
};

/**
 * Expose `Util`
 */
module.exports = Util;