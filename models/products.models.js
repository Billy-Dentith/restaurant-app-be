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