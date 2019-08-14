const Dev = require('../models/Dev')

module.exports = {
    async store(req, res) {
        const { devId } = req.params
        const { user } = req.headers

        const loggedUser = await Dev.findById(user)
        const targetDev = await Dev.findById(devId)

        if (!targetDev) {
            return res.status(400).json({ error: 'Dev not exists' })
        }

        if (targetDev.likes.includes(loggedUser._id)) {
            console.log("DEU MATCH!")
        }

        loggedUser.likes.push(targetDev._id)
        loggedUser.save()

        return res.json(loggedUser)
    }
}