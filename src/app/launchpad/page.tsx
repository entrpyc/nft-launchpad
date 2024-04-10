import ImageWithMintButton from "@/components/ImageWithMintButton/ImageWithMintButton";

import { nftsJSON } from "@/constants/our-nfts";

const OUR_NFTS_TITLE = 'Mint NFTs from our fruity collection!';
const CUSTOM_NFTS_TITLE = 'Mint your own fruity NFTs!';
const AI_GENERATED_NFTS_TITLE = 'Generate fruity NFTs with AI!';

export default function Home() {
  return (
    <div className="main-container max-w-6xl">
      <section className="our-nfts">
        <h2 className="text-2xl font-semibold">{OUR_NFTS_TITLE}</h2>
        <div className="grid grid-cols-3 gap-4">{nftsJSON.map(nft => (
          <ImageWithMintButton key={nft.id} {...nft} />
        ))}</div>
      </section>
      <section className="custom-nfts">
        <h2>{CUSTOM_NFTS_TITLE}</h2>
      </section>
      <section className="ai-generated-nfts">
        <h2>{AI_GENERATED_NFTS_TITLE}</h2>
      </section>
    </div>
  );
}
