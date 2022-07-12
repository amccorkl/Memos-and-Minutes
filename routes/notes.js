const notes = require("express").Router();
//unique id for each note
const { v4:uuidv4 } = require('uuid')
//using helper functions
const { readFromFile, 
    writeToFile, 
    readAndAppend 
    } = require('../helpers/fsUtils');


//route for retrieving rendered notes
notes.get('/', (req, res) => {
    readFromFile("./db/db.json")
    .then(data => res.json(JSON.parse(data)));    
});

//route for posting notes
notes.post('/', (req, res) => {
    //destructuring the json object
    const { title, text } = req.body;
    if(req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNote, "./db/db.json");
        res.json(`New note successfully added`);
    } else {
        res.error("Error posting note");
    }
});

module.exports = notes;