import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetch = async () => {
      try {
        const { data } = await api.get(`/properties/${id}`);
        if (!cancelled) setProperty(data);
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || 'Property not found');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetch();
    return () => { cancelled = true; };
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    setDeleting(true);
    try {
      await api.delete(`/properties/${id}`);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
      setDeleting(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" text="Loading property..." /></div>;
  if (error) return (
    <div className="text-center py-20">
      <p className="text-red-500 text-lg">{error}</p>
      <Link to="/" className="btn-primary mt-4 inline-block">Back to listings</Link>
    </div>
  );

  const isAuthor = isAuthenticated && user?._id === property.author?._id;
  const images = property.images?.length ? property.images : [PLACEHOLDER];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/" className="text-blue-600 hover:underline text-sm mb-4 block">&larr; Back to listings</Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <img
          src={images[0]}
          alt={property.title}
          className="w-full h-72 object-cover rounded-xl"
          onError={(e) => { e.target.src = PLACEHOLDER; }}
        />
        <div className="grid grid-cols-2 gap-2">
          {images.slice(1, 5).map((img, i) => (
            <img key={i} src={img} alt={`view-${i}`} className="w-full h-32 object-cover rounded-lg"
              onError={(e) => { e.target.src = PLACEHOLDER; }} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
              <p className="text-gray-500 mt-1">{property.city}, {property.country}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">
                ${property.price.toLocaleString()}
                {property.listingType === 'rent' && <span className="text-base text-gray-400 font-normal">/mo</span>}
              </p>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${property.listingType === 'rent' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                For {property.listingType === 'rent' ? 'Rent' : 'Sale'}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">{property.propertyType}</span>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Listed by</h3>
            <div className="flex items-center gap-3">
              {property.author?.avatar ? (
                <img src={property.author.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  {(property.author?.username || 'U')[0].toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900">{property.author?.name || property.author?.username}</p>
                <p className="text-sm text-gray-500">@{property.author?.username}</p>
              </div>
            </div>
          </div>

          {isAuthor && (
            <div className="card p-4 space-y-2">
              <h3 className="font-semibold text-gray-800">Manage Listing</h3>
              <Link to={`/listings/${property._id}/edit`} className="btn-secondary w-full text-center block text-sm">
                Edit Listing
              </Link>
              <button onClick={handleDelete} disabled={deleting} className="btn-danger w-full text-sm">
                {deleting ? 'Deleting...' : 'Delete Listing'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
