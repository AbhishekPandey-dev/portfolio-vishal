import type { Metadata } from "next";
import { Space_Grotesk, Inter, Alumni_Sans } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

const processHeadline = Space_Grotesk({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const processLabel = Space_Grotesk({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const bodyInter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const displayAlumni = Alumni_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "VISHAL SINGH | Full Stack Developer & Creative Director",
  description: "Independent Creative Director and Product Designer building digital artifacts for the next era of the web. Focused on structural honesty and cinematic experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${processHeadline.variable} ${processLabel.variable} ${bodyInter.variable} ${displayAlumni.variable} dark antialiased shadow-2xl`}
    >
      <body className="min-h-screen flex flex-col bg-vs-background text-vs-foreground overflow-x-hidden selection:bg-white selection:text-black">
        <LenisProvider>
          <CustomCursor />
          <Navigation />
          <main className="flex-grow">
             {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
