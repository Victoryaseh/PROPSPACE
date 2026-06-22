const userRepo = require('../repositories/userRepository');

const getProfile = async (userId) => {
  const user = await userRepo.findById(userId);
  if (!user) throw { status: 404, message: 'User not found' };
  return user;
};

const updateProfile = async (userId, { name, phone, avatar }) => {
  const updates = {};
  if (name !== undefined) updates.name = name;
  if (phone !== undefined) updates.phone = phone;
  if (avatar !== undefined) updates.avatar = avatar;

  const user = await userRepo.updateById(userId, updates);
  if (!user) throw { status: 404, message: 'User not found' };
  return user;
};

const changePassword = async (userId, { oldPassword, newPassword }) => {
  if (!oldPassword || !newPassword)
    throw { status: 400, message: 'Both old and new passwords are required' };

  if (newPassword.length < 6)
    throw { status: 400, message: 'New password must be at least 6 characters' };

  const user = await userRepo.findById(userId);
  if (!user) throw { status: 404, message: 'User not found' };

  const valid = await user.comparePassword(oldPassword);
  if (!valid) throw { status: 400, message: 'Current password is incorrect' };

  user.password = newPassword;
  await user.save();
  return { message: 'Password updated successfully' };
};

module.exports = { getProfile, updateProfile, changePassword };
