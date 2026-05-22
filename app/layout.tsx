import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import LiquidEther from "@/components/LiquidEther";
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
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <LiquidEther
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            colors={["#5227FF", "#FF9FFC", "#B497CF"]}
            autoDemo
            autoSpeed={0.5}
            autoIntensity={2.2}
            isBounce={false}
            resolution={0.5}
          />
        </div>
        <SmoothScroll>
          <Navbar />
          <main className="relative z-10">{children}</main>
        </SmoothScroll>
        <FloatingLanyard />
        <div className="grain" aria-hidden />
        <div className="vignette" aria-hidden />
        <div className="scan-sweep" aria-hidden />
        <div className="scanlines" aria-hidden />
      </body>
    </html>
  );
}
