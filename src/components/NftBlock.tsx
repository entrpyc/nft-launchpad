import { useState } from "react";

import Image from "@/elements/Image";
import Button from "@/elements/Button";

import Text from "@/elements/Text";

interface NftBlockProps {
  src: string;
  alt: string;
  price: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const NftBlock: React.FC<NftBlockProps> = ({
  src,
  alt,
  price,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative rounded-md overflow-hidden hoverable" onClick={onClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <div className={`mint-nav absolute-full flex-center-col gap-2 bg-black/60 z-10 hoverable ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <Text className="text-config-text-contrast">Price: {price} ETH</Text>
        <Button>Mint</Button>
      </div>
      <Image src={src} alt={alt} width={1000} height={1000} />
      <div className="absolute-full bg-gradient-to-t from-black to-60%"></div>
      <div className="absolute bottom-3 left-3">
        <Text className={`text-config-text-accent ${!isHovered ? 'opacity-100' : 'opacity-0'}`}>Mint as NFT</Text>
      </div>
    </div>
  );
}

export default NftBlock;