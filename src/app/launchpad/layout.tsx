'use client'

import Image from "@/elements/Image";

import WalletProvider from "@/context/WalletProvider";
import { ConnectButton } from "@rainbow-me/rainbowkit";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WalletProvider>
      <header className="container max-w-6xl flex-split py-5">
        <div className="logo">
          <Image src="/logo.png" alt="Logo" width={80} height={80} />
          <h1>Fruity NFTs</h1>
        </div>
        <div className="navigation">
          <ConnectButton />
        </div>
      </header>
      <main>{children}</main>
    </WalletProvider>
  );
}
