import { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/InputField';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [profileMsg, setProfileMsg] = useState('');
  const [profileError, setProfileError] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { register: regProfile, handleSubmit: handleProfile, formState: { errors: pe, isSubmitting: ps } } = useForm({
    defaultValues: { name: user?.name || '', phone: user?.phone || '', avatar: user?.avatar || '' },
  });

  const { register: regPass, handleSubmit: handlePassword, reset: resetPass, watch, formState: { errors: pse, isSubmitting: pss } } = useForm();
  const newPassword = watch('newPassword');

  const onProfileSubmit = async (data) => {
    setProfileMsg('');
    setProfileError('');
    try {
      const { data: updated } = await api.put('/users/me', data);
      updateUser(updated);
      setProfileMsg('Profile updated successfully!');
    } catch (err) {
      setProfileError(err.response?.data?.message || 'Update failed');
    }
  };

  const onPasswordSubmit = async (data) => {
    setPasswordMsg('');
    setPasswordError('');
    try {
      await api.put('/users/me/password', {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      setPasswordMsg('Password changed successfully!');
      resetPass();
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Password change failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>

      <div className="card p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Personal Information</h2>

        {profileMsg && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">{profileMsg}</div>}
        {profileError && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{profileError}</div>}

        <form onSubmit={handleProfile(onProfileSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Display Name"
              placeholder="John Doe"
              error={pe.name?.message}
              {...regProfile('name')}
            />
            <InputField
              label="Phone Number"
              type="tel"
              placeholder="+1 234 567 8900"
              error={pe.phone?.message}
              {...regProfile('phone')}
            />
          </div>
          <InputField
            label="Avatar URL"
            type="url"
            placeholder="https://example.com/avatar.jpg"
            error={pe.avatar?.message}
            {...regProfile('avatar')}
          />
          <div className="text-sm text-gray-500">
            <span className="font-medium">Username:</span> {user?.username} &nbsp;|&nbsp;
            <span className="font-medium">Email:</span> {user?.email}
          </div>
          <button type="submit" disabled={ps} className="btn-primary">
            {ps ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      <div className="card p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Change Password</h2>

        {passwordMsg && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">{passwordMsg}</div>}
        {passwordError && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{passwordError}</div>}

        <form onSubmit={handlePassword(onPasswordSubmit)} className="space-y-4">
          <InputField
            label="Current Password"
            type="password"
            placeholder="••••••••"
            error={pse.oldPassword?.message}
            {...regPass('oldPassword', { required: 'Current password is required' })}
          />
          <InputField
            label="New Password"
            type="password"
            placeholder="At least 6 characters"
            error={pse.newPassword?.message}
            {...regPass('newPassword', {
              required: 'New password is required',
              minLength: { value: 6, message: 'Minimum 6 characters' },
            })}
          />
          <InputField
            label="Confirm New Password"
            type="password"
            placeholder="Repeat new password"
            error={pse.confirmNew?.message}
            {...regPass('confirmNew', {
              required: 'Please confirm new password',
              validate: (v) => v === newPassword || 'Passwords do not match',
            })}
          />
          <button type="submit" disabled={pss} className="btn-primary">
            {pss ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
