/*eslint-disable*/



const dummy = (blogs) => {

    return 1
}

const totalLikes = (blogs) => {

    const blogReducer = (total, lineObject) => {

        return total + lineObject.likes
    }
    const result = blogs.reduce(blogReducer, 0)
    return result
}
const favoriteBlog = (blogList) => {

    const likes = blogList.map(n => n.likes)
    const mostLiked = blogList.filter(n => n.likes === Math.max(...likes))
    console.log(mostLiked)
    return mostLiked

}

const mostBlogs = (blogs) => {
    // get authors
    const authors = blogs.map(element => element.author)
    // count duplicate author
    const reduced = authors.reduce((count, line) => (count[line] = count[line] + 1 || 1, count), {})

    // get values in reduced array. return array of integers.
    const val = Object.values(reduced)
    // get name of highest contributing author
    let mapKeyVal = new Map(Object.entries(reduced))
    console.log("printing authors:", reduced)
    const name = function () {
        for (let [k, v] of mapKeyVal) {
            if (v === Math.max(...val))
                return k
        }
    }
    // create object to return
    let foundAuthor = {}
    Object.defineProperties(foundAuthor, {
        author: {
            value: name(),
            writable: true,

        },
        blog: {
            value: Math.max(...val)
        }

    })

    return { author: foundAuthor.author, blog: foundAuthor.blog }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
