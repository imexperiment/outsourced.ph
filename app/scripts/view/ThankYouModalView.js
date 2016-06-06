'use strict';

/**
 * Module Dependencies
 */
var Backbone = require('backbone');

var AppEvent = require('../AppEvent');

var ThankYouModalView = Backbone.View.extend({
    template : require('../hbs/thank_you_modal.hbs'),
    /**
     * Constructor
     */
    initialize : function() {
        this.initListeners();

        this.render();
    },
    initListeners : function() {
        this.listenTo(AppEvent, 'thank_you', this.setMessage);
    },
    /**
     * Set modal message.
     * @param {String} message
     */
    setMessage : function(message) {
        this.$('.modal-body').html(message);
        this.$el.modal('show');
    },
    /**
     * Renders the view.
     */
    render : function() {
        this.$el.html(this.template());
        this.setElement(this.$('.modal'));
    }
});

/**
 * Expose
 */
module.exports = ThankYouModalView;