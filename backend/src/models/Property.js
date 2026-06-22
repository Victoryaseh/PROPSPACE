const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },
    propertyType: {
      type: String,
      enum: ['Apartment', 'House', 'Studio'],
      required: [true, 'Property type is required'],
    },
    listingType: {
      type: String,
      enum: ['rent', 'sale'],
      required: [true, 'Listing type is required'],
    },
    currency: {
      type: String,
      enum: ['XAF', 'EUR', 'USD'],
      default: 'XAF',
    },
    images: {
      type: [String],
      default: [],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

propertySchema.index({ city: 'text', title: 'text' });

module.exports = mongoose.model('Property', propertySchema);
