import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import SiteAtmosphere from "@/components/SiteAtmosphere";
import FloatingLanyard from "@/components/FloatingLanyard";
import { cn } from "@/lib/utils";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "James Manon-og — Software Engineer & Designer",
  description:
    "Personal portfolio of James Manon-og — building thoughtful, fast, and beautiful digital products.",
  metadataBase: new URL("https://example.com"),
};

export const viewport: Viewport = {
  themeColor: "#030604",
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
      className={cn(mono.variable, "font-sans", GeistSans.variable)}
    >
      <body className="bg-bg text-ink antialiased">
        <SiteAtmosphere />
        <SmoothScroll>
          <Navbar />
          <main className="relative z-10">{children}</main>
        </SmoothScroll>
        <FloatingLanyard />
      </body>
    </html>
  );
}
