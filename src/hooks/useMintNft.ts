import { useState } from "react";

import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import {
  CONTRACT_ADDRESS,
  CONTRACT_MINT_FUNCTION_NAME,
} from "@/constants/our-nfts";
import { ethers } from "ethers";
import CONTRACT_ABI from '@/contracts/nft-contract-abi.json';

interface mintNftProps {
  uri: string;
  value: string;
}

export const useMintNft = () => {
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ 
    hash,
  })

  const mintNft = async ({ uri, value }: mintNftProps) => {
    try {
      writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: CONTRACT_MINT_FUNCTION_NAME,
        args: [uri],
        value: ethers.parseEther(value)
      })

    } catch (e) {
      console.log(e);
    }
  };


  return {
    mintNft,
    isConfirming,
    isConfirmed,
    isPending,
    error,
  };
};