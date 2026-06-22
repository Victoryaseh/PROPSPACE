const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: 'Username, email, and password are required' });

    const { user, token } = await authService.register({ username, email, password });
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' });

    const { user, token } = await authService.login({ email, password });
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Login failed' });
  }
};

module.exports = { register, login };
