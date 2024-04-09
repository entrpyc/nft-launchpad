'use client'

import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

import { WagmiProvider } from 'wagmi';
import { arbitrumSepolia } from 'wagmi/chains';

interface WalletProviderProps {
  children: React.ReactNode
}

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'NFT Launchpad',
  projectId: 'e16152cbb067ad453b4a9600024b708d',
  chains: [arbitrumSepolia],
  ssr: true,
});

export default function WalletProvider({ children }: WalletProviderProps) {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
