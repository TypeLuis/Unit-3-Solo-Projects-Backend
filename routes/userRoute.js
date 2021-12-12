const userRoute = require('express').Router()

const userController = require('../controllers/userController')

userRoute.post('/', userController.signup)

userRoute.post('/login', userController.login)

userRoute.get('/verify', userController.verifyUser)


module.exports = userRoute