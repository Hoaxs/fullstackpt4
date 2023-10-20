/*eslint-disable*/
const Blog = require('../models/blog')
<<<<<<< Updated upstream
const User = require('../models/user')


/*
const initialBlogs = [

    {
        userId: User.Type,
=======
const initialBlogs = [

    {
        _id: '5a422a851b54a676234d17f7',
>>>>>>> Stashed changes
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
<<<<<<< Updated upstream
    
    {
        userId: User.Type,
=======
    {
        _id: '5a422aa71b54a676234d17f8',
>>>>>>> Stashed changes
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
<<<<<<< Updated upstream
        userId: User.Type,
=======
        _id: '5a422b3a1b54a676234d17f9',
>>>>>>> Stashed changes
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
<<<<<<< Updated upstream
        userId: User.Type,
=======
        _id: '5a422b891b54a676234d17fa',
>>>>>>> Stashed changes
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
<<<<<<< Updated upstream
    

]
*/

const initialUsers = [
    {
        username: "Robert",
        name: "Robert C. Martin",
        password: "rcm2349"
    },
    {
        username: "Edsger",
        name: "Edsger W.Dijkstra",
        password: "EdsW6667"
    }
]
const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}


const initialBlogs = [{

    userId: '65088b219cef597b07649b4a',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
},

{
    userId: '65088b219cef597b07649b4b',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
},
]




=======

]
>>>>>>> Stashed changes

const blogsInDatabase = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const corrrectIdFormat = async () => {
    const blogs = await Blog.find({})
    const blogObject = blogs.map(blog => blog.toJSON())
    return blogObject.map(n => n.id)


}

<<<<<<< Updated upstream
//const missingLikesPropertyDefaultsToZero = (blog) => {

//const likePropertyDefaultsToZero = blog.filter(n => n.likes === undefined)
//return likePropertyDefaultsToZero

//}
=======
const missingLikesPropertyDefaultsToZero = (blog) => {

    const likePropertyDefaultsToZero = blog.filter(n => n.likes === 0)
    return likePropertyDefaultsToZero

}


>>>>>>> Stashed changes

module.exports = {
    initialBlogs,
    blogsInDatabase,
    corrrectIdFormat,
<<<<<<< Updated upstream
    initialUsers,
    //missingLikesPropertyDefaultsToZero,
    usersInDb


=======
    missingLikesPropertyDefaultsToZero
>>>>>>> Stashed changes
}