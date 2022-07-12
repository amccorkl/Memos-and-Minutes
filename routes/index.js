const { Router } = require('express');
//import notes module router
const notesRouter = require('./notes');

const router = Router();


router.use("/notes", notesRouter);



module.exports = router;