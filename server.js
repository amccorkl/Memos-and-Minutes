const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT =  process.env.PORT || 3001;
//function that creates the express function bound to the word app
const app = express();

//middleware and static files
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//folder with files made public to the browser
app.use(express.static("public"));

app.use("/api", api);

//home UI route
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, "/public/index.html")))

//notes UI route
app.get("/notes", (req, res) => 
    res.sendFile(path.join(__dirname, "/public/notes.html")))

//wildcard response
app.get("*", (req, res) => 
    res.status(404)
    .sendFile(path.join(__dirname, "/public/404.html")))

app.listen(PORT, () => 
    console.log(`listening on port ${PORT}`));