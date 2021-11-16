const router = require('express').Router()

router.get('/notes', (req, res) =>{
    
    res.render('notes')

});

module.exports = router;