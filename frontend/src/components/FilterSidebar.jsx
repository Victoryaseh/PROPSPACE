import { useState } from 'react';

const CAMEROON_CITIES = ['Douala', 'Yaoundé', 'Bafoussam', 'Kribi', 'Dschang', 'Limbe', 'Buea', 'Ngaoundéré', 'Bamenda', 'Garoua'];
const PROPERTY_TYPES = ['', 'Apartment', 'House', 'Studio'];

const FilterSidebar = ({ onFilter }) => {
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [listingType, setListingType] = useState('');

  const applyFilters = (overrides = {}) => {
    onFilter({ city, minPrice, maxPrice, propertyType, listingType, ...overrides });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };

  const handleCityChip = (c) => {
    setCity(c);
    applyFilters({ city: c });
  };

  const handleReset = () => {
    setCity(''); setMinPrice(''); setMaxPrice('');
    setPropertyType(''); setListingType('');
    onFilter({});
  };

  return (
    <aside className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
      <h2 className="font-semibold text-gray-800 text-base">Filters</h2>

      <div>
        <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Popular Cities</p>
        <div className="flex flex-wrap gap-1.5">
          {CAMEROON_CITIES.slice(0, 6).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => handleCityChip(c)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                city === c
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'border-gray-300 text-gray-600 hover:border-purple-400 hover:text-purple-600'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="form-label">City</label>
          <input
            className="input-field"
            list="city-suggestions"
            placeholder="e.g. Douala, Yaoundé"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <datalist id="city-suggestions">
            {CAMEROON_CITIES.map((c) => <option key={c} value={c} />)}
          </datalist>
        </div>

        <div>
          <label className="form-label">Listing Type</label>
          <select className="input-field" value={listingType} onChange={(e) => setListingType(e.target.value)}>
            <option value="">All</option>
            <option value="rent">For Rent</option>
            <option value="sale">For Sale</option>
          </select>
        </div>

        <div>
          <label className="form-label">Property Type</label>
          <select className="input-field" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>{t || 'All Types'}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="form-label">Price Range (F CFA)</label>
          <div className="flex gap-2">
            <input
              className="input-field"
              type="number"
              placeholder="Min"
              min="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              className="input-field"
              type="number"
              placeholder="Max"
              min="0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button type="submit" className="btn-primary flex-1 text-sm">Apply</button>
          <button type="button" onClick={handleReset} className="btn-secondary flex-1 text-sm">Reset</button>
        </div>
      </form>
    </aside>
  );
};

export default FilterSidebar;
