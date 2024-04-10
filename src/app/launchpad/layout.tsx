'use client'

import Image from "@/elements/Image";

import WalletProvider from "@/context/WalletProvider";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { HOME_ROUTE, MY_NFTS_ROUTE, SETTINGS_ROUTE } from "@/constants/routes";

const logoSrc = '/images/logo.png';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WalletProvider>
      <header className="fixed bg-config-bg-secondary z-10 left-0 right-0 shadow-sm">
        <div className="main-container gap-3 flex-split py-2 flex-wrap">
          <Link href={HOME_ROUTE} className="logo flex-center gap-2 text-config-text-accent">
            <Image src={logoSrc} alt="Logo" width={80} height={80} />
            <h1 className="text-lg font-medium">Fruity NFTs</h1>
          </Link>
          <div className="navigation flex-center gap-4 text-config-text-accent flex-wrap">
            <Link href={SETTINGS_ROUTE}>Launchpad</Link>
            <Link href={SETTINGS_ROUTE}>Settings</Link>
            <Link href={MY_NFTS_ROUTE}>My NFTs</Link>
            <ConnectButton />
          </div>
        </div>
      </header>
      <main className="pt-[9rem]">{children}</main>
    </WalletProvider>
  );
}
