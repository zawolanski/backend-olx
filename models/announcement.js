const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const announcementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    localization: {
      type: String,
      required: true,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    imageUrl: String,
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Announcement', announcementSchema);
