import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import mongooseDelete from 'mongoose-delete';

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
},
{
  collection: 'courses'
})


export default mongoose.model('Course', Course)
