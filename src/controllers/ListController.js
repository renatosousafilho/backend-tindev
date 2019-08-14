const Dev = require('../models/Dev')

module.exports = {
    async list(req, res) {
        await Dev.find({}, (err, list) => {
            console.log(list)
            res.json(list)
        })
    },

    async delete(req, res) {
        const { id } = req.query
        const dev = await Dev.findByIdAndDelete(id)
        res.json(dev)
    }
}