/*eslint-disable*/
const Blog = require('../models/blog')
const initialBlogs = [

    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },

]

const blogsInDatabase = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const corrrectIdFormat = async () => {
    const blogs = await Blog.find({})
    const blogObject = blogs.map(blog => blog.toJSON())
    return blogObject.map(n => n.id)


}

const missingLikesPropertyDefaultsToZero = (blog) => {

    const likePropertyDefaultsToZero = blog.filter(n => n.likes === 0)
    return likePropertyDefaultsToZero

}

module.exports = {
    initialBlogs,
    blogsInDatabase,
    corrrectIdFormat,
    missingLikesPropertyDefaultsToZero



}