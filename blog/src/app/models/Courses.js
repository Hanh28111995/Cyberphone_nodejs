const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema
const Course = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String },
    thumnail: { type: String },
    videoId: { type: String, require: true },
    level: { type: String },
    slug: { type: String, slug: 'name', unique: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// //add plugins
mongoose.plugin(slug)
Course.plugin(mongooseDelete, {
  deletedAt: null,
  overrideMethods: 'all',
})

module.exports = mongoose.model('Course', Course)
