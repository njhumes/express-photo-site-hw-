const express = require('express')
const app = express();
require('./db/db');
const userController = require('./controller/users')
const photoController = require('./controller/photos')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use('/users', userController)
app.use('/photos', photoController)

app.use('/', (req, res) => {
    res.render('index.ejs')
})



app.listen(3000, () => {
    console.log(`Server is on port 3000`)
})