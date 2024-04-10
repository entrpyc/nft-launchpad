import { NextRequest } from 'next/server';
import User from '../models/UserModel';

export const createUser = async () => {
  const ourTokens = [
    { id: 'token_id_1' },
    { id: 'token_id_2' },
  ];
  
  const customTokens = [
    { id: 'custom_token_id_1' },
  ];
  
  const featureFlags = {
    customNFTs: false,
    aiGeneration: false,
    colorSchemes: false,
  };

  const newUser = await User.create({
    address: 'user_address',
    ourTokens,
    customTokens,
    featureFlags,
  });

  return newUser;
}

export const addOurToken = async () => {
  const userId = '';
  const newToken = '';
  
  const newUser = await User.findByIdAndUpdate(userId, { $push: { ourTokens: newToken } })

  return newUser;
}

export const addCustomToken = async () => {
  const userId = '';
  const newToken = '';
  
  const newUser = await User.findByIdAndUpdate(userId, { $push: { customTokens: newToken } })

  return newUser;
}

export const setFeatureFlag = async () => {
  const userId = '';
  const featureToToggle = '';
  const value = '';

  const newUser = await User.findByIdAndUpdate(userId, {
    $set: { [`featuresFlags.${featureToToggle}`]: value },
  })

  return newUser;
}

export const toggleFeatureFlag = async () => {
  const userAddress = '';

  const newUser = await User.findOne({ address: userAddress })

  return newUser;
}