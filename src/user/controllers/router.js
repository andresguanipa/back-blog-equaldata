const Router = require('express').Router();
const Controller = require('./index.js');
const { validToken, checkToken } = require('./middleware');

Router.post('/login', Controller.login);
Router.post('/signup', Controller.signup);
Router.put('/name', validToken, Controller.updateName);
Router.put('/password', validToken, Controller.updatePassword);
Router.get('/', checkToken, Controller.comprobate);

module.exports = Router