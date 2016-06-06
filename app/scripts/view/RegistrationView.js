'use strict';

/**
 * Module Dependencies
 */
var Backbone = require('backbone');
var moment = require('moment');
var validator = require('validator');
var AppEvent = require('../AppEvent');

var Util = require('../util/Util');

var RegistrationView = Backbone.View.extend({
    template : require('../hbs/registration.hbs'),
    /**
     * Events Map
     */
    events : {
        'click .btn[data-action="submit"]' : 'submit',
        'click .btn[data-action="reset"]' : 'reset',
        'submit form' : 'submit',
        'blur input' : 'activateChecking',
        'keyup input' : 'processValidations',
        'change input[type="checkbox"]' : 'processValidations'
    },
    /**
     * Constructor
     */
    initialize : function() {
        var self = this;

        // TODO: Create a model instead?
        this.validations = {
            title : {
                checking : false,
                valid : false,
                validator : function(val) {
                    return !Util.isNotEmpty(val) ? 'Title cannot be empty' : false;
                }
            },
            first : {
                checking : false,
                valid : false,
                validator : function(val) {
                    return !Util.isPersonName(val) ? 'Invalid first name' : false;
                }
            },
            surname : {
                checking : false,
                valid : false,
                validator : function(val) {
                    return !Util.isPersonName(val) ? 'Invalid surname' : false;
                }
            },
            street : {
                checking : false,
                valid : false,
                validator : function(val) {
                    return !Util.isNotEmpty(val) ? 'Street cannot be empty' : false;
                }
            },
            town : {
                checking : false,
                valid : false,
                validator : function(val) {
                    return !Util.isNotEmpty(val) ? 'Town cannot be empty' : false;
                }
            },
            postcode : {
                checking : false,
                valid : false,
                validator : function(val) {
                    return validator.isNumeric(val) && validator.isLength(val, {
                        min : 4,
                        max : 4
                    }) ? false : 'Invalid postcode';
                }
            },
            birthdate : {
                checking : false,
                valid : false,
                validator : function(val) {
                    return moment(val).isValid() ? false : 'Invalid date of birth';
                }
            },
            tc : {
                checking : false,
                valid : false,
                validator : function(val, $el) {
                    if (!$el.prop('checked')) {
                        return 'Please agree the declaration of age.';
                    } else if (!self.validations.birthdate.valid) {
                        return 'Please enter date of birth.';
                    }

                    var birthdate = self.validations.birthdate.value;
                    var years = moment().diff(birthdate, 'years');
                    return years >= 18 ? false : 'You must be +18 years old.';
                }
            }
        };
    },
    /**
     * On blur, we activate the checking to the specifid validations.
     * 
     * @param {Event} evt
     */
    activateChecking : function(evt) {
        var $el = this.$(evt.currentTarget);
        var name = $el.attr('name');
        var validation = this.validations[name];

        if (!validation.hasOwnProperty('checking')) {
            return;
        }

        validation.checking = true;
        this.processValidations();
    },
    /**
     * We validate the all input with its validator.
     * 
     * We need to validate all inputs rather than single validation because
     * single validation can't handle browser's autofill.
     */
    processValidations : function() {
        for (var name in this.validations) {
            var $el = this.$('input[name="' + name + '"]');
            var val = $el.val();
            var validation = this.validations[name];

            var errorMessage = validation.validator(val, $el);
            validation.valid = errorMessage === false;
            validation.value = val;

            // we only add error class if input is ready for checking.
            if (validation.hasOwnProperty('checking') && validation.checking) {
                if (errorMessage === false) {
                    $el.parent().removeClass('error');
                } else {
                    $el.parent().addClass('error');
                    $el.siblings('.alert').html(errorMessage);
                }
            }
        }

        this.updateButtonState();
    },
    /**
     * Returns true if all inputs are valid.
     * 
     * @returns {Boolean}
     */
    isFormValid : function() {
        for (var name in this.validations) {
            if (!this.validations[name].valid) {
                return false;
            }
        }

        return true;
    },
    /**
     * Submits the form.
     */
    submit : function() {
        // check if form is valid
        if (!this.isFormValid()) {
            return false;
        }

        AppEvent.trigger('thank_you', 'Registration successful.');
        this.reset();
    },
    /**
     * Resets the form.
     */
    reset : function() {
        this.$('form')[0].reset();

        this.resetValidations();
    },
    /**
     * Resets the validation of the form.
     */
    resetValidations : function() {
        for (var key in this.validations) {
            var $el = this.$('input[name="' + key + '"]');
            $el.parent().removeClass('error');

            var validation = this.validations[key];
            validation.valid && (validation.valid = false);
            validation.checking && (validation.checking = false);
        }

        this.updateButtonState();
    },
    /**
     * Update the submit button's state.
     */
    updateButtonState : function() {
        var $el = this.$('.btn[data-action="submit"]');

        if (this.isFormValid()) {
            $el.removeClass('disabled');
        } else {
            $el.addClass('disabled');
        }
    },
    /**
     * Renders the view.
     */
    render : function() {
        this.$el.html(this.template());
        this.resetValidations();
    }
});

/**
 * Expose
 */
module.exports = RegistrationView;