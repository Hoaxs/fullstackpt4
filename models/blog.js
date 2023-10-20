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
<<<<<<< Updated upstream
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
=======
    likes: Number
>>>>>>> Stashed changes

})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        returnedObject.likes = returnedObject.likes === undefined ? 0 : returnedObject.likes
        delete returnedObject._id
        delete returnedObject.__v

    }

})



module.exports = mongoose.model('Blog', blogSchema)