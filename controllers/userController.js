models = require('../models')

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



module.exports = userController