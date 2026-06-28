import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { COMPANY } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://poshaluminium.co.ke"),
  title: {
    default: `${COMPANY.fullName} | Premium Aluminium & Glass Solutions in Kenya`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "Posh Aluminium & Glass is Kenya's premier aluminium and glass specialist. We engineer, fabricate and install curtain walls, sliding doors, office partitions, shower cubicles and balustrades for commercial, residential, hospitality and healthcare projects nationwide.",
  keywords: [
    "aluminium Kenya",
    "glass solutions Nairobi",
    "curtain walling Kenya",
    "sliding doors Nairobi",
    "office partitions Nairobi",
    "shower cubicles Kenya",
    "aluminium railings Nairobi",
    "Posh Aluminium",
    "aluminium fabricator Nairobi",
    "curtain wall Mombasa",
    "aluminium windows Kenya",
    "glass balustrade Nairobi",
  ],
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-KE": "/",
      "sw-KE": "/",
    },
  },
  openGraph: {
    title: `${COMPANY.fullName} | Premium Aluminium & Glass Solutions in Kenya`,
    description:
      "500+ projects delivered. 15+ years of experience. Engineering, fabrication & installation of premium aluminium and glass systems for Kenya's most ambitious projects.",
    url: "https://poshaluminium.co.ke",
    siteName: COMPANY.fullName,
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: COMPANY.fullName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.fullName} | Premium Aluminium & Glass`,
    description: "Kenya's premier aluminium and glass specialist. 500+ projects delivered.",
  },
  category: "construction",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#060B16" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
