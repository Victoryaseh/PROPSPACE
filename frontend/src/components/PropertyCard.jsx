import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/currency';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80';

const badge = {
  rent: 'bg-green-100 text-green-700',
  sale: 'bg-purple-100 text-purple-700',
};

const PropertyCard = ({ property }) => {
  const img = property.images?.[0] || PLACEHOLDER;

  return (
    <Link to={`/properties/${property._id}`} className="card group block hover:shadow-md transition-shadow duration-200">
      <div className="relative overflow-hidden h-48">
        <img
          src={img}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = PLACEHOLDER; }}
        />
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full ${badge[property.listingType]}`}>
          For {property.listingType === 'rent' ? 'Rent' : 'Sale'}
        </span>
        <span className="absolute top-3 right-3 bg-white text-gray-700 text-xs font-semibold px-2 py-1 rounded-full shadow">
          {property.propertyType}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate">{property.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{property.city}, {property.country}</p>
        <p className="text-purple-600 font-bold mt-2 text-lg">
          {formatPrice(property.price)}
          {property.listingType === 'rent' && <span className="text-gray-400 text-sm font-normal">/mo</span>}
        </p>
      </div>
    </Link>
  );
};

export default PropertyCard;
