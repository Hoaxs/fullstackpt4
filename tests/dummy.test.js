/*eslint-disable*/
const listHelper = require('../utils/list_helper')

test('', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})
