'use strict';

/**
 * Module Dependencies
 */
var Backbone = require('backbone');

var ThankYouModalView = require('./ThankYouModalView');
var RegistrationView = require('./RegistrationView');

var MainView = Backbone.View.extend({
    el : '[data-id="main"]',
    /**
     * Constructor
     */
    initialize : function() {
        this.initializeRegistration();
        this.initializeThankYouModal();

        this.setView(this.registrationView);
    },
    /**
     * Initialize registration component.
     */
    initializeRegistration : function() {
        this.registrationView = new RegistrationView();
    },
    /**
     * Initialize thank you modal component.
     */
    initializeThankYouModal : function() {
        this.thankYouModalView = new ThankYouModalView();
        this.$el.parent().append(this.thankYouModalView.$el);
    },
    /**
     * Set the layout's view.
     * 
     * @param {Backbone.View} view
     */
    setView : function(view) {
        view.render();
        this.$el.html(view.$el);
    }
});

/**
 * Expose
 */
module.exports = MainView;