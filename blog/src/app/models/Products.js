const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema
const Product = new Schema(
  {
    name: { type: String, require: true },
    price: { type: String, require: true },
    screen: { type: String },
    backCamera: { type: String },
    frontCamera: { type: String },
    img: { type: String },
    desc: { type: String },
    type: { type: String },
    slug: { type: String, slug: 'type', unique: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// //add plugins
mongoose.plugin(slug)
Product.plugin(mongooseDelete, {
  deletedAt: null,
  overrideMethods: 'all',
})

module.exports = mongoose.model('Product', Product)
