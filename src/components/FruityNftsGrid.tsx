'use client'

import NftBlock from "@/components/NftBlock";
import OwnedNftBlock from "@/components/OwnedNftBlock";

import Title from "@/elements/Title";
import { useFruityNfts } from "@/hooks/useFruityNfts";

export default function FruityNftsGrid() {
  const { fruityNfts } = useFruityNfts();

  return (
    <section className="our-nfts">
      <Title className="mb-6">Mint NFTs from our fruity collection!</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{fruityNfts.map(nft => nft.isMinted ? (
        <OwnedNftBlock withRedirect={true} key={nft.id} {...nft} />
      ) : (
        <NftBlock onClick={() => console.log(nft)} key={nft.id} {...nft} />
      ))}</div>
    </section>
  );
}
