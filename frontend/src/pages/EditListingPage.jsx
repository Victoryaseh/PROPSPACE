import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/InputField';
import Spinner from '../components/Spinner';

const EditListingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    let cancelled = false;
    const fetch = async () => {
      try {
        const { data } = await api.get(`/properties/${id}`);
        if (cancelled) return;

        if (data.author?._id !== user?._id) {
          navigate('/dashboard');
          return;
        }
        reset({
          ...data,
          images: data.images?.join('\n') || '',
        });
      } catch {
        if (!cancelled) setFetchError('Could not load the listing');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetch();
    return () => { cancelled = true; };
  }, [id, user, reset, navigate]);

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const payload = {
        ...data,
        price: Number(data.price),
        images: data.images ? data.images.split('\n').map((u) => u.trim()).filter(Boolean) : [],
      };
      await api.put(`/properties/${id}`, payload);
      navigate(`/properties/${id}`);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" text="Loading listing..." /></div>;
  if (fetchError) return <div className="text-center py-20 text-red-500">{fetchError}</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Listing</h1>

      <div className="card p-6">
        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Title *"
            error={errors.title?.message}
            {...register('title', {
              required: 'Title is required',
              maxLength: { value: 100, message: 'Max 100 characters' },
            })}
          />

          <div>
            <label className="form-label">Description *</label>
            <textarea
              className="input-field min-h-[100px] resize-y"
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && <p className="form-error">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Price ($) *"
              type="number"
              min="0"
              error={errors.price?.message}
              {...register('price', {
                required: 'Price is required',
                min: { value: 0, message: 'Must be positive' },
              })}
            />
            <div>
              <label className="form-label">Listing Type *</label>
              <select className="input-field" {...register('listingType', { required: true })}>
                <option value="rent">For Rent</option>
                <option value="sale">For Sale</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="City *"
              error={errors.city?.message}
              {...register('city', { required: 'City is required' })}
            />
            <InputField
              label="Country *"
              error={errors.country?.message}
              {...register('country', { required: 'Country is required' })}
            />
          </div>

          <div>
            <label className="form-label">Property Type *</label>
            <select className="input-field" {...register('propertyType', { required: true })}>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Studio">Studio</option>
            </select>
          </div>

          <div>
            <label className="form-label">Image URLs (one per line)</label>
            <textarea className="input-field min-h-[80px] resize-y" {...register('images')} />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={isSubmitting} className="btn-primary flex-1">
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={() => navigate(`/properties/${id}`)} className="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditListingPage;
