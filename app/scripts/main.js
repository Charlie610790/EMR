'use strict';

Parse.initialize('YeurSmzT8p7sZjpGytV4lEH8QekyTjgwG5TCLYxK', 'Vur7PawxgMXrcMTex5y4rOSk0aT8wRQdOghxVRIv');

var User = Parse.Object.extend ({
	className: 'User'
});

var UserCollection = Parse.Collection.extend({
    model: 'User'
});

var collection = new UserCollection();

var Patient = Parse.Object.extend ({
	className: 'Patient'
});

var PatientCollection = Parse.Collection.extend({
    model: 'Patient'
});

var PatientCollection = new PatientCollection();

///////////////Login Button

$('.loginButton').click(function() {
	var username =	$('#userName').val();
	var password =	$('#password').val();
	Parse.User.logIn(username, password, {
	success: function(user) {
		window.location.replace('http://localhost:9000/home.html')  	
	},
	error: function(user, error) {
    // The login failed. Check error to see why.
  	}

});
	console.log('You Logged In');

});

///////////////Logout Button

$('.logoutButton').click(function() {
	Parse.User.logOut();
	window.location.replace('http://localhost:9000/index.html');
	console.log('You Logged Out');
});
///////////////Patients View

var PatientsView = Parse.View.extend({
 
    className: 'Patients',

    collection: 'PatientsCollection',

 
    PatientsTemplate: _.template($('.PatientsTemplate').text()),
 
 
    initialize: function(){
        // console.log(this.model)
        $('.PatientsContainer').append(this.el);
        this.render();

    },
 
    render: function(){
        var renderedTemplate = this.PatientsTemplate(this.model);
        this.$el.html(renderedTemplate);
    },

});
        
var user = Parse.User.current();
var relation = user.relation("Patients");
relation.query().find({
    success: function(stadiums) {
        stadiums.forEach(function(patient){
            new PatientsView({model: patient.attributes})
        });
    }
});

///////////////Doctor Name View

var DoctorName = Parse.View.extend({
 
    className: 'DoctorName',

    collection: 'DoctorNameCollection',

 
    DoctorNameTemplate: _.template($('.DoctorName').text()),
 
 
    initialize: function(){
        // console.log(this.model)
        $('.doctorName').append(this.el);
        this.render();

    },
 
    render: function(){
        var renderedTemplate = this.DoctorNameTemplate(this.model);
        this.$el.html(renderedTemplate);
    },

});
        
var user = Parse.User.current();
var relation = user.relation("Patients");
relation.query().find({
    success: function(stadiums) {
        stadiums.forEach(function(patient){
            new PatientsView({model: patient.attributes})
        });
    }
});

$('.patientAdd').click(function() {

	var Patient = Parse.Object.extend("Patient");
	var query = new Parse.Query(Patient);
	query.get("xwas4Iqwgi", {
	  success: function(patient) {
		var user = Parse.User.current();
		var relation = user.relation("Patients");

		relation.add(patient);
		user.save();
	  },
	  error: function(object, error) {
	  }
	});	
	console.log('You Added It');
});

///////////////Logout Button

$('.logoutButton').click(function() {
	Parse.User.logOut();
	window.location.replace('http://localhost:9000/index.html');
	console.log('You Logged Out');
});
///////////////
