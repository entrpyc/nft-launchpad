'use client'

import Title from "@/elements/Title";
import Link from "@/elements/Link";
import Image from "@/elements/Image";

import WalletProvider from "@/context/WalletProvider";
import { UserProvider } from "@/context/UserProvider";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { HOME_ROUTE, LAUNCHPAD_ROUTE, MY_NFTS_ROUTE, SETTINGS_ROUTE } from "@/constants/routes";

const LOGO_SRC = '/images/logo.png';

export default function LaunchpadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WalletProvider>
      <UserProvider>
      <header className="fixed bg-config-bg-secondary z-10 left-0 right-0 shadow-sm">
        <div className="main-container gap-3 flex-split py-2 flex-wrap">
          <Link href={HOME_ROUTE} className="flex-center gap-2">
            <Image src={LOGO_SRC} alt="Logo" width={80} height={80} />
            <Title tag="h1" className="text-lg text-config-text-accent">Fruity NFTs</Title>
          </Link>
          <div className="navigation flex-center gap-4 flex-wrap">
            <Link href={LAUNCHPAD_ROUTE}>Launchpad</Link>
            <Link href={SETTINGS_ROUTE}>Settings</Link>
            <Link href={MY_NFTS_ROUTE}>My NFTs</Link>
            <ConnectButton />
          </div>
        </div>
      </header>
      <main className="pt-[9rem]">{children}</main>
      </UserProvider>
    </WalletProvider>
  );
}
