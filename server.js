// if you have encryption add this when pushing to heroku
// require('dotenv').config()

// importing express and using function in express and calling it app
const express = require('express')
const app = express()

// morgan lets us know if requests went through
const morgan = require('morgan')
app.use(morgan('tiny'))

// variable to start rowdy-logger
const routesReport = require('rowdy-logger').begin(app)

// accepts json formatting
app.use(express.json())

// allows us to fetch our api in the frontEnd
app.use(require('cors')())

const userRoute = require('./routes/userRoute')
const faveAnimeRoute = require('./routes/faveAnimeRoute')
const watchedRoute = require('./routes/watchedRoute')

app.use('/user', userRoute)
app.use('/fave', faveAnimeRoute)
app.use('/watched', watchedRoute)

// access our port and starts the server
const PORT = process.env.PORT || 3020
app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
    routesReport.print()
})