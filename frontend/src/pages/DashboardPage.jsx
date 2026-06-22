import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import PropertyCard from '../components/PropertyCard';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const fetch = async () => {
      try {
        const { data } = await api.get('/properties/my-listings');
        if (!cancelled) setProperties(data);
      } catch (err) {
        if (!cancelled) setError('Failed to load your listings');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetch();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your property portfolio, {user?.username}</p>
        </div>
        <Link to="/listings/new" className="btn-primary text-sm">+ New Listing</Link>
      </div>

      {loading && <div className="flex justify-center py-20"><Spinner size="lg" text="Loading your listings..." /></div>}

      {!loading && error && (
        <div className="text-center py-20">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && properties.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
          <p className="text-5xl mb-3">🏘️</p>
          <p className="text-gray-700 font-semibold text-lg">No listings yet</p>
          <p className="text-gray-400 text-sm mt-1">Start by creating your first property listing</p>
          <Link to="/listings/new" className="btn-primary inline-block mt-4">Create Your First Listing</Link>
        </div>
      )}

      {!loading && !error && properties.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties.map((p) => <PropertyCard key={p._id} property={p} />)}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
