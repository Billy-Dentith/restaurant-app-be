const db = require('../db/connection');

exports.selectOrders = (userEmail) => {   
    let queryString = `SELECT * FROM orders `;
    const queryVals = [];

    if (userEmail) {        
        queryString += `WHERE user_email=$1 `
        queryVals.push(userEmail)
    }

    queryString += `;`;

    return db.query(queryString, queryVals)
    .then(({ rows }) => {
        return rows;
    })
}

exports.updateOrderById = (order_id, { status }) => {
    return db.query(`
        UPDATE orders
        SET status=$1
        WHERE id=$2
        RETURNING*;`,
        [status, order_id])
    .then(({ rows }) => {
        return rows[0];
    })
}

exports.insertOrder = ({ price, status, products, userEmail }) => {
    console.log("order items in insertOrder" , price, status, products, userEmail);
    
    const queryVals = [price, status, JSON.stringify(products), userEmail]
    const queryStr = `
        INSERT INTO orders
            (price, status, products, user_email) 
        VALUES 
            ($1, $2, $3, $4)
        RETURNING*;`

    return db.query(queryStr, queryVals)
    .then(({ rows }) => {       
        return rows[0];
    })
}