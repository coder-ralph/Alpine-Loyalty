import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alpine-loyalty.vercel.app"),
  title: "Alpine Loyalty — Card Generator",
  description:
    "Calculate your weekly milk consumption, level up your status, and generate custom downloadable Alpine Loyalty Cards.",
  authors: [{ name: "Ralph Rosael" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Alpine Loyalty — Card Generator",
    description:
      "Calculate your weekly milk consumption, level up your status, and generate custom downloadable Alpine Loyalty Cards.",
    type: "website",
    url: "https://alpine-loyalty.vercel.app",
    siteName: "Alpine Loyalty",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Alpine Loyalty — Custom Loyalty Card Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpine Loyalty — Card Generator",
    description:
      "Calculate your weekly milk consumption, level up your status, and generate custom downloadable Alpine Loyalty Cards.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
