import { NextRequest } from 'next/server';
import User from '../models/UserModel';

interface UserProps {
  address: string
  token?: string
}

export const findUser = async ({ address }: UserProps) => {
  const user = await User.findOne({ address });

  if(!user) return null;

  return user;
}

export const createUser = async ({ address }: UserProps) => {
  const featureFlags = {
    customNFTs: true,
    aiGeneration: true,
    colorSchemes: true,
  }
  
  const newUser = await User.create({
    address,
    fruityTokens: [],
    customTokens: [],
    featureFlags,
  });

  return newUser;
}

export const addFruityToken = async ({ address, token }: UserProps) => {
  const user = await User.findOne({ address });
  
  const newUser = await User.findByIdAndUpdate(
    user.id,
    { $push: { fruityTokens: { id: token } } },
    { new: true } // Return the updated document
  );

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