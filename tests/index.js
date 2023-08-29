/*eslint-disable*/
/*
Bloglist application allows user save interesting blog information
*/

/*eslint-disable*/

const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

console.log('app running on part4.3 branch')
app.listen(config.PORT, () => {
    logger.info(` Server Running on port ${config.PORT}`)
})