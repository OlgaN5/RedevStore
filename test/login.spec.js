// require('@babel/polyfill')
const supertest = require('supertest')

let requestWithSupertest
let  server
beforeAll(async () => {
    server= await require('../src/index')
    requestWithSupertest = supertest(server)
})
afterAll(async () => {
    server.close()
})

describe('test login', () => {
    test('login has been successful', async () => {
        const data = {
            login: 'Admin',
            password: 'password'
        }
        const res = await requestWithSupertest.post('/api/auth/login/password')
            .send(data)
        expect(res.status).toEqual(302)
        expect(res.header['location']).toBe('/api/auth/')
    })
    test('login has been failed', async () => {
        const data = {
            login: 'Admin',
            password: 'password'
        }
        const res = await requestWithSupertest.post('/api/auth/login/pasword')
            .send(data)
        expect(res.status).toEqual(404)
    })
})

module.exports = requestWithSupertest