const router = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');


// GET Route for retrieving all the feedback
router.get('/notes', (req, res) => {  
    readFromFile('./db/db.json')
    .then((data) => {
      res.json(JSON.parse(data))
    })
});

router.get('/notes/:id', (req, res) =>{
  readFromFile('./db/db.json')
  .then((data) => {
    let dataArray = JSON.parse(data) || [];
    res.json(dataArray[req.params.id])
  })
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


router.delete('/notes/:id', (req, res) =>{
  readFromFile('./db/db.json')
  .then((data) => {
    let dataArray = JSON.parse(data) || []
    let deletedItem = dataArray[req.params.id]
    dataArray.splice(req.params.id, 1)
    console.log(req.params.id)
    console.log(dataArray)
        writeToFile('./db/db.json', dataArray)  
    res.json(deletedItem)
  });
});

module.exports = router