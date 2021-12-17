const watchedRoute = require('express').Router()

const watchedController = require('../controllers/watchedController')


watchedRoute.get('/', watchedController.getWatched)
watchedRoute.post('/:id', watchedController.createWatched)
watchedRoute.delete('/:id', watchedController.deleteWatched)


module.exports = watchedRoute