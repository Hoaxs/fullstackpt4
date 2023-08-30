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
    let v = {}
    const likes = blogList.map(n => n.likes)
    // creates map with object from blogList as Value
    const blogListEntries = new Map(blogList.entries())
    for (let [key, value] of blogListEntries)
        if (value.likes === Math.max(...likes)) {
            // delete properties
            delete value._id
            delete value.url
            delete value.__v
            console.log('printing object:', value)
            return value
        }

}

const mostBlogs = (blogs) => {

    const authors = blogs.map(element => element.author)
    // count duplicate author
    const reduced = authors.reduce((count, line) => (count[line] = count[line] + 1 || 1, count), {})
    console.log('printing reduced', reduced)

    const val = Object.values(reduced)
    // get name of highest contributing author
    let mapKeyVal = new Map(Object.entries(reduced))
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



const mostLikes = (blogs) => { // returns authors with zero likes//
    const reducedAuthorPredicate = (obj, line) => {
        obj[line.author] = 0
        return obj
    }
    // get map objects of blogs
    const blogMap = new Map(Object.entries(blogs))
    const authorReducer = blogs.reduce(reducedAuthorPredicate, {})
    //convert reduced authors to map object.
    const authMap = new Map(Object.entries(authorReducer))


    const totalLikeScoreEachAuthor = (authorsMap, blogMap) => {

        const allAuthors = new Map()
        for (let [k, v] of authorsMap) {
            for (let [key, value] of blogMap)
                if (k === value.author)
                    v += value.likes
            allAuthors.set(k, v)

        }
        return allAuthors
    }

    const fromArray = Array.from(totalLikeScoreEachAuthor(authMap, blogMap), ([author, likes]) => ({ author, likes }))

    const getAuthorHighestScorer = (authors) => {
        let max = 0
        let authorMaxScore = ""
        for (let [k, v] of authors) {
            if (v > max) {
                max = v
                authorMaxScore = k

            }
        }
        return { author: authorMaxScore, likes: max }
    }
    const highestScoreAuthor = (getAuthorHighestScorer(totalLikeScoreEachAuthor(authMap, blogMap)))
    return highestScoreAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
