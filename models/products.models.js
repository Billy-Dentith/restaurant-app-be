const db = require('../db/connection');

exports.selectProducts = () => {
    return db.query(`SELECT * FROM products`)
    .then(({ rows }) => {
        return rows; 
    })
}