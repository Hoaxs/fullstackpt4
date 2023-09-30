/*eslint-disable*/
const logger = require('./logger')

const requestLogger = (request, response, next) => {

    logger.info('Method: ', request.method)
    logger.info('path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('...')
    next()
}
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {

    //console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' })
    }
    else if (error.name === 'ValidationError') {

        return response.status(400).send({ error: error.message })
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message })
    }

    next(error)//pass other types of errors to express
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer')) {
        request.token = authorization.replace('Bearer', '')//strips off Bearer from token        
        return response.status(201).end()
    }
    next()

}
module.exports = {
    tokenExtractor,
    requestLogger,
    unknownEndpoint,
    errorHandler


}