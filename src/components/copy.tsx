'use client'

import { useCallback, useEffect, useState } from "react";

import Image from "@/elements/Image";
import Button from "@/elements/Button";

import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract } from "wagmi";
import CONTRACT_ABI from '@/contracts/nft-contract-abi.json';
import { ethers } from "ethers";

import {
  CONTRACT_ADDRESS,
  CONTRACT_MINT_FUNCTION_NAME,
  CONTRACT_TRANSACTION_VALUE
} from "@/constants/our-nfts";
import Text from "@/elements/Text";
import { MY_NFTS_ROUTE } from "@/constants/routes";
import Link from "@/elements/Link";

interface ImageWithMintButtonProps {
  src: string;
  alt: string;
  isMinted?: boolean;
  price: string;
}

const imageAddress = 'https://fuchsia-neighbouring-lemur-97.mypinata.cloud/ipfs/QmcpTo5ua8MUvJmUsZXrLt6p8cxMBqU7pKsjP28Funkenv';

const ImageWithMintButton: React.FC<ImageWithMintButtonProps> = ({
  src,
  alt,
  isMinted,
  price
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const resAccount = useAccount();
  const { data: hash, writeContract, isPending, error } = useWriteContract()
  // const resRead = useReadContract({
  //   abi: CONTRACT_ABI,
  //   address: CONTRACT_ADDRESS,
  //   functionName: 'tokenURI',
  //   args: [12],
  // })
 
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ 
    hash,
  })

  const onMintButtonClick = useCallback(() => {
    writeContract({
      abi: CONTRACT_ABI,
      address: CONTRACT_ADDRESS,
      functionName: CONTRACT_MINT_FUNCTION_NAME,
      args: [imageAddress],
      value: ethers.parseEther(CONTRACT_TRANSACTION_VALUE)
    })
  }, [imageAddress])

  // useEffect(() => {
  //   console.log(resAccount)
  // }, [resAccount])

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative rounded-md overflow-hidden hoverable" onClick={onMintButtonClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <div className={`mint-nav absolute-full flex-center-col gap-2 bg-black/60 z-10 hoverable ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        {isMinted ? (
          <>
            <Text className="text-config-text-contrast">You already own this NFT!</Text>
            <Button>My NFTs</Button>
          </>
        ): (
          <>
            <Text className="text-config-text-contrast">Price: {price} ETH</Text>
            <Button>Mint</Button>
          </>
        )}
      </div>
      <Image src={src} alt={alt} width={1000} height={1000} />
      {!isMinted && (
        <>
          <div className="absolute-full bg-gradient-to-t from-black to-60%"></div>
          <div className="absolute bottom-3 left-3">
            <Text className={`text-config-text-accent ${!isHovered ? 'opacity-100' : 'opacity-0'}`}>Mint as NFT</Text>
          </div>
        </>
      )}
      <p>{hash}</p>
      {isPending && <p>Pending</p>}
      {isConfirming && <div>Waiting for confirmation...</div>} 
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && ( 
        <div>Error: {error.message}</div> 
      )}
    </div>
  );
}

export default ImageWithMintButton;