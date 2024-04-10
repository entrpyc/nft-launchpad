'use client'

import NftBlock from "@/components/NftBlock";

import { nftsJSON } from "@/constants/our-nfts";
import { UserContext } from "@/context/UserProvider";
import Title from "@/elements/Title";
import { useContext, useEffect } from "react";


const OUR_NFTS_TITLE = 'Mint NFTs from our fruity collection!';
const CUSTOM_NFTS_TITLE = 'Mint your own fruity NFTs!';
const AI_GENERATED_NFTS_TITLE = 'Generate fruity NFTs with AI!';

export default function Home() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <div className="main-container max-w-6xl">
      <section className="our-nfts">
        <Title className="mb-6">{OUR_NFTS_TITLE}</Title>
        <div className="grid grid-cols-3 gap-4">{nftsJSON.map(nft => (
          <NftBlock key={nft.id} {...nft} />
        ))}</div>
      </section>
      {/* <section className="custom-nfts">
        <h2>{CUSTOM_NFTS_TITLE}</h2>
      </section>
      <section className="ai-generated-nfts">
        <h2>{AI_GENERATED_NFTS_TITLE}</h2>
      </section> */}
    </div>
  );
}
