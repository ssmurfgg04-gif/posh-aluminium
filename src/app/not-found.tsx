import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Home, ArrowUpRight } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 pt-20 flex items-center min-h-[80vh]">
        <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-display font-black text-[clamp(6rem,20vw,12rem)] text-navy/10 dark:text-white/10 leading-none tracking-tighter">404</p>
          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-navy dark:text-white tracking-tight leading-[1.05] -mt-8 sm:-mt-12">That page is not here.</h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[65ch] mx-auto">
            The page you are looking for may have been moved, renamed, or never existed.
            Try one of these instead.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-accent-red hover:bg-accent-red/90 text-white shadow-red">
              <Link href="/"><Home className="mr-2 h-4 w-4" />Go home</Link>
            </Button>
            <Button asChild variant="outline" className="border-royal/30 text-royal hover:bg-royal hover:text-white">
              <Link href="/projects">View projects<ArrowUpRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" className="border-border">
              <a href={`tel:${COMPANY.phoneIntl}`}>Call {COMPANY.phoneDisplay}</a>
            </Button>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-sm text-muted-foreground">
            Or browse:{" "}
            <Link href="/services" className="text-royal hover:text-accent-red font-medium">Services</Link>
            {" / "}
            <Link href="/#quote" className="text-royal hover:text-accent-red font-medium">Get a quote</Link>
            {" / "}
            <Link href="/contact" className="text-royal hover:text-accent-red font-medium">Contact</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
