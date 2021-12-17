models = require('../models')

const faveAnimeController = {}

faveAnimeController.getFave = async (req, res) => {
    try {

        const user = await models.user.findOne({ where : { id: req.headers.authorization } })
        const faveAnimes = await user.getFavAnimes()
        res.json( { faveAnimes } )

        
    } 
    
    catch (error) {
        console.log(error)
        res.status(404).json({ error : error.message })
    }
}



faveAnimeController.createFave = async (req, res) => {
    try {

        const user = await models.user.findOne({ where : { id: req.headers.authorization } })
        const newFaveAnime = await user.createFavAnime({
            animeId : req.params.id
        })
        res.json( { newFaveAnime } )

        
    } 
    
    catch (error) {
        console.log(error)
        res.status(404).json({ error : error.message })
    }
}

faveAnimeController.deleteFave = async (req, res) => {
    try {

        const user = await models.user.findOne({ where : { id: req.headers.authorization } })
        const deleteFaveAnime = await models.favAnime.findOne({where : {animeId : req.params.id, userId : user.id}})
        
        if (user.id === deleteFaveAnime.userId){
            const removeAnime = await deleteFaveAnime.destroy()
            res.json({ message: 'anime deleted successfully', removeAnime })
        }
        else { res.status(401).json({ error: 'not your fav' }) }

        
    } 
    
    catch (error) {
        console.log(error)
        res.status(404).json({ error : error.message })
    }
}

faveAnimeController.createFaveFile = async (req, res) => {
    try {
        const { writeFileSync } = require('fs')
        const path = require('path')

        const user = await models.user.findOne({ where : { id: req.headers.authorization } })
        const faveAnimes = await user.getFavAnimes()

        const userMail = user.email
        const userFile = path.resolve(__dirname, 'userFiles', `${userMail}.txt`)

        await faveAnimes.forEach( async (anime)=>{
            try {

                await writeFileSync(
                    userFile,
    
                    `${ await anime.animeId} \n\n`,
    
                    {
                        encoding: "utf8",
                        flag: "a+",
                        mode: 0o666
                    }
    
                )
                
            } catch (error) {
                res.status(400)
            }


        })

        res.json({complete : 'complete'})
    } 
    
    catch (error) {
        console.log(error)
        res.status(404).json({ error : error.message })
    }
}


module.exports = faveAnimeController