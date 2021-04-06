const { Router } = require('express');

const route = Router();

route.use('/users', require('./users'));
route.use('/user', require('./user'));
route.use('/profile', require('./profiles'));
route.use('/users', require('./tags'));
route.use('/articles', require('./articles'));

module.exports = route;