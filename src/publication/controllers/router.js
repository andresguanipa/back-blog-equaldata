const Router = require('express').Router();
const Controller = require('./index.js');
const { validToken } = require('../../user/controllers/middleware');

Router.post('/create', validToken, Controller.create);
Router.get('/all', validToken, Controller.getAll);
Router.get('/:id', validToken, Controller.getById);


module.exports = Router