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