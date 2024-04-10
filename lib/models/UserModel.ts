import mongoose, { Schema } from 'mongoose';

const tokenSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
});

const featureFlagSchema = new Schema({
  customNFTs: {
    type: Boolean
  },
  aiGeneration: {
    type: Boolean
  },
  colorSchemes: {
    type: Boolean
  },
});

const userSchema = new Schema({
  address: {
    type: String
  },
  ourTokens: [tokenSchema],
  customTokens: [tokenSchema],
  featureFlags: featureFlagSchema,
});

export default mongoose.models.User ||  mongoose.model('User', userSchema)