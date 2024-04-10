import React, { useState, createContext, useEffect } from 'react';

import { useFruityUser } from '@/hooks/useFruityUser';
import { useAccount } from 'wagmi';

interface UserContextValue {
  user: UserType | null;
}

export const UserContext = createContext<UserContextValue>({
  user: null,
});

interface UserType {
  address?: string;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { address } = useAccount();
  const { getUser } = useFruityUser();
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    if(!address) return;

    const getAndSaveUserData = async () => {
      const userResult = await getUser(address);

      setUser(userResult)
    }

    getAndSaveUserData();
  }, [address])

  return <UserContext.Provider value={{
    user
  }}>
    {children}
  </UserContext.Provider>
}