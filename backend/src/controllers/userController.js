const userService = require('../services/userService');

const getProfile = async (req, res) => {
  try {
    const user = await userService.getProfile(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const result = await userService.changePassword(req.user.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = { getProfile, updateProfile, changePassword };
