import { GET_USER_API_ROUTE } from '@/constants/routes';
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

  return { user, isFetchingUserData, getUser };
};