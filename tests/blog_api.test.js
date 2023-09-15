/*eslint-disable*/
/*Integration testing. Testing the backend together with the database. Supertest library is used to test API. It makes HTTP requests to the backend*/

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')



beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
    test('correct number of blogs are returned in json format', async () => {


        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const initBlogsInDb = await helper.blogsInDatabase()
        expect(initBlogsInDb).toHaveLength(helper.initialBlogs.length)

    })

    test('blog id is defined', async () => {


        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsInDb = await helper.corrrectIdFormat()
        expect(blogsInDb).toBeDefined()

    })
})//

describe('To make changes to the blog', () => {
    test('valid blog can be added', async () => {
        const blog = {
            title: 'Fake React Patterns',
            author: 'Fake Michael Chan',
            url: ' https://reactpatterns.com/fake',
            likes: 80
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-type', /application\/json/)

        const blogsAfterPostRequest = await helper.blogsInDatabase()
        expect(blogsAfterPostRequest).toHaveLength(helper.initialBlogs.length + 1)
        const titles = blogsAfterPostRequest.map(t => t.title)
        expect(titles).toContain('Fake React Patterns')
    })

    test('single blog can be deleted', async () => {

        const blogsFromDatabase = await helper.blogsInDatabase()
        const blogToDelete = blogsFromDatabase[0]


        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
    })

    test('Single blog can be updated', async () => {
        const initBlog = await helper.blogsInDatabase()
        initBlog[0].likes = 1200
        await api
            .put(`/api/blogs/${initBlog[0].id}`)
            .send(initBlog[0])
            .expect(204)
        const updatedBlog = await helper.blogsInDatabase()
        console.log(updatedBlog)
    })

    test('Missing Likes property  defaults to zero', async () => {
        const blog = {
            title: 'Fake Model React Patterns',
            author: 'Fake Model Author',
            url: ' https://reactpatterns.com/fakery',

        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)

        const blogsAtEnd = await helper.blogsInDatabase()
        const zeroLikes = helper.missingLikesPropertyDefaultsToZero(blogsAtEnd)
        expect(zeroLikes[0]).toHaveProperty('likes', 0)
    })

    test('Missing url or title properties returns status code 400', async () => {

        const blog = {

            author: 'Fake Model Author'

        }
        await api
            .post('/api/blogs')
            .send(blog)
            .expect(400)

    })

})//

afterAll(async () => {
    await mongoose.connection.close()
})
