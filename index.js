/*eslint-disable*/
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

const requestLogger = (request, response, next) => {

    console.log('Method: ', request.method)
    console.log('path: ', request.path)
    console.log('Body: ', request.body)
    console.log('...')
    next()
}
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })

}

const errorHandler = (error, request, response, next) => {

    //console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' })
    }
    else if (error.name === 'ValidationError') {

        return response.status(400).send({ error: error.message })
    }
    next(error)//pass other types of errors to express
}


const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'title required']
    },
    author: {
        type: String,
        required: [true, 'author required']
    },
    url: String,
    likes: Number

})


const Blog = new mongoose.model('Blog', blogSchema)
const mongoUrl = process.env.MONGODB_URI
const con = mongoose.connect(mongoUrl)
if (con)
    console.log('connected to database')

app.post('/api/blogs', (request, response, next) => {
    const body = request.body

    if (body.author === undefined) {
        return response.status(400).json({ error: "content missing" })

    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
    blog.save()
        .then(savedBlog => {
            response.json(savedBlog)
        })
        .catch(error => next(error))

})

app.put('/api/blogs:id', (request, response, next) => {
    const { title, author, url, likes } = request.body

    Blog.findByIdAndUpdate(request.params.id, { title, author, url, likes }, { new: true, runValidators: true, context: 'query' })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})

app.get('/api/blogs', (request, response) => {

    Blog.find({}).then(blog => {
        response.json(blog)
    })
})
// use Mongoose findById method
app.get('/api/blogs/:id', (request, response) => {
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
            console.error(`${error}`)
            response.status(500).send({ error: 'malformed id' })
        })
})

app.delete('/api/blogs/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
        // eslint-disable-next-line no-unused-vars
        .then(result => {
            console.log(`${request.params.id}`)
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/blogs/:id', (request, response, next) => {
    const { title, author, url, likes } = request.body

    Blog.findByIdAndUpdate(request.params.id, { title, author, url, likes }, { new: true, runValidators: true, context: 'query' })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})

blogSchema.set('toJson', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

app.use(unknownEndpoint)
app.use(errorHandler)
console.log('branch part4.1')
const PORT = process.env.PORT
app.listen(PORT, () => { console.log(`Running on port ${PORT}`) })