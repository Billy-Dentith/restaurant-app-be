const { selectUsers, selectUserById } = require('../models/users.models');

exports.getAllUsers = (req, res, next) => {
    selectUsers().then((users) => {
        res.status(200).send({ users });
    })
}

exports.getUserById = (req, res, next) => {
    const { id } = req.params; 

    selectUserById(id).then((user) => {
        res.status(200).send({ user }); 
    })
}