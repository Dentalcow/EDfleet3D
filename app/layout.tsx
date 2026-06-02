import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "edfleet3d — 3D Printer Maintenance for Sydney Schools",
  description:
    "Affordable 3D printer servicing and maintenance packages for NSW public schools. Fast response, term-based plans, and QR error reporting.",
  openGraph: {
    title: "edfleet3d",
    description: "Keeping school printers printing.",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetBrainsMono.variable} bg-background text-foreground font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
