const app = require('../app')
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');
const request = require('supertest');
const availableEndpoints = require('../endpoints.json')

beforeEach(() => seed(testData))
afterAll(() => db.end());

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
            expect(products.length).toBe(12);
            products.forEach((product) => {
                expect(typeof product.title).toBe('string');
                expect(typeof product.price).toBe('number');
                expect(typeof product.options).toBe('object');
            })
        })
    })
    test('GET 200: Should return an array of all the products of the given category', () => {
        return request(app)
        .get('/api/products?category=burgers')
        .expect(200)
        .then(({ body: { products }}) => {
            expect(products.length).toBe(3)
            products.forEach((product) => {
                expect(product.cat_slug).toBe('burgers');
            })
        })
    })
    test('GET 400: Should return an appropriate status and error message if provided an invalid category query', () => { 
        return request(app)
        .get('/api/products?category=not_a_category')
        .expect(400)
        .then(({ body: { message }}) => {
            expect(message).toBe("Invalid Query")
        })
    })
    test('POST 201: Should add a new product and return the added product', () => { 
        const newProduct = {
            title: "New Product",
            description: "Test Description",
            image: "https://plus.unsplash.com/premium_photo-1668771085743-1d2d19818140?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            price: 10,
            options: [{
                title: "Large", 
                additionalPrice: 10
            }],
            catSlug: 'pizzas',
        }

        return request(app)
        .post('/api/products')
        .send(newProduct)
        .expect(201)
        .then(({ body: { product }}) => {
            expect(product.title).toBe("New Product");
            expect(product.description).toBe("Test Description");
            expect(product.image).toBe("https://plus.unsplash.com/premium_photo-1668771085743-1d2d19818140?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
            expect(product.price).toBe(10);
            expect(product.options).toEqual([{
                title: "Large", 
                additionalPrice: 10
            }]);
            expect(product.cat_slug).toBe("pizzas");
        })
    })
    test('POST 400: Should return an appropriate status and error message if provided a bad product (missing properties)', () => {
        const newProduct = {
            title: "New Product",
            description: "Test Description",
            catSlug: 'pizzas',
        }

        return request(app)
        .post('/api/products')
        .send(newProduct)
        .expect(400)
        .then(({ body: { message }}) => {
            expect(message).toBe('Bad Request')
        })
    })
    test('POST 400: Should return an appropriate status and error message if provided a bad product (extra unwanted properties)', () => {
        const newProduct = {
            title: "New Product",
            description: "Test Description",
            image: "https://plus.unsplash.com/premium_photo-1668771085743-1d2d19818140?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            price: 10,
            options: [{
                title: "Large", 
                additionalPrice: 10
            }],
            catSlug: 'pizzas',
            maliciousProperty: 'delete everything'
        }

        return request(app)
        .post('/api/products')
        .send(newProduct)
        .expect(400)
        .then(({ body: { message }}) => {
            expect(message).toBe('Invalid Product')
        })
    })
})

describe('/api/products/:id', () => { 
    test('GET 200: Should return a single product object of the provided id', () => {
        return request(app)
        .get('/api/products/1')
        .expect(200)
        .then(({ body: { product }}) => {
            expect(product.id).toBe(1)
            expect(product.title).toBe('Sicilian')
        })
    })
    test('GET 200: Should return a single product object of the provided id', () => {
        return request(app)
        .get('/api/products/7')
        .expect(200)
        .then(({ body: { product }}) => {
            expect(product.id).toBe(7)
            expect(product.title).toBe('Classic Cheeseburger')
        })
    })
    test('GET 404: Should return an appropriate status and error message if provided a valid but non-existent ID', () => { 
        return request(app)
        .get('/api/products/9999')
        .expect(404)
        .then(({ body: { message }}) => {
            expect(message).toBe("Product does not exist")
        })
     })
     test('GET 400: Should return an appropriate status and error message if given an invalid ID', () => {
        return request(app)
        .get('/api/products/invalid_id')
        .expect(400)
        .then(({ body : { message }}) => {
            expect(message).toBe('Bad Request')
        })
    })
    test('DELETE 204: Should delete a single product object of the provided id', () => {
        return request(app)
        .delete('/api/products/2')
        .expect(204)
        .then(() => {
            return db.query(`SELECT * FROM products;`)
            .then(({ rows }) => {
                expect(rows.length).toBe(11);
            })
        })
    })
    test('DELETE 404: Should return an appropriate status and error message when provided a valid but non-existent product ID', () => { 
        return request(app)
        .delete('/api/products/9999')
        .expect(404)
        .then(({ body: { message }}) => {
            expect(message).toBe('Product does not exist')
        })
    })
    test('DELETE 400: Should return an appropriate status and error message when provided an invalid product ID', () => { 
        return request(app)
        .delete('/api/products/invalid_id')
        .expect(400)
        .then(({ body: { message }}) => {
            expect(message).toBe('Bad Request')
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

describe('/api/users/id', () => {
    test('GET 200: Should return an array of the user with the given id', () => {
        return request(app)
        .get('/api/users/1')
        .expect(200)
        .then(({ body: { user }}) => {
            expect(user.name).toBe('John Doe');
            expect(user.email).toBe('john@example.com');
            expect(user.is_admin).toBe(false);
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
    test('GET 200: Should return an array of all the orders where is_deleted=false', () => {
        return request(app)
        .delete('/api/orders/1')
        .expect(200)
        .then(() => {
            return request(app)
            .get('/api/orders')
            .expect(200)
            .then(({ body: { orders }}) => {   
                orders.map((order) => {
                    expect(order.is_deleted).toBe(false);
                })
            })
        })
    })
    test('GET 200: Should return an array of all the orders sorted by created_at in descending order', () => {
        const newOrder = {
            price: 9070,
            status: "Not Paid!",
            products: [
                {
                    "id": 3,
                    "title": "Bella Napoli",
                    "price": 6580,
                    "optionTitle": "Large",
                    "quantity": 2
                },
                {
                    "id": 1,
                    "title": "Sicilian",
                    "price": 2490,
                    "optionTitle": "Small",
                    "quantity": 1
                }
            ],
            userEmail: "jane@example.com",
        }

        return request(app)
        .post('/api/orders')
        .send(newOrder)
        .expect(201)
        .then(() => {
            return request(app)
            .get('/api/orders')
            .expect(200)
            .then(({ body: { orders }}) => {          
                expect(orders).toBeSortedBy('created_at', {
                    descending: true
                });
            })
        })
    })
    test('POST 201: Should create a new order in the orders table and return the added order', () => { 
        const newOrder = {
            price: 9070,
            status: "Not Paid!",
            products: [
                {
                    "id": 3,
                    "title": "Bella Napoli",
                    "price": 6580,
                    "optionTitle": "Large",
                    "quantity": 2
                },
                {
                    "id": 1,
                    "title": "Sicilian",
                    "price": 2490,
                    "optionTitle": "Small",
                    "quantity": 1
                }
            ],
            userEmail: "jane@example.com",
        }

        return request(app)
        .post('/api/orders')
        .send(newOrder)
        .expect(201)
        .then(({ body: { order }}) => {
            expect(order.price).toBe(9070);
            expect(order.products.length).toBe(2);
            expect(order.status).toBe("Not Paid!");
            expect(order.user_email).toBe("jane@example.com");
        })
    })
    test('POST 400: Should return an appropriate status and error message when provided a bad order object (extra unwanted properties)', () => { 
        const newOrder = {
            price: 9070,
            status: "Not Paid!",
            products: [
                {
                    "id": 3,
                    "title": "Bella Napoli",
                    "price": 6580,
                    "optionTitle": "Large",
                    "quantity": 2
                },
                {
                    "id": 1,
                    "title": "Sicilian",
                    "price": 2490,
                    "optionTitle": "Small",
                    "quantity": 1
                }
            ],
            userEmail: "jane@example.com",
            maliciousProperty: 'delete everything'
        }
        
        return request(app)
        .post('/api/orders')
        .send(newOrder)
        .expect(400)
        .then(({ body: { message }}) => {
            expect(message).toBe("Invalid Order")
        })
    })
})

describe('/api/orders?userEmail=john@example.com', () => {
    test('GET 200: Should return an array of all the orders for a particular user', () => {
        return request(app)
        .get('/api/orders?userEmail=john@example.com')
        .expect(200)
        .then(({ body: { orders }}) => {
            expect(orders.length).toBe(2);
            orders.forEach((order) => {
                expect(typeof order.price).toBe('number');
                expect(typeof order.products).toBe('object')
            })
        })
    })
})

describe('/api/orders/:order_id', () => {
    test('PATCH 202: Should update the order of the given id and return the updated order (updating status)', () => {
        const updOrder = {
            status: 'pending'
        }

        return request(app)
        .patch('/api/orders/2')
        .send(updOrder)
        .expect(202)
        .then(({ body: { order }}) => {
            expect(order.status).toBe('pending')
        })
    })
    test('PATCH 202: Should update the order of the given id and return the updated order (updating stripe_id)', () => {
        const updOrder = {
            stripe_id: 'stripe_test'
        }

        return request(app)
        .patch('/api/orders/4')
        .send(updOrder)
        .expect(202)
        .then(({ body: { order }}) => {
            expect(order.stripe_id).toBe('stripe_test')
        })
    })
    test('PATCH 400: Should return an appropriate status and error message when provided an invalid updated order object', () => { 
        const updOrder = {
            maliciousProperty: 'delete everything'
        }

        return request(app)
        .patch('/api/orders/4')
        .send(updOrder)
        .expect(400)
        .then(({ body: { message }}) => {
            expect(message).toBe("Bad Request")
        })
    })
    test('GET 200: Should return an order object for the given order id', () => { 
        return request(app)
        .get('/api/orders/1')
        .expect(200)
        .then(({ body: { order }}) => {
            expect(order.id).toBe(1);
            expect(order.price).toBe(1198);
            expect(order.status).toBe("completed");
            expect(order.user_email).toBe("john@example.com");
        })
    })
    test('GET 404: Should return an appropriate status and error message when provided a valid but non-existent order ID', () => { 
        return request(app)
        .get('/api/orders/9999')
        .expect(404)
        .then(({ body: { message }}) => {
            expect(message).toBe("Order not found")
        })
    })
    test('GET 400: Should return an appropriate status and error message when provided an invalid order ID', () => { 
        return request(app)
        .get('/api/orders/invalid_id')
        .expect(400)
        .then(({ body: { message }}) => {
            expect(message).toBe("Bad Request")
        })
    })
    test('DELETE 204: Should amend the order of the given ID to have is_deleted=true', () => {
        return request(app)
        .delete('/api/orders/1')
        .expect(200)
        .then(({ body : { removedOrder } }) => {
            expect(removedOrder.id).toBe(1);
            expect(removedOrder.is_deleted).toBe(true); 
        })
    })
    test('DELETE 204: Should return an appropriate status and error message if the order does not exist', () => {
        return request(app)
        .delete('/api/orders/9999')
        .expect(404)
        .then(({ body : { message } }) => {
            expect(message).toBe("Order not found")   
        })
    })
})

describe('/api/confirm/:intentId', () => {
    test('PATCH 202: Should update the order stripeId and return the updated order', () => { 
        const updOrder = {
            status: 'Pending'
        }

        return request(app)
        .patch('/api/confirm/stripe_2')
        .send(updOrder)
        .expect(202)
        .then(({ body: { updatedOrder }}) => {            
            expect(updatedOrder.stripe_id).toBe("stripe_2")
            expect(updatedOrder.status).toBe("Pending");
        })
    })
})
