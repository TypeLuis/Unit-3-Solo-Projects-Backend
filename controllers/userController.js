models = require('../models')

const userController = {}


userController.signup = async (req, res) => {
    try {

        const user = await models.user.create({
            where: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        })

        res.json({ success: 'User Created', user })
    }

    catch (error) {
        res.status(404).json({ error: error.message })
    }
}


userController.login = async (req, res) => {
    try {

        const user = await models.user.findOne({ where: { name: req.body.name } })

        if (user && user.password === req.body.password) {
            res.json({ success: 'User Logged in', user })
        }


        res.json({ success: 'User Created', user })
    }

    catch (error) {
        res.status(404).json({ error: error.message })
    }
}


userController.verifyUser = async (req, res) => {
    try {

        const user = await models.user.findOne({ where: { id: req.headers.authourization } })

        if (user) { res.json({ user: user }) }
        else { res.status(401).json({ message: 'user not found' }) }
    }

    catch (error) {
        res.status(404).json({ error: error.message })
    }
}



module.exports = userController