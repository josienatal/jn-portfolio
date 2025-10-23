import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Jay Natal | Portfolio',
  description:
    'Where {Code} Meets Magic — Developer, Designer, Dreamer. Building fintech, creative, and mystical experiences.',
  openGraph: {
    title: 'Jay Natal | Portfolio',
    description:
      'Where {Code} Meets Magic — Developer, Designer, Dreamer. Building fintech, creative, and mystical experiences.',
    url: 'https://jn-portfolio.vercel.app/',
    siteName: 'Jay Natal Portfolio',
    images: [
      {
        url: '/og-image.png', // optional: add this later for link previews
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
