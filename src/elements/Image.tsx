import NextImage from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
}

const Image: React.FC<ImageProps> = ({ src, alt }) => {
  return (
    <NextImage src={src} alt={alt} width={200} height={200} />
  );
};

export default Image;
