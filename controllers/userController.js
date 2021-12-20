models = require('../models')
const https = require('https')

const Fs = require('fs')

const Path = require('path')

const Axios = require('axios')

const userController = {}


userController.signup = async (req, res) => {
    try {

        const user = await models.user.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
        })

        res.json({ success: 'User Created', user })
    }

    catch (error) {
        console.log(error)
        res.status(404).json({ error: error.message })
    }
}


userController.login = async (req, res) => {
    try {

        const user = await models.user.findOne({ where: { email: req.body.email } })

        if (user && user.password === req.body.password) {
            res.json({ success: 'User Logged in', user })
        }
        else{
            res.status(401).json({ message: 'login failed'})
        }


    }

    catch (error) {
        res.status(404).json({ error: error.message })
    }
}


userController.verifyUser = async (req, res) => {
    try {
        // console.log(req)
        const user = await models.user.findOne({ where: { id: req.headers.authorization } })

        if (user) { res.json({ user: user }) }
        else { res.status(401).json({ message: 'user not found' }) }
    }

    catch (error) {
        res.status(404).json({ error: error.message })
    }
}


userController.downloads = async (req, res) => {
    try {
        const user = await models.user.findOne({ where: { id: req.headers.authorization } })
        const category = await req.body.category

        const userMail = user.email.includes('@') ? `${user.email.split('@')[0]}` : `${user.email}`

        let dir 

        if(user){

            switch(category){

                case 'watched' :
                    
                    const getAllWatched = await user.getWatcheds()
                    dir = `./controllers/watched/${userMail}`

                    Fs.mkdir(dir, (err) => {
                        if (err) { console.log(err) }
                        console.log('File created')
                    })

                    await getAllWatched.forEach(async (show) => {

                        try {
                            const url = show.imageUrl

                            const path = Path.resolve(__dirname, `watched/${userMail}`, `${show.animeId}.jpg`)
    
                            const response = await Axios({
    
                                method : 'GET',
                        
                                url: url,
                                
                                // this parameter allows the response to be a readable stream
                                // we can then pipe our readable stream to a destination
                                responseType : 'stream'
                            })
                            
                            // fs.createWriteStream(path) creates a writable stream to the path
                            // response.data is the readable stream that's being pushed
                            await response.data.pipe(Fs.createWriteStream(path))
                        } 
                        
                        catch (error) {
                            console.log(error)
                            res.status(500)
                        }


                    })
                    res.json({success : 'download success'})
                break

                case 'favorite' :
                    const faveAnimes = await user.getFavAnimes()

                    dir = `./controllers/favorites/${userMail}`

                    Fs.mkdir(dir, (err) => {
                        if (err) { console.log(err) }
                        console.log('File created')
                    })

                    await faveAnimes.forEach(async (show) => {

                        try {
                            const url = show.imageUrl

                            const path = Path.resolve(__dirname, `favorites/${userMail}`, `${show.animeId}.jpg`)
    
                            const response = await Axios({
    
                                method : 'GET',
                        
                                url: url,
                        
                                responseType : 'stream'
                            })
    
                            await response.data.pipe(Fs.createWriteStream(path))
                        } 
                        catch (error) {
                            
                            console.log(error)
                            res.status(500)
                        }


                    })
                    res.json({success : 'download success'})


                break

                default :
                    console.log(error)
                    res.status(403).json({message : 'category not found'})
                break

            }
            
        }
        else{
            console.log(error)
            res.status(401).json({message : 'Please Sign in before downloading'})
        }

    } 
    catch (error) {
        console.log(error)
        res.status(404).json({ error: error.message })
    }
} 



module.exports = userController