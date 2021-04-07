const { Users } = require('../models');
const { createJwt } = require('../utils/jwt.js');

async function createUser(userOpts) {
  console.log(userOpts);
  if (!userOpts.username) {
    throw new Error('Did not supply username');
  }
  if (!userOpts.email) {
    throw new Error('Did not supply email');
  }
  if (!userOpts.password) {
    throw new Error('Did not supply password');
  }

  const user = await Users.create({
    ...userOpts,
  });

  if (!user) {
    throw new Error('Error creating user');
  }
  console.log('2');
  const createdUser = await Users.findOne({
    attributes: ['email', 'username', 'bio', 'image'],
    where: {
      username: user.username,
    },
  });
  console.log(createdUser.get());
  const token = await createJwt(createdUser.get());
  console.log(token);
  return {
    ...createdUser.get(),
    token,
  };
}

async function verifyUser(userOpts) {
  if (!userOpts.email) {
    throw new Error('Did not supply email');
  }
  if (!userOpts.password) {
    throw new Error('Did not supply password');
  }

  const user = await Users.findOne({
    attributes: ['email', 'username', 'bio', 'image', 'password'],
    where: {
      email: userOpts.email,
    },
  });

  if (!user) {
    throw new Error('No user with given email address');
  }

  if (user.password !== userOpts.password) {
    throw new Error('Password does not match');
  }
  const token = await createJwt(user.get());
  const userJson = {
    ...user.get(),
    token,
  };
  delete userJson.password;
  return userJson;
}

module.exports = {
  createUser,
  verifyUser,
};