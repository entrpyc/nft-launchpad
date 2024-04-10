import { NextRequest } from 'next/server';
import User from '../models/UserModel';

interface UserProps {
  address: string
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
    ourTokens: [],
    customTokens: [],
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