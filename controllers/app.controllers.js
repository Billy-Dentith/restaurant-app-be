
exports.getHealthCheck = (req, res, next) => {
    res.status(200).send({ message: 'All OK'});
}

