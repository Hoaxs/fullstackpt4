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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog

}
