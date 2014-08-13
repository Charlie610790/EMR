'use strict';

///////////////Current Patient View

var CurrentPatientView = Parse.View.extend({
 
    className: 'CurrentPatient',

    collection: 'CurrentPatientCollection',

 
    CurrentPatientTemplate: _.template($('.CurrentPatientTemplate').text()), 
 
    initialize: function(){
        // console.log(this.model)
        $('.CurrentPatient').append(this.el);
        this.render();

    },
 
    render: function(){
        var renderedTemplate = this.CurrentPatientTemplate(this.model);
        this.$el.html(renderedTemplate);
    },

});

var user = Parse.User.current();
var relation = user.relation("Patients");
relation.query().find({
    success: function(patient) {
        patient.forEach(function(patient){
            new CurrentPatientView({model: patient.attributes})
        });
    }
});
