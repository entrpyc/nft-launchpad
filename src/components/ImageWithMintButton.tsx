import { useState, useEffect } from 'react';

import Image from '@/elements/Image';
import Button from '@/elements/Button';

interface ImageProps {
  src: string;
  alt: string;
}

const ImageWithMintButton: React.FC<ImageProps> = ({ src, alt }) => {
  return (
    <div>
      <Image src={src} alt={alt} />
      <Button>
        Mint as NFT
      </Button>
    </div>
  );
};

export default ImageWithMintButton;
