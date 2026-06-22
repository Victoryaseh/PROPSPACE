import { useState, useEffect, useRef } from 'react';
import api from '../api/axiosInstance';
import PropertyCard from '../components/PropertyCard';
import FilterSidebar from '../components/FilterSidebar';
import Spinner from '../components/Spinner';

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const abortRef = useRef(null);

  const fetchProperties = async (filters = {}) => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => { if (v) params.append(k, v); });

      const { data } = await api.get(`/properties?${params.toString()}`, {
        signal: abortRef.current.signal,
      });
      setProperties(data);
    } catch (err) {
      if (err.name !== 'CanceledError') {
        setError('Failed to load properties. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
    return () => abortRef.current?.abort();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl px-8 py-10 text-white">
        <p className="text-blue-200 text-sm font-medium uppercase tracking-widest mb-2">
          Cameroon & France
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Find Your Next Property
        </h1>
        <p className="text-blue-100 text-base max-w-xl">
          Discover premium properties for rent and sale across Cameroon and France.
          From Douala to Paris, your ideal home is here.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 flex-shrink-0">
          <FilterSidebar onFilter={fetchProperties} />
        </div>

        <div className="flex-1">
          {loading && (
            <div className="flex justify-center py-20">
              <Spinner size="lg" text="Loading properties..." />
            </div>
          )}
          {!loading && error && (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg">{error}</p>
              <button onClick={() => fetchProperties()} className="btn-primary mt-4">Retry</button>
            </div>
          )}
          {!loading && !error && properties.length === 0 && (
            <div className="text-center py-20">
              <p className="text-4xl mb-3">🏠</p>
              <p className="text-gray-500 text-lg font-medium">No properties found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
            </div>
          )}
          {!loading && !error && properties.length > 0 && (
            <>
              <p className="text-sm text-gray-500 mb-4">{properties.length} listing{properties.length !== 1 ? 's' : ''} found</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {properties.map((p) => <PropertyCard key={p._id} property={p} />)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
