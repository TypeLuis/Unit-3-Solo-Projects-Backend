models = require('../models')

const commentController = {}

commentController.test = async (req, res) => {
    try {
        
    } 
    
    catch (error) {
        console.log(error)
        res.status(404).json({ error : error.message })
    }
}


module.exports = commentController