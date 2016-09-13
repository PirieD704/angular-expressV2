var express = require('express');
var router = express.Router();
//include the mogoose module
var mongoose = require('mongoose');
//Set up the mongourl that we will connect to. Mongo listens on 27010, the path is the db we will use
var mongoUrl = "mongodb://localhost:27017/searchApp";
// Include our students model. IT is a mongoose model so it will automaticalls use the db that mongoose conenects to
var Student = require('../models/students');
// Connect mongoose to the mongourl. now our student model, is connected to mongo, using the collection we specified in the model
mongoose.connect(mongoUrl);

// Set up an endpoint (route) for apps to get all students
router.get('/getStudents', (req, res, next)=>{
	//Use the student object (which is a mongoose model - connected to mongo) to run a query
	Student.find({}, (error,documents) =>{
		// if mongoose returns an error(such as con't connect) our program will halt here
		if(error){
			// print off the error
			res.json(error);
		}else{
			// if there is no error, then print off the result of the query
			res.json(documents);
		}
	})
});

// Make a route for someone to add a new student
router.post('/addStudent', (req, res, next) =>{
	//Set up a var for the variable "name" passed from a form
	//req.body is the object that contains all variables passed from a form
	var studentName = req.body.name;
	// Same with gender
	var studentGender = req.body.gender;
	// Create a new Student onject. THis will be in the likeness of the new student Schema
	var studentToAdd = new Student({
		name: studentName,
		gender: studentGender
	})
	// Save the student to mongodb
	studentToAdd.save();
	// Let the requester know that we added the student
	res.json({message: "added", name: studentName});
});

router.post('/removeStudent', (req, res, next) =>{
	Student.find({name: req.query.student}).remove((error)=>{
		if(error){
			console.log("ERROR removing!")
		}else{
			res.json({message: "removed"});
		}
	})
});

module.exports = router;
