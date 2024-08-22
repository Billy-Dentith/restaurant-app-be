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