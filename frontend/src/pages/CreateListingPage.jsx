import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../api/axiosInstance';
import InputField from '../components/InputField';

const CreateListingPage = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const payload = {
        ...data,
        price: Number(data.price),
        images: data.images ? data.images.split('\n').map((u) => u.trim()).filter(Boolean) : [],
      };
      const { data: property } = await api.post('/properties', payload);
      navigate(`/properties/${property._id}`);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Failed to create listing');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Listing</h1>

      <div className="card p-6">
        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Title *"
            placeholder="Cozy Studio in Victoria Island"
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
              placeholder="Describe the property..."
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && <p className="form-error">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Price ($) *"
              type="number"
              min="0"
              placeholder="150000"
              error={errors.price?.message}
              {...register('price', {
                required: 'Price is required',
                min: { value: 0, message: 'Price must be positive' },
              })}
            />
            <div>
              <label className="form-label">Listing Type *</label>
              <select className="input-field" {...register('listingType', { required: 'Listing type is required' })}>
                <option value="">Select...</option>
                <option value="rent">For Rent</option>
                <option value="sale">For Sale</option>
              </select>
              {errors.listingType && <p className="form-error">{errors.listingType.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="City *"
              placeholder="Lagos"
              error={errors.city?.message}
              {...register('city', { required: 'City is required' })}
            />
            <InputField
              label="Country *"
              placeholder="Nigeria"
              error={errors.country?.message}
              {...register('country', { required: 'Country is required' })}
            />
          </div>

          <div>
            <label className="form-label">Property Type *</label>
            <select className="input-field" {...register('propertyType', { required: 'Property type is required' })}>
              <option value="">Select...</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Studio">Studio</option>
            </select>
            {errors.propertyType && <p className="form-error">{errors.propertyType.message}</p>}
          </div>

          <div>
            <label className="form-label">Image URLs (one per line)</label>
            <textarea
              className="input-field min-h-[80px] resize-y"
              placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              {...register('images')}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={isSubmitting} className="btn-primary flex-1">
              {isSubmitting ? 'Publishing...' : 'Publish Listing'}
            </button>
            <button type="button" onClick={() => navigate(-1)} className="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListingPage;
