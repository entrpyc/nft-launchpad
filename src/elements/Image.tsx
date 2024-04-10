import NextImage from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const Image: React.FC<ImageProps> = ({ src, alt, width, height }) => {
  return (
    <NextImage src={src} alt={alt} width={width || 1000} height={height || 1000} />
  );
};

export default Image;
