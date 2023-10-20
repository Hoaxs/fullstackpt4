/*eslint-disable*/
/*Integration testing. Testing the backend together with the database. Supertest library is used to test API. It makes HTTP requests to the backend*/

const mongoose = require('mongoose')
<<<<<<< Updated upstream
mongoose.set('bufferTimeoutMS', 20000)
const helper = require('./test_helper')
=======
>>>>>>> Stashed changes
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
<<<<<<< Updated upstream
const bcrypt = require('bcrypt')
const User = require('../models/user')


describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await User.insertMany(helper.initialUsers)
        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({ username: 'root', "name": "Superuser", passwordHash })

        await user.save()
    })


    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
        console.log('logging at start', usersAtStart)
        const newUser = {
            username: "Chan",
            name: "Michael Chan",
            password: "mch8897"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        //console.log('logging userAtEnd', usersAtEnd)
        const blogsAtEnd = helper.blogsInDatabase()
        console.log('blogs at end', blogsAtEnd)
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)


    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('expected `username` to be unique')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
})// describe>when there is initially one user...

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)

    }
    )


=======
const helper = require('./test_helper')



beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})
describe('when there is initially some blogs saved', () => {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

    /*
    test('Missing Likes property  defaults to zero', async () => {

        const blog = {
            title: 'Fake Model React Patterns',
            author: 'root',
            url: ' https://reactpatterns.com/fakery',
            userId: '6507f1aea85b72f05e3b78d1'
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)


        //const blogsAtEnd = await helper.blogsInDatabase()
        //console.log("blogs zero likes", blogsAtEnd)
        //expect(blogsAtEnd).toHaveProperty('likes')
    })
    */
})//


describe('To make changes to the blog', () => {
    /*
      test('A user can be added', async () => {
          const newUser = {
              username: 'Robert',
              name: 'Robert C. Martin',
              password: 'rcm2349'
          }
          console.log('users in DB', await helper.usersInDb())
          await api
              .post('/api/users')
              .send(newUser)
              .expect(201)
              .expect('Content-type', /application\/json/)
  
  
  
      })
  

    
    test('valid blog can be added', async () => {
        const blog = {
            title: 'Canonical string reduction',
            author: 'Edsger W.Dijkstra',
            url: ' https://reactpatterns.com/fake',
            likes: 80,

            userId: {
                id: '6508545875523bf319c0725d'
            }
=======
})//

describe('To makes changes to the blog', () => {
    test('valid blog can be added', async () => {
        const blog = {
            title: 'Fake React Patterns',
            author: 'Fake Michael Chan',
            url: ' https://reactpatterns.com/fake',
            likes: 80
>>>>>>> Stashed changes
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-type', /application\/json/)

        const blogsAfterPostRequest = await helper.blogsInDatabase()
        expect(blogsAfterPostRequest).toHaveLength(helper.initialBlogs.length + 1)
        const titles = blogsAfterPostRequest.map(t => t.title)
<<<<<<< Updated upstream
        expect(titles).toContain('Why I don\'t miss react')
    })
    */

=======
        expect(titles).toContain('Fake React Patterns')
    })
>>>>>>> Stashed changes

    test('single blog can be deleted', async () => {

        const blogsFromDatabase = await helper.blogsInDatabase()
        const blogToDelete = blogsFromDatabase[0]


        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
    })

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    test('Single blog can be updated', async () => {
        const initBlog = await helper.blogsInDatabase()
        initBlog[0].likes = 1200
        await api
            .put(`/api/blogs/${initBlog[0].id}`)
            .send(initBlog[0])
            .expect(204)
        const updatedBlog = await helper.blogsInDatabase()
<<<<<<< Updated upstream

    })



=======
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
>>>>>>> Stashed changes

    test('Missing url or title properties returns status code 400', async () => {

        const blog = {

            author: 'Fake Model Author'

        }
        await api
            .post('/api/blogs')
            .send(blog)
            .expect(400)

    })

<<<<<<< Updated upstream
})//describe >...initially some blogs..

test('single blog can be deleted', async () => {

    const blogsFromDatabase = await helper.blogsInDatabase()
    const blogToDelete = blogsFromDatabase[0]


    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
})

=======
})//
>>>>>>> Stashed changes

afterAll(async () => {
    await mongoose.connection.close()
})
