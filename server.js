const express = require('express')
const app = express()
const cors = require('cors')
const levels = require('./levelRouter')
const mongoose = require('mongoose')


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
// console.log(`db url is ${process.env.db_url}`)
mongoose.connect(process.env.db_url, 
{ useNewUrlParser: true, useFindAndModify: false  })
.then( () => console.log("Connected to DB"))
.catch(err => console.log(err))

app.get('/', (req, res) => {
    res.redirect('/api/listLevels')
})


app.listen(process.env.PORT || 3000, () => console.log('listening of port 3000')) 