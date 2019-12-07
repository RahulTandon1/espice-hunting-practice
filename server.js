const express = require('express')
const app = express()
app.use(express.json()); // gets the json working
app.use(express.static('static'));
app.use(express.urlencoded( { extended: true } ));


app.set('view engine', 'pug');
app.set('views', './views')
// for routers app.use() 

// MONGODB stuff

const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://kidnikid:${process.env.pass}@espicehuntingpractice-qwqid.mongodb.net/espiceHuntingPractice?retryWrites=true&w=majority`, 
{ useNewUrlParser: true, useFindAndModify: false  })
.then( () => console.log("Connected to DB"))
.catch(err => console.log(err))

const levelSchema = new mongoose.Schema({
    name: String, 
    author: String,
    levelText: String,
    answer: String,
    endpoint: {type: String, default: ""},
    date: { type: Date, default: Date.now }
});
const Level = mongoose.model('Level', levelSchema); // modelling level schema

async function createLevel(name, author, text, answer) {
    try {
        const level = new Level ({
            name: name,
            author: author, 
            levelText: text,
            answer: answer
        });
        
        const result = await level.save();
        return result;
    }
    catch(err) {
        console.log("Error while making level for DB", err)
    }
}

async function addEndpoint(objID) {
    try{
        let lvl = await Level.findOneAndUpdate(
            {_id : objID},     // filter
            { endpoint: String(objID).slice(-4)},   // update 
            {new: true}
        )    // returns updated object
        return lvl.endpoint
    }
    catch (err) {
        console.log("Error while adding Endpoint")
    }
}

// ENDPOINTS

// makes level in db
app.post('/api/makeLevel', (req, res) => {
    createLevel(req.body.name, req.body.author, req.body.levelText, req.body.answer)
    .then((madeLvl) => {
        addEndpoint(madeLvl._id)
        .then(endpoint => res.send(JSON.stringify({'endpoint': endpoint})))
        .catch(err => res.send(err))
    })
    .catch((err) => res.send(err))
})

// gets level stuff from api so that front end has Question and Level Author
app.get('/api/getLevel/:endpoint', (req, res) => {
    Level.findOne({endpoint: req.params.endpoint})
    .then( (lvl) => {
        console.log(lvl)
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

app.post('/api/checkAns/', (req, res) => {
    ansStat = 'wrong'
    Level.findOne({endpoint: req.body.endpoint})
    .then((lvl) => {
        if (lvl.answer === req.body.answer){
            ansStat = 'correct'
        } 
        res.send(JSON.stringify({'answerStatus': ansStat}))
    })
    .catch( err => res.send(err))
})

app.listen(3000 || process.env.PORT, () => console.log('listening of port 3000')) 