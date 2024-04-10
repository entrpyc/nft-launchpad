'use client'

import css from './ImageWithMintButton.module.css';

import { useCallback, useEffect } from "react";

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

interface ImageWithMintButtonProps {
  src: string;
  alt: string;
  isMinted: boolean;
}

const MINT_BUTTON_TEXT = 'Mint as NFT';
const imageAddress = 'https://fuchsia-neighbouring-lemur-97.mypinata.cloud/ipfs/QmcpTo5ua8MUvJmUsZXrLt6p8cxMBqU7pKsjP28Funkenv';


const ImageWithMintButton: React.FC<ImageWithMintButtonProps> = ({
  src,
  alt,
  isMinted,
}) => {
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

  useEffect(() => {
    console.log(resAccount)
  }, [resAccount])

  return (
    <div className={css.block} onClick={onMintButtonClick}>
      <Image src={src} alt={alt} />
      <div className={css.button}>
        <Button disabled={isPending}>{MINT_BUTTON_TEXT}</Button>
      </div>
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