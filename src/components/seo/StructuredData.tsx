import { COMPANY } from "@/lib/constants";

export function StructuredData() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": "https://poshaluminium.co.ke/#business",
    name: COMPANY.fullName,
    alternateName: COMPANY.name,
    description:
      "Premium aluminium & glass specialist in Kenya. Engineering, fabrication and installation of curtain walls, sliding doors, office partitions, shower cubicles, railings and architectural glazing.",
    url: "https://poshaluminium.co.ke",
    telephone: COMPANY.phoneDisplay,
    email: COMPANY.email,
    foundingDate: "2010",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi",
      addressCountry: "KE",
    },
    areaServed: [
      { "@type": "Country", name: "Kenya" },
      { "@type": "City", name: "Nairobi" },
      { "@type": "City", name: "Mombasa" },
      { "@type": "City", name: "Kisumu" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "16:00",
      },
    ],
    sameAs: [
      COMPANY.social.facebook,
      COMPANY.social.instagram,
      COMPANY.social.linkedin,
      COMPANY.social.youtube,
    ],
  };

  const services = [
    "Curtain Walling", "Sliding Doors", "Office Partitions",
    "Shower Cubicles", "Sky Screening", "Railings", "Aluminium Cabinets",
  ].map((name) => ({
    "@type": "Service",
    name,
    provider: { "@id": "https://poshaluminium.co.ke/#business" },
    areaServed: { "@type": "Country", name: "Kenya" },
  }));

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Posh Aluminium Services",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: s,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
    </>
  );
}
