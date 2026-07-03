import type { Metadata, Viewport } from "next";
import { Special_Elite, Courier_Prime, Caveat } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import SiteAtmosphere from "@/components/SiteAtmosphere";
import { cn } from "@/lib/utils";

// Special Elite ships weight 400 only.
const typewriter = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-typewriter",
  display: "swap",
});

const typewriterBody = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-typewriter-body",
  display: "swap",
});

const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "James Manon-og — Software Engineer & Designer",
  description:
    "Personal portfolio of James Manon-og — building thoughtful, fast, and beautiful digital products.",
  metadataBase: new URL("https://example.com"),
};

export const viewport: Viewport = {
  themeColor: "#b1946b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        typewriter.variable,
        typewriterBody.variable,
        hand.variable,
        GeistSans.variable,
        "font-sans"
      )}
    >
      <body className="bg-bg text-ink antialiased">
        <SiteAtmosphere />
        <SmoothScroll>
          <Navbar />
          <main className="relative z-10">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
