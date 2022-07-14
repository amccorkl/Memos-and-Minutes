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
        //appending the new note using json
        readAndAppend(newNote, "./db/db.json");
        res.json(`New note successfully added`);
    } else {
        res.error("Error posting note");
    }
});

// route for deleting a note
notes.delete("/:id", (req, res) => {
    const noteId = req.params.id;
    readFromFile("./db/db.json")
        .then((data) => JSON.parse(data))
        .then((json) => {
            //filter out the note to delete
            const newArrayNotes = json.filter((item) => item.id != noteId);
            // save new array w/o deleted note
            writeToFile("./db/db.json", newArrayNotes);
            // provide user response to delete function
            res.json(`Note ${id} was deleted`);
        })
        .catch((error) => {
            console.error(`There was an error deleting your note \n${error}`)
        })
});

module.exports = notes;