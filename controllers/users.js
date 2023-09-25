/*eslint-disable*/
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const log = require('../utils/logger')



usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    if (password.length < 3 || username.length < 3) {

        return response.status(400).json({ error: "password length or username length must be at least 3 characters" })
    }
    const user = new User({
        username,
        name,
        passwordHash
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})
usersRouter.get('/', async (request, response) => {

    const users = await User
        .find({})
        .populate('blogs', { author: 1, title: 1, url: 1, likes: 1 })
    response.json(users)

})
module.exports = usersRouter