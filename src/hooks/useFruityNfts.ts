import { NFT_LIST } from '@/constants/our-nfts';
import { UserContext } from '@/context/UserProvider';
import { useContext, useEffect, useState } from 'react';

type TokenType = {
  id: string
}

interface UserInterface {
  ourTokens: TokenType[]
}

export const useFruityNfts = () => {
  const { user } = useContext(UserContext);

  const [fruityNfts, setFruityNfts] = useState(NFT_LIST);

  useEffect(() => {
    if(!user) return;

    const fruityNftsWithOwnership = fruityNfts.map(fruityNft => ({
      ...fruityNft,
      isMinted: (user as UserInterface).ourTokens.some(token => token.id === fruityNft.id)
    }))

    setFruityNfts(fruityNftsWithOwnership);
  }, [user])

  return { fruityNfts };
};