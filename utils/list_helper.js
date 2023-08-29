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

module.exports = {
    dummy,
    totalLikes

}
