import { ADD_FRUITY_TOKEN_API_ROUTE, GET_USER_API_ROUTE } from '@/constants/routes';
import { useState } from 'react';

export const useFruityUser = () => {
  const [user, setUser] = useState(null);
  const [isFetchingUserData, setIsFetchingUserData] = useState(false);

  const getUser = async (address: string) => {
    if(!address) return;
    
    setIsFetchingUserData(true);
    try {
      const response = await fetch(GET_USER_API_ROUTE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const user = await response.json();

      setUser(user)

      return user;
    } catch (error) {
      console.error('Error updating user address:', error);
    }
    setIsFetchingUserData(false);
  }

  const addFruityToken = async (address: string, token: string) => {
    if(!address || !token) return;

    
    setIsFetchingUserData(true);
    try {
      const response = await fetch(ADD_FRUITY_TOKEN_API_ROUTE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, token }),
      });
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error updating user address:', error);
    }
    setIsFetchingUserData(false);
  }

  return { user, isFetchingUserData, getUser, addFruityToken };
};