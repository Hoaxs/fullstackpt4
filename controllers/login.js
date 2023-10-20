/*eslint-disable*/
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')


loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body
    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    console.log('LOGGING USER ID IN LOGING ROUTER', user._id)
    const userOfToken = {
        username: user.username,
        id: user._id //user._id,
    }
    const token = jwt.sign(userOfToken, process.env.SECRET, { expiresIn: 60 * 60 }) // token expires in one hour    
    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

loginRouter.get('/', async (request, response) => {
    const userOfToken = request.user
    if (!userOfToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)

})

module.exports = loginRouter