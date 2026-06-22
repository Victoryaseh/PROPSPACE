const propertyService = require('../services/propertyService');

const getAll = async (req, res) => {
  try {
    const properties = await propertyService.getAllProperties(req.query);
    res.status(200).json(properties);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const property = await propertyService.getPropertyById(req.params.id);
    res.status(200).json(property);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const getMyListings = async (req, res) => {
  try {
    const properties = await propertyService.getMyProperties(req.user.id);
    res.status(200).json(properties);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const property = await propertyService.createProperty(req.user.id, req.body);
    res.status(201).json(property);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const property = await propertyService.updateProperty(req.user.id, req.params.id, req.body);
    res.status(200).json(property);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const result = await propertyService.deleteProperty(req.user.id, req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = { getAll, getOne, getMyListings, create, update, remove };
