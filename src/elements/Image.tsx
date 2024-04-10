import NextImage from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width = 100,
  height = 100
}) => {
  return (
    <NextImage src={src} alt={alt} width={width} height={height} />
  );
};

export default Image;
