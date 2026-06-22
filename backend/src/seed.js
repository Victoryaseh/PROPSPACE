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
    {
      title: 'Spacious Apartment in Bonanjo, Douala',
      description:
        'Modern 3-bedroom apartment in the prestigious Bonanjo business district. Features a large balcony overlooking the Wouri estuary, fully equipped kitchen, underground parking, and 24/7 security. Close to embassies, banks and the port.',
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
        'Stunning 5-bedroom villa in Bastos, the most prestigious neighborhood in Yaoundé. Features a private swimming pool, tropical garden, domestic staff quarters, and a double garage. Only 10 minutes from the Palais de l\'Unité.',
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
        'Well-maintained studio apartment 5 minutes walk from the University of Dschang campus. Includes a private bathroom, kitchenette, wardrobe, and reliable internet connection. Ideal for students or academics. Surrounded by fresh highland air.',
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
        'Bright 2-bedroom apartment in the vibrant Ndokoti district. Features a modern kitchen, tiled floors, secure compound with generator backup, and easy access to transport links, markets, and the central business district.',
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
        'Spacious 4-bedroom family home in a quiet residential area of Bafoussam, capital of the West Region. Sits on a 500m² plot with a fruit garden, covered patio, and a separate borehole water supply. Title deed available.',
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
        'Charming studio apartment just 200 meters from the white sandy beaches of Kribi on the Atlantic coast. Fully furnished with kitchenette, air conditioning, and a private terrace. Perfect for a holiday retreat or short-stay rental investment.',
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
    {
      title: 'Modern Villa in Omnisports, Yaoundé',
      description:
        'Beautiful 4-bedroom villa in the sought-after Omnisports area of Yaoundé. Features a spacious living room, modern bathrooms, a rooftop terrace with panoramic city views, and a secure gated entrance with CCTV.',
      price: 85000000,
      currency: 'XAF',
      city: 'Yaoundé',
      country: 'Cameroon',
      propertyType: 'House',
      listingType: 'sale',
      images: [
        'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
      ],
      author: user._id,
    },
    {
      title: 'Studio Apartment in Buea Town',
      description:
        'Affordable and comfortable studio in the heart of Buea, at the foot of Mount Cameroon. Walking distance from the University of Buea and key amenities. Cool climate, reliable water supply, and a great community feel.',
      price: 40000,
      currency: 'XAF',
      city: 'Buea',
      country: 'Cameroon',
      propertyType: 'Studio',
      listingType: 'rent',
      images: [
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      ],
      author: user._id,
    },
    {
      title: 'Luxury Apartment in Akwa, Douala',
      description:
        'High-end 3-bedroom apartment on the 8th floor of a modern tower in Akwa, Douala\'s prime commercial district. Features floor-to-ceiling windows, a fully fitted kitchen, building concierge, and a rooftop pool. Ideal for executives.',
      price: 400000,
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
  ];

  const created = await Property.insertMany(properties);
  console.log(`\nSeeded ${created.length} Cameroon properties:\n`);
  created.forEach((p) =>
    console.log(`  • [${p.propertyType}] ${p.title.substring(0, 50)} — ${p.city} (${p.listingType})`)
  );

  await mongoose.disconnect();
  console.log('\nDone.');
};

seed().catch((err) => { console.error(err); process.exit(1); });
