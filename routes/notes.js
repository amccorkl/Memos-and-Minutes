const router = express.Router();
//unique id for each note
const {v4: uuidv4} = require('uuid')
//using helper functions
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');


//route for retrieving rendered notes
router.get('/', (req, res) => {
    //if not working, check 2 dots
    readFromFile("./db/db.json")
    .then(data => res.json(JSON.parse(data)));    
});

//route for posting notes
router.post('/', (req, res) => {
    //destructuring the json object
    const { title, text } = req.body;
    if(title && text) {
        const newNote = {
            title,
            text,
            router_id: uuidv4(),
        };
        readAndAppend(newNote, "./db/db.json");
        res.json(`New notes successfully added`);
    } else {
        res.error("Error posting note");
    }
});

module.exports = router;