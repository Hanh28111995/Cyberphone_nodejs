import mongoose from 'mongoose';

const Schema = mongoose.Schema
const Account = new Schema(
  {
    username: { type: String, require: true },
    password: { type: String ,require: true},
  },
  {
    collection: 'accounts'
  }
)

export default mongoose.model('Account', Account)
