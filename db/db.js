const mongoose = require('mongoose')
const connectionString = 'mongodb://localhost/photo_hw'

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

mongoose.connection.on('connected', () => {
    console.log(`Mongoose is connected ${connectionString}`)
})
mongoose.connection.on('error', (err) => {
    console.log('Mongoose error ', err)
})
mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose is disconnected to ${connectionString}`)
})