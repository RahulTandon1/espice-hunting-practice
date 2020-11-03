var express = require('express')
var router = express.Router()
const Level = require('./levelModel')
const levelHandler = require('./levelHandler');

// makes level in db
router.post('/makeLevel', (req, res) => {
    createLevel(req.body.name, req.body.author, req.body.levelText, req.body.answer)
    .then((madeLvl) => {
        addEndpoint(madeLvl._id)
        .then(endpoint => res.send(JSON.stringify({'endpoint': endpoint})))
        .catch(err => res.send(err))
    })
    .catch((err) => res.send(err))
})

router.get('/', (req, res) => {
    res.redirect('/api/listLevels')
})


// gets level stuff from api so that front end has Question and Level Author
router.get('/getLevel/:endpoint', (req, res) => {
    Level.findOne({endpoint: req.params.endpoint})
    .then( (lvl) => {
        obj = {
            name: lvl.name,
            author: lvl.author, 
            levelText: lvl.levelText
        }
        res.render('basicLvl', obj)
    })
    .catch( (err) => {
        console.log('Err at getLevel', err)
        res.redirect('/notFound/index.html')
    })
})



router.post('/checkAns/', async (req, res) => {
    try {
        const isCorrect = await isAnsCorrect(req.body.endpoint, req.body.answer);

        if (isCorrect){
            res.send(JSON.stringify({'answerStatus': 'correct'}))
        }
        else {
            res.send(JSON.stringify({'answerStatus': 'incorrect'}))
        }
    }
    catch(err) {
        res.error(err)
    }
})

router.get('/listLevels', async (req, res) => {
    
    levelHandler.getAllLevels()
    .then (levels => res.render('listLvls', {levels}))
    .catch(err => console.error(err))
})


module.exports = router