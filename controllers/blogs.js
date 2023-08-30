/*eslint-disable*/

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    if (body.author === undefined || body.url === undefined || body.title === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog).end()

})

blogsRouter.get('/', async (request, response) => {

    const blog = await Blog.find({})
    response.json(blog)

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

blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
        // eslint-disable-next-line no-unused-vars
        .then(result => {
            logger.info(`${request.params.id}`)
            response.status(204).end()
        })
        .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
    const { title, author, url, likes } = request.body

    Blog.findByIdAndUpdate(request.params.id, { title, author, url, likes }, { new: true, runValidators: true, context: 'query' })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter