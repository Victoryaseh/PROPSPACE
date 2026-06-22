const Property = require('../models/Property');

const findAll = (filter = {}) =>
  Property.find(filter).populate('author', 'username name avatar').sort({ createdAt: -1 });

const findById = (id) =>
  Property.findById(id).populate('author', 'username name avatar');

const findByAuthor = (authorId) =>
  Property.find({ author: authorId }).sort({ createdAt: -1 });

const create = (data) => Property.create(data);

const updateById = (id, data) =>
  Property.findByIdAndUpdate(id, data, { new: true, runValidators: true });

const deleteById = (id) => Property.findByIdAndDelete(id);

const buildFilter = ({ city, minPrice, maxPrice, propertyType, listingType }) => {
  const filter = {};
  if (city) filter.city = { $regex: city, $options: 'i' };
  if (propertyType) filter.propertyType = propertyType;
  if (listingType) filter.listingType = listingType;
  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
    if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
  }
  return filter;
};

module.exports = { findAll, findById, findByAuthor, create, updateById, deleteById, buildFilter };
