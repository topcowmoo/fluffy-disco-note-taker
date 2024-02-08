const express = require('express');
const router = require('router');


const uuid = require('uuid');


const database = require('../db/database');



// function to GET api notes  that will read database.json file and return
// all saved notes as json data


// function to POST api notes that are recieved from new note added in database.json file
//  then add it to database.json then return new note to client


// add unique id to each note when saved. do old notes need id as well?

// BONUS add DELETE api/notes/:id should recieve a query param containing the id of a note to 
// delete. in order to delete a note, you'll need to read all notes from the database.json file
// remove the note with the given id property and then rewrite the note(s) to the database.json file






module.exports = router


