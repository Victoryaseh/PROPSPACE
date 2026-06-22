require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Property = require('./models/Property');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  await Property.deleteMany({});
  await User.deleteMany({ email: 'seed@propspace.cm' });

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash('seed1234', salt);
  const user = await User.create({
    username: 'propspace_cm',
    email: 'seed@propspace.cm',
    password: hashedPassword,
    name: 'PropSpace Agency',
    phone: '+237 6 70 00 00 00',
  });

  const properties = [
    // ── CAMEROON ─────────────────────────────────────────────────────────
    {
      title: 'Spacious Apartment in Bonanjo, Douala',
      description:
        'Modern 3-bedroom apartment in the prestigious Bonanjo business district of Douala. Features a large balcony overlooking the Wouri estuary, a fully equipped kitchen, underground parking, and 24/7 security. Close to embassies, banks and the port.',
      price: 250000,
      currency: 'XAF',
      city: 'Douala',
      country: 'Cameroon',
      propertyType: 'Apartment',
      listingType: 'rent',
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      ],
      author: user._id,
    },
    {
      title: 'Executive Villa in Bastos, Yaoundé',
      description:
        'Stunning 5-bedroom villa situated in Bastos, the most prestigious neighborhood in Yaoundé, home to diplomats and senior officials. The property features a private swimming pool, tropical garden, domestic staff quarters, and a double garage. Quiet, secure and only 10 minutes from the Palais de l\'Unité.',
      price: 120000000,
      currency: 'XAF',
      city: 'Yaoundé',
      country: 'Cameroon',
      propertyType: 'House',
      listingType: 'sale',
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
        'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80',
      ],
      author: user._id,
    },
    {
      title: 'Cozy Studio near University of Dschang',
      description:
        'Well-maintained studio apartment 5 minutes walk from the University of Dschang campus. Includes a private bathroom, kitchenette, wardrobe, and reliable internet connection. Ideal for students or academics. Surrounded by fresh highland air in the Western Region.',
      price: 45000,
      currency: 'XAF',
      city: 'Dschang',
      country: 'Cameroon',
      propertyType: 'Studio',
      listingType: 'rent',
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
      ],
      author: user._id,
    },
    {
      title: 'Modern Apartment in Ndokoti, Douala',
      description:
        'Bright 2-bedroom apartment in the vibrant Ndokoti district. Features a modern kitchen, tiled floors, secure compound with a generator backup, and easy access to transport links, markets, and the central business district of Douala.',
      price: 150000,
      currency: 'XAF',
      city: 'Douala',
      country: 'Cameroon',
      propertyType: 'Apartment',
      listingType: 'rent',
      images: [
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      ],
      author: user._id,
    },
    {
      title: 'Family House for Sale in Bafoussam',
      description:
        'Spacious 4-bedroom family home in a quiet residential area of Bafoussam, capital of the West Region. The house sits on a 500m² plot with a fruit garden, covered patio, and a separate borehole water supply. Title deed available. Great investment in a rapidly growing city.',
      price: 45000000,
      currency: 'XAF',
      city: 'Bafoussam',
      country: 'Cameroon',
      propertyType: 'House',
      listingType: 'sale',
      images: [
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      ],
      author: user._id,
    },
    {
      title: 'Beachside Studio in Kribi',
      description:
        'Charming studio apartment just 200 meters from the white sandy beaches of Kribi on the Atlantic coast. Fully furnished with a kitchenette, air conditioning, and a private terrace. Perfect for a holiday retreat or short-stay rental investment. Breathtaking sunsets included.',
      price: 60000,
      currency: 'XAF',
      city: 'Kribi',
      country: 'Cameroon',
      propertyType: 'Studio',
      listingType: 'rent',
      images: [
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80',
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
      ],
      author: user._id,
    },

    // ── FRANCE ───────────────────────────────────────────────────────────
    {
      title: 'Elegant Haussmann Apartment in Paris 8th',
      description:
        'Stunning 3-bedroom Haussmann-style apartment in the prestigious 8th arrondissement of Paris. Features original parquet floors, ornate fireplaces, and 3.5m high ceilings. Steps from the Champs-Élysées and Arc de Triomphe. Perfect as a primary residence or pied-à-terre.',
      price: 4500,
      currency: 'EUR',
      city: 'Paris',
      country: 'France',
      propertyType: 'Apartment',
      listingType: 'rent',
      images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
      ],
      author: user._id,
    },
    {
      title: 'Charming Provençal Villa in Aix-en-Provence',
      description:
        'Beautiful stone villa in the heart of Provence with 5 bedrooms, 3 bathrooms, and 2,000m² of manicured gardens. A heated infinity pool, olive trees, and a lavender field frame this exceptional property. Only 20 minutes from the historic center of Aix-en-Provence.',
      price: 1250000,
      currency: 'EUR',
      city: 'Aix-en-Provence',
      country: 'France',
      propertyType: 'House',
      listingType: 'sale',
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
      ],
      author: user._id,
    },
    {
      title: 'Modern Studio in the Heart of Lyon',
      description:
        'Bright and fully furnished studio in the vibrant Presqu\'île district of Lyon, France\'s gastronomic capital. Sleek kitchenette, contemporary bathroom, and large windows overlooking a quiet inner courtyard. Direct metro access to Part-Dieu station. Perfect for professionals.',
      price: 850,
      currency: 'EUR',
      city: 'Lyon',
      country: 'France',
      propertyType: 'Studio',
      listingType: 'rent',
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
      ],
      author: user._id,
    },
    {
      title: 'Luxury Apartment with Sea View in Nice',
      description:
        'Exceptional 2-bedroom apartment on the 6th floor with panoramic views of the Baie des Anges and the Promenade des Anglais. Fully renovated with high-end finishings, a gourmet kitchen, and a large terrace. Secure underground parking. Ideally located in the heart of Nice.',
      price: 2800,
      currency: 'EUR',
      city: 'Nice',
      country: 'France',
      propertyType: 'Apartment',
      listingType: 'rent',
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80',
      ],
      author: user._id,
    },
    {
      title: 'Bordeaux Vineyard Estate',
      description:
        'Rare opportunity to acquire a 7-bedroom Bordeaux-style château surrounded by 3 hectares of working vineyard in the Saint-Émilion AOC appellation. Includes a wine cellar, tasting room, and caretaker cottage. A turnkey wine tourism business with a strong existing client base.',
      price: 2800000,
      currency: 'EUR',
      city: 'Bordeaux',
      country: 'France',
      propertyType: 'House',
      listingType: 'sale',
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80',
      ],
      author: user._id,
    },
    {
      title: 'Student Studio near Vieux-Port, Marseille',
      description:
        'Compact and cozy studio just 10 minutes on foot from the iconic Vieux-Port and close to Aix-Marseille University. Includes all utilities, fast Wi-Fi, and a secure bike storage room. The building has a rooftop terrace with views of Notre-Dame de la Garde. Available immediately.',
      price: 650,
      currency: 'EUR',
      city: 'Marseille',
      country: 'France',
      propertyType: 'Studio',
      listingType: 'rent',
      images: [
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      ],
      author: user._id,
    },
  ];

  const created = await Property.insertMany(properties);
  console.log(`\nSeeded ${created.length} properties:\n`);
  const cmr = created.filter((p) => p.country === 'Cameroon');
  const fra = created.filter((p) => p.country === 'France');
  console.log('  Cameroon (XAF):');
  cmr.forEach((p) => console.log(`    • [${p.propertyType}] ${p.title.substring(0, 50)} — ${p.city}`));
  console.log('\n  France (EUR):');
  fra.forEach((p) => console.log(`    • [${p.propertyType}] ${p.title.substring(0, 50)} — ${p.city}`));

  await mongoose.disconnect();
  console.log('\nDone.');
};

seed().catch((err) => { console.error(err); process.exit(1); });
