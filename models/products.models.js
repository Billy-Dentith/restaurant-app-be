const db = require('../db/connection');

exports.selectProducts = (category) => {    
    const validTopics = ['pizzas', 'pastas', 'burgers']
    let queryString = `SELECT * FROM products `;

    if (category) {
        if (validTopics.includes(category)) {
            queryString += `WHERE cat_slug='${category}' `
        } 
        // Add else block with error handling
    }
    queryString += `;`    

    return db.query(queryString)
    .then(({ rows }) => {
        return rows; 
    })
}

exports.selectSingleProduct = (id) => {
    return db.query(`SELECT * FROM products WHERE id=$1;`, [id])
    .then(({ rows }) => {       
        return rows[0];
    })
}

exports.removeProductById = (id) => {
    return db.query(`DELETE FROM products WHERE id=$1 RETURNING*;`, [id])
    .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 400, message: "Product does not exist"})
        }
    })
}

exports.addProduct = ({ title, description, image, price, options, catSlug }) => {
    const queryVals = [title, description, image, price, JSON.stringify(options), catSlug]; 
    const queryStr = `
        INSERT INTO products 
            (title, description, image, price, options, cat_slug)
        VALUES
            ($1, $2, $3, $4, $5, $6)
        RETURNING*;`
    
    return db.query(queryStr, queryVals)
    .then(({ rows }) => {
        return rows[0];
    })
}