const userRoute = require('express').Router()

const userController = require('../controllers/userController')

userRoute.post('/', userController.signup)

userRoute.post('/login', userController.login)

userRoute.get('/verify', userController.verifyUser)

userRoute.post('/download', userController.downloads)


module.exports = userRoute