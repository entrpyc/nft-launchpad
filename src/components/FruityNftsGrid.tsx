'use client'

import NftBlock from "@/components/NftBlock";
import OwnedNftBlock from "@/components/OwnedNftBlock";
import { UIContext, modalData } from "@/context/UIProvider";

import Title from "@/elements/Title";
import { useFruityNfts } from "@/hooks/useFruityNfts";
import { useContext } from "react";

export default function FruityNftsGrid() {
  const { setModalIsOpen, setModalData } = useContext(UIContext);
  const { fruityNfts } = useFruityNfts();

  function openMintingModal(nft: modalData) {
    setModalData(nft)
    setModalIsOpen(true)
  }

  return (
    <section className="our-nfts">
      <Title className="mb-6">Mint NFTs from our fruity collection!</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{fruityNfts.map(nft => nft.isMinted ? (
        <OwnedNftBlock withRedirect={true} key={nft.id} {...nft} />
      ) : (
        <NftBlock onClick={() => openMintingModal(nft)} key={nft.id} {...nft} />
      ))}</div>
    </section>
  );
}
