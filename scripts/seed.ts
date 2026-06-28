// Sample data for Posh Aluminium & Glass
// Run: bun run scripts/seed.ts

import { db } from "../src/lib/db";

async function main() {
  console.log("Seeding database...");

  // Clear existing
  await db.newsletterSub.deleteMany();
  await db.contactMessage.deleteMany();
  await db.quoteRequest.deleteMany();
  await db.testimonial.deleteMany();
  await db.service.deleteMany();
  await db.project.deleteMany();
  await db.faqItem.deleteMany();

  // ===== Projects =====
  const projects = [
    {
      title: "Westlands Commercial Tower",
      slug: "westlands-commercial-tower",
      category: "commercial",
      location: "Westlands, Nairobi",
      year: 2024,
      client: "Helios Group",
      coverImage: "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg"
      ]),
      summary: "Full-height unitized curtain walling system for a 22-storey Grade-A office tower.",
      description: "Posh Aluminium engineered, fabricated and installed a unitized curtain wall system spanning all 22 floors of this flagship tower in Westlands. The system achieves superior thermal performance, acoustic insulation and weather-tightness while delivering a sleek, monolithic exterior. High-performance Low-E double glazing was paired with custom-extruded aluminium mullions in a charcoal finish.",
      scope: JSON.stringify(["Unitized curtain walling (12,400 m²)", "Aluminium composite panels", "Entrance doors & revolving door", "Sky-screening on rooftop plant room"]),
      duration: "14 months",
      value: "KSh 180M",
      featured: true
    },
    {
      title: "Karen Luxury Villa",
      slug: "karen-luxury-villa",
      category: "residential",
      location: "Karen, Nairobi",
      year: 2024,
      client: "Private",
      coverImage: "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg"
      ]),
      summary: "Frameless glass façade, slimline sliding doors and frameless shower cubicles.",
      description: "A contemporary residence set on a 1.2-acre plot in Karen. We delivered floor-to-ceiling frameless glass facades, slimline lift-and-slide doors opening to the garden, frameless glass shower cubicles and a custom-designed glass balustrade wrapping the swimming pool deck.",
      scope: JSON.stringify(["Slimline sliding doors (4 tracks)", "Frameless glass façade (260 m²)", "Glass balustrades", "Frameless shower cubicles", "Aluminium kitchen cabinets"]),
      duration: "5 months",
      value: "KSh 22M",
      featured: true
    },
    {
      title: "Aga Khan Hospital Wing",
      slug: "aga-khan-hospital-wing",
      category: "hospital",
      location: "Parklands, Nairobi",
      year: 2023,
      client: "Aga Khan Health Services",
      coverImage: "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg"
      ]),
      summary: "Hygiene-grade aluminium partitions, hermetically sealed windows & cleanroom glazing.",
      description: "We delivered specialist aluminium and glazing solutions for the new cardiac wing at Aga Khan Hospital. The work included hermetically sealed operable windows for patient rooms, cleanroom-grade aluminium partitions for procedure areas, lead-lined viewing windows for imaging suites, and a striking curved curtain wall entrance canopy.",
      scope: JSON.stringify(["Hermetic operable windows", "Lead-lined glazing", "Cleanroom aluminium partitions", "Curtain wall canopy entrance"]),
      duration: "9 months",
      value: "KSh 64M",
      featured: true
    },
    {
      title: "Brookhouse International School",
      slug: "brookhouse-international-school",
      category: "school",
      location: "Karen, Nairobi",
      year: 2023,
      client: "Brookhouse Schools",
      coverImage: "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg"
      ]),
      summary: "Acoustic aluminium partitions, security glazing & curtain-walled atrium.",
      description: "Brookhouse School's new science block required acoustic isolation between labs, security-rated glazing on ground-floor openings, and a daylight-filled central atrium. Posh delivered all three with a fully integrated aluminium and glass package.",
      scope: JSON.stringify(["Acoustic aluminium partitions STC 42", "Laminated security glazing", "Curtain-walled atrium (380 m²)", "Aluminium louvres"]),
      duration: "7 months",
      value: "KSh 38M",
      featured: false
    },
    {
      title: "Radisson Blu Hotel Expansion",
      slug: "radisson-blu-expansion",
      category: "hotel",
      location: "Upper Hill, Nairobi",
      year: 2024,
      client: "Radisson Hotel Group",
      coverImage: "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg"
      ]),
      summary: "Hotel-room windows, acoustic partitions, frameless shower cubicles & sky-screening.",
      description: "For the 180-room expansion of Radisson Blu Upper Hill, we supplied and installed all aluminium and glassworks: high-acoustic window systems facing the busy Expressway, bathroom shower cubicles with anti-lime coating, corridor partitions with STC 38 acoustic rating, and rooftop sky-screening for the pool deck.",
      scope: JSON.stringify(["Acoustic windows (180 rooms)", "Frameless shower cubicles", "Corridor partitions", "Pool-deck sky-screening"]),
      duration: "11 months",
      value: "KSh 92M",
      featured: true
    },
    {
      title: "Pavilion Residences",
      slug: "pavilion-residences",
      category: "apartment",
      location: "Kilimani, Nairobi",
      year: 2024,
      client: "Cytonn Real Estate",
      coverImage: "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg"
      ]),
      summary: "Balcony railings, sliding doors & privacy screens for 96 luxury apartments.",
      description: "A 96-unit luxury apartment development in Kilimani. Our scope covered glass-and-aluminium balcony railings across all units, slimline sliding doors with low-track profiles for step-out access, and perforated aluminium privacy screens on the building façade.",
      scope: JSON.stringify(["Glass balcony railings (96 units)", "Slimline sliding doors", "Perforated aluminium screens", "Aluminium entrance lobby"]),
      duration: "10 months",
      value: "KSh 58M",
      featured: false
    },
    {
      title: "Two Rivers Mall Atrium",
      slug: "two-rivers-mall-atrium",
      category: "commercial",
      location: "Ruaka, Nairobi",
      year: 2022,
      client: "Centum Investment",
      coverImage: "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg"
      ]),
      summary: "Massive ETFE-skylit atrium curtain wall with custom mullion profiles.",
      description: "The 9,000 m² central atrium at Two Rivers Mall features a custom-engineered curtain wall with a pyramidal ETFE skylight overhead. Posh Aluminium designed, fabricated and installed the entire envelope to achieve best-in-class daylight transmission and energy performance.",
      scope: JSON.stringify(["Curtain wall atrium (9,000 m²)", "ETFE skylight", "Custom entrance doors", "Glass balustrades on walkways"]),
      duration: "12 months",
      value: "KSh 145M",
      featured: true
    },
    {
      title: "Muthaiga Heritage Home",
      slug: "muthaiga-heritage-home",
      category: "residential",
      location: "Muthaiga, Nairobi",
      year: 2023,
      client: "Private",
      coverImage: "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg"
      ]),
      summary: "Heritage-style steel-look aluminium partitions and oriel windows.",
      description: "A heritage residence in Muthaiga required steel-look glazing that matched its 1940s architecture but performed to modern standards. We delivered slim-profile aluminium partitions with glazing bars, a curved oriel window, and a frameless glass orangery roof.",
      scope: JSON.stringify(["Steel-look aluminium partitions", "Curved oriel window", "Frameless orangery roof", "Leaded-light entrance door"]),
      duration: "4 months",
      value: "KSh 18M",
      featured: false
    }
  ];

  for (const p of projects) {
    await db.project.create({ data: p });
  }

  // ===== Services =====
  const services = [
    {
      slug: "curtain-walling",
      title: "Curtain Walling",
      tagline: "Engineered façades that define skylines.",
      description: "Our curtain wall systems span low-rise to high-rise buildings with unitized or stick-built configurations. We engineer for wind loads, seismic movement and thermal performance, then fabricate and install to international standards.",
      benefits: JSON.stringify([
        "Weather-tight, pressure-equalized system",
        "Thermal break technology for energy efficiency",
        "Custom mullion profiles and finishes",
        "Compatible with double & triple glazing"
      ]),
      specifications: JSON.stringify([
        { label: "System", value: "Unitized or stick-built" },
        { label: "Glazing", value: "Double / Triple IGU" },
        { label: "Standards", value: "ASTM E283, EN 13830" },
        { label: "Finishes", value: "PVDF / Anodized" }
      ]),
      icon: "Building2",
      coverImage: "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg"
      ]),
      faqs: JSON.stringify([
        { q: "How tall can a curtain wall be?", a: "Our unitized systems are engineered for buildings up to 60 storeys. For taller projects we partner with international façade consultants." },
        { q: "What's the lead time?", a: "Typical lead time is 10–14 weeks from approved shop drawings to site delivery." }
      ]),
      order: 1
    },
    {
      slug: "sliding-doors",
      title: "Sliding Doors",
      tagline: "Slimline tracks, seamless indoor-outdoor flow.",
      description: "Our slimline sliding doors achieve ultra-narrow sightlines with smooth lift-and-slide operation. Available in 2-, 3- and 4-track configurations with low-threshold options for accessible design.",
      benefits: JSON.stringify([
        "Slim 20mm interlock profiles",
        "Lift-and-slide hardware for effortless operation",
        "Low-threshold or flush-track options",
        "Panels up to 3m tall, 1.5m wide"
      ]),
      specifications: JSON.stringify([
        { label: "Profile", value: "Thermal-break aluminium" },
        { label: "Glazing", value: "Up to 28mm double IGU" },
        { label: "Hardware", value: "Dormakaba / Roto" },
        { label: "Max panel", value: "300kg" }
      ]),
      icon: "DoorOpen",
      coverImage: "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg"
      ]),
      faqs: JSON.stringify([
        { q: "Can the doors handle coastal weather?", a: "Yes — all hardware is marine-grade 316 stainless, with PVDF finishes rated for 25+ years in coastal environments." }
      ]),
      order: 2
    },
    {
      slug: "office-partitions",
      title: "Office Partitions",
      tagline: "Acoustic, demountable, future-proof.",
      description: "Demountable aluminium-and-glass partition systems that allow rapid reconfiguration of office layouts. Engineered for STC 35–48 acoustic performance and full integration with ceiling and floor systems.",
      benefits: JSON.stringify([
        "STC 35 to STC 48 acoustic ratings",
        "Demountable & reconfigurable",
        "Integrated blinds and routing",
        "Single or double glazing options"
      ]),
      specifications: JSON.stringify([
        { label: "Frame", value: "Aluminium, 50–100mm" },
        { label: "Glazing", value: "10–12mm toughened" },
        { label: "Acoustics", value: "STC 35–48" },
        { label: "Height", value: "Up to 4m" }
      ]),
      icon: "Columns3",
      coverImage: "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg"
      ]),
      faqs: JSON.stringify([
        { q: "Can we reconfigure later?", a: "Yes — our demountable system allows panels to be relocated without damage, reducing future fit-out costs." }
      ]),
      order: 3
    },
    {
      slug: "shower-cubicles",
      title: "Shower Cubicles",
      tagline: "Frameless elegance, perfect seal.",
      description: "Custom frameless glass shower enclosures with 10mm or 12mm toughened glass, premium hardware and anti-lime coatings. Engineered for a perfect seal and a stunning appearance.",
      benefits: JSON.stringify([
        "10–12mm toughened safety glass",
        "Anti-lime hydrophobic coating",
        "Premium brass hardware",
        "Custom shapes for any bathroom"
      ]),
      specifications: JSON.stringify([
        { label: "Glass", value: "10/12mm toughened" },
        { label: "Hardware", value: "Brass, chrome finish" },
        { label: "Coating", value: "Hydrophobic optional" },
        { label: "Hinges", value: "180° pivot" }
      ]),
      icon: "ShowerHead",
      coverImage: "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg"
      ]),
      faqs: JSON.stringify([]),
      order: 4
    },
    {
      slug: "sky-screening",
      title: "Sky Screening",
      tagline: "Architectural sun louvres & sky-lights.",
      description: "Custom-engineered aluminium louvre systems, brise-soleil and skylights that control solar gain, create dramatic roofscapes and protect rooftop plant rooms.",
      benefits: JSON.stringify([
        "Fixed or motorized louvres",
        "Reduces solar gain by up to 70%",
        "Powder-coated to any RAL colour",
        "Integrated rain & wind sensors"
      ]),
      specifications: JSON.stringify([
        { label: "Blade", value: "Aerofoil 200–600mm" },
        { label: "Operation", value: "Manual / Motorized" },
        { label: "Finish", value: "PVDF any RAL" },
        { label: "Control", value: "Sun/wind/rain sensors" }
      ]),
      icon: "SunMedium",
      coverImage: "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg"
      ]),
      faqs: JSON.stringify([]),
      order: 5
    },
    {
      slug: "railings",
      title: "Railings",
      tagline: "Glass & aluminium balustrades.",
      description: "Frameless glass balustrades, aluminium picket railings and contemporary top-rail systems for balconies, staircases and terraces. Engineered to KEBS and international loading codes.",
      benefits: JSON.stringify([
        "Frameless or top-rail designs",
        "Toughened + laminated glass",
        "Marine-grade hardware",
        "Custom powder-coat finishes"
      ]),
      specifications: JSON.stringify([
        { label: "Glass", value: "13.52 / 17.52 laminate" },
        { label: "Height", value: "1100mm standard" },
        { label: "Loading", value: "1.5 kN/m" },
        { label: "Fixing", value: "Base / Face" }
      ]),
      icon: "Fence",
      coverImage: "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg"
      ]),
      faqs: JSON.stringify([]),
      order: 6
    },
    {
      slug: "cabinets",
      title: "Aluminium Cabinets",
      tagline: "Sleek, durable, modular kitchen systems.",
      description: "Custom aluminium kitchen and wardrobe cabinet systems. Moisture-proof, termite-proof and infinitely reconfigurable — ideal for tropical climates where timber warps.",
      benefits: JSON.stringify([
        "100% moisture & termite proof",
        "Soft-close Blum hardware",
        "Powder-coated any colour",
        "Modular & reconfigurable"
      ]),
      specifications: JSON.stringify([
        { label: "Frame", value: "1.2mm aluminium" },
        { label: "Hardware", value: "Blum / Hettich" },
        { label: "Finish", value: "PVDF any RAL" },
        { label: "Warranty", value: "10 years" }
      ]),
      icon: "Boxes",
      coverImage: "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg"
      ]),
      faqs: JSON.stringify([]),
      order: 7
    }
  ];

  for (const s of services) {
    await db.service.create({ data: s });
  }

  // ===== Testimonials =====
  const testimonials = [
    {
      name: "James Mwangi",
      role: "Project Director",
      company: "Helios Group",
      rating: 5,
      quote: "Posh Aluminium delivered our 22-storey curtain wall ahead of schedule and to international standards. Their shop-drawing team caught issues that would have cost us millions. They are now our default façade partner.",
      avatar: null
    },
    {
      name: "Aisha Hassan",
      role: "Homeowner",
      company: "Karen Residence",
      rating: 5,
      quote: "We built our dream home in Karen and Posh brought it to life. The slimline sliding doors are so smooth my 6-year-old can open them, and the frameless shower cubicles still look brand new after 2 years.",
      avatar: null
    },
    {
      name: "Dr. Peter Kamau",
      role: "Facilities Lead",
      company: "Aga Khan Health Services",
      rating: 5,
      quote: "Healthcare projects have zero tolerance for shortcuts. Posh's hermetic windows passed every pressure test on the first attempt, and their cleanroom partitions exceeded our STC requirements. Truly professional.",
      avatar: null
    },
    {
      name: "Sarah Wanjiru",
      role: "Interior Designer",
      company: "Studio 21 Interiors",
      rating: 5,
      quote: "I specify Posh Aluminium on every premium residential project. Their attention to detail, finish quality and lead-time reliability is unmatched in Nairobi. Clients always notice the difference.",
      avatar: null
    },
    {
      name: "Michael Otieno",
      role: "Construction Manager",
      company: "Centum Investment",
      rating: 5,
      quote: "On a 9,000 m² mall atrium with an ETFE skylight, you need a partner who understands structural movement. Posh engineered the system end-to-end. Two years on — zero leaks, zero callbacks.",
      avatar: null
    },
    {
      name: "Elizabeth Njoroge",
      role: "Hotel Operations Director",
      company: "Radisson Blu Upper Hill",
      rating: 5,
      quote: "Acoustic windows facing the Expressway were non-negotiable for guest comfort. Posh delivered STC ratings that exceeded spec, on a 180-room project, ahead of schedule. Outstanding execution.",
      avatar: null
    }
  ];

  for (const t of testimonials) {
    await db.testimonial.create({ data: t });
  }

  // ===== FAQs =====
  const faqs = [
    {
      question: "What areas of Kenya does Posh Aluminium serve?",
      answer: "We are headquartered in Nairobi and serve all 47 counties. We have active projects in Mombasa, Kisumu, Nakuru, Eldoret, Nanyuki and Diani. For projects outside Nairobi we mobilize our site teams with full fabrication and installation capability.",
      category: "service",
      order: 1
    },
    {
      question: "Do you offer free site surveys and quotations?",
      answer: "Yes — for serious enquiries we send a surveyor to your site within 48 hours (Nairobi metro) or arrange a video survey for upcountry projects. You'll receive a detailed BOQ and quote within 5 working days.",
      category: "service",
      order: 2
    },
    {
      question: "What warranty do you offer on your work?",
      answer: "All our aluminium systems carry a 10-year warranty on profiles and finishes, 5 years on hardware (manufacturer-backed by Dormakaba, Roto, Blum and Schüco), and a 2-year workmanship warranty on installation.",
      category: "service",
      order: 3
    },
    {
      question: "Can you handle commercial and high-rise projects?",
      answer: "Absolutely. We have delivered curtain wall projects up to 22 storeys and have an in-house engineering team capable of designing façades for buildings up to 60 storeys. For larger projects we partner with international façade consultants.",
      category: "technical",
      order: 4
    },
    {
      question: "Which aluminium systems and brands do you use?",
      answer: "We are certified installers for Schüco and Reynaers systems, and we partner with Saint Gobain for glass, Dormakaba and Assa Abloy for hardware, Yale for locking, and Blum/Hettich for cabinet hardware.",
      category: "technical",
      order: 5
    },
    {
      question: "How long does a typical residential project take?",
      answer: "For a standard 4-bedroom house: sliding doors and windows take 3–5 weeks from approved drawings, shower cubicles 1–2 weeks, and kitchen cabinets 3–4 weeks. We work to your construction schedule.",
      category: "service",
      order: 6
    },
    {
      question: "Do you provide after-sales support and maintenance?",
      answer: "Yes. Every project comes with a 2-year workmanship warranty and we offer annual maintenance contracts (AMC) for commercial clients. We also stock spare parts for all systems we install for at least 10 years.",
      category: "service",
      order: 7
    },
    {
      question: "Are your products compliant with Kenyan and international standards?",
      answer: "Yes. Our systems comply with KEBS, ASTM E283 (air infiltration), ASTM E331 (water penetration), EN 13830 (curtain walling), and EN 12101 (smoke control). Test certificates are available on request.",
      category: "technical",
      order: 8
    }
  ];

  for (const f of faqs) {
    await db.faqItem.create({ data: f });
  }

  console.log("Seed complete.");
  console.log(`  Projects:    ${projects.length}`);
  console.log(`  Services:    ${services.length}`);
  console.log(`  Testimonials: ${testimonials.length}`);
  console.log(`  FAQs:        ${faqs.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
