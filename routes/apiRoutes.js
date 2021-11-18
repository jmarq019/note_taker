const router = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');


// GET Route for retrieving all the feedback
router.get('/notes', (req, res) => {  
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post('/notes', (req,res) =>{

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (req.body) {
      
      const newNote = { title, text };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully 🚀`)
      
    } else {
      res.json('Error in saving note');
    }

});

module.exports = router