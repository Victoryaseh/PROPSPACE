require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Property = require('./models/Property');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  await Property.deleteMany({});
  await User.deleteMany({ email: 'seed@propspace.fr' });

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash('seed1234', salt);
  const user = await User.create({
    username: 'propspace_fr',
    email: 'seed@propspace.fr',
    password: hashedPassword,
    name: 'PropSpace France',
    phone: '+33 1 23 45 67 89',
  });

  const properties = [
    {
      title: 'Elegant Haussmann Apartment in Paris 8th',
      description:
        'Stunning 3-bedroom Haussmann-style apartment located in the prestigious 8th arrondissement of Paris. Featuring original parquet floors, ornate fireplaces, and high ceilings. Steps away from the Champs-Élysées and Arc de Triomphe.',
      price: 4500,
      city: 'Paris',
      country: 'France',
      propertyType: 'Apartment',
      listingType: 'rent',
      images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      ],
      author: user._id,
    },
    {
      title: 'Charming Provençal Villa in Aix-en-Provence',
      description:
        'Beautiful stone villa nestled in the heart of Provence. This 5-bedroom property sits on 2,000m² of manicured gardens with a heated swimming pool, olive trees, and a lavender field. Only 20 minutes from the historic center of Aix-en-Provence.',
      price: 1250000,
      city: 'Aix-en-Provence',
      country: 'France',
      propertyType: 'House',
      listingType: 'sale',
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      ],
      author: user._id,
    },
    {
      title: 'Modern Studio in the Heart of Lyon',
      description:
        'Bright and fully furnished studio in the vibrant Presqu\'île district of Lyon, France\'s gastronomic capital. Features a sleek kitchenette, contemporary bathroom, and large windows overlooking a quiet courtyard. Perfect for a young professional or student.',
      price: 850,
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
  ];

  const created = await Property.insertMany(properties);
  console.log(`Seeded ${created.length} properties:`);
  created.forEach((p) => console.log(` • [${p.propertyType}] ${p.title} — ${p.city} (${p.listingType})`));

  await mongoose.disconnect();
  console.log('Done.');
};

seed().catch((err) => { console.error(err); process.exit(1); });
