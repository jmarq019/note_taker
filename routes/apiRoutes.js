const router = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

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
      
      const newNote = { title, text, id:uuidv4() };
  
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
    const newArray = dataArray.filter(({id})=>id!=req.params.id)
    console.log(newArray)
        writeToFile('./db/db.json', newArray)  
    res.json(deletedItem)
  });
});

module.exports = router