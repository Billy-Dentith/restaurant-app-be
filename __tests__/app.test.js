const app = require('../app')
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');
const request = require('supertest');

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