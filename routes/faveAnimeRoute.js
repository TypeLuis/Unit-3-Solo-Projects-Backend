const faveAnimeRoute = require('express').Router()

const faveAnimeController = require('../controllers/faveAnimeController')


faveAnimeRoute.get('/', faveAnimeController.getFave)

faveAnimeRoute.get('/all', faveAnimeController.getAllFaves)

faveAnimeRoute.post('/:id', faveAnimeController.createFave)

faveAnimeRoute.delete('/:id', faveAnimeController.deleteFave)

faveAnimeRoute.get('/write', faveAnimeController.createFaveFile)


module.exports = faveAnimeRoute