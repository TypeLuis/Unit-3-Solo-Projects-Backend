models = require('../models')

const watchedController = {}

watchedController.getWatched = async (req, res) => {
    try {
        
        const user = await models.user.findOne({ where : { id: req.headers.authorization } })
        const getAllWatched = await user.getWatcheds()
        res.json( { getAllWatched } )

    } 
    
    catch (error) {
        console.log(error)
        res.status(404).json({ error : error.message })
    }
}


watchedController.createWatched = async (req, res) => {
    try {

        const user = await models.user.findOne({ where : { id: req.headers.authorization } })
        const newWatched = await user.createWatched({
            animeId : req.params.id
        })
        res.json( { newWatched } )
        
    } 
    
    catch (error) {
        console.log(error)
        res.status(404).json({ error : error.message })
    }
}



watchedController.deleteWatched = async (req, res) => {
    try {
        
        const user = await models.user.findOne({ where : { id: req.headers.authorization } })
        const Watched = await models.watched.findOne({where : {animeId : req.params.id, userId : user.id}})
        
        if (user.id === Watched.userId){
            const removeWatch = await Watched.destroy()
            res.json({ message: 'anime deleted successfully', removeWatch })
        }
        else { res.status(401).json({ error: 'not your fav' }) }

    } 
    
    catch (error) {
        console.log(error)
        res.status(404).json({ error : error.message })
    }
}



module.exports = watchedController