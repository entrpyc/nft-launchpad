export const CONTRACT_ADDRESS = '0xD12e71b44BC6479223D18273F56a6Ff9d9F12CA6';
export const CONTRACT_MINT_FUNCTION_NAME = 'mint';
export const CONTRACT_TRANSACTION_VALUE = '0.00000000000001';

type fruityNFTType = {
  id: string,
  src: string,
  alt: string,
  price: string,
  isMinted?: boolean,
}

export const NFT_LIST: fruityNFTType[] = [
  {
    id: '1',
    src: '/nfts/1.jpg',
    alt: 'NFT 1',
    price: '0.00000000000001',
  },
  {
    id: '2',
    src: '/nfts/2.jpg',
    alt: 'NFT 2',
    price: '0.00000000000001',
  },
  {
    id: '3',
    src: '/nfts/3.jpg',
    alt: 'NFT 3',
    price: '0.00000000000001',
  },
  {
    id: '4',
    src: '/nfts/4.jpg',
    alt: 'NFT 4',
    price: '0.00000000000001',
  },
  {
    id: '5',
    src: '/nfts/5.jpeg',
    alt: 'NFT 5',
    price: '0.00000000000001',
  },
  {
    id: '6',
    src: '/nfts/6.jpg',
    alt: 'NFT 6',
    price: '20.5',
  },
]
