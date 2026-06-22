const propertyRepo = require('../repositories/propertyRepository');

const getAllProperties = async (queryParams) => {
  const filter = propertyRepo.buildFilter(queryParams);
  return propertyRepo.findAll(filter);
};

const getPropertyById = async (id) => {
  const property = await propertyRepo.findById(id);
  if (!property) throw { status: 404, message: 'Property not found' };
  return property;
};

const getMyProperties = async (userId) => propertyRepo.findByAuthor(userId);

const createProperty = async (userId, data) => {
  const { title, description, price, city, country, propertyType, listingType, images } = data;
  if (!title || !description || price === undefined || !city || !country || !propertyType || !listingType)
    throw { status: 400, message: 'All required fields must be provided' };

  const { currency } = data;
  return propertyRepo.create({ title, description, price, currency, city, country, propertyType, listingType, images, author: userId });
};

const updateProperty = async (userId, propertyId, data) => {
  const property = await propertyRepo.findById(propertyId);
  if (!property) throw { status: 404, message: 'Property not found' };

  if (property.author._id.toString() !== userId.toString())
    throw { status: 403, message: 'You are not authorized to update this listing' };

  const allowed = ['title', 'description', 'price', 'currency', 'city', 'country', 'propertyType', 'listingType', 'images'];
  const updates = {};
  allowed.forEach((key) => {
    if (data[key] !== undefined) updates[key] = data[key];
  });

  return propertyRepo.updateById(propertyId, updates);
};

const deleteProperty = async (userId, propertyId) => {
  const property = await propertyRepo.findById(propertyId);
  if (!property) throw { status: 404, message: 'Property not found' };

  if (property.author._id.toString() !== userId.toString())
    throw { status: 403, message: 'You are not authorized to delete this listing' };

  await propertyRepo.deleteById(propertyId);
  return { message: 'Property deleted successfully' };
};

module.exports = { getAllProperties, getPropertyById, getMyProperties, createProperty, updateProperty, deleteProperty };
