import type { Metadata } from "next";

import "@/styles/config.scss";
import "@/styles/global.css";
import "@/styles/elements.scss";
import '@rainbow-me/rainbowkit/styles.css';

export const metadata: Metadata = {
  title: "Fruity NFTs",
  description: "Mint, upload, or generate fruity NFTs!",
  icons: [
    {
      url: '/images/favicon.ico',
      href: '/images/favicon.ico',
    },
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
