const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const postingSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  platform: {
    type: String,
    required: true,
    trim: true,
  },
  publisher: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  condition: {
    type: String,
    required: true,
    trim: true,
  },
  accessory: {
    type: String,
    required: true,
    trim: true,
  },
  accessoryCheck: {
    type: String,
    required: true,
    trim: true,
  },
  cardGame: {
    type: String,
    required: true,
    trim: true,
  },
  cardSale: {
    type: String,
    required: true,
    trim: true,
  },
  figurineManufacture: {
    type: String,
    required: true,
    trim: true,
  },
  figureManufacture: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  imageid: {
    type: String,
    required: false,
  },
  postAuthor: {
    type: String,
    required: false,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Posting = model("Posting", postingSchema);

module.exports = Posting;
