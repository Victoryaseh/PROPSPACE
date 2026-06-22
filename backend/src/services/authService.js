const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/userRepository');

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const register = async ({ username, email, password }) => {
  const emailTaken = await userRepo.findByEmail(email);
  if (emailTaken) throw { status: 400, message: 'Email already in use' };

  const usernameTaken = await userRepo.findByUsername(username);
  if (usernameTaken) throw { status: 400, message: 'Username already taken' };

  const user = await userRepo.create({ username, email, password });
  const token = generateToken(user._id);
  return { user, token };
};

const login = async ({ email, password }) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw { status: 401, message: 'Invalid email or password' };

  const valid = await user.comparePassword(password);
  if (!valid) throw { status: 401, message: 'Invalid email or password' };

  const token = generateToken(user._id);
  return { user, token };
};

module.exports = { register, login };
