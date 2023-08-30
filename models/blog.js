/*eslint-disable*/

const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'title required']
    },
    author: {
        type: String,
        required: [true, 'author required']
    },
    url: String,
    likes: Number

})

blogSchema.set('toJson', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)