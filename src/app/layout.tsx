import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import { businessName, defaultSeo, siteUrl } from "@/data/site-content";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultSeo.title,
  description: defaultSeo.description,
  keywords: defaultSeo.keywords,
  openGraph: {
    title: defaultSeo.title,
    description: defaultSeo.description,
    siteName: businessName,
    url: siteUrl,
    type: "website",
    images: ["/assets/hero/hero1.jpg"]
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSeo.title,
    description: defaultSeo.description,
    images: ["/assets/hero/hero1.jpg"]
  },
  icons: {
    icon: "/assets/IFARMERSLOGO.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
