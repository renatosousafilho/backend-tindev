const Dev = require('../models/Dev')

module.exports = {
    async store(req, res) {
        console.log(req.io, req.connectedUsers)
        const { devId } = req.params
        const { user } = req.headers

        const loggedUser = await Dev.findById(user)
        const targetDev = await Dev.findById(devId)

        if (!targetDev) {
            return res.status(400).json({ error: 'Dev not exists' })
        }

        if (targetDev.likes.includes(loggedUser._id)) {
            const loggedSocket = req.connectedUsers[user]
            const targetSocket = req.connectedUsers[devId]

            if (loggedSocket) {
                req.io.to(loggedSocket).emit('match', targetDev)
            }

            if (targetSocket) {
                req.io.to(targetSocket).emit('match', loggedUser)
            }
        }

        loggedUser.likes.push(targetDev._id)
        loggedUser.save()

        return res.json(loggedUser)
    }
}