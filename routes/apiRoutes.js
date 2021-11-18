const router = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');


// GET Route for retrieving all the feedback
router.get('/notes', (req, res) => {  
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post('/', (req,res) =>{

    // Destructuring assignment for the items in req.body
    const { title, text} = req.body;
  
    // If all the required properties are present
    if (req.body) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
      };
  
      readAndAppend(newNote, './db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting feedback');
    }

});

module.exports = router