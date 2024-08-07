const db = require('../db/connection');

exports.selectOrders = () => {
    return db.query(`SELECT * FROM orders`)
    .then(({ rows }) => {
        return rows;
    })
}