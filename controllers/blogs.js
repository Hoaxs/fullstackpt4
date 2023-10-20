/*eslint-disable*/

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/user')
const middleware = require('../utils/middleware')




/*const getTokenFrom = request => {
    // will be refactored to middleware
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {

        return authorization.replace('Bearer ', '')// Note: Bearer seems case sensitive.Use the same case when sending request on POSTMAN or VScode Rest Client. Also strip  off the token's enclosing quotation marks in VScode Client.


    }
    return null
}
*/

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
    const body = request.body

    // verification of user refactored to middleware
    const decodedToken = request.user

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    if (body.author === undefined || body.title === undefined || body.url === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)// one to many relationship
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)

})

// use Mongoose findById method
blogsRouter.get('/:id', (request, response) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog)
            }
            else {
                response.status(400).end()
            }

        })
        .catch(error => {
            logger.error(`${error}`)
            response.status(500).send({ error: 'malformed id' })
        })
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {

    const blog = await Blog.findById(request.params.id)

    const decodedToken = request.user

    if (blog.user.toString() !== (decodedToken.id)) {
        return response.status(401).json({ error: "Invalid user" })
    }
    await Blog.findByIdAndRemove(request.params.id)
    // eslint-disable-next-line no-unused-vars      
    logger.info(`${request.params.id}`)
    response.status(204).end()


})

blogsRouter.put('/:id', (request, response, next) => {
    const { title, author, url, likes } = request.body

    Blog.findByIdAndUpdate(request.params.id, { title, author, url, likes }, { new: true, runValidators: true, context: 'query' })
        .then(updatedBlog => {
            response.status(204).json(updatedBlog)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter