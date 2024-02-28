// require('@babel/polyfill')
const supertest = require('supertest')

let requestWithSupertest
let server
beforeAll(async () => {
    server = await require('../src/index')
    requestWithSupertest = supertest(server)
    const data = {
        login: 'Admin',
        password: 'password'
    }
    await requestWithSupertest.post('/api/auth/login/password')
        .send(data)
})
afterAll(async () => {
    server.close()
})
describe('test add category without auth', () => {
    test('category not added', async () => {
        const data = {
            name: 'Admin'
        }
        const res = await requestWithSupertest.post('/api/category/add')
            .send(data)
        console.log(res)
        expect(res.status).toEqual(401)
        expect(res.type).toEqual(expect.stringContaining('json'))
        expect(res.body.message).toBe('no authorization')
    })
    test('category not added', async () => {
        const dataLogin = {
            login: 'User',
            password: 'password'
        }
        const resLogin = await requestWithSupertest.post('/api/auth/login/password')
            .send(dataLogin)
        const data = {
            name: 'Category'
        }
        const res = await requestWithSupertest.post('/api/category/add')
            .send(data)
        console.log(res.status)
        expect(res.status).toEqual(403)
        expect(res.type).toEqual(expect.stringContaining('json'))
        await requestWithSupertest.post('/api/auth/logout')
    })

})
describe('test add category Admin', () => {
    beforeAll(async () => {
        const dataLogin = {
            login: 'Admin',
            password: 'password'
        }
        const resLogin = await requestWithSupertest.post('/api/auth/login/password')
            .send(dataLogin)
    })
    afterAll(async () => {
        await requestWithSupertest.post('/api/auth/logout')
    })
    test('category added', async () => {
        const data = {
            name: 'Category1'
        }
        const res = await requestWithSupertest.post('/api/category/add')
            .send(data)
        // console.log(res)
        expect(res.status).toEqual(200)
        expect(res.body.name).toBe('Category1')
    })
    test('category not added', async () => {
        const data = {
            name: 'Category1'
        }
        const res = await requestWithSupertest.post('/api/category/add')
            .send(data)
        console.log(res)
        // expect(res.status).toEqual(200)
        // expect(res.body.name).toBe('Category1')
    })

})