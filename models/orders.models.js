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

exports.updateOrderById = (order_id, { status, stripe_id }) => {
    let queryStr; 
    const queryVals = []; 

    if (status) {
        queryStr = `
        UPDATE orders
        SET status=$1
        WHERE id=$2
        RETURNING*;`

        queryVals.push(status); 
        queryVals.push(order_id); 
        
    } else if (stripe_id) {
        queryStr = `
        UPDATE orders
        SET stripe_id=$1
        WHERE id=$2
        RETURNING*;`

        queryVals.push(stripe_id)
        queryVals.push(order_id); 
    }    

    return db.query(queryStr, queryVals)
    .then(({ rows }) => {
        return rows[0];
    })
}

exports.insertOrder = ({ price, status, products, userEmail }) => {    
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

exports.selectOrderById = (order_id) => {
    let queryString = `SELECT * FROM orders WHERE id=$1;`;

    return db.query(queryString, [order_id])
    .then(({ rows }) => {
        return rows[0];
    })
}