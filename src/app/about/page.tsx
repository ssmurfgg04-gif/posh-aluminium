import { db } from "@/lib/db";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BackToTop } from "@/components/layout/BackToTop";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { AboutStory } from "@/components/sections/AboutStory";
import { WhyPosh } from "@/components/sections/WhyPosh";
import { Capabilities } from "@/components/sections/Capabilities";
import { Brands } from "@/components/sections/Brands";
import { NowWorkingOn } from "@/components/sections/NowWorkingOn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Founded in Nairobi in 2010. Posh Aluminium engineers, fabricates and installs premium aluminium and glass systems for Kenya's most ambitious buildings.",
  alternates: { canonical: "/about" },
};

export const dynamic = "force-dynamic";

export default function AboutPage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main-content" className="flex-1 pt-20">
        <AboutStory />
        <WhyPosh />
        <Capabilities />
        <NowWorkingOn />
        <Brands />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
