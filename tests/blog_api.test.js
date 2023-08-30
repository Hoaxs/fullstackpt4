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
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const returnedPromises = blogObjects.map(blog => blog.save())
    const b = await Promise.all(returnedPromises)// resolve all promises in the returnedPromises array
    //console.log(b)

})
test('blogs are in json format and are correct number of blogs', async () => {


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

afterAll(async () => {
    await mongoose.connection.close()
})
