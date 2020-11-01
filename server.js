const express = require('express')
const app = express()
const cors = require('cors')
const levels = require('./levelRouter')
const mongoose = require('mongoose')
const levelModel = require('./levelModel');

// MIDDLEWARE functions
// for cross site scripting stuff
app.use(cors()) 
app.use(express.json()); // gets the json working
app.use(express.static('static'));
app.use(express.urlencoded( { extended: true } ));
app.use('/api', levels) // plug in levels API

app.set('view engine', 'pug');
app.set('views', './views')

// MONGODB stuff
// console.log(`pass: ${process.env.pass}`)

mongoose.connect(`mongodb+srv://kidnikid:${process.env.pass}@espicehuntingpractice-qwqid.mongodb.net/espiceHuntingPractice?retryWrites=true&w=majority`, 
{ useNewUrlParser: true, useFindAndModify: false  })
.then( () => console.log("Connected to DB"))
.catch(err => console.log(err))

app.get('/', (req, res) => {
    res.redirect('/api/listLevels')
})

// ENDPOINTS

app.listen(process.env.PORT || 3000, () => console.log('listening of port 3000')) 