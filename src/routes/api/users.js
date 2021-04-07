const { Router } = require('express');
const { createUser, verifyUser } = require('../../controllers/users');

const route = Router();

route.post('/', async (req, res) => {
  console.log(req.body);
  const createdUser = await createUser({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });
  res.send(createdUser);
});

route.post('/login', async (req, res) => {
  console.log(req.body);
  try {
    const verifedUser = await verifyUser(req.body.user);
    res.send(verifedUser);
  } catch (err) {
    res.status(403).send({
      errors: {
        body: [err.message],
      },
    });
  }
});
module.exports = route;