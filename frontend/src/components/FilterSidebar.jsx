import { useState } from 'react';

const PROPERTY_TYPES = ['', 'Apartment', 'House', 'Studio'];
const LISTING_TYPES = ['', 'rent', 'sale'];

const FilterSidebar = ({ onFilter }) => {
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [listingType, setListingType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ city, minPrice, maxPrice, propertyType, listingType });
  };

  const handleReset = () => {
    setCity('');
    setMinPrice('');
    setMaxPrice('');
    setPropertyType('');
    setListingType('');
    onFilter({});
  };

  return (
    <aside className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
      <h2 className="font-semibold text-gray-800 text-base">Filters</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="form-label">City</label>
          <input
            className="input-field"
            placeholder="e.g. Lagos"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Listing Type</label>
          <select
            className="input-field"
            value={listingType}
            onChange={(e) => setListingType(e.target.value)}
          >
            <option value="">All</option>
            <option value="rent">For Rent</option>
            <option value="sale">For Sale</option>
          </select>
        </div>
        <div>
          <label className="form-label">Property Type</label>
          <select
            className="input-field"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>{t || 'All Types'}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">Price Range</label>
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
