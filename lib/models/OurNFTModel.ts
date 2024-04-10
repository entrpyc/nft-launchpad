import mongoose, { Schema } from 'mongoose';

const ourNFTSchema = new Schema({
  src: {
    type: String
  },
  alt: {
    type: String
  },
  price: {
    type: String
  },
})

export default mongoose.models.OurNFTSchema ||  mongoose.model('OurNFTSchema', ourNFTSchema)