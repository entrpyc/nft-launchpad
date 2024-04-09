import ImageWithMintButton from "@/components/ImageWithMintButton";
import WalletProvider from '@/context/WalletProvider';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <WalletProvider>
      <ConnectButton />
      <ImageWithMintButton src="/test.jpg" alt="Trump" />
    </WalletProvider>
  );
}
