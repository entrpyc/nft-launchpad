import { useState } from "react";

import Image from "@/elements/Image";
import Button from "@/elements/Button";

import Text from "@/elements/Text";
import { MY_NFTS_ROUTE } from "@/constants/routes";
import Link from "@/elements/Link";


interface OwnedNftBlockProps {
  src: string;
  alt: string;
  withRedirect?: boolean;
}

const OwnedNftBlock: React.FC<OwnedNftBlockProps> = ({
  src,
  alt,
  withRedirect = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div className="contents" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {withRedirect ? (
        <Link href={MY_NFTS_ROUTE} className="relative rounded-md overflow-hidden hoverable no-animation">
          <div className={`mint-nav absolute-full flex-center-col gap-2 bg-black/60 z-10 hoverable ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Text className="text-config-text-contrast">You already own this NFT!</Text>
            <Button>My NFTs</Button>
          </div>
          <Image src={src} alt={alt} width={1000} height={1000} />
        </Link>
      ) : (
        <div className="relative rounded-md overflow-hidden hoverable">
          <Image src={src} alt={alt} width={1000} height={1000} />
        </div>
      )}
    </div>
  );
}

export default OwnedNftBlock;