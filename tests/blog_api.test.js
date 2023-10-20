/*eslint-disable*/
/*Integration testing. Testing the backend together with the database. Supertest library is used to test API. It makes HTTP requests to the backend*/


const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 20000)
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')


let token = ''
describe('when there is initially one user in db', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})
        const password = 'salainen'
        const saltRound = 10
        let passwordHash = await bcrypt.hash(password, saltRound)
        const user = new User({ username: 'mluukkai', name: 'Matti Luukkainen', passwordHash })
        await user.save();

    })

    test('creation succeeds with fresh username', async () => {

        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'Stanley',
            name: 'Stanley Francis',
            password: 'phd8897'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        console.log('log users at end under fresh user test', usersAtEnd)
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    })
    test('Invalid user is not created', async () => {
        const usersAtStart = await helper.usersInDb()
        const invalidUser = {
            username: 'ml',
            name: 'Daniel Moore',
            password: 'sa'
        }
        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
        const usersAtEnd = await helper.usersInDb()
        console.log('invalid user credentials')
        expect(usersAtStart).toHaveLength(usersAtEnd.length)


    })

    test('Existing user can log in', async () => {

        await api
            .post('/api/login')
            .send({ username: 'mluukkai', name: 'MattiLuukkainen', password: 'salainen' })
            .expect(response => {
                token = response.body.token
            })
            .expect(200)

    })
})


test('valid blog can be added', async () => {

    const userAtEnd = await helper.usersInDb()
    console.log('login existing user under blog', userAtEnd)

    const blog = {
        "title": "Setting token can be tricky during testing",
        "author": "Matt Mluukkai",
        "url": "http//:no urlatall,com",
        "likes": 4

    }
    await api
        .post('/api/blogs')
        .send(blog)
        .set('Accept', 'application/json')
        .set({ 'Authorization': `Bearer ${token}` })
        .expect('Content-type', /application\/json/)
        .expect(201)
    const blogsAtEnd = await helper.blogsInDatabase()
    const title = blogsAtEnd.map(t => t.title)
    expect(title).toContain('Setting token can be tricky during testing')
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('A blog can be deleted', async () => {

    const blogToDelete = await helper.blogsInDatabase()
    await api
        .delete(`/api/blogs/${blogToDelete[0].id}`)
        .set({ 'Authorization': `Bearer ${token}` })
        .expect(204)
    const blogsAtEnd = await helper.blogsInDatabase()
    const title = blogsAtEnd.map(t => t.title)
    expect(title).not.toContain(blogToDelete.title)
})

test('Missing Likes property  defaults to zero', async () => {
    const blog = {
        title: 'Fake Model React Patterns',
        author: 'Fake Model Author',
        url: ' https://reactpatterns.com/fakery',

    }

    await api
        .post('/api/blogs')
        .set({ 'Authorization': `Bearer ${token}` })
        .send(blog)
        .expect(201)

    const blogsAtEnd = await helper.blogsInDatabase()
    const zeroLikes = helper.missingLikesPropertyDefaultsToZero(blogsAtEnd)
    expect(zeroLikes[0]).toHaveProperty('likes', 0)
})

test('Missing url or title properties returns status code 400', async () => {

    const blog = {

        author: 'Fake Model Author',
        likes: 0
    }
    await api
        .post('/api/blogs')
        .set({ 'Authorization': `Bearer ${token}` })
        .send(blog)
        .expect(400)

})

test('test fails  with status code 401 if token was not provided', async () => {

    const blog = {
        title: 'Matti makes learning nodejs a fun practice',
        author: 'Fake Model Author',
        url: ' https://reactpatterns.com/fakery',
        likes: 10

    }

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(401)
})

afterAll(async () => {
    await mongoose.connection.close()
})





