import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import mongooseDelete from 'mongoose-delete';

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
    collection: 'products'
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

export default mongoose.model('Product', Product)




  

  