const { getAllUsers, getUserById } = require('../controllers/users.controllers');

const usersRouter = require('express').Router();

usersRouter.get('/', getAllUsers);
usersRouter.get('/:id', getUserById);

module.exports = usersRouter