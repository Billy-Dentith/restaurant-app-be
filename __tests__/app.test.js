const app = require('../app')
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');
const request = require('supertest');
const availableEndpoints = require('../endpoints.json')

afterAll(() => db.end());
beforeAll(() => seed(testData))

describe('/api/healthcheck', () => {
    test('GET 200: Should respond with a 200 ok status code', () => {
        return request(app)
        .get('/api/healthcheck')
        .expect(200)
        .then(({ body: { message }}) => {
            expect(message).toBe('All OK')
        })
    })
})

describe('Invalid Endpoints', () => {
    test('Should return a 404 error when passed an invalid endpoint', () => {
        return request(app)
        .get('/api/foodss')
        .expect(404)
        .then(({ body: { message }}) => {
            expect(message).toBe('Endpoint not found')
        })
    })
})

describe('/api', () => {
    test('GET 200: Should return a list of all available endpoints', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
            expect(body).toEqual(availableEndpoints)
        })
    })
})

describe('/api/categories', () => {
    test('GET 200: Should return an array of all the categories', () => {
        return request(app)
        .get('/api/categories')
        .expect(200)
        .then(({ body: { categories }}) => {
            expect(categories.length).toBe(3);
            expect(categories[0].title).toBe('Italian Pastas');
            categories.forEach((category) => {
                expect(typeof category.description).toBe('string');
            })
        })
    })
})

describe('/api/products', () => {
    test('GET 200: Should return an array of all the products', () => {
        return request(app)
        .get('/api/products')
        .expect(200)
        .then(({ body: { products }}) => {
            expect(products.length).toBe(6);
            products.forEach((product) => {
                expect(typeof product.title).toBe('string');
                expect(typeof product.price).toBe('number');
                expect(typeof product.options).toBe('object');
            })
        })
    })
})

describe('/api/users', () => {
    test('GET 200: Should return an array of all the users', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then(({ body: { users }}) => {
            expect(users.length).toBe(3);
            users.forEach((user) => {
                expect(typeof user.name).toBe('string');
                expect(typeof user.is_admin).toBe('boolean');
            })
        })
    })
})

describe('/api/orders', () => {
    test('GET 200: Should return an array of all the orders', () => {
        return request(app)
        .get('/api/orders')
        .expect(200)
        .then(({ body: { orders }}) => {
            expect(orders.length).toBe(4);
            orders.forEach((order) => {
                expect(typeof order.price).toBe('number');
                expect(typeof order.products).toBe('object')
            })
        })
    })
})