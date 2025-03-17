const endpoints = require('../endpoints.json')

exports.getHealthCheck = (req, res, next) => {
    res.status(200).send({ message: 'All OK'});
}

exports.getEndpoints = (req, res, next) => {
    res.status(200).send(endpoints)
}